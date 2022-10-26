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
import { TryRounded } from "@mui/icons-material";
import AddressInput from "../AddressInput/AddressInput";

const baseURL = API_URL;

const Form = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [guests, setGuests] = useState("");
  const [gender, setGender] = useState(false);
  const [pet, setPet] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [addressString, setAddressString] = useState("");

  const [errorMessage, setErrorMessage] = useState(undefined);

  const handleAddress = ({ target: { name, value } }, newAddress) => {
    setAddress({ ...address, hasChanged: true, [name]: value });
    setAddressString(newAddress);
    console.log(addressString);
  };

  const handleTitle = (e) => setTitle(e.target.value);
  const handleDescription = (e) => setDescription(e.target.value);

  const handleGuests = (e) => setGuests(e.target.value);
  const handleStartDate = (e) => setStartDate(e.target.value);
  const handleEndDate = (e) => setEndDate(e.target.value);
  console.log(startDate);

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
        console.log(response.data);
        // navigate("/login");
      })
      .catch((error) => {
        console.log(error);
        // const errorDescription = error.response.data.message;
        // setErrorMessage(errorDescription);
      });
  };

  const handleCheckbox = (type) => {
    if (type === "gender") {
      gender ? setGender(false) : setGender(true);
    } else {
      pet ? setPet(false) : setPet(true);
    }
  };

  const date = new Date();
  function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  return (
    <>
      <Container>
        <form className="form" onSubmit={handleAddRoom}>
          {/* <label>Address:</label> */}
          <TextField
            id="outlined-basic"
            label="Title"
            variant="outlined"
            value={title}
            margin="dense"
            onChange={handleTitle}
            autoComplete="off"
          />
          {/* <input
            type="text"
            name="title"
            placeholder="Title"
            value={title}
            onChange={handleTitle}
          /> */}
          <TextField
            id="outlined-basic"
            label="Description"
            variant="outlined"
            value={description}
            margin="dense"
            onChange={handleDescription}
            autoComplete="off"
            multiline={true}
            // rows={2}
          />
          {/* <textarea
            type="text"
            name="description"
            placeholder="Description"
            value={description}
            style={{ width: "100%" }}
            onChange={handleDescription}
          /> */}
          {/* <input
            type="number"
            name="number"
            placeholder="Number"
            value={address.number}
            onChange={handleAddress}
          /> */}
          <AddressInput handleAddress={handleAddress} />
          <TextField
            id="outlined-number"
            label="Number of Guests"
            type="number"
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            placeholder="0"
            value={guests}
            onChange={handleGuests}
          />
          {/* <input
            type="text"
            name="street"
            placeholder="Street"
            value={address.street}
            onChange={handleAddress}
          />

          <input
            type="text"
            name="postalCode"
            placeholder="Postal Code"
            value={address.postalCode}
            onChange={handleAddress}
          />

          <input
            type="text"
            name="city"
            placeholder="City"
            value={address.city}
            onChange={handleAddress}
          />

          <input
            type="text"
            name="country"
            placeholder="Country"
            value={address.country}
            onChange={handleAddress} 
          />
          <label>Number:</label>
          <input
            type="number"
            name="guests"
            min="1"
            max="10"
            value={guests}
            onChange={handleGuests}
          />*/}

          <FormControlLabel
            control={
              <Checkbox
                checked={gender}
                onChange={() => {
                  handleCheckbox("gender");
                }}
                sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
              />
            }
            label="WOMEN ONLY"
          />
          {/* <label>Women only:</label>
          <input
            type="checkbox"
            name="gender"
            value={gender}
            onChange={() => {
              handleCheckbox("gender");
            }}
          /> */}

          <FormControlLabel
            control={
              <Checkbox
                checked={pet}
                onChange={() => {
                  handleCheckbox("pet");
                }}
                sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
              />
            }
            label="PETS AUTHORIZED"
          />
          {/* <label>Pets autorized:</label>
          <input
            type="checkbox"
            name="pet"
            value={pet}
            onChange={() => {
              handleCheckbox("pet");
            }}
          /> */}
          <label>Start Date:</label>
          <input
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
          <Button variant="contained" type="submit" onClick={handleAddRoom}>
            Add
          </Button>
        </form>
      </Container>
    </>
  );
};

export default Form;
