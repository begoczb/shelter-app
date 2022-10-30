import { Container, Typography } from "@mui/material";
import React from "react";
import image from "../source/img/demo_thumb.png";

const listingThumbStyle = {
  height: "85px",
  background: "#FDF2F5",
  boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.25)",
  borderRadius: "15px",
  justifyContent: "space-between",
  marginBottom: "2px",
  display: "flex",
};

const textStyle = {
  color: "black",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "1rem",
  lineHeight: "17px",
};

const ListingThumbnail = ({ listing }) => {
  return (
    <>
      <Container sx={listingThumbStyle}>
        <img src={image} alt="demo-thumb" />
        <Container sx={{ display: "flex", flexDirection: "column" }}>
          <Typography sx={textStyle}>{listing.title}</Typography>
          <Typography sx={textStyle}>{listing.address.description}</Typography>
          <Typography sx={textStyle}>{listing.description}</Typography>
        </Container>
      </Container>
    </>
  );
};

export default ListingThumbnail;
