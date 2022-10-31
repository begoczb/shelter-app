import {
  Button,
  FilledInput,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { API_URL } from "../utils/constants";
import axios from "axios";
import { TextFields, Visibility, VisibilityOff } from "@mui/icons-material";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import {
  backgroundStyleGen,
  FormTextField,
  formTextStyle,
  passwordStyle,
  yellowButtonStyle,
} from "../utils/globalStyles";
import { Container } from "@mui/system";

const baseURL = API_URL;

const SignupPage = () => {
  const { state } = useLocation();
  const { type } = state || {};
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [values, setValues] = useState({
    password: "",
    showPassword: false,
  });
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [errorMessage, setErrorMessage] = useState(undefined);

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
  // const handlePassword = (e) => setPassword(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);
  const handleFirstName = (e) => setFirstName(e.target.value);
  const handleLastName = (e) => setLastName(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();

    axios({
      url: `auth/signup/${type}`,
      baseURL: baseURL,
      method: "post",
      data: {
        email,
        password,
        firstName,
        lastName,
      },
    })
      .then((response) => {
        console.log(response.data);
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
        // const errorDescription = error.response.data.message;
        // setErrorMessage(errorDescription);
      });
  };

  return (
    <>
      <main className="SignupPage" style={backgroundStyleGen}>
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
          <h1>Sign Up</h1>

          <form onSubmit={handleSignupSubmit} className="form">
            <Container sx={{ display: "flex", flexDirection: "column" }}>
              <FormTextField
                id="filled-basic"
                label="First Name"
                variant="filled"
                value={firstName}
                margin="dense"
                onChange={handleFirstName}
                autoComplete="off"
              />

              <FormTextField
                id="filled-basic"
                label="Last Name"
                variant="filled"
                value={lastName}
                margin="dense"
                onChange={handleLastName}
                autoComplete="off"
              />

              <FormTextField
                id="filled-basic"
                label="Email"
                variant="filled"
                value={email}
                margin="dense"
                onChange={handleEmail}
                autoComplete="off"
              />

              <FormControl sx={passwordStyle} variant="filled">
                <InputLabel htmlFor="filled-adornment-password">
                  Password
                </InputLabel>
                <FilledInput
                  disableUnderline
                  autoComplete="new-password"
                  id="filled-adornment-password"
                  type={values.showPassword ? "text" : "password"}
                  value={values.password}
                  onChange={handleChange("password")}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
            </Container>

            <Button variant="contained" type="submit" sx={yellowButtonStyle}>
              <ArrowForwardOutlinedIcon sx={{ fill: "black" }} />
            </Button>
          </form>

          <Container>
            <p>Already have an account?</p>
            <Link to={"/login"}> Log in</Link>
          </Container>
        </Container>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </main>
    </>
  );
};

export default SignupPage;
