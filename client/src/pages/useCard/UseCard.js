import { useState, useEffect } from "react";

import classes from "./useCard.module.scss";
import LinearProgress from "@mui/material/LinearProgress";
import UseCardInput from "../../components/useCard/useCardInput/UseCardInput";
import UseCardConfirm from "../../components/useCard/useCardConfirm/UseCardConfirm";
import UseCardSuccess from "../../components/useCard/useCardSuccess/UseCardSuccess";
import Axios from "axios";

const UseCard = (props) => {
  const [userCards, setUserCards] = useState([]);
  const [step, setStep] = useState(1);
  const [submitValue, setSubmitValue] = useState({
    fromCard: null,
    destinationBank: null,
    toAccount: null,
    value: null,
    category: null,
    note: null,
  });
  useEffect(() => {
    const getCards = (citizenId) => {
      Axios.post("https://fallenangel-bank-api.herokuapp.com/customer/card", {
        citizenId: citizenId,
      }).then((response) => {
        console.log(response.data);
        console.log(response.data[0].accountNum);
        setUserCards(response.data);
      });
    };
    getCards(props.continueData[0].citizenId);
  }, []);
  const linearProgressHandler = () => (100 * step) / 3;

  const transferPageHandler = () => {
    if (step == 1) {
      return (
        <UseCardInput
          data={userCards}
          step={step}
          setStep={setStep}
          submitValue={submitValue}
          setSubmitValue={setSubmitValue}
        />
      );
    } else if (step == 2) {
      return (
        <UseCardConfirm
          userCards={userCards}
          setData={setUserCards}
          step={step}
          setStep={setStep}
          submitValue={submitValue}
        />
      );
    } else {
      return (
        <UseCardSuccess
          data={userCards}
          step={step}
          setStep={setStep}
          submitValue={submitValue}
        />
      );
    }
  };
  return (
    <div className={classes.container}>
      <div className={classes.insideContainer}>
        {userCards && submitValue && transferPageHandler()}
        <div className={classes.progressBar}>
          <LinearProgress
            variant="determinate"
            value={linearProgressHandler()}
          />
        </div>
      </div>
    </div>
  );
};

export default UseCard;
