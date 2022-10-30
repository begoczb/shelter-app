import { GoogleMap, LoadScript, useJsApiLoader } from "@react-google-maps/api";
import React, { useContext, useRef, useState } from "react";
import { useCallback } from "react";
import { API_KEY } from "../../utils/constants";
import { Marker } from "@react-google-maps/api";
import parse from "autosuggest-highlight/parse";
import { useMemo } from "react";
import throttle from "lodash/throttle";
import { useEffect } from "react";
import { Autocomplete, Box, Grid, TextField, Typography } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { getBoundsZoomLevel } from "../../utils/helperFunction";
import { ListingsContext } from "../../context/listings.context";

const containerStyle = {
  width: "100vw",
  height: "50vh",
};

const center = {
  lat: 48.856613,
  lng: 2.352222,
};

const Map = ({ location }) => {
  const [map, setMap] = useState(null);
  const [centerSearch, setCenterSearch] = useState(null);

  const { listings } = useContext(ListingsContext);
  console.log(listings);
  
  useEffect(() => {
    if (location) {
      setCenterSearch(location);
    }
  }, [location]);

  const onLoad = useCallback((map) => {
    map.setCenter(center);
    map.setZoom(15);

    setMap(map);
  }, []);

  const onUnmount = useCallback((map) => {
    setMap(null);
  }, []);

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      // zoom={zoom}
      center={centerSearch ? centerSearch : center}
      onLoad={onLoad}
      onUnmount={onUnmount}
      clickableIcons={false}
      options={{ streetViewControl: false, disableDefaultUI: false }}
    >
      {listings.map((elem) => (
        <Marker
          key={elem._id}
          position={{ lat: elem.address.lat, lng: elem.address.lng }}
        />
      ))}
    </GoogleMap>
  );
};

export default Map;
