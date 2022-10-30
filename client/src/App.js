import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
//import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import SignIn from "./pages/signIn/SignIn";
import SignUp from "./pages/signUp/SignUp";
import UnallowedModal from "./pages/unallowedModal/UnallowedModal";
import AppContent from "./components/appContent/AppContent";

import "./App.css";

function App() {
  const [continueData, setContinueData] = useState(null);
  const [resizedStyle, setResizedStyle] = useState(
    window.innerWidth < 1315 ? true : false
  );

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 1315) {
        setResizedStyle(true);
      } else {
        setResizedStyle(false);
      }
    }
    window.addEventListener("resize", handleResize);
  });

  /* const getTotalCurrency = (citizenId) => {
    Axios.post(
      "https://fallenangel-bank-api.herokuapp.com/customer/currency/balance",
      {
        headers: { "Access-Control-Allow-Origin": "*" },
      },
      {
        citizenId: citizenId,
      }
    ).then((res) => {
      console.log(res.data);
    });
  }; */

  return (
    <>
      <Router>
        <Topbar
          setContinueData={setContinueData}
          data={continueData ? continueData : null}
          resizedStyle={resizedStyle}
        />
        <UnallowedModal resizedStyle={resizedStyle} />
        <Route path="/signIn">
          <SignIn
            continueData={continueData}
            setContinueData={setContinueData}
          />
        </Route>
        <div className="container">
          <AppContent
            setContinueData={setContinueData}
            continueData={continueData}
          />
        </div>
        <Route path="/signup">
          <SignUp />
        </Route>
      </Router>
    </>
  );
}

export default App;
