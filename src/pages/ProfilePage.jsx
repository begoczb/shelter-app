import React, { useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";
import BasicModal from "../components/Modal";



const ProfilePage = () => {
  const { user } = useContext(AuthContext);
  // console.log(user);




  return (
    <>
      <main>
        <h3>Hello {user.name} </h3>
        <BasicModal/>
      </main>
    </>
  );
};

export default ProfilePage;
