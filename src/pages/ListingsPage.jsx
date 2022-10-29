import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useJsApiLoader } from "@react-google-maps/api";

import AddressInput from "../components/AddressInput/AddressInput";
import Map from "../components/Map/Map";

import { AuthContext } from "../context/auth.context";
import { ListingsContext } from "../context/listings.context";

import { API_KEY, API_URL } from "../utils/constants";
import ListingThumbnail from "../components/ListingThumbnail";

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
    <main>
      <AddressInput status={false} handleLocation={handleLocation} />
      <Map location={location} />
      {listings.map((listing) => (
        <ListingThumbnail key={listing._id} listing={listing} />
      ))}
    </main>
  ) : (
    <></>
  );
};

export default ListingsPage;
