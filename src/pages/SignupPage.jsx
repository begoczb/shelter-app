import {
  Button,
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
import { Visibility, VisibilityOff } from "@mui/icons-material";

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
      <div className="SignupPage">
        <h1>Sign Up</h1>

        <form onSubmit={handleSignupSubmit} className="form">
          <TextField
            id="outlined-basic"
            label="First Name"
            variant="outlined"
            value={firstName}
            margin="dense"
            onChange={handleFirstName}
            autoComplete="off"
          />

          <TextField
            id="outlined-basic"
            label="Last Name"
            variant="outlined"
            value={lastName}
            margin="dense"
            onChange={handleLastName}
            autoComplete="off"
          />

          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            value={email}
            margin="dense"
            onChange={handleEmail}
            autoComplete="off"
          />

          <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              autoComplete="new-password"
              id="outlined-adornment-password"
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
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>

          <Button variant="contained" type="submit">
            Register
          </Button>
        </form>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <div className="go-login">
          <p>Already have an account?</p>
          <Link to={"/login"}> Login instead</Link>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
