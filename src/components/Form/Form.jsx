import { Button, Container } from "@mui/material";
import React, { useState } from "react";
import { API_URL } from "../../utils/constants";
import axios from "axios";
import "./Form.css";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

const baseURL = API_URL;

const Form = () => {
  const [address, setAddress] = useState("");
  const [guests, setGuests] = useState("");
  const [gender, setGender] = useState(false);
  const [pet, setPet] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [errorMessage, setErrorMessage] = useState(undefined);

  const handleAddress = ({ target: { name, value } }) => {
    setAddress({ ...address, hasChanged: true, [name]: value });
    //console.log(address);
  };

  const handleGuests = (e) => setGuests(e.target.value);
  const handleGender = (e) => setGender(e.target.value);

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

  return (
    <>
      <Container>
        <form className="form" onSubmit={handleAddRoom}>
          {/* <label>Address:</label> */}

          <input
            type="number"
            name="number"
            placeholder="Number"
            value={address.number}
            onChange={handleAddress}
          />

          <input
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
          />

          <label>Women only:</label>
          <input
            type="checkbox"
            name="gender"
            value={gender}
            onChange={() => {
              handleCheckbox("gender");
            }}
          />

          <label>Pets autorized:</label>
          <input
            type="checkbox"
            name="pet"
            value={pet}
            onChange={() => {
              handleCheckbox("pet");
            }}
          />

          <label>Start Date:</label>
          <input
            type="date"
            name="startDate"
            min={new Date().toISOString().substring(0, 10)}
            max={endDate}
            value={startDate}
            onChange={handleStartDate}
          />

          <label>End Date:</label>
          <input
            type="date"
            name="endDate"
            min={startDate? startDate : new Date().toISOString().substring(0, 10)}
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
