import React from "react";
import "./topbar.css";
import { useHistory } from "react-router-dom";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";

export default function Topbar(props) {
  console.log(props.data);
  let history = useHistory();
  return (
    <div
      style={{
        display: `${props.resizedStyle == false ? "inline-block" : "none"}`,
      }}
      className="topbar"
    >
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">Angel Bank</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">0</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">0</span>
          </div>
          <div className="topbarIconContainer">
            {props.data != null ? (
              <>
                <h3>Hi, {props.data[0].fName}</h3>
                <h3
                  id="logut111"
                  onClick={() => {
                    props.setContinueData(null);
                    history.push("signUp");
                  }}
                >
                  Logout
                </h3>
              </>
            ) : (
              <Settings />
            )}
          </div>
          <img
            style={{ objectFit: "cover" }}
            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
            alt=""
            className="topAvatar"
          />
        </div>
      </div>
    </div>
  );
}
