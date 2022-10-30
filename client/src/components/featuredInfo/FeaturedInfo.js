import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";

import { Eclipse } from "react-loading-io";
export default function FeaturedInfo(props) {
  if (props.userAccountData && props.userCurrency) {
    let sumAc = 0;
    props.userAccountData.map((e) => {
      sumAc += e.balance;
    });

    let amountCr = 0;
    props.userCurrency.map((e) => {
      amountCr++;
    });
    return (
      <div className="featured">
        <div className="featuredItem">
          <span className="featuredTitle">Total balance</span>
          <div className="featuredMoneyContainer">
            <span className="featuredMoney">
              {new Intl.NumberFormat("ja-JP", {
                style: "currency",
                currency: "THB",
              }).format(sumAc)}
            </span>
            <span className="featuredMoneyRate">
              +0 <ArrowDownward className="featuredIcon negative" />
            </span>
          </div>
          <span className="featuredSub">Compared to last month</span>
        </div>

        <div className="featuredItem">
          <span className="featuredTitle">
            Foreign {amountCr == 0 || 1 ? "currency" : "currencies"}
          </span>
          <div className="featuredMoneyContainer">
            <span className="featuredMoney">
              {amountCr} {amountCr == 0 || 1 ? "currency" : "currencies"}
            </span>
            <span className="featuredMoneyRate">
              +0 <ArrowUpward className="featuredIcon positive" />
            </span>
          </div>
          <span className="featuredSub">Compared to last month</span>
        </div>
      </div>
    );
  }
  return (
    <div className="featuredLoading">
      <Eclipse size={130} color="darkblue" className="featuredItemLoading" />
      <Eclipse size={130} color="darkblue" className="featuredItemLoading" />
    </div>
  );
}
