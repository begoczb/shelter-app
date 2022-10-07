import { Button } from "@mui/material";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { API_URL } from "../utils/constants";
import axios from "axios";

const baseURL = API_URL;

const SignupPage = () => {
  const { state } = useLocation();
  const { type } = state || {};
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [errorMessage, setErrorMessage] = useState(undefined);

  const handlePassword = (e) => setPassword(e.target.value);
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
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={firstName}
            onChange={handleFirstName}
          />

          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={lastName}
            onChange={handleLastName}
          />

          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleEmail}
          />

          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handlePassword}
          />

          <Button variant="contained" type="submit">
            Register
          </Button>
        </form>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <div className="go-login">
          <p>Already have account?</p>
          <Link to={"/login"}> Login</Link>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
