import { Button } from "@mui/material";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const SignupPage = () => {
  const { state } = useLocation();
  const { type } = state || {};
  // const navigate = useNavigate();

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
  };

  return (
    <>
      <div className="SignupPage">
        <h1>Sign Up</h1>

        <form onSubmit={handleSignupSubmit} className="form">
          <label>First Name:</label>
          <input
            type="firstName"
            name="firstName"
            value={firstName}
            onChange={handleFirstName}
          />

          <label>Last Name:</label>
          <input
            type="lastName"
            name="lastName"
            value={lastName}
            onChange={handleLastName}
          />

          <label>Email:</label>
          <input
            type="text"
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
