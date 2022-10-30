import classes from "./transactionComplete.module.scss";
import Button from "@mui/material/Button";
import { useState } from "react";
import { Link } from "react-router-dom";
import { AssignmentTurnedIn, ArrowForward } from "@material-ui/icons";
import timestamp from "time-stamp";
import Axios from "axios";
const TransactionComplete = (props) => {
  const [transacYet, setTransacYet] = useState(false);
  const transaction = () => {
    console.log("Check to account valid");
    Axios.post(
      "https://fallenangel-bank-api.herokuapp.com/account/check",
      {
        accountNum: props.submitValue.toAccount,
      },
      {
        headers: { "Access-Control-Allow-Origin": "*" },
      }
    ).then((response) => {
      if (response) {
        console.log("response");
        console.log(response.data);
        const mybalance = props.submitValue.balance
          ? props.submitValue.fromAccount
          : props.data[0].balance - props.submitValue.value;

        const targetbalance = response.data.balance + props.submitValue.value;
        console.log("Update from account balance");
        Axios.put(
          "https://fallenangel-bank-api.herokuapp.com/update/balance",
          {
            accountNum: props.submitValue.fromAccount
              ? props.submitValue.fromAccount
              : props.data[0].accountNum,
            balance: mybalance,
          },
          {
            headers: { "Access-Control-Allow-Origin": "*" },
          }
        )
          .then((res) => {
            console.log("Update to account balance");
            Axios.put(
              "https://fallenangel-bank-api.herokuapp.com/update/balance",
              {
                accountNum: response.data.accountNum,
                balance: targetbalance,
              },
              {
                headers: { "Access-Control-Allow-Origin": "*" },
              }
            );
          })
          .then((res) => {
            console.log("Saving transaction");
            Axios.post(
              "https://fallenangel-bank-api.herokuapp.com/create/transaction",
              {
                fromAccount: props.submitValue.fromAccount
                  ? props.submitValue.fromAccount
                  : props.data[0].accountNum,
                toAccount: response.data.accountNum,
                value: props.submitValue.value,
                note: props.submitValue.category
                  ? props.submitValue.category
                  : 10,
                categoryId: props.submitValue.value,
                transactionTypeId:
                  props.submitValue.destinationBank == "Angel Bank" ? 5 : 14,
              },
              {
                headers: { "Access-Control-Allow-Origin": "*" },
              }
            );
          })
          .then(() => {
            console.log("complete transfer");
          });
      } else {
        console.log("No account in database");
      }
    });
  };
  useState(() => {
    console.log("Page rendered");
    if (!transacYet) {
      console.log("Doing transaction");
      transaction();
      console.log("Done");
      setTransacYet(true);
    }
  }, []);

  const txId = Math.floor(100000000 + Math.random() * 900000000000);
  return (
    <div className={classes.container}>
      <div className={classes.status}>
        <AssignmentTurnedIn className={classes.symbol} />
        <h3 className={classes.head}>Transfer successfully</h3>
        <p className={classes.text}>
          Transaction has succeeded, you can go back to transfer form if you
          want to do transfer again or you can check your transaction history.
          Just click the button you want
        </p>
      </div>
      <div className={classes.txDetails}>
        <div className={classes.flow}>
          <div className={classes.from}>
            <h4>From</h4>
            <span>
              {props.submitValue.fromAccount
                ? props.submitValue.fromAccount
                : props.data[0].accountNum}
            </span>
          </div>
          <div className={classes.flowSymbol}>
            <ArrowForward />
          </div>
          <div className={classes.to}>
            <h4>To</h4>
            <span>{props.submitValue.toAccount}</span>
          </div>
        </div>
        <div className={classes.border}></div>
        <div className={classes.minorDetails}>
          <div className={classes.eachDetail}>
            <h4>TransactionID</h4>
            <span>{txId}</span>
          </div>
          <div className={classes.eachDetail}>
            <h4>Value</h4>
            <span>{props.submitValue.value} THB</span>
          </div>
          <div className={classes.eachDetail}>
            <h4>Transaction category</h4>
            <span>
              {props.submitValue.category
                ? props.submitValue.category
                : "Uncategorized"}
            </span>
          </div>
          <div className={classes.eachDetail}>
            <h4>Date and time</h4>
            <span>{timestamp.utc("YYYY/MM/DD/:mm:ss")}</span>
          </div>
        </div>
      </div>

      <div className={classes.button}>
        <Button
          variant="contained"
          style={{ backgroundColor: "darkblue" }}
          onClick={() => {
            props.setStep(props.step - 2);
          }}
        >
          Back to transfer
        </Button>
        <Link to="/transactions" style={{ width: "100%" }}>
          <Button variant="contained" style={{ backgroundColor: "darkblue" }}>
            View history
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default TransactionComplete;
