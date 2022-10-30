import classes from "./userConfirmTransfer.module.scss";
import Button from "@mui/material/Button";
import Axios from "axios";
import { useState, useEffect } from "react";

const UserConfirmTransfer = (props) => {
  const tranId = (x) => {
    if (x == null || x == "Angel-Bank") {
      return 5;
    }
    if (x == "Angel-Exchange") {
      return 14;
    }
  };
  const [citizenId, setCitizenId] = useState(props.citizenId);

  const [fromAccount, setFromAccount] = useState(
    props.submitValue.fromAccount
      ? props.submitValue.fromAccount
      : props.data[0].accountNum
  );
  const [fromAccountBalance, setFromAccountBalance] = useState(
    props.submitValue.fromAccount
      ? props.submitValue.balance
      : props.data[0].balance
  );
  const [toAccount, setToAccount] = useState(props.submitValue.toAccount);
  const [value, setValue] = useState(props.submitValue.value);
  const [note, setNote] = useState(
    props.submitValue.note == null ? "" : props.submitValue.note
  );
  const [categoryId, setCategoryId] = useState(
    props.submitValue.category == null ? 10 : props.submitValue.category
  );
  const [transactionTypeId, setTransactionTypeId] = useState(
    tranId(props.submitValue.destinationBank)
  );
  const transaction = () => {
    if (transactionTypeId == 14) {
      console.log("Doing top-up currency THB");
      Axios.put("https://fallenangel-bank-api.herokuapp.com/update/balance", {
        accountNum: fromAccount,
        balance: fromAccountBalance - Number(value),
      }).then(() => {
        console.log("Saving transaction");
        Axios.post(
          "https://fallenangel-bank-api.herokuapp.com/create/transaction",
          {
            fromAccount: fromAccount,
            toAccount: "9999999999",
            value: value,
            note: note,
            categoryId: categoryId,
            transactionTypeId: 14,
          }
        ).then(() => {
          console.log("props.userCurrency.length != 0");
          if (props.userCurrency.length == 0) {
            console.log("Trying post");
            Axios.post(
              "https://fallenangel-bank-api.herokuapp.com/create/customer/foreign/currencies",
              {
                citizenId: citizenId,
                currencyId: "THB",
                balanceCurrency: Number(value),
              }
            ).then(() => {
              console.log("Completed");
            });
          } else {
            console.log("Trying put");
            Axios.put(
              "https://fallenangel-bank-api.herokuapp.com/update/currency/balance",
              {
                citizenId: citizenId,
                currencyId: "THB",
                balanceCurrency:
                  props.userCurrency[0].balanceCurrency + Number(value),
              }
            ).then(() => {
              console.log("Completed");
            });
          }
        });
      });
    } else {
      console.log("Check to account valid");
      Axios.post(
        "https://fallenangel-bank-api.herokuapp.com/account/check",
        {
          accountNum: transactionTypeId == 5 ? toAccount : "9999999999",
        },
        {
          headers: { "Access-Control-Allow-Origin": "*" },
        }
      ).then((response) => {
        if (response) {
          console.log(
            response.data.length == 0 ? "9999999999" : response.data[0].balance
          );
          console.log("Update from account balance");
          Axios.put(
            "https://fallenangel-bank-api.herokuapp.com/update/balance",
            {
              accountNum: fromAccount,
              balance: fromAccountBalance - Number(value),
            },
            {
              headers: { "Access-Control-Allow-Origin": "*" },
            }
          )
            .then(() => {
              console.log("Update to account balance");
              Axios.put(
                "https://fallenangel-bank-api.herokuapp.com/update/balance",
                {
                  accountNum: toAccount,
                  balance: response.data[0].balance + Number(value),
                }
              );
            })
            .then(() => {
              console.log("Saving transaction");
              console.log("categoryId");
              Axios.post(
                "https://fallenangel-bank-api.herokuapp.com/create/transaction",
                {
                  fromAccount: fromAccount,
                  toAccount: toAccount,
                  value: value,
                  note: note,
                  categoryId: categoryId,
                  transactionTypeId: transactionTypeId,
                },
                {
                  headers: { "Access-Control-Allow-Origin": "*" },
                }
              ).then(() => {
                console.log("complete transfer");
              });
            });
        } else {
          console.log("No account in database");
        }
      });
    }
  };

  return (
    <div className={classes.theForm}>
      <div className={classes.inForm}>
        <div>
          <label htmlFor="fromAccount">From account </label>
          <input
            name="fromAccount"
            type="text"
            disabled="disabled"
            value={
              props.submitValue.fromAccount
                ? props.submitValue.fromAccount
                : props.data[0].accountNum
            }
          />
        </div>
        <div>
          <label htmlFor="toBank">Destination bank </label>
          <input
            name="toBank"
            type="text"
            disabled="disabled"
            value={
              props.submitValue.destinationBank
                ? props.submitValue.destinationBank
                : "Angel Bank"
            }
          />
        </div>
        <div>
          <label htmlFor="toAccount">Recipient account no. </label>
          <input
            name="toAccount"
            type="text"
            disabled="disabled"
            value={props.submitValue.toAccount}
          />
        </div>
        <div>
          <label htmlFor="value">Value </label>
          <input
            name="value"
            type="text"
            disabled="disabled"
            value={props.submitValue.value}
          />
        </div>{" "}
        <div>
          <label htmlFor="category">Transaction category </label>
          <input
            name="category"
            type="text"
            disabled="disabled"
            value={
              props.submitValue.category
                ? props.submitValue.category
                : "Uncategorized"
            }
          />
        </div>
        <div className={classes.note}>
          <label htmlFor="note">Note </label>
          <textarea
            name="note"
            type="text"
            disabled="disabled"
            value={props.submitValue.note == null ? "" : props.submitValue.note}
          />
        </div>
        <div className={classes.button}>
          <Button
            variant="contained"
            onClick={() => {
              props.setStep(props.step - 1);
            }}
            style={{ backgroundColor: "darkblue" }}
            type="submit"
          >
            Back
          </Button>
          <Button
            variant="contained"
            style={{ backgroundColor: "darkblue" }}
            type="submit"
            onClick={() => {
              props.setStep(props.step + 1);
              transaction();
            }}
          >
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserConfirmTransfer;
