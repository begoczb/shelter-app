import { Button, Container, Typography } from "@mui/material";
import styled from "styled-components";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material/styles";
import "./HomePage.css";
import image from "../source/img/favpng_silhouette-city-skyline 1.png";

const buttonStyle = {
  width: "240px",
  height: "60px",
  position: "absolute",
  backgroundColor: "#FFFFFF",
  zIndex: "1",
  boxShadow:
    "2px 2px 4px rgba(0, 0, 0, 0.25), inset 2px 2px 10px rgba(0, 0, 0, 0.25)",
  borderRadius: "25px",
  color: "black",
  "&:hover": {
    backgroundColor: "lightgray",
  },
};

const buttonPos1 = {
  left: "50%",
  transform: "translate(-50%)",
  top: "290px",
};

const buttonPos2 = {
  left: "50%",
  transform: "translate(-50%)",
  top: "432px",
};

const buttonPos3 = {
  left: "50%",
  transform: "translate(-50%)",
  top: "573px",
};

const backgroundStyle = {
  gap: 2,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  height: "100vh",
  maxWidth: "100vw",
  background: "linear-gradient(180deg, #7D0C2E 0%, #EC4073 100%)",

  color: "white",
};

const titleStyle = {
  position: "absolute",
  width: "270px",
  height: "44px",
  left: "50%",
  transform: "translate(-50%)",
  top: "159px",

  // fontFamily: "Aclonica",
  fontStyle: "normal",
  fontWeight: "400",
  fontSize: "39px",
  lineHeight: "44px",

  color: "#FFFFFF",
};

const descriptionTextStyle = {
  position: "absolute",
  width: "fit-content",
  height: "26px",

  fontFamily: "Archivo Black",
  fontStyle: "normal",
  fontWeight: "400",
  fontSize: "24px",
  lineHeight: "26px",

  color: "#FFF500",
  textAlign: "left",
};

const textPos1 = {
  left: "50%",
  transform: "translate(-50%)",
  top: "260px",
};

const textPos2 = {
  left: "50%",
  transform: "translate(-50%)",
  top: "402px",
};

const imageStyle = {
  position: "absolute",
  width: "390px",
  height: "390px",
  left: "50%",
  transform: "translate(-50%)",
  top: "603px",

  background: `url("${image}")`,
};

let theme = createTheme();
theme = responsiveFontSizes(theme);

const HomePage = () => {
  const navigate = useNavigate();

  const getButtonType = async (type) => {
    // console.log(type);
    navigate("/signup", { state: { type: type } });
  };

  return (
    <main id="home">
      <Container maxWidth={false} sx={backgroundStyle}>
        <Typography variant="h1" sx={titleStyle}>
          SHELTER HERO
        </Typography>
        {/* <h1>SHELTER HERO</h1> */}
        <Container>
          <Typography sx={{ ...descriptionTextStyle, ...textPos1 }}>
            I can help
          </Typography>
          <Button
            variant="contained"
            sx={{ ...buttonStyle, ...buttonPos1 }}
            onClick={() => getButtonType("host")}
          >
            Signup as a host
          </Button>
        </Container>
        <Container>
          <Typography sx={{ ...descriptionTextStyle, ...textPos2 }}>
            I need help
          </Typography>
          <Button
            variant="contained"
            sx={{ ...buttonStyle, ...buttonPos2 }}
            onClick={() => getButtonType("guest")}
          >
            Signup as a careseeker
          </Button>
        </Container>
        <Button
          variant="contained"
          sx={{ ...buttonStyle, ...buttonPos3 }}
          onClick={() => {
            navigate("/login");
          }}
        >
          Login
        </Button>
        <Container sx={imageStyle}></Container>
      </Container>
    </main>
  );
};

export default HomePage;
