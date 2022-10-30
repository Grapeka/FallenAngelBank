import TransactionList from "../../components/transaction/TransactionList";
import Axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { Eclipse } from "react-loading-io";
const SwapTx = (props) => {
  const removeNotWantField = (tx) => {
    tx.map((e, i) => {
      delete e.citizenId;
    });
    return tx;
  };
  const [citizenId, setCitizenId] = useState(props.continueData[0].citizenId);
  const [swTx, setSwTx] = useState([]);

  useEffect(() => {
    const transwap = () => {
      Axios.post(
        "https://fallenangel-bank-api.herokuapp.com/transaction/swap",
        {
          citizenId: citizenId,
        }
      ).then((response) => {
        setSwTx(response.data);
      });
    };
    transwap();
  }, []);
  const heads = [
    "Transaction ID",
    "From",
    "To",
    "Value",
    "Date and time",
    "Exchange rate",
  ];

  if (swTx.length != 0) {
    return <TransactionList heads={heads} data={removeNotWantField(swTx)} />;
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

export default SwapTx;
