import { useState, useEffect } from "react";
import UserInputTransfer from "../../components/transfer/userInputTransfer/UserInputTransfer";
import UserConfirmTransfer from "../../components/transfer/userConfirmTransfer/UserConfirmTransfer";
import classes from "./transfer.module.scss";
import LinearProgress from "@mui/material/LinearProgress";
import TransactionComplete from "../../components/transfer/transactionComplete/TransactionComplete";

import Axios from "axios";

const Transfer = (props) => {
  const [userAccounts, setUserAccounts] = useState([]);
  const [userCurrency, setUserCurrency] = useState([]);
  useEffect(() => {
    const getAccounts = (citizenId) => {
      Axios.post("https://fallenangel-bank-api.herokuapp.com/wallet", {
        citizenId: citizenId,
      }).then((response) => {
        setUserAccounts(response.data);
      });
    };
    const getTotalCurrency = (citizenId) => {
      Axios.post(
        "https://fallenangel-bank-api.herokuapp.com/customer/currency/balance",
        {
          citizenId: citizenId,
        }
      ).then((res) => {
        setUserCurrency(res.data);
      });
    };
    getTotalCurrency(props.continueData[0].citizenId);
    getAccounts(props.continueData[0].citizenId);
  }, []);

  const [step, setStep] = useState(1);
  const [submitValue, setSubmitValue] = useState({
    fromAccount: null,
    destinationBank: null,
    toAccount: null,
    value: null,
    category: null,
    note: null,
  });
  const linearProgressHandler = () => (100 * step) / 3;
  const transferPageHandler = () => {
    if (userAccounts) {
      if (step == 1) {
        return (
          <UserInputTransfer
            data={userAccounts}
            step={step}
            setStep={setStep}
            submitValue={submitValue}
            setSubmitValue={setSubmitValue}
          />
        );
      } else if (step == 2) {
        return (
          <UserConfirmTransfer
            citizenId={props.continueData[0].citizenId}
            userCurrency={userCurrency}
            data={userAccounts}
            setData={setUserAccounts}
            step={step}
            setStep={setStep}
            submitValue={submitValue}
          />
        );
      } else {
        return (
          <TransactionComplete
            data={userAccounts}
            step={step}
            setStep={setStep}
            submitValue={submitValue}
          />
        );
      }
    }
    return null;
  };
  return (
    <div className={classes.myContainer}>
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

export default Transfer;
