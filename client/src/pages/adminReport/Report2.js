import TxListAdmin2 from "../../components/transaction/forAdmin/TxListAdmin2";
import classes from "./reportAdmin.module.scss";
import Axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Eclipse } from "react-loading-io";
const heads = ["Card number", "Total used", "Monthly limit", "Percent used"];

const Report2 = () => {
  const [reportData, setReportData] = useState([]);
  useEffect(() => {
    const report2 = () => {
      Axios.get(
        "https://fallenangel-bank-api.herokuapp.com/report/admin/card/all-user/spend"
      ).then((response) => {
        console.log(response.data);
        setReportData(response.data);
      });
    };

    report2();
  }, []);
  if (reportData.length != 0) {
    return (
      <div className={classes.container}>
        <TxListAdmin2 heads={heads} data={reportData} />
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

export default Report2;
