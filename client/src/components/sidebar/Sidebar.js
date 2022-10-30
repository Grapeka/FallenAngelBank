import { useState } from "react";
import classes from "./sidebar.module.scss";
import {
  LineStyle,
  BarChart,
  SwapHoriz,
  History,
  CreditCard,
  AccountBalanceWallet,
} from "@material-ui/icons";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import AddCardIcon from "@mui/icons-material/AddCard";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import AddchartIcon from "@mui/icons-material/Addchart";
import { Link } from "react-router-dom";

export default function Sidebar(props) {
  const handleRole = () => {
    if (props.continueData[0].role == "User") {
      return 1;
    }
    if (props.continueData[0].role == "Admin") {
      return 1;
    }
    if (props.continueData[0].role == "Coordinator") {
      return 14;
    }
  };
  const [selectedId, setSelectedId] = useState(handleRole());
  const handleActive = (e) => {
    setSelectedId(e.target.id);
  };
  const generateLink = (to, name, Icon, id) => {
    return (
      <Link to={`${to}`} className={"link"}>
        <li
          id={id}
          className={
            selectedId == id
              ? classes.sidebarListItem + " " + classes.active
              : classes.sidebarListItem
          }
          onClick={handleActive}
        >
          {Icon}
          {name}
        </li>
      </Link>
    );
  };

  const displaySidebarByRole = () => {
    console.log(props.continueData[0].role);
    if (props.continueData[0].role === "User") {
      return (
        <div>
          <div className={classes.sidebarMenu}>
            <h3 className={classes.sidebarTitle}>Main</h3>
            <ul className={classes.sidebarList}>
              {generateLink(
                "/home",
                "Home",
                <HomeWorkIcon className={classes.sidebarIcon} />,
                1
              )}
              {generateLink(
                "/wallets",
                "Wallet",
                <AccountBalanceWallet className={classes.sidebarIcon} />,
                2
              )}
              {generateLink(
                "/transfer",
                "Transfer",
                <SwapHoriz className={classes.sidebarIcon} />,
                3
              )}
              {generateLink(
                "/transactions",
                "Transactions",
                <History className={classes.sidebarIcon} />,
                4
              )}
              {generateLink(
                "/userAnalysis",
                "Analysis",
                <BarChart className={classes.sidebarIcon} />,
                5.5
              )}
              {generateLink(
                "/reports",
                "Reports",
                <BarChart className={classes.sidebarIcon} />,
                5
              )}
            </ul>
          </div>
          <div className={classes.sidebarMenu}>
            <h3 className={classes.sidebarTitle}>Crad & credit</h3>
            <ul className={classes.sidebarList}>
              {generateLink(
                "/card",
                "Card",
                <CreditCard className={classes.sidebarIcon} />,
                6
              )}
              {generateLink(
                "/useCard",
                "Use credit",
                <AddCardIcon className={classes.sidebarIcon} />,
                7
              )}
              {generateLink(
                "/cardTransactions",
                "Transactions",
                <History className={classes.sidebarIcon} />,
                8
              )}
            </ul>
          </div>
          <div className={classes.sidebarMenu}>
            <h3 className={classes.sidebarTitle}>Currency exchange</h3>
            <ul className={classes.sidebarList}>
              {generateLink(
                "/swap",
                "Swap",
                <CurrencyExchangeIcon className={classes.sidebarIcon} />,
                9
              )}
              {generateLink(
                "/swapTransactions",
                "Transactions",
                <History className={classes.sidebarIcon} />,
                10
              )}
            </ul>
          </div>
        </div>
      );
    }

    if (props.continueData[0].role === "Admin") {
      return (
        <div>
          <div className={classes.sidebarMenu}>
            <h3 className={classes.sidebarTitle}>Admin</h3>
            <ul className={classes.sidebarList}>
              {generateLink(
                "/report1",
                "User info",
                <LineStyle className={classes.sidebarIcon} />,
                11
              )}
              {generateLink(
                "/report2",
                "Credit card",
                <ProductionQuantityLimitsIcon
                  className={classes.sidebarIcon}
                />,
                12
              )}
              {generateLink(
                "/report3",
                "Difference",
                <AddchartIcon className={classes.sidebarIcon} />,
                13
              )}
            </ul>
          </div>
        </div>
      );
    }
    if (props.continueData[0].role === "Coordinator") {
      return (
        <div>
          <div className={classes.sidebarMenu}>
            <h3 className={classes.sidebarTitle}>Coordinator</h3>
            <ul className={classes.sidebarList}>
              {generateLink(
                "/manageProduct",
                "Products",
                <ProductionQuantityLimitsIcon
                  className={classes.sidebarIcon}
                />,
                14
              )}
            </ul>
          </div>
        </div>
      );
    }
  };

  return (
    <div className={classes.sidebar}>
      <div className={classes.sidebarWrapper}>{displaySidebarByRole()}</div>
    </div>
  );
}
