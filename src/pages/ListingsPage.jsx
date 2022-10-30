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

const ListingsPage = () => {
  const [location, setLocation] = useState(null);
  const [placeId, setPlaceId] = useState("");

  const { setListings, listings } = useContext(ListingsContext);

  const { getToken } = useContext(AuthContext);

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
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
        }}
      >
        {listings.map((listing) => (
          <Link to={`/room/${listing._id}`} state={{ roomInfo: listing }}>
            <ListingThumbnail key={listing._id} listing={listing} />
          </Link>
        ))}
      </Container>
    </main>
  ) : (
    <></>
  );
};

export default ListingsPage;
