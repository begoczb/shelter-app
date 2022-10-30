import { Container } from "@mui/material";
import React from "react";
import { backgroundStyleGen } from "../utils/globalStyles";

const RoomPage = () => {
  return (
    <main id="room" style={backgroundStyleGen}>
      <Container>
        <h2>Welcome</h2>
      </Container>
    </main>
  );
};

export default RoomPage;
