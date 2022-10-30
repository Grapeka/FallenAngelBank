import { useState } from "react";
import classes from "./account.module.scss";

const Account = (props) => {
  const formatAccountNumber = (aNum) => {
    aNum = aNum.toString();
    const a = aNum.slice(0, 3);
    const b = aNum.slice(3, 6);
    const c = aNum.slice(6, 9);
    const d = aNum.slice(9, 10);
    return `${a}-${b}-${c}-${d}`;
  };
  if (props.accountData) {
    return (
      <div className={classes.accountContainer}>
        <div className={classes.accountInformation}>
          <div className={classes.balance}>
            <h3>
              {new Intl.NumberFormat("ja-JP", {
                style: "currency",
                currency: "THB",
              }).format(props.accountData.balance)}
            </h3>
          </div>
          <div className={classes.accountNumber}>
            <h3>
              Account: {formatAccountNumber(props.accountData.accountNum)}
            </h3>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default Account;

/*
      <div className={classes.accountInformation}>
        <div className={classes.balance}>
          <h3>
            {new Intl.NumberFormat("ja-JP", {
              style: "currency",
              currency: "THB",
            }).format(props.accountData[0].balance)}
          </h3>
        </div>
        <div className={classes.accountNumber}>
          <h3>
            Account: {formatAccountNumber(props.accountData[0].accountNum)}
          </h3>
        </div>
      </div>*/
