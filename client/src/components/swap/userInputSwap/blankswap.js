import { useState, useEffect } from "react";
import classes from "./userInputSwap.module.scss";
import Button from "@mui/material/Button";
import { SwapHoriz } from "@material-ui/icons";
import Axios from "axios";

const UserInputSwap = (props) => {
  const balanceFromCurrency = (cId) => {
    console.log("input" + cId);
    const x = props.userCurrency.filter((e) => {
      return e.currencyId == cId;
    })[0];
    console.log(x);
    if (x) {
      console.log("have x, return");
      console.log(x.balanceCurrency);
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
    console.log("Check");
    console.log(balanceFromCurrency("JPY") - amount);
    console.log("above is what we want");

    Axios.put(
      "https://fallenangel-bank-api.herokuapp.com/update/currency/balance",
      {
        citizenId: citizenId,
        currencyId: fromCurrencyId,
        balance: balanceFromCurrency(fromCurrencyId) - amount,
      }
    ).then(() => {
      Axios.put(
        "https://fallenangel-bank-api.herokuapp.com/update/currency/balance",
        {
          citizenId: citizenId,
          currencyId: toCurrencyId,
          balance: exchange,
        }
      ).then(() => {
        Axios.post(
          "https://fallenangel-bank-api.herokuapp.com/create/transaction/currency",
          {
            citizenId: citizenId,
            fromCurrency: fromCurrencyId,
            toCurrency: toCurrencyId,
            value: amount,
            note: "",
            rate: exchange,
            fee: 0.0,
          }
        ).then(() => {
          console.log("complete");
        });
      });
    });
  };
  const getExchangeRate = (fromCurrency, toCurrency, amount) => {
    Axios.get(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
    ).then((res, err) => {
      if (err) {
        console.log(err);
      } else {
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
          onChange={(event) => setAmount(event.target.value)}
          required
        />
      </div>
      <div className={classes.currencyPair}>
        <div className={classes.from}>
          <label htmlFor="from">From</label>
          <select
            name="from"
            onChange={(event) => setFromCurrencyId(event.target.value)}
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
            onChange={(event) => setToCurrencyId(event.target.value)}
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
