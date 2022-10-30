import TxListAdmin from "../../components/transaction/forAdmin/TxListAdmin";
import classes from "./reportAdmin.module.scss";
import Axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Eclipse } from "react-loading-io";
const heads = ["Citizen ID", "Number of currencies", "Number of accounts"];

const Report1 = () => {
  const [report1Data, setReport1Data] = useState([]);
  useEffect(() => {
    const report1 = () => {
      Axios.get(
        "https://fallenangel-bank-api.herokuapp.com/report/citizenId/account/currency"
      ).then((response) => {
        console.log(response.data);
        setReport1Data(response.data);
      });
    };
    report1();
  }, []);
  if (report1Data.length != 0) {
    return (
      <div className={classes.container}>
        <TxListAdmin heads={heads} data={report1Data} />
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

export default Report1;
