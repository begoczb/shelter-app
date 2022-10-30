import React from "react";
import { Outlet } from "react-router-dom";
import BottomNavBar from "../components/BottomNavBar";
import ResponsiveAppBar from "../components/ResponsiveAppBar";

const Layout = () => {
  return (
    <div>
      <ResponsiveAppBar />
      <Outlet />
      <BottomNavBar />
    </div>
  );
};

export default Layout;
