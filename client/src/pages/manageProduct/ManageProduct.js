import { useState, useEffect } from "react";
import ManageProductInput from "../../components/manageProduct/manageProductInput/ManageProductInput";
import LinearProgress from "@mui/material/LinearProgress";
import classes from "./manageProduct.module.scss";
import Swal from "sweetalert2";
const ManageProduct = () => {
  const [subProductId, setSubProductId] = useState(
    Math.floor(Math.random() * 10000000000).toString()
  );
  const [productName, setProductName] = useState(null);
  const [monthlyPay, setMonthlyPay] = useState(null);
  const [step, setStep] = useState(1);
  const linearProgressHandler = () => (100 * step) / 2;
  const pageController = () => {
    if (step == 2) {
      setSubProductId(null);
      setProductName(null);
      setMonthlyPay(null);
      setTimeout(() => {
        setStep(1);
      }, 2200);

      Swal.fire({
        title: "Product created",
        text: "Click the button to close!",
        icon: "success",
        showCancelButton: false,
        confirmButtonColor: "darkblue",
        confirmButtonText: "OK",
      });
    }
  };

  useEffect(() => {
    console.log("Use effect");
    pageController();
  }, [step]);
  return (
    <div className={classes.myContainer}>
      <div className={classes.insideContainer}>
        <ManageProductInput
          step={step}
          setStep={setStep}
          subProductId={subProductId}
          productName={productName}
          monthlyPay={monthlyPay}
        />
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

export default ManageProduct;
