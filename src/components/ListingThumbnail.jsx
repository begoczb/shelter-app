import { Container, Typography } from "@mui/material";
import React from "react";

const listingThumbStyle = {
  width: "98vw",
  height: "85px",
  //   left: "50%",
  //   transform: "translateX(-50%)",
  background: "#FDF2F5",
  boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.25)",
  borderRadius: "15px",
};

const textStyle = {
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "1rem",
  lineHeight: "17px",
  color: "#000000",
};

const ListingThumbnail = ({ listing }) => {
  return (
    <>
      <Container sx={listingThumbStyle}>
        <Typography sx={(textStyle, { left: "94px", top: "14px" })}>
          {listing.title}
        </Typography>
        <Typography sx={(textStyle, { left: "94px", top: "31px" })}>
          {listing.address.description}
        </Typography>
        <Typography sx={(textStyle, { left: "94px", top: "53px" })}>
          {listing.description}
        </Typography>
      </Container>
    </>
  );
};

export default ListingThumbnail;
