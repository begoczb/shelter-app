import { GoogleMap, LoadScript, useJsApiLoader } from "@react-google-maps/api";
import React, { useRef, useState } from "react";
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

const containerStyle = {
  width: "100vw",
  height: "50vh",
};

const center = {
  lat: 48.856613,
  lng: 2.352222,
};

const Map = ({ isLoaded }) => {
  const [map, setMap] = useState(null);

  const onLoad = useCallback((map) => {
    // const bounds = new window.google.maps.LatLngBounds(center);
    // console.log(bounds);
    // const dim = { height: 0, width: 0 };
    // dim.width = window.innerWidth;
    // dim.height = window.innerHeight / 2;
    // const newZoom = getBoundsZoomLevel(bounds, dim);

    // map.fitBounds(bounds);
    map.setCenter(center);
    map.setZoom(15);

    setMap(map);
  }, []);

  const onUnmount = useCallback((map) => {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      // zoom={zoom}
      center={center}
      onLoad={onLoad}
      onUnmount={onUnmount}
      clickableIcons={false}
      options={{ streetViewControl: false, disableDefaultUI: false }}
    ></GoogleMap>
  ) : (
    <></>
  );
};

export default Map;
