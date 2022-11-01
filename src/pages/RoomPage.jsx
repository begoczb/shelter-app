import { Container } from "@mui/material";
import React from "react";
import { useContext, useState, useEffect } from "react";

import { useLocation } from "react-router-dom";
import { backgroundStyleGen } from "../utils/globalStyles";
import image from "../source/img/demo.png";
import "./RoomPage.css";
import { API_URL } from "../utils/constants";
import axios from "axios";
import { AuthContext } from "../context/auth.context";

const RoomPage = () => {
  const { getToken } = useContext(AuthContext);

  const { state } = useLocation();

  const { roomInfo, hostInfo } = state || {};

  const [hostDetails, setHostDetails] = useState(null);

  useEffect(() => {
    if (!hostInfo) {
      const getHostDetails = async () => {
        const token = getToken();
        const { data } = await axios({
          method: "get",
          baseURL: API_URL,
          url: `host/${roomInfo.host}`,
          headers: { Authorization: `Bearer ${token}` },
        });
        setHostDetails(data.hostDetails);
      };
      getHostDetails();
    } else {
      setHostDetails(hostInfo);
    }
    console.log(hostDetails);
  }, []);

  return (
    hostDetails && (
      <main id="room" style={backgroundStyleGen}>
        <Container className="global">
          <p>{roomInfo.address.description}</p>

          <img src={image} alt="listing" />
          <h1>{roomInfo.title}</h1>
          <h2>{hostDetails.firstName}</h2>
          <p>{roomInfo.description}</p>

          <div className="container">
            <div className="item">
              <p>
                I can host <br /> {roomInfo.guests}{" "}
                {roomInfo.guests > 1 ? " people" : " person"}
              </p>
            </div>
            <div className="item">
              <p>
                Pet friendly <br /> {roomInfo.pets ? "yes" : "no"}
              </p>
            </div>
            <div className="item">
              <p>
                Hosts <br /> {roomInfo.gender ? "women only" : "everybody"}{" "}
              </p>
            </div>
          </div>
          <div className="container">
            <div className="item">
              <p>
                From <br /> {roomInfo.startDate.substring(0, 10)}
              </p>
            </div>
            <div className="item">
              <p>
                To <br /> {roomInfo.endDate.substring(0, 10)}
              </p>
            </div>
            <div className="item">
              <p>
                {" "}
                <strong>Contact </strong>
              </p>
            </div>
          </div>
        </Container>
      </main>
    )
  );
};

export default RoomPage;
