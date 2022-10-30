import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";
//Main
import Home from "../../pages/home/Home";
import Wallet from "../../pages/wallet/Wallet";
import Report from "../../pages/report/Report";
import Card from "../../pages/card/Card";
import Transfer from "../../pages/transfer/Transfer";
import TransferTx from "../../pages/transferTx/TransferTx";
import UserReport1 from "../../pages/userReport/UserReport1";
//Card
import UserCard from "../userCard/UserCard";
import UseCard from "../../pages/useCard/UseCard";
import CardTx from "../../pages/cardTx/CardTx";
//Exchange
import Swap from "../../pages/swap/Swap";
import SwapTx from "../../pages/swapTx/SwapTx";
//Admin
import ManageProduct from "../../pages/manageProduct/ManageProduct";
import Report1 from "../../pages/adminReport/Report1";
import Report2 from "../../pages/adminReport/Report2";
import Report3 from "../../pages/adminReport/Report3";

import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { useState } from "react";
const AppContent = (props) => {
  if (props.continueData != null && props.setContinueData != null) {
    return (
      <>
        <Sidebar continueData={props.continueData} />
        <Switch>
          <Route exact path="/home">
            <Home
              setContinueData={props.setContinueData}
              continueData={props.continueData}
            />
          </Route>
          <Route path="/wallets">
            <Wallet continueData={props.continueData} />
          </Route>
          <Route path="/transfer">
            <Transfer continueData={props.continueData} />
          </Route>
          <Route path="/transactions">
            <TransferTx continueData={props.continueData} />
          </Route>
          <Route path="/reports">
            <Report />
          </Route>
          <Route path="/userAnalysis">
            <UserReport1 continueData={props.continueData} />
          </Route>
          <Route path="/card">
            <Card continueData={props.continueData} />
          </Route>
          <Route path="/useCard">
            <UseCard continueData={props.continueData} />
          </Route>
          <Route path="/cardTransactions">
            <CardTx continueData={props.continueData} />
          </Route>
          <Route path="/swap">
            <Swap continueData={props.continueData} />
          </Route>
          <Route path="/report1">
            <Report1 />
          </Route>
          <Route path="/report2">
            <Report2 />
          </Route>
          <Route path="/report3">
            <Report3 />
          </Route>
          <Route path="/swapTransactions">
            <SwapTx continueData={props.continueData} />
          </Route>
          <Route path="/manageProduct">
            <ManageProduct />
          </Route>
        </Switch>
      </>
    );
  }
  return <Redirect to="/signIn" />;
};

export default AppContent;
