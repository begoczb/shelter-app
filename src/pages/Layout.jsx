import React from "react";
import { Outlet } from "react-router-dom";
import ResponsiveAppBar from "../components/ResponsiveAppBar";

const Layout = () => {
  return (
    <div>
      <ResponsiveAppBar />
      <Outlet />
      {/* add footer */}
    </div>
  );
};

export default Layout;
