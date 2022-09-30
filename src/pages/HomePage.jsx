import { Button, Container } from "@mui/material";
import styled from "styled-components";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const HomePage = () => {
  let navigate = useNavigate();

  const getHost = async () => {
    navigate("/signup", { state: { type: "host" } });
  };

  const getGuest = async () => {
    navigate("/signup", { state: { type: "guest" } });
  };

  return (
    <main id="home">
      <Container>
        <h2>Welcome</h2>
        <Button
          variant="contained"
          onClick={() => {
            navigate("/login");
          }}
        >
          Login
        </Button>
        <Button variant="contained" type="host" onClick={getHost}>
          Want to Host
        </Button>
        <Button variant="contained" type="guest" onClick={getGuest}>
          Looking for shelter
        </Button>
      </Container>
    </main>
  );
};

export default HomePage;
