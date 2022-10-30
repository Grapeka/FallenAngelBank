import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Alert from "@mui/material/Alert";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { useHistory, Redirect } from "react-router-dom";
import Axios from "axios";

const theme = createTheme();

export default function SignUp() {
  const [prefix, setPrefix] = useState("M");
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("U");
  const [dob, setDob] = useState("");
  const [citizenId, setCitizenId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [pin, setPin] = useState("");
  const [newAccountNum, setNewAccountNum] = useState(
    Math.floor(Math.random() * 10000000000).toString()
  );
  const [newCardId, setNewCardId] = useState(
    Math.floor(Math.random() * 10000000000000000).toString()
  );

  const checkRegister = () => {
    console.log("Checking registed user");
    Axios.post("https://fallenangel-bank-api.herokuapp.com/register/check", {
      email: email,
      citizenId: citizenId,
    }).then((response) => {
      if (response.data.length != 0) {
        console.log("Created already");
      } else {
        console.log("Not yet");
        register();
        createAccount();
        createCard();
      }
    });
  };
  const register = () => {
    console.log("Registing");
    Axios.post(
      "https://fallenangel-bank-api.herokuapp.com/register",
      {
        prefix: prefix,
        fName: fName,
        lName: lName,
        phoneNumber: phoneNumber,
        gender: gender,
        dob: dob,
        citizenId: citizenId,
        email: email,
        password: password,
        address: address,
        pin: pin,
      },
      {
        headers: { "Access-Control-Allow-Origin": "*" },
      }
    );
  };

  const createAccount = () => {
    console.log("Creating a book account");
    Axios.post(
      "https://fallenangel-bank-api.herokuapp.com/create/book",
      {
        citizenId: citizenId,
        accountNum: newAccountNum,
      },
      {
        headers: { "Access-Control-Allow-Origin": "*" },
      }
    );
  };

  const createCard = () => {
    console.log("Creating a card");
    Axios.post(
      "https://fallenangel-bank-api.herokuapp.com/create/card",
      {
        accountNum: newAccountNum,
        cardId: newCardId,
      },
      {
        headers: { "Access-Control-Allow-Origin": "*" },
      }
    ).then(() => {
      console.log("Register complete");
    });
  };

  let history2 = useHistory();
  const [alertStatus, setAlertStatus] = useState(null);
  const [submitVal, setSubmitVal] = useState({
    citizenId: null,
    fName: null,
    lName: null,
    prefix: "Mr",
    gender: "U",
    birth: null,
    pin: null,
    address: null,
    email: null,
    password: null,
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    let isNull = false;

    /*for (let key of Object.keys(submitVal)) {
      console.log(key + " -> " + submitVal[key]);
      if (submitVal[key] == null || submitVal[key] == "") {
        isNull = true;
      }
    }*/

    if (
      email == "" &&
      password == "" &&
      citizenId == "" &&
      fName == "" &&
      lName == "" &&
      phoneNumber == "" &&
      pin == ""
    ) {
      isNull = true;
    }
    if (isNull) {
      setAlertStatus("error");
    } else {
      setAlertStatus("success");
      checkRegister();
      if (true) {
        register();
      }
      /*setTimeout(() => {
        return history2.push("/signIn");
      }, 650); */
    }
  };

  const displayAlert = () => {
    if (alertStatus == null) {
      return null;
    } else if (alertStatus == "success") {
      return (
        <Alert style={{ position: "absolute", top: -60 }} severity="success">
          Sign up success — please wait a miniute then try login!
        </Alert>
      );
    } else {
      return (
        <Alert style={{ position: "absolute", top: -60 }} severity="error">
          Error — every inputs are required!
        </Alert>
      );
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container
        component="main"
        maxWidth="xs"
        style={{ position: "relative" }}
      >
        <CssBaseline />
        {displayAlert()}
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            sx={{ m: 1, bgcolor: "secondary.main" }}
            style={{ backgroundColor: "#033AA8" }}
          ></Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autocomplete="off"
                  autoFocus
                  required
                  fullWidth
                  id="cId"
                  label="Citizen ID"
                  name="Citizen ID"
                  onChange={(event) => {
                    setCitizenId(event.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="firstName"
                  required
                  fullWidth
                  autocomplete="off"
                  id="firstName"
                  label="First Name"
                  onChange={(event) => {
                    setFName(event.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  autocomplete="off"
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  onChange={(event) => setLName(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Prefix</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Prefix"
                    value={submitVal.prefix == null ? "Mr" : submitVal.prefix}
                    onChange={(event) => setPrefix(event.target.value)}
                  >
                    <MenuItem value={"Mr"}>Mr.</MenuItem>
                    <MenuItem value={"Ms"}>Ms.</MenuItem>
                    <MenuItem value={"Mrs"}>Mrs.</MenuItem>
                  </Select>
                </FormControl>
              </Grid>{" "}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={
                      submitVal.gender == null
                        ? "Unspecified"
                        : submitVal.gender
                    }
                    label="Gender"
                    onChange={(event) => setGender(event.target.value)}
                  >
                    <MenuItem value={"U"}>Unspecified</MenuItem>
                    <MenuItem value={"M"}>Man</MenuItem>
                    <MenuItem value={"W"}>Women</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="birth"
                  label="Birthday"
                  type="date"
                  sx={{ width: 190 }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(event) => setDob(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  type="password"
                  id="pin"
                  label="Pin"
                  onChange={(event) => setPin(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  autocomplete="off"
                  name="address"
                  label="Address"
                  type="text"
                  id="address"
                  onChange={(event) => setAddress(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="phoneNum"
                  label="phoneNum"
                  autocomplete="off"
                  type="text"
                  id="phoneNum"
                  onChange={(event) => setPhoneNumber(event.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  autocomplete="off"
                  label="Email Address"
                  name="email"
                  onChange={(event) => setEmail(event.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  onChange={(event) => setPassword(event.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="Create a lowest level book account for me"
                  checked
                  disabled
                  required
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              style={{ backgroundColor: "darkblue" }}
              onSubmit={handleSubmit}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link
                  variant="body2"
                  style={{ color: "#046494" }}
                  onClick={() => {
                    return history2.push("/signIn");
                  }}
                >
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
