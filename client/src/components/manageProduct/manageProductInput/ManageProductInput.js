import Button from "@mui/material/Button";
import classes from "./manageProductInput.module.scss";
import Axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

const ManageProductInput = (props) => {
  const [subProductId, setSubProductId] = useState(
    Math.floor(Math.random() * 1000000000000000).toString()
  );
  const [productName, setProductName] = useState(props.productName);
  const [monthlyPay, setMonthlyPay] = useState(props.monthlyPay);

  const addproduct = () => {
    console.log("Adding product");
    Axios.post("https://fallenangel-bank-api.herokuapp.com/check/product", {
      subProductId: subProductId,
    }).then((response) => {
      if (response.data.length != 0) {
        console.log("response");
        console.log(response.data);
        console.log("Item in database already");
      } else {
        console.log("Inserting product");
        Axios.post(
          "https://fallenangel-bank-api.herokuapp.com/create/product",
          {
            subProductId: subProductId,
            monthlyPay: monthlyPay,
            productName: productName,
          }
        ).then((response) => {
          setSubProductId(
            Math.floor(Math.random() * 1000000000000000).toString()
          );
          console.log("inserted");
        });
      }
    });
  };

  const handleSubmit = (event) => {
    console.log(subProductId);
    console.log(productName);
    console.log(monthlyPay);
    props.setStep(props.step + 1);
    addproduct();
    //addproduct();
    event.preventDefault();
  };
  return (
    <form onSubmit={handleSubmit} className={classes.theForm}>
      <div className={classes.inForm}>
        <div>
          <label htmlFor="productId">Product Id</label>
          <input
            autoComplete="off"
            type="text"
            name="productId"
            disabled
            placeholder="Auto gernerated"
            value=""
          />
        </div>

        <div>
          <label htmlFor="productName">Product name</label>
          <input
            autoComplete="off"
            type="text"
            name="productName"
            onChange={(event) => setProductName(event.target.value)}
            placeholder="Name..."
            required
          />
        </div>

        <div>
          <label htmlFor="monthlyPay">Monthly pay</label>
          <input
            autoComplete="off"
            type="text"
            name="monthlyPay"
            onChange={(event) => setMonthlyPay(event.target.value)}
            placeholder="THB"
            required
          />
        </div>
      </div>
      <div className={classes.button}>
        <Button
          variant="contained"
          color="secondary"
          style={{ backgroundColor: "darkblue" }}
          type="submit"
        >
          Add product
        </Button>
      </div>
    </form>
  );
};

export default ManageProductInput;
