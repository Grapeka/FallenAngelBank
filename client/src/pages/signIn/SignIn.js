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
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Axios from "axios";

import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";

const theme = createTheme();

export default function SignIn(props) {
  const [userLoginData, setUserLoginData] = useState({
    email: null,
    password: null,
  });
  const login = (email, password) => {
    Axios.post("https://fallenangel-bank-api.herokuapp.com/login", {
      email: email,
      password: password,
    }).then((response) => {
      if (response.data.length != 0) {
        props.setContinueData(response.data);
      }
    });
  };

  let history = useHistory();
  useEffect(() => {
    if (props.continueData != null) {
      console.log("Welcometo Angel Bank: " + props.continueData[0].fName);
      history.push("/home");
    }
  }, [props.continueData, props.setContinueData]);
  const handleSubmit = (event) => {
    event.preventDefault();
    login(userLoginData.email, userLoginData.password);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
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
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(event) =>
                setUserLoginData({
                  ...userLoginData,
                  email: event.target.value,
                })
              }
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={(event) =>
                setUserLoginData({
                  ...userLoginData,
                  password: event.target.value,
                })
              }
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              style={{ backgroundColor: "darkblue" }}
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2" style={{ color: "#046494" }}>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link
                  onClick={() => {
                    history.push("/signUp");
                  }}
                  variant="body2"
                  style={{ color: "#046494" }}
                >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
