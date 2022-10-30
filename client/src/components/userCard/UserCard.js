import classes from "./userCard.module.scss";

const UserCard = (props) => {
  console.log(props.cardData);
  const formatCardNumber = (cNum) => {
    cNum = cNum.toString();
    console.log(cNum.length);
    const a = cNum.slice(0, 4);
    const b = cNum.slice(4, 8);
    const c = cNum.slice(8, 12);
    const d = cNum.slice(12, 16);
    return `${a}-${b}-${c}-${d}`;
  };
  return (
    <div className={classes.userCardContainer}>
      <div className={classes.cardInfo}>
        <div className={classes.logo}></div>
        <div className={classes.cardNumber}>
          {formatCardNumber(props.cardData.cardId)}
        </div>
        <div className={classes.security}>
          <span>12/24</span>
          <span>CVV: {props.cardData.cvv}</span>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
