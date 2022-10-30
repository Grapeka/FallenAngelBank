import TxListAdmin from "../../components/transaction/forAdmin/TxListAdmin";
import { useState, useEffect } from "react";
import Axios from "axios";
import { Eclipse } from "react-loading-io";
const heads = ["Account", "Transaction category", "Accumulative spend"];
const report1Datax = [
  {
    userAccount: "4827190022",
    txType: "Transfer",
    accumulative: 800.5,
  },
  {
    userAccount: "1027182722",
    txType: "Transfer",
    accumulative: 500.1,
  },
  {
    userAccount: "9872390022",
    txType: "Transfer",
    accumulative: 1200.4,
  },
];
const UserReport1 = (props) => {
  const [report1Data, setReport1Data] = useState([]);
  const [citizenId, setSelectedId] = useState(props.continueData[0].citizenId);
  useEffect(() => {
    const report1 = () => {
      Axios.post(
        "https://fallenangel-bank-api.herokuapp.com/report/citizenid/spend/month",
        {
          citizenId: citizenId,
        }
      ).then((response) => {
        console.log(response.data);
        setReport1Data(response.data);
      });
    };
    report1();
  }, []);
  if (report1Data.length != 0) {
    return (
      <div style={{ width: "100%" }}>
        <TxListAdmin heads={heads} data={report1Data} />
      </div>
    );
  }
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Eclipse size={200} color={"#a8c0d3"} />
    </div>
  );
};

export default UserReport1;
