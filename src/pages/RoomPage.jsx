import { Container } from "@mui/material";
import React from "react";

import { useLocation } from "react-router-dom";


import { backgroundStyleGen } from "../utils/globalStyles";


const RoomPage = () => {

  const { state } = useLocation();
  const { hostInfo, roomInfo } = state || {};

  return (
    <main id="room" style={backgroundStyleGen}>
      <Container>
        <h2>{roomInfo.title}</h2>
        <ul>
        <li>{roomInfo.description}</li>
        </ul>
      </Container>
    </main>
  );
};

export default RoomPage;
