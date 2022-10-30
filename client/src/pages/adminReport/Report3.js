import TxListAdmin3 from "../../components/transaction/forAdmin/TxListAdmin3";
import classes from "./reportAdmin.module.scss";
import Axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Eclipse } from "react-loading-io";
const heads = ["Citizen ID", "Receive", "Spend", "Difference"];

const Report3 = () => {
  const [reportData, setReportData] = useState([]);
  useEffect(() => {
    const report3 = () => {
      Axios.get(
        "https://fallenangel-bank-api.herokuapp.com/report/income/spend/user"
      ).then((response) => {
        console.log(response.data);
        setReportData(response.data);
      });
    };

    report3();
  }, []);
  if (reportData.length != 0) {
    return (
      <div className={classes.container}>
        <TxListAdmin3 heads={heads} data={reportData} />
      </div>
    );
  }
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        margin: "100px 0 0 0",
      }}
    >
      <Eclipse size={200} color={"#a8c0d3"} />
    </div>
  );
};

export default Report3;
