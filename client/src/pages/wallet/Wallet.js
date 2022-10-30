import { useState, useEffect } from "react";
import Account from "../../components/account/Account";
import classes from "./wallet.module.scss";
import WalletFunction from "../../components/walletFunctions/WalletFunction";
import WalletInsight from "../../components/walletInsight/WalletInsight";
import Axios from "axios";
import { Eclipse } from "react-loading-io";

/* const ACCOUNT_DATA = [
  {
    accountNum: 4442221112,
    ownerName: "Hakeem Maka",
    balance: 100.3,
  },
  {
    accountNumber: 8920183721,
    ownerName: "Kaka Macro",
    balance: 6293827.75,
  },
  {
    accountNumber: 1662627381,
    ownerName: "Ronald Do",
    balance: 200000,
  },
  {
    accountNumber: 5281627381,
    ownerName: "Jaka Trump",
    balance: 29200.88,
  },
]; */

const Wallet = (props) => {
  const [data2, setData2] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [selectActiveId, setSelectActiveId] = useState(null);

  useEffect(() => {
    const getAccounts = (citizenId) => {
      Axios.post("https://fallenangel-bank-api.herokuapp.com/wallet", {
        citizenId: citizenId,
      }).then((response) => {
        console.log(response.data);
        setData2(response.data);
        setSelectedData(response.data[0]);
        setSelectActiveId(response.data[0].accountNum);
      });
    };
    getAccounts(props.continueData[0].citizenId);
  }, []);

  const handleSelect = (e) => {
    const x = data2.filter((element) => {
      console.log("e.target.id: " + e.target.id);
      console.log("element.accountNumber: " + element.accountNum);
      console.log(element.accountNum == e.target.id);

      return element.accountNum == e.target.id;
    });
    console.log("x:");
    console.log(x[0]);
    setSelectedData(x[0]);
    setSelectActiveId(e.target.id);
    console.log("update already");
    console.log(selectedData);
  };

  return (
    <>
      {data2 && selectedData && selectActiveId ? (
        <div className={classes.pageContainer}>
          <div className={classes.walletContainer}>
            {selectedData && <Account accountData={selectedData} />}
            <div className={classes.selectContainer}>
              <div className={classes.radioSelector} id="selector">
                {data2.map((e, i) => {
                  return (
                    <div
                      className={
                        selectActiveId == e.accountNum
                          ? classes.bullet + " " + classes.active
                          : classes.bullet
                      }
                      id={e.accountNum}
                      key={i}
                      onClick={handleSelect}
                    >
                      •
                    </div>
                  );
                })}
              </div>
            </div>
            <WalletFunction />
          </div>
          <div className={classes.insight}>
            <WalletInsight accountData={data2} />
          </div>
        </div>
      ) : (
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
      )}
    </>
  );
};

export default Wallet;
