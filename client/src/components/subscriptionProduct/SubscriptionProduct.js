import classes from "./subscriptionProduct.module.scss";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import Swal from "sweetalert2";
import Axios from "axios";
import { useState, useEffect } from "react";
import { Eclipse } from "react-loading-io";
const SubscriptionProduct = (props) => {
  console.log(props.systemProducts);
  console.log(props.usedCard.cardId);
  const [cardId, setCardId] = useState(props.usedCard.cardId);
  const [userProducts, setUserProducts] = useState([]);

  function getDifferenceProduct(array1, array2) {
    console.log("getDifferenceProduct");
    console.log("arr1");
    console.log(array1);
    console.log("arr2");
    console.log(array2);
    return array1.filter((object1) => {
      return !array2.some((object2) => {
        return object1.subProductId == object2.subProductId;
      });
    });
  }

  useEffect(() => {
    const checkUserProduct = () => {
      console.log("Checking product");
      Axios.post(
        "https://fallenangel-bank-api.herokuapp.com/card/subscription",
        {
          cardId: cardId,
        }
      ).then((response) => {
        console.log(response.data);
        setUserProducts(response.data);
      });
    };
    checkUserProduct(cardId);
  }, []);

  const subproduct = (subProductId) => {
    console.log("Sub product");
    Axios.post(
      "https://fallenangel-bank-api.herokuapp.com/create/card/subscription",
      {
        cardId: cardId,
        subProductId: subProductId,
      }
    ).then(() => {
      console.log("complete");
    });
  };

  if (props.systemProducts.length != 0) {
    console.log("show");
    console.log(getDifferenceProduct(props.systemProducts, userProducts));
    console.log(props.systemProducts);
    console.log(userProducts);
    return (
      <div className={classes.subProductContainer}>
        {getDifferenceProduct(props.systemProducts, userProducts).map(
          (e, i) => {
            return (
              <div
                id={e.subProductId}
                key={i}
                className={classes.eachProduct}
                onClick={() => {
                  console.log(e);
                  Swal.fire({
                    title: `Are you sure to subscribe ${e.productName} with ${props.usedCard.cardId}  ?`,
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes",
                    confirmButtonColor: "darkblue",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      Swal.fire({
                        title: "Subscribed",
                        icon: "success",
                        confirmButtonColor: "#3085d6",
                        confirmButtonColor: "darkblue",
                      });
                      subproduct(e.subProductId);
                    }
                  });
                }}
              >
                <div className={classes.icon}>
                  <div className={classes.iconBox}>
                    <ProductionQuantityLimitsIcon />
                  </div>
                </div>
                <div className={classes.detail}>
                  <h3 className={classes.detailHead}>{e.productName}</h3>
                  <span className={classes.detailText}>Wonderful product</span>
                </div>
                <div className={classes.price}>
                  <h3>
                    {new Intl.NumberFormat("ja-JP", {
                      style: "currency",
                      currency: "THB",
                    }).format(e.monthlyPay)}
                  </h3>
                  <span className={classes.duration}>/ month</span>
                </div>
              </div>
            );
          }
        )}
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
        margin: "50px 0 0 0",
      }}
    >
      <Eclipse size={200} color={"#a8c0d3"} />
    </div>
  );
};

export default SubscriptionProduct;
