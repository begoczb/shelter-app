import React, { useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";

import { Button } from "@mui/material";

const ProfilePage = () => {
  const { user } = useContext(AuthContext);
  console.log(user);

  return (
    <>
      <main>
        <h3>Hello </h3>
        <Button variant="contained">Add Room</Button>
      </main>
    </>
  );
};

export default ProfilePage;
