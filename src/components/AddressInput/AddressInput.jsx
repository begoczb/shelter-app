import React, { useRef, useState } from "react";
import { useEffect, useMemo } from "react";

import { API_KEY } from "../../utils/constants";

import parse from "autosuggest-highlight/parse";
import throttle from "lodash/throttle";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import { Autocomplete, Box, Grid, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

const searchBarStyle = {
  position: "absolute",
  width: " 221px",
  height: "30px",
  left: "25px",
  top: "90px",

  background: "white",
  boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.25)",
  borderRadius: "15px",
};

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

const AddressInput = ({ handleAddress, status, handleLocation, disable }) => {
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);
  const loaded = useRef(false);

  const { user } = useContext(AuthContext);

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
        disabled={disable}
        // margin="normal"
        sx={
          status
            ? {
                ".MuiInputBase-root-MuiOutlinedInput-root": {
                  width: " 221px",
                  height: "1rem",

                  background: "white",
                  boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.25)",
                  borderRadius: "15px",
                  border: "none",
                  padding: "1.5rem",
                  textAlign: "center",

                  textOverflow: "ellipsis",
                },
                ".MuiFormLabel-root-MuiInputLabel-root": {
                  fontSize: "1rem",
                  top: "-10px",
                },
                "#google-map-demo": {
                  // position: "absolute",
                  width: "70%",
                  left: "0",
                  top: "-3px",
                },
                "& label.Mui-focused": {
                  color: "#D8B6C0",
                },
                "& .MuiInput-underline:after": {
                  borderBottomColor: "#973C57",
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#973C57",
                  },
                  "&:hover fieldset": {
                    borderColor: "#973C57",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#973C57",
                  },
                },
              }
            : {
                ".MuiInputBase-root-MuiOutlinedInput-root": {
                  width: " 221px",
                  height: "1rem",

                  background: "white",
                  boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.25)",
                  borderRadius: "15px",
                  border: "none",
                  padding: "1rem",
                  textAlign: "center",

                  textOverflow: "ellipsis",
                },
                ".MuiFormLabel-root-MuiInputLabel-root": {
                  fontSize: "1rem",
                  top: "-10px",
                },
                "#google-map-demo": {
                  // position: "absolute",
                  width: "70%",
                  left: "0",
                  top: "-3px",
                },
                "& label.Mui-focused": {
                  color: "#D8B6C0",
                },
                "& .MuiInput-underline:after": {
                  borderBottomColor: "#973C57",
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#973C57",
                  },
                  "&:hover fieldset": {
                    borderColor: "#973C57",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#973C57",
                  },
                },
              }
        }
        disablePortal
        id="google-map-demo"
        getOptionLabel={(option) =>
          typeof option === "string" ? option : option.description
        }
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
