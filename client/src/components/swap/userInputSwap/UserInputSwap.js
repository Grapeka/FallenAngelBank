import { useState, useEffect } from "react";
import classes from "./userInputSwap.module.scss";
import Button from "@mui/material/Button";
import { SwapHoriz } from "@material-ui/icons";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
const UserInputSwap = (props) => {
  let history = useHistory();

  let disable = false;
  console.log(props.userCurrency);
  console.log("props.userCurrency");
  const checkHaveCurreny = (cId) => {
    console.log("input " + cId + " check Have Curreny");
    const x = props.userCurrency.filter((e) => {
      return e.currencyId == cId;
    })[0];
    console.log(x);
    if (x) {
      console.log("have x, return true");
      console.log(x);
      return true;
    }
    console.log("does not have x, return false");
    return false;
  };
  const balanceFromCurrency = (cId) => {
    console.log("input " + cId + "balance FromC urrency");
    const x = props.userCurrency.filter((e) => {
      return e.currencyId == cId;
    })[0];
    console.log(x);
    if (x) {
      console.log("have x, return");
      console.log(x.balanceCurrency);
      console.log(x.balanceCurrency - amount);
      if (x.balanceCurrency - amount < 0) {
        disable = true;
      }
      return x.balanceCurrency;
    }
    console.log("does not have x, return 0");
    return 0;
  };
  const [exchangeRateStyle, setExchangeRateStyle] = useState(
    classes.exchangeRate
  );
  const [exchange, setExchange] = useState(null);
  const [citizenId, setCardId] = useState(props.continueData[0].citizenId);
  const [fromCurrencyId, setFromCurrencyId] = useState(null);
  const [toCurrencyId, setToCurrencyId] = useState(null);
  const [amount, setAmount] = useState(null);
  const CurrencySwap = () => {
    balanceFromCurrency(fromCurrencyId);
    console.log("disable");
    console.log(disable);
    if (disable) {
      Swal.fire({
        title: "You don't have enouch currency!",
        text: "You can transfer to Angel Exchange to top-up more",
        icon: "warning",
        showCancelButton: false,
        confirmButtonColor: "darkblue",
        confirmButtonText: "OK",
      });
      history.push("/home");
    } else {
      console.log("Start doing swap process");
      Axios.put(
        "https://fallenangel-bank-api.herokuapp.com/update/currency/balance",
        {
          citizenId: citizenId,
          currencyId: fromCurrencyId,
          balanceCurrency: balanceFromCurrency(fromCurrencyId) - amount,
        }
      ).then(() => {
        console.log("Check have currency before");
        if (checkHaveCurreny(toCurrencyId)) {
          Axios.put(
            "https://fallenangel-bank-api.herokuapp.com/update/currency/balance",
            {
              citizenId: citizenId,
              currencyId: toCurrencyId,
              balanceCurrency: balanceFromCurrency(toCurrencyId) + amount,
            }
          ).then(() => {
            console.log("Saving transaction");
            Axios.post(
              "https://fallenangel-bank-api.herokuapp.com/create/transaction/currency",
              {
                citizenId: citizenId,
                fromCurrency: fromCurrencyId,
                toCurrency: toCurrencyId,
                value: amount,
                note: `Exchange from ${fromCurrencyId} to ${toCurrencyId}`,
                rate: exchange,
                fee: 0.0,
              }
            ).then(() => {
              console.log("complete");
            });
          });
        } else {
          console.log("Else: dont have that toCurrency before");
          console.log(citizenId);
          console.log(toCurrencyId);
          console.log(exchange);
          Axios.post(
            "https://fallenangel-bank-api.herokuapp.com/create/customer/foreign/currencies",
            {
              citizenId: citizenId,
              currencyId: toCurrencyId,
              balanceCurrency: exchange,
            },
            {
              headers: { "Access-Control-Allow-Origin": "*" },
            }
          ).then(() => {
            console.log("Else completed, saving transaction");
            Axios.post(
              "https://fallenangel-bank-api.herokuapp.com/create/transaction/currency",
              {
                citizenId: citizenId,
                fromCurrency: fromCurrencyId,
                toCurrency: toCurrencyId,
                value: amount,
                note: `Exchange from ${fromCurrencyId} to ${toCurrencyId}`,
                rate: exchange,
                fee: 0.0,
              },
              {
                headers: { "Access-Control-Allow-Origin": "*" },
              }
            ).then(() => {
              console.log("complete");
            });
          });
        }
      });
    }
  };

  const getExchangeRate = (fromCurrency, toCurrency, amount) => {
    Axios.get(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
    ).then((res, err) => {
      if (err) {
        console.log(err);
      } else {
        props.setEx(Object.values(res.data.rates)[0]);
        setExchange(Object.values(res.data.rates)[0]);
      }
    });
  };

  return (
    <div className={classes.theForm}>
      <div className={classes.head}>Currency Swap</div>
      <div className={classes.amount}>
        <label htmlFor="amount">Input amount</label>
        <input
          autoComplete="off"
          type="text"
          name="amount"
          placeholder="Enter amount "
          onChange={(event) => {
            props.setAm(event.target.value);
            setAmount(event.target.value);
          }}
          required
        />
      </div>
      <div className={classes.currencyPair}>
        <div className={classes.from}>
          <label htmlFor="from">From</label>
          <select
            name="from"
            onChange={(event) => {
              props.setFrom(event.target.value);
              setFromCurrencyId(event.target.value);
            }}
            required
          >
            <option style={{ display: "none" }}>Select currency</option>
            {props.userCurrency.map((e, i) => {
              if (e.balanceCurrency > 0) {
                return (
                  <option key={i} value={e.currencyId}>
                    {e.currencyId}
                  </option>
                );
              }
            })}
          </select>
        </div>
        <div className={classes.symbol}>
          <SwapHoriz />
        </div>
        <div className={classes.to}>
          <label htmlFor="to">To</label>
          <select
            name="to"
            onChange={(event) => {
              props.setTo(event.target.value);
              setToCurrencyId(event.target.value);
            }}
            required
          >
            <option style={{ display: "none" }}>Select currency</option>
            <option value="THB">THB</option>
            <option value="USD">USD</option>
            <option value="GBP">GBP</option>
            <option value="EUR">EUR</option>
            <option value="JPY">JPY</option>
            <option value="AUD">AUD</option>
            <option value="CAD">CAD</option>
          </select>
        </div>
      </div>
      <div className={exchangeRateStyle}>{exchange}</div>
      <div className={classes.button}>
        <Button
          disabled={disable}
          variant="contained"
          color="secondary"
          style={{ backgroundColor: "darkblue" }}
          type="submit"
          onClick={() => {
            console.log(citizenId);
            console.log(fromCurrencyId);
            console.log(toCurrencyId);
            console.log(amount);
            getExchangeRate(fromCurrencyId, toCurrencyId, amount);
            props.setStep(props.step + 1);
            setExchangeRateStyle(classes.exchangeRate + " " + classes.active);

            /* if (props.step == 2) {
              props.setSubmitValue({
                ...props.submitValue,
                exchangeRate: exchange,
              });
            } */
            if (props.step == 2) {
              props.setStep(3);
              CurrencySwap();
            }
          }}
        >
          {props.step == 1 ? "Get Exchange Rate" : "Swap"}
        </Button>
      </div>
    </div>
  );
};

export default UserInputSwap;
