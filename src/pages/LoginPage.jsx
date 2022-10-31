import {
  Button,
  createTheme,
  FilledInput,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  ThemeProvider,
} from "@mui/material";

import axios from "axios";
import React, { useState, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../utils/constants";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  backgroundStyleGen,
  FormTextField,
  formTextStyle,
  passwordStyle,
  theme,
} from "../utils/globalStyles";
import { yellowButtonStyle } from "../utils/globalStyles";
import { Container } from "@mui/system";

const baseURL = API_URL;

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [values, setValues] = useState({
    password: "",
    showPassword: false,
  });

  const navigate = useNavigate();

  const { storeToken, authenticateUser, user } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handleChange = (prop) => (e) => {
    setValues({ ...values, [prop]: e.target.value });
    setPassword(e.target.value);
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    const requestBody = { email, password };

    axios
      .post(`${baseURL}auth/login`, requestBody)
      .then((response) => {
        // console.log("JWT token", response.data.authToken);

        storeToken(response.data.authToken);

        authenticateUser();

        navigate("/listings");
      })
      .catch((error) => {
        console.log(error);
        // const errorDescription = error.response.data.message;
        // setErrorMessage(errorDescription);
      });
  };

  return (
    <main className="LoginPage" style={backgroundStyleGen}>
      <Container
        sx={{
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "60%",
          alignSelf: "center",
          alignContent: "center",
          justifyContent: "space-evenly",
          top: "50%",
          transform: "translateY(-50%)",
        }}
      >
        <form onSubmit={handleLoginSubmit} className="login-form">
          <h2>Log in</h2>
          <Container sx={{ display: "flex", flexDirection: "column" }}>
            <ThemeProvider theme={theme}>
              <FormTextField
                sx={{
                  ":before": { borderBottomColor: "purple" },
                  ":after": { borderBottomColor: "purple" },
                }}
                id="outlined-basic"
                label="Email"
                variant="filled"
                value={email}
                // margin="normal"
                onChange={handleEmail}
                // autoComplete="new-password"
                autoComplete="off"
              />
            </ThemeProvider>

            <FormControl sx={passwordStyle} variant="filled">
              <InputLabel htmlFor="filled-adornment-password">
                Password
              </InputLabel>
              <FilledInput
                helperText=" "
                disableUnderline
                // margin="normal"
                // sx={formTextStyle}
                autoComplete="new-password"
                id="filled-adornment-password"
                type={values.showPassword ? "text" : "password"}
                value={values.password}
                onChange={handleChange("password")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      // color="black"
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
          </Container>

          <Button variant="contained" sx={yellowButtonStyle} type="submit">
            Log in
          </Button>
        </form>
        <Container>
          <p>Don't have an account?</p>
          <Link to={"/signup"}>Sign up</Link>
        </Container>
      </Container>

      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </main>
  );
};

export default LoginPage;
