import { Button, Container } from "@mui/material";
import styled from "styled-components";
import React from "react";

const HomePage = () => {
  return (
    <main id="home">
      <Container>
        <h2>Welcome</h2>
        <Button variant="contained">Want to Host</Button>
        <Button variant="contained">Looking for shelter</Button>
      </Container>
    </main>
  );
};

export default HomePage;
