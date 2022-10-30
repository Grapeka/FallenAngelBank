import classes from "./swapComplete.module.scss";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { AssignmentTurnedIn, ArrowForward } from "@material-ui/icons";
import timestamp from "time-stamp";
const SwapComplete = (props) => {
  return (
    <div className={classes.container}>
      <div className={classes.status}>
        <AssignmentTurnedIn className={classes.symbol} />
        <h3 className={classes.head}>Swap successful</h3>
      </div>
      <div className={classes.txDetails}>
        <div className={classes.flow}>
          <div className={classes.from}>
            <h4>From</h4>
            <span>{props.from}</span>
          </div>
          <div className={classes.flowSymbol}>
            <ArrowForward />
          </div>
          <div className={classes.to}>
            <h4>To</h4>
            <span>{props.to}</span>
          </div>
        </div>
        <div className={classes.border}></div>
        <div className={classes.minorDetails}>
          <div className={classes.eachDetail}>
            <h4>TransactionID</h4>
            <span>xxxxxxxxxx</span>
          </div>
          <div className={classes.eachDetail}>
            <h4>Amount</h4>
            <span>{props.am}</span>
          </div>
          <div className={classes.eachDetail}>
            <h4>Exchange rate</h4>
            <span>{props.ex}</span>
          </div>
          <div className={classes.eachDetail}>
            <h4>Fee</h4>
            <span>0.00</span>
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
          Back to swap
        </Button>
        <Link to="/swapTransactions" style={{ width: "100%" }}>
          <Button variant="contained" style={{ backgroundColor: "darkblue" }}>
            View history
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default SwapComplete;
