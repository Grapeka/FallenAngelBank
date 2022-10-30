import classes from "./useCardConfirm.module.scss";
import Button from "@mui/material/Button";
import Axios from "axios";
import { useState } from "react";
const UseCardConfirm = (props) => {
  console.log("useCard");
  console.log(props.userCards);
  const [cardId, setCardId] = useState(
    props.submitValue.fromCard == null
      ? props.userCards[0].cardId
      : props.submitValue.fromCard
  );
  const [value, setValue] = useState(props.submitValue.value);
  const [currentLimit, setCurrentLimit] = useState(
    props.submitValue.currentLimit == null
      ? props.userCards[0].currentLimit
      : props.submitValue.currentLimit
  );
  const [note, setNote] = useState(
    props.submitValue.note == null ? "" : props.submitValue.note
  );
  const [categoryId, setCategoryId] = useState(
    props.submitValue.category == null ? "10" : props.submitValue.category
  );
  const [transactionTypeId, setTransactionTypeId] = useState(
    props.submitValue.toAccount == null ? "11" : props.submitValue.toAccount
  );

  const creditTransaction = () => {
    console.log("Update current limit");
    Axios.put(
      "https://fallenangel-bank-api.herokuapp.com/update/card/currentlimit",
      {
        cardId: cardId,
        currentLimit: currentLimit - Number(value),
      }
    ).then((response) => {
      console.log("Saving credit transaction");
      Axios.post(
        "https://fallenangel-bank-api.herokuapp.com/create/transaction/card",
        {
          fromCreditCardId: cardId,
          value: value,
          note: note,
          categoryId: categoryId,
          transactionTypeId: 10,
          PaymentDueDate: "2024-05-17",
          InstallmentPlan: "5",
          Interest: "15%",
        }
      ).then(() => {
        console.log("complete credit transaction");
      });
    });
  };
  console.log(props.submitValue);
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
                : props.userCards[0].cardId
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
              creditTransaction();
            }}
          >
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UseCardConfirm;
