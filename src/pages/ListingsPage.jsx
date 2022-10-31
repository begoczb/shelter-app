import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useJsApiLoader } from "@react-google-maps/api";

import AddressInput from "../components/AddressInput/AddressInput";
import Map from "../components/Map/Map";

import { AuthContext } from "../context/auth.context";
import { ListingsContext } from "../context/listings.context";

import { API_KEY, API_URL } from "../utils/constants";
import ListingThumbnail from "../components/ListingThumbnail";
import { Container } from "@mui/system";
import { backgroundStyleGen, yellowButtonStyle } from "../utils/globalStyles";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const places = ["places"];

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
  minWidth: "97vw",
  maxWidth: "97vw",
};

const ListingsPage = () => {
  const [location, setLocation] = useState(null);
  const [placeId, setPlaceId] = useState("");

  const { setListings, listings } = useContext(ListingsContext);

  const { getToken, user } = useContext(AuthContext);

  const { isLoaded } = useJsApiLoader({
    id: "google-maps",
    googleMapsApiKey: API_KEY,
    libraries: places,
  });

  const handleLocation = (newPlaceId) => {
    setPlaceId(newPlaceId);
  };

  useEffect(() => {
    const getAllListings = async () => {
      const token = getToken();
      const { data } = await axios({
        method: "get",
        baseURL: API_URL,
        url: "room",
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log(data);
      setListings([...data]);
    };

    getAllListings();
    // console.log(`All listings:`, listings);
  }, []);

  useEffect(() => {
    if (placeId) {
      // console.log(placeId);
      const request = { placeId: placeId };
      const getLocationLatLng = async () => {
        const token = getToken();
        const { data } = await axios({
          method: "patch",
          baseURL: API_URL,
          data: request,
          url: "guest",
          headers: { Authorization: `Bearer ${token}` },
        });
        // console.log(data);

        setLocation(data.location);
      };

      getLocationLatLng();
    }
  }, [placeId]);

  return isLoaded && listings ? (
    <main style={backgroundStyleGen}>
      <Container
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "1rem",
        }}
      >
        <AddressInput status={false} handleLocation={handleLocation} />
        <Button variant="contained" sx={yellowButtonStyle}>
          Filter
        </Button>
      </Container>

      <Map location={location} />
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          alignItems: "center",
          alignContent: "center",
          minHeight: "50%",
          padding: "0.2rem",
          overflow: "auto",
        }}
      >
        {listings.map((listing) => (
          <Link
            to={`/room/${listing._id}`}
            key={listing._id}
            state={{ roomInfo: listing }}
          >
            <ListingThumbnail listing={listing} style={listingThumbStyle} />
          </Link>
        ))}
      </Container>
    </main>
  ) : (
    <></>
  );
};

export default ListingsPage;
