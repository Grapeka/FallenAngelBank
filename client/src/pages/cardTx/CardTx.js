import TransactionList from "../../components/transaction/TransactionList";
import { useEffect } from "react";
import { useState } from "react";
import { Eclipse } from "react-loading-io";
import Axios from "axios";
const CardTx = (props) => {
  const [cardTx, setCardTx] = useState([]);
  const [citizenId, setCitizenId] = useState(props.continueData[0].citizenId);
  const [userCard, setUserCards] = useState([]);
  useEffect(() => {
    const getCardsTx = (cardId) => {
      Axios.post(
        "https://fallenangel-bank-api.herokuapp.com/transaction/card",
        {
          cardId: cardId,
        }
      ).then((res) => {
        setCardTx(res.data);
      });
    };
    const getCards = () => {
      Axios.post("https://fallenangel-bank-api.herokuapp.com/customer/card", {
        citizenId: citizenId,
      }).then((response) => {
        getCardsTx(response.data[0].cardId);
      });
    };

    getCards();
  }, []);
  const heads = [
    "Transaction ID",
    "From",
    "To",
    "Value",
    "Date and time",
    "Note",
  ];
  if (cardTx.length != 0) {
    return <TransactionList heads={heads} data={cardTx} />;
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

export default CardTx;
