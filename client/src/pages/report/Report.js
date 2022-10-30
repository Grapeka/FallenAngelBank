import MonthlySpending from "../../components/chart/monthlySpend/MonthlySpending";
import SpendAndReceive from "../../components/chart/spendAndReceive/SpendAndReceive";
import CategorySpending from "../../components/chart/categorySpending/CategorySpending";
import classes from "./report.module.scss";

const Report = () => {
  return (
    <div className={classes.reportContainer}>
      <div className={classes.reportChunk}>
        <div className={classes.reportEach}>
          <h3>Monthly spedning</h3>
          <MonthlySpending />
        </div>
        <div className={classes.reportEach}>
          <h3>Spend and receive</h3>
          <SpendAndReceive />
        </div>
      </div>
      <div className={classes.reportChunk}>
        <div className={classes.reportEach}>
          <h3>Category spending</h3>
          <CategorySpending />
        </div>
        <div className={classes.reportEach}>
          <h3>Category spending</h3>
          <CategorySpending />
        </div>
        <div className={classes.reportEach}>
          <h3>Category spending</h3>
          <CategorySpending />
        </div>
      </div>
    </div>
  );
};

export default Report;
