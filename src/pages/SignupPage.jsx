import React from "react";
import { useLocation } from "react-router-dom";

const SignupPage = () => {
  const { state } = useLocation();
  const { type } = state || {};

  return (
    <div>
      <p>{type}</p>
    </div>
  );
};

export default SignupPage;
