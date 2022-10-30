import classes from "./walletFunction.module.scss";
import { SwapHoriz, History, InsertChart } from "@material-ui/icons";
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

const WalletFunction = () => {
  let history = useHistory();
  return (
    <div className={classes.functionContainer}>
      <Link className={classes.eachFunction} to="/transfer">
        <div className={classes.functionButton}>
          <SwapHoriz className={classes.icon} />
        </div>
        <h3>Transfer</h3>
      </Link>
      <Link to="/transactions" className={classes.eachFunction}>
        <div className={classes.functionButton}>
          <History className={classes.icon} />
        </div>
        <h3>History</h3>
      </Link>
      <Link to="/reports" className={classes.eachFunction}>
        <div className={classes.functionButton}>
          <InsertChart className={classes.icon} />
        </div>
        <h3>Insight</h3>
      </Link>
    </div>
  );
};

export default WalletFunction;
