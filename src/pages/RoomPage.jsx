import { Container } from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";


const RoomPage = () => {

  const { state } = useLocation();
  const { hostInfo, roomInfo } = state || {};

  return (
    <main id="room">
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
