import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import { userData } from "../../dummyData";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import Swal from "sweetalert2";
import Axios from "axios";
import { useState, useEffect } from "react";
import { Eclipse } from "react-loading-io";

export default function Home(props) {
  const [txData, setTxData] = useState([]);
  const [txData2, setTxData2] = useState([]);
  const ChudRabeab = (tx) => {
    let x = [];
    tx.map((e, i) => {
      x.push({
        name: `ID: ${e.transactionId.toString()}`,
        Value: e.value,
      });
    });
    return x;
  };
  const [kycStatus, setKycStatus] = useState();
  const setKyc = () => {
    Axios.put("https://fallenangel-bank-api.herokuapp.com/update/kyc", {
      citizenId: props.continueData[0].citizenId,
    }).then((response) => {
      console.log("Set KYC complete");
      setKycStatus(1);
    });
  };

  const [userCurrency, setUserCurrency] = useState([]);
  const [userAccountData, setUserAccountData] = useState([]);
  useEffect(() => {
    const getTotalYearlyTx = () => {
      Axios.post("https://fallenangel-bank-api.herokuapp.com/transaction-all", {
        citizenId: props.continueData[0].citizenId,
      }).then((res) => {
        setTxData2(res.data);
        setTxData(ChudRabeab(res.data));
      });
    };
    const getkyc = () => {
      Axios.post("https://fallenangel-bank-api.herokuapp.com/check/kyc", {
        email: props.continueData[0].email,
        password: props.continueData[0].password,
      }).then((response) => {
        console.log("getkyc");
        if (response.data[0].kycStatus != 1) {
          Swal.fire({
            title: "Please do KYC",
            text: "Input your KYC code we send to your email",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "darkblue",
            input: "text",
            inputAttributes: {
              autocapitalize: "off",
            },
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Input it!",
          }).then((result) => {
            if (result.isConfirmed) {
              setKyc();
              Swal.fire(`${result.value}`, `Your KYC completed`, "success");
            } else {
              props.setContinueData(null);
            }
          });
        }
      });
    };
    const getAccounts = (citizenId) => {
      Axios.post("https://fallenangel-bank-api.herokuapp.com/wallet", {
        citizenId: citizenId,
      }).then((response) => {
        setUserAccountData(response.data);
      });
    };
    const getTotalCurrency = (citizenId) => {
      Axios.post(
        "https://fallenangel-bank-api.herokuapp.com/customer/currency/balance",
        {
          citizenId: citizenId,
        }
      ).then((res) => {
        setUserCurrency(res.data);
      });
    };
    getTotalYearlyTx();
    getkyc();
    getAccounts(props.continueData[0].citizenId);
    getTotalCurrency(props.continueData[0].citizenId);
  }, []);
  if (
    txData2.length != 0 &&
    txData.length != 0 &&
    userAccountData.length != 0
  ) {
    return (
      <>
        <div className="home">
          <FeaturedInfo
            userAccountData={userAccountData}
            userCurrency={userCurrency}
          />

          <Chart
            data={txData}
            title="Your transactions  "
            grid
            dataKey="Value"
          />
          <div className="homeWidgets">
            <WidgetLg data={txData2} />
          </div>
        </div>
      </>
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
        margin: "100px 0 0 0",
      }}
    >
      <Eclipse size={200} color={"#a8c0d3"} />
    </div>
  );
}
