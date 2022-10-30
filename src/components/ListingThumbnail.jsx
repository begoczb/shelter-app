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
  paddingLeft: "0",
  paddingRight: "0.5rem",
  minWidth: "100vw",
  maxWidth: "100vw",
};

const textStyle = {
  color: "black",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "1rem",
  lineHeight: "17px",
};

const addressStyle = {
  color: "black",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "1rem",
  lineHeight: "17px",
  fontSize: "0.9rem",
};

const ListingThumbnail = ({ listing }) => {
  return (
    <>
      <Container sx={listingThumbStyle}>
        <img src={image} alt="demo-thumb" />
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <Typography sx={textStyle}>{listing.title}</Typography>
          <Typography sx={addressStyle}>
            {listing.address.description}
          </Typography>
          <Typography sx={addressStyle}>{listing.description}</Typography>
        </Container>
      </Container>
    </>
  );
};

export default ListingThumbnail;
