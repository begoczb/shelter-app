import React, { useRef, useState } from "react";
import { useEffect, useMemo } from "react";

import { API_KEY } from "../../utils/constants";

import parse from "autosuggest-highlight/parse";
import throttle from "lodash/throttle";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import { Autocomplete, Box, Grid, TextField, Typography } from "@mui/material";
import axios from "axios";

function loadScript(src, position, id) {
  if (!position) {
    return;
  }
  const script = document.createElement("script");
  script.setAttribute("async", "");
  script.setAttribute("id", id);
  script.src = src;
  position.appendChild(script);
}
const autocompleteService = { current: null };
let service = null;

const AddressInput = ({ handleAddress, status, handleLocation, isLoaded }) => {
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);
  const loaded = useRef(false);

  if (typeof window !== "undefined" && !loaded.current) {
    if (!document.querySelector("#google-maps")) {
      loadScript(
        `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places`,
        document.querySelector("head"),
        "google-maps"
      );
    }

    loaded.current = true;
  }

  const fetch = useMemo(
    () =>
      throttle((request, callback) => {
        autocompleteService.current.getPlacePredictions(request, callback);
      }, 200),

    []
  );

  useEffect(() => {
    let active = true;

    if (!autocompleteService.current && window.google) {
      autocompleteService.current =
        new window.google.maps.places.AutocompleteService();
    }

    if (!autocompleteService.current) {
      return undefined;
    }

    if (inputValue === "") {
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetch({ input: inputValue }, (results) => {
      if (active) {
        let newOptions = [];

        if (value) {
          newOptions = [value];
        }

        if (results) {
          // console.log(results);

          newOptions = [...newOptions, ...results];
        }

        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch]);

  return (
    <>
      <Autocomplete
        // margin="normal"
        disablePortal
        id="google-map-demo"
        getOptionLabel={(option) =>
          typeof option === "string" ? option : option.description
        }
        sx={{ width: 300 }}
        filterOptions={(x) => x}
        options={options}
        autoComplete
        includeInputInList
        filterSelectedOptions
        value={value}
        onChange={(event, newValue) => {
          setOptions(newValue ? [newValue, ...options] : options);
          setValue(newValue);
          status && newValue && handleAddress(newValue);
          !status && newValue && handleLocation(newValue.place_id);
        }}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        renderInput={(params) => <TextField {...params} label="Address" />}
        renderOption={(props, option) => {
          const matches =
            option.structured_formatting.main_text_matched_substrings;
          const parts = parse(
            option.structured_formatting.main_text,
            matches.map((match) => [match.offset, match.offset + match.length])
          );

          return (
            <li {...props}>
              <Grid container alignItems="center">
                <Grid item>
                  <Box
                    component={LocationOnIcon}
                    sx={{ color: "text.secondary", mr: 2 }}
                  />
                </Grid>

                <Grid item xs>
                  {parts.map((part, index) => (
                    <span
                      key={index}
                      style={{ fontWeight: part.highlight ? 700 : 400 }}
                    >
                      {part.text}
                    </span>
                  ))}
                  <Typography variant="body2" color="text.secondary">
                    {option.structured_formatting.secondary_text}
                  </Typography>
                </Grid>
              </Grid>
            </li>
          );
        }}
      ></Autocomplete>
    </>
  );
};

export default AddressInput;
