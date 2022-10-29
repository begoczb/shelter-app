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
  const [location, setLocation] = useState(null);
  const [placeId, setPlaceId] = useState("");
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
    if (placeId) {
      console.log(placeId);
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

  return isLoaded ? (
    <main>
      <AddressInput
        status={false}
        handleLocation={handleLocation}
        isLoaded={isLoaded}
      />
      <Map location={location} />
    </main>
  ) : (
    <></>
  );
};

export default ListingsPage;
