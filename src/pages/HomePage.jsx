import { Button, Container } from "@mui/material";
import styled from "styled-components";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const getButtonType = async (type) => {
    // console.log(type);
    navigate("/signup", { state: { type: type } });
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
        <Button variant="contained" onClick={() => getButtonType("host")}>
          Want to Host
        </Button>
        <Button variant="contained" onClick={() => getButtonType("guest")}>
          Looking for shelter
        </Button>
      </Container>
    </main>
  );
};

export default HomePage;
