import { useJsApiLoader } from "@react-google-maps/api";
import React from "react";
import AddressInput from "../components/AddressInput/AddressInput";
import Map from "../components/Map/Map";
import { API_KEY } from "../utils/constants";

const ListingsPage = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: API_KEY,
    libraries: ["places"],
  });

  return (
    <main>
      <AddressInput status={false} />
      <Map isLoaded={isLoaded} />
    </main>
  );
};

export default ListingsPage;
