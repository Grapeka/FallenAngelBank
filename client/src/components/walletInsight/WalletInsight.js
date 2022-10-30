import classes from "./walletInsight.module.scss";

import SpendAndReceiveLine from "../chart/spendAndReceiveLine/SpendAndReceiveLine";
const WalletInsight = (props) => {
  if (props.accountData) {
    let sum = 0;
    props.accountData.map((e) => {
      sum += e.balance;
    });
    return (
      <div className={classes.walletInsightContainer}>
        <div className={classes.totalBlance}>
          <h3 className={classes.head}>Total balance</h3>
          <h3 className={classes.number}>
            {new Intl.NumberFormat("ja-JP", {
              style: "currency",
              currency: "THB",
            }).format(sum)}
          </h3>
        </div>
        <div className={classes.chart}>
          <h3 className={classes.chartHead}>Spend and receive Mockup</h3>
          <SpendAndReceiveLine className={classes.chartComponent} />
        </div>
      </div>
    );
  }
  return null;
};

export default WalletInsight;
