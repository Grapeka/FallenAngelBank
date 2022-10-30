import classes from "./useCardSuccess.module.scss";
import Button from "@mui/material/Button";

import { Link } from "react-router-dom";
import { AssignmentTurnedIn, ArrowForward } from "@material-ui/icons";
import timestamp from "time-stamp";

const UseCardSuccess = (props) => {
  console.log(props.submitValue);
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
              {props.submitValue.fromCard
                ? props.submitValue.fromCard
                : props.data[0].cardId}
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
            <span>xxxxxxxxxx</span>
          </div>
          <div className={classes.eachDetail}>
            <h4>Value</h4>
            <span>{props.submitValue.value}</span>
          </div>
          <div className={classes.eachDetail}>
            <h4>Payment due date</h4>
            <span>2023/05/17</span>
          </div>
          <div className={classes.eachDetail}>
            <h4>Interest</h4>
            <span>15%</span>
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
          Back to use credit
        </Button>
        <Link to="/cardTransactions" style={{ width: "100%" }}>
          <Button variant="contained" style={{ backgroundColor: "darkblue" }}>
            View history
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default UseCardSuccess;
