import { Container } from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";
import { backgroundStyleGen } from "../utils/globalStyles";
import image from "../source/img/demo.png";
import "./RoomPage.css";


const RoomPage = () => {

  const { state } = useLocation();
  const { hostInfo, roomInfo } = state || {};

  return (
    <main id="room" style={backgroundStyleGen}>
      <Container className="global">
      <p>{roomInfo.address.description}</p>

      <img src={image} alt="listing"/>
      <h1>{roomInfo.title}</h1>
      <h2>{hostInfo.firstName}</h2>
      <p>{roomInfo.description}</p>
      
      <div className="container">
        <div className="item">
          <p>I can host <br/> {roomInfo.guests} {roomInfo.guests > 1 ? " people" : " person"}</p>
        </div>
        <div className="item">
          <p>Pet friendly <br/> {roomInfo.pets? "yes" : "no"}</p>
        </div>
        <div className="item">
          <p>Hosts <br/> {roomInfo.gender? "women only" : "everybody"} </p>
        </div>
      </div>
      <div className="container">
        <div className="item">
          <p>From <br/> {roomInfo.startDate.substring(0, 10)}</p>
        </div>
        <div className="item">
          <p>To <br/> {roomInfo.endDate.substring(0, 10)}</p>
        </div>
        <div className="item">
          <p> <strong>Contact </strong></p>
        </div>
      </div>
      </Container>
    </main>
  );
};

export default RoomPage;
