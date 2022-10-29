import { Container } from "@mui/material";
import React from "react";

const listingThumbStyle = {};

const ListingThumbnail = ({ listing }) => {
  return (
    <>
      <Container sx={listingThumbStyle}>
        <h4>{listing.title}</h4>
        <h5>{listing.address.description}</h5>
        <p>{listing.description}</p>
      </Container>
    </>
  );
};

export default ListingThumbnail;
