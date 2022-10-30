import { useState, useEffect } from "react";
import classes from "./swap.module.scss";
import UserInputSwap from "../../components/swap/userInputSwap/UserInputSwap";
import SwapComplete from "../../components/swap/swapComplete/SwapComplete";
import LinearProgress from "@mui/material/LinearProgress";

import Axios from "axios";
import Swal from "sweetalert2";

const Swap = (props) => {
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [am, setAm] = useState(null);
  const [ex, setEx] = useState(null);
  const youHave = (c) => {
    let x = "";
    for (let i = 0; i < c.length; i++) {
      x =
        x +
        c[i].currencyId.toString() +
        " : " +
        c[i].balanceCurrency.toString() +
        ",  " +
        " ";
    }
    if (x == "") {
      return (
        " no currency. " + " " + "Transfer to Angel Exchange to top-up THB"
      );
    }
    return x;
  };
  const [userCurrency, setUserCurrency] = useState([]);
  useEffect(() => {
    const getTotalCurrency = (citizenId) => {
      Axios.post(
        "https://fallenangel-bank-api.herokuapp.com/customer/currency/balance",
        {
          citizenId: citizenId,
        }
      ).then((res) => {
        console.log("res.data");
        console.log(res.data);
        console.log(res.data.length);
        if (res.data.length == 0) {
          Swal.fire({
            title: "You don't have any currency to exchange now",
            text: "Transfer balance to Angel Exchange to top-up THB",
            icon: "warning",
            showCancelButton: false,
            confirmButtonColor: "darkblue",
            confirmButtonText: "OK",
          });
        }

        Swal.fire({
          title: "Hi user!",
          text: `You have ${youHave(res.data)}`,
          icon: "warning",
          showCancelButton: false,
          confirmButtonColor: "darkblue",
          confirmButtonText: "OK",
        });
        setUserCurrency(res.data);
      });
    };
    getTotalCurrency(props.continueData[0].citizenId);
  }, []);
  const [step, setStep] = useState(1);
  const [submitValue, setSubmitValue] = useState({
    fromCurrency: null,
    value: null,
    toCurrency: null,
    exchangeRate: null,
    transactionId: null,
    fee: null,
    dateAndTime: null,
  });
  const linearProgressHandler = () => {
    if (step == 1) {
      return 33.33;
    } else if (step == 2) {
      return 66.66;
    } else {
      return 100;
    }
  };

  const transferPageHandler = () => {
    if (step >= 1 && step < 3) {
      return (
        <UserInputSwap
          continueData={props.continueData}
          userCurrency={userCurrency}
          step={step}
          setStep={setStep}
          submitValue={submitValue}
          setEx={setEx}
          setFrom={setFrom}
          setTo={setTo}
          setAm={setAm}
          setSubmitValue={setSubmitValue}
        />
      );
    } else if (step == 3) {
      return (
        <SwapComplete
          from={from}
          to={to}
          am={am}
          ex={ex}
          step={step}
          setStep={setStep}
          submitValue={submitValue}
        />
      );
    }
  };
  return (
    <div className={classes.container}>
      <div className={classes.insideContainer}>
        {transferPageHandler()}
        <div className={classes.progressBar}>
          <LinearProgress
            variant="determinate"
            value={linearProgressHandler()}
          />
        </div>
      </div>
    </div>
  );
};

export default Swap;
