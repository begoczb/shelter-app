import {
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { API_URL } from "../../utils/constants";
import axios from "axios";
import "./Form.css";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import AddressInput from "../AddressInput/AddressInput";
import { FormTextField, yellowButtonStyle } from "../../utils/globalStyles";

// const baseURL = API_URL;

const Form = ({ handleClose, hostRooms, setHostRooms }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState({});
  const [guests, setGuests] = useState("");
  const [gender, setGender] = useState(false);
  const [pet, setPet] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleTitle = (e) => setTitle(e.target.value);
  const handleDescription = (e) => setDescription(e.target.value);
  const handleGuests = (e) => setGuests(e.target.value);
  const handleStartDate = (e) => setStartDate(e.target.value);
  const handleEndDate = (e) => setEndDate(e.target.value);

  const handleAddress = (newAddress) => {
    const { description, place_id } = newAddress;
    setAddress({ description, place_id });
  };

  const handleCheckbox = (type) => {
    if (type === "gender") {
      gender ? setGender(false) : setGender(true);
    } else {
      pet ? setPet(false) : setPet(true);
    }
  };

  const addDays = (date, days) => {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  const { getToken } = useContext(AuthContext);

  const handleAddRoom = (e) => {
    e.preventDefault();
    const token = getToken();
    axios({
      url: `room`,
      baseURL: API_URL,
      method: "post",
      headers: { Authorization: `Bearer ${token}` },
      data: {
        title,
        description,
        address,
        guests,
        pet,
        gender,
        startDate,
        endDate,
      },
    })
      .then((response) => {
        handleClose();
        setHostRooms([...hostRooms, response.data]);
      })
      .catch((error) => {
        console.log(error);
        // const errorDescription = error.response.data.message;
        // setErrorMessage(errorDescription);
      });
  };

  const date = new Date();

  return (
    <>
      <Container>
        <form
          className="form"
          style={{ display: "flex" }}
          onSubmit={handleAddRoom}
        >
          {/* <label>Address:</label> */}
          <FormTextField
            id="filled-basic"
            label="Title"
            variant="filled"
            value={title}
            margin="normal"
            onChange={handleTitle}
            autoComplete="off"
          />

          <FormTextField
            id="filled-basic"
            label="Description"
            variant="filled"
            value={description}
            margin="dense"
            onChange={handleDescription}
            autoComplete="off"
            multiline={true}
            // rows={2}
          />

          <AddressInput
            handleAddress={handleAddress}
            status={true}
            disable={false}
          />
          <FormTextField
            id="filled-number"
            disableUnderline
            label="Number of Guests"
            type="number"
            margin="normal"
            variant="filled"
            InputLabelProps={{
              shrink: true,
            }}
            placeholder="1"
            InputProps={{ inputProps: { min: "1", max: "10", step: "1" } }}
            value={guests}
            onChange={handleGuests}
          />

          <FormControlLabel
            sx={{ width: "75%" }}
            control={
              <Checkbox
                checked={gender}
                onChange={() => {
                  handleCheckbox("gender");
                }}
                sx={{
                  "& .MuiSvgIcon-root": {
                    fontSize: "2rem",
                    color: "white",
                    fill: "white",
                  },
                }}
              />
            }
            label="WOMEN ONLY"
          />

          <FormControlLabel
            sx={{ width: "75%" }}
            control={
              <Checkbox
                checked={pet}
                onChange={() => {
                  handleCheckbox("pet");
                }}
                sx={{
                  "& .MuiSvgIcon-root": {
                    fontSize: "2rem",
                    color: "white",
                    fill: "white",
                  },
                }}
              />
            }
            label="PETS AUTHORIZED"
          />

          <label>Start Date:</label>
          <input
            style={{ marginBottom: "1.5rem" }}
            type="date"
            name="startDate"
            min={date.toISOString().substring(0, 10)}
            max={
              endDate
                ? addDays(endDate, -1).toISOString().substring(0, 10)
                : endDate
            }
            value={startDate}
            onChange={handleStartDate}
          />
          <label>End Date:</label>
          <input
            style={{ marginBottom: "1.5rem" }}
            type="date"
            name="endDate"
            min={
              startDate
                ? addDays(startDate, 1).toISOString().substring(0, 10)
                : addDays(date, 1).toISOString().substring(0, 10)
            }
            value={endDate}
            onChange={handleEndDate}
          />
          <Button
            variant="contained"
            type="submit"
            sx={yellowButtonStyle}
            onClick={handleAddRoom}
          >
            Add
          </Button>
        </form>
      </Container>
    </>
  );
};

export default Form;
