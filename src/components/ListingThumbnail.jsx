import { Container, Typography } from "@mui/material";
import React from "react";
import image from "../source/img/demo_thumb.png";

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
  lineHeight: "17px",
  fontSize: "0.9rem",
};

const ListingThumbnail = ({ listing, style }) => {
  return (
    <>
      <Container sx={style}>
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
          <Typography sx={addressStyle}>
            I can host {listing.guests}
            {listing.guests > 1 ? " people" : " person"}
          </Typography>
        </Container>
      </Container>
    </>
  );
};

export default ListingThumbnail;
