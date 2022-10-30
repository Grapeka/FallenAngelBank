import React, { useState } from "react";
import LoginFrom from "../../components/login/LoginForm";
import Register from "../../components/login/Register";
import Axios from "axios";

const TestPage = () => {
  const [user1, setuser1] = useState({
    prefix: "",
    fName: "",
    lName: "",
    phoneNumber: "",
    gender: "",
    dob: "",
    citizenid: "",
    email: "",
    password: "",
    address: "",
    pin: "",
  });

  const adminUser = {
    email: "admin01@admin.com",
    password: "admin123",
    Prefix: "นาย",
    FName: "admin",
    LName: "admin01",
    Phone: "0999999999",
    Gender: "ชาย",
    DOB: "",
    CitizenID: "1101805594280",
    Email: "admin01@admin.com",
    Password: "admin123",
    Address: "",
  };

  const [user, setUser] = useState({ name: "", email: "" });
  const [error, setError] = useState("");
  const [errorRegis, setErrorRegis] = useState("");

  const [Member, setMember] = useState({
    Prefix: "",
    FName: "",
    LName: "",
    Phone: "",
    Gender: "",
    DOB: "",
    CitizenID: "",
    Email: "",
    Password: "",
    Address: "",
  });

  const [Member1, setMember1] = useState([]);

  const getMemers = () => {
    Axios.get("http://localhost:3001/customer").then((response) => {
      setMember1(response.data);
      setuser1(response.data);
    });
  };

  /*
  const getmember = () =>{
    Axios.get('https://c10.cpe231.cpe.kmutt.ac.th:8090/dataBases/listDBs/c10_OnlineBankingDB/Customer%20identification').then((response) =>{
      setmember(response.data);
    });
  }
*/

  const Login = (details) => {
    // console.log(details);

    var tempmail = [];
    var temppass = [];

    Member1.forEach(function (val) {
      tempmail.push(val.email);
      temppass.push(val.password);
    });

    //  console.log(user1.email)
    //console.log(user1.password)
    console.log(tempmail);
    console.log(temppass);

    if (
      tempmail.includes(details.email) &&
      temppass.includes(details.password) &&
      tempmail.indexOf(details.email) == temppass.indexOf(details.password)
    ) {
      console.log("Logged in");
      setUser({
        name: details.name,
        email: details.email,
      });
    } else {
      console.log("email or password is not match");
      setError("email or password is not match");
    }
  };

  const Regis = (details) => {
    console.log(details);
    if (
      details.CitizenID == adminUser.FName &&
      details.Lname == adminUser.LName &&
      details.CitizenID == adminUser.CitizenID
    ) {
      console.log("Already Registed");
      //console.log("email or password is not match");
      setErrorRegis("Already Registed");
    } else {
      setMember({
        Prefix: "",
        FName: "",
        LName: "",
        Phone: "",
        Gender: "",
        DOB: "",
        CitizenID: "",
        Email: "",
        Password: "",
        Address: "",
      });
    }
  };

  const Logout = () => {
    setUser({ name: "", email: "" });
    setMember1([]);

    console.log("Logout");
  };
  const MemberReset = () => {
    setMember1([]);
    console.log("Member reset");
  };

  var [bool, setbool] = useState(null);

  return (
    <div className="App">
      {user.email != "" ? (
        <div className="Welcome">
          <h2>
            Welcome<span>{user.name}</span>
          </h2>

          <button onClick={Logout}>Logout</button>
        </div>
      ) : (
        <div className="select_frame">
          <button
            className="btn btn-primary"
            onClick={() => {
              setbool(true);
            }}
          >
            Login
          </button>
          &nbsp;&nbsp;
          <button
            className="btn btn-primary1"
            onClick={() => {
              setbool(false);
            }}
          >
            Register
          </button>
          <div>
            {getMemers()}
            {bool ? (
              <LoginFrom Login={Login} error={error} />
            ) : (
              <Register Regis={Regis} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TestPage;
