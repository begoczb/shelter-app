import { useJsApiLoader } from "@react-google-maps/api";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import AddressInput from "../components/AddressInput/AddressInput";
import Map from "../components/Map/Map";
import { API_KEY, API_URL } from "../utils/constants";
import { AuthContext } from "../context/auth.context";
import axios from "axios";

const places = ["places"];

const ListingsPage = () => {
  const [location, setLocation] = useState({});
  const [placeId, setPlaceId] = useState("");
  const { getToken } = useContext(AuthContext);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: API_KEY,
    libraries: places,
  });

  const handleLocation = (newPlaceId) => {
    setPlaceId(newPlaceId);
  };

  useEffect(() => {
    const getLocationLatLng = async () => {
      const token = getToken();
      const { data } = await axios({
        method: "patch",
        baseURL: API_URL,
        data: placeId,
        url: "guest",
        headers: { Authorization: `Bearer ${token}` },
      });

      setLocation(data.location);
    };

    getLocationLatLng();
  }, [placeId]);

  return (
    <main>
      <AddressInput status={false} handleLocation={handleLocation} />
      <Map isLoaded={isLoaded} location={location} />
    </main>
  );
};

export default ListingsPage;
