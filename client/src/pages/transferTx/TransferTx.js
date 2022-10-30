import TransactionList from "../../components/transaction/TransactionList";
import Axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { Eclipse } from "react-loading-io";

const TransferTx = (props) => {
  const [citizenId, setCitizenId] = useState(props.continueData[0].citizenId);
  const [tx, setTx] = useState([]);
  useEffect(() => {
    const getTotalYearlyTx = () => {
      Axios.post("https://fallenangel-bank-api.herokuapp.com/transaction-all", {
        citizenId: citizenId,
      }).then((res) => {
        setTx(res.data);
      });
    };
    getTotalYearlyTx();
  }, []);

  const heads = [
    "Transaction ID",
    "From Acc.",
    "To Acc.",
    "Value",
    "Date and time",
    "Note",
  ];

  if (tx.length != 0) {
    return <TransactionList heads={heads} data={tx} />;
  } else {
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
  }
};

export default TransferTx;
