import { Button, Container } from "@mui/material";
import React, { useState } from "react";
import { API_URL } from "../../utils/constants";
import axios from "axios";
import "./Form.css";

const baseURL = API_URL;

const Form = () => {
  const [address, setAddress] = useState("");
  const [guests, setGuests] = useState("");
  const [gender, setGender] = useState("");
  const [pet, setPet] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [errorMessage, setErrorMessage] = useState(undefined);

  const handleAddress = (e) => setAddress(e.target.value);
  const handleGuests = (e) => setGuests(e.target.value);
  const handleGender = (e) => setGender(e.target.value);
  const handlePet = (e) => setPet(e.target.value);
  const handleStartDate = (e) => setStartDate(e.target.value);
  const handleEndDate = (e) => setEndDate(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();

    // axios({
    //   url: `room`,
    //   baseURL: baseURL,
    //   method: "post",
    //   data: {
    //     email,
    //     password,
    //     firstName,
    //     lastName,
    //   },
    // })
    //   .then((response) => {
    //     console.log(response.data);
    //     navigate("/login");
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     // const errorDescription = error.response.data.message;
    //     // setErrorMessage(errorDescription);
    //   });
  };

  return (
    <>
      <Container>
        <form className="form" onSubmit={handleSignupSubmit} className="form">
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={address}
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
            onChange={handleGender}
          />

          <label>Pet:</label>
          <input type="checkbox" name="pet" value={pet} onChange={handlePet} />

          <label>Start Date:</label>
          <input
            type="date"
            name="startDate"
            value={startDate}
            onChange={handleStartDate}
          />

          <label>End Date:</label>
          <input
            type="date"
            name="endDate"
            value={endDate}
            onChange={handleEndDate}
          />

          <Button variant="contained" type="submit">
            Add
          </Button>
        </form>
      </Container>
    </>
  );
};

export default Form;
