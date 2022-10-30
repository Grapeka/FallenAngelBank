import { useState, useEffect } from "react";
import classes from "./card.module.scss";
import Button from "@mui/material/Button";
import UserCard from "../../components/userCard/UserCard";
import SubscriptionProduct from "../../components/subscriptionProduct/SubscriptionProduct";
import CategorySpending from "../../components/chart/categorySpending/CategorySpending";
import SpendAverageLine from "../../components/chart/spendAverageLine/SpendAverageLine";
import { ArrowForwardIos } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { Eclipse } from "react-loading-io";
import Axios from "axios";

const Card = (props) => {
  const [systemProducts, setSystemProducts] = useState([]);
  const [userCards, setUserCards] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [selectActiveId, setSelectActiveId] = useState(null);
  const [userProducts, setUserProducts] = useState([]);

  useEffect(() => {
    const getCards = (citizenId) => {
      Axios.post("https://fallenangel-bank-api.herokuapp.com/customer/card", {
        citizenId: citizenId,
      }).then((response) => {
        setUserCards(response.data);
        setSelectedData(response.data[0]);
        setSelectActiveId(response.data[0].cardId);
        checkUserProduct(response.data[0].cardId);
      });
    };
    const getProducts = () => {
      Axios.get("https://fallenangel-bank-api.herokuapp.com/list/product").then(
        (response) => {
          console.log("System product");
          console.log(response.data);
          setSystemProducts(response.data);
        }
      );
    };
    const checkUserProduct = (cardId) => {
      console.log("Checking product");
      Axios.post(
        "https://fallenangel-bank-api.herokuapp.com/card/subscription",
        {
          cardId: cardId,
        }
      ).then((response) => {
        console.log("User Prudc");
        console.log(response.data);
        setUserProducts(response.data);
      });
    };
    getProducts();
    getCards(props.continueData[0].citizenId);
  }, []);
  const handleSelect = (e) => {
    const x = userCards.filter((element) => {
      console.log("e.target.id: " + e.target.id);
      console.log("element.cardId: " + element.cardId);
      console.log(element.cardId == e.target.id);

      return element.cardId == e.target.id;
    })[0];

    setSelectedData(x);
    setSelectActiveId(e.target.id);
    console.log("update already");
    console.log(selectedData);
  };

  return (
    <>
      {userProducts && userCards && selectedData && selectActiveId ? (
        <div className={classes.cardContainer}>
          <div className={classes.leftContainer}>
            <div className={classes.coupleWidgets}>
              <div
                className={classes.cardExpenseCategory + " " + classes.widget}
              >
                <h3 className={classes.head}>Expenses by category</h3>
                <CategorySpending userProducts={userProducts} />
              </div>
              <div className={classes.productBox + " " + classes.widget}>
                <h3 className={classes.head}>Subscription products</h3>
                <div className={classes.products}>
                  <SubscriptionProduct
                    systemProducts={systemProducts}
                    userAllCards={userCards}
                    usedCard={selectedData}
                  />
                </div>
              </div>
            </div>
            <div className={classes.landscapeWidget + " " + classes.widget}>
              <SpendAverageLine />
            </div>
          </div>

          <div className={classes.rightContainer + " " + classes.widget}>
            <h1 className={classes.head}>My cards</h1>
            {selectedData && <UserCard cardData={selectedData} />}
            <div className={classes.selectContainer}>
              {userCards && (
                <div className={classes.radioSelector} id="selector">
                  {userCards.map((e, i) => {
                    return (
                      <div
                        className={
                          selectActiveId == e.cardId
                            ? classes.bullet + " " + classes.active
                            : classes.bullet
                        }
                        id={e.cardId}
                        key={i}
                        onClick={handleSelect}
                      >
                        •
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            {selectedData && (
              <div className={classes.numberInformation}>
                <div className={classes.bundledAccountBox}>
                  <h3>Bundled account: </h3>
                  <h3>{selectedData.accountNum}</h3>
                </div>
                <div>
                  <h3>Citizen ID: </h3>
                  <h3 className={classes.bundledAccountBalance}>
                    {selectedData.citizenId}
                  </h3>
                </div>
              </div>
            )}
            {selectedData && (
              <div className={classes.statusInformation}>
                <div>
                  <h3 className={classes.moreDetailHead}>Information</h3>
                  <h3 className={classes.grey}>
                    More details <ArrowForwardIos className={classes.icon} />
                  </h3>
                </div>
                <div>
                  <h3>Card level: </h3>
                  <h3>{selectedData.cardType}</h3>
                </div>
                <div>
                  <h3>Current limit: </h3>
                  <h3>
                    {new Intl.NumberFormat("ja-JP", {
                      style: "currency",
                      currency: "THB",
                    }).format(selectedData.currentLimit)}
                  </h3>
                </div>
              </div>
            )}

            <div className={classes.buttonBox}>
              <Button
                variant="contained"
                style={{ backgroundColor: "darkblue" }}
              >
                <Link
                  style={{ color: "white", textDecoration: "none" }}
                  to="/useCard"
                >
                  Use credit
                </Link>
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className={classes.cardContainerLoading}>
          <Eclipse size={200} color={"#a8c0d3"} />
        </div>
      )}
    </>
  );
};

export default Card;
