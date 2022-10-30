import * as React from "react";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import Paper from "@mui/material/Paper";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

const iconStyle = {
  backgroundColor: "#FDF2F5",
  fill: "black",
  fontSize: "3rem",
  borderRadius: "25px",
  padding: "0.2rem",
};

export default function BottomNavBar() {
  const [value, setValue] = React.useState(0);
  const ref = React.useRef(null);
  const navigate = useNavigate();

  return (
    <Box sx={{ pb: 7 }} ref={ref}>
      <CssBaseline />

      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation
          sx={{ backgroundColor: "#7D0C2E", color: "white" }}
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction icon={<EmailOutlinedIcon sx={iconStyle} />} />
          <BottomNavigationAction
            onClick={() => {
              navigate("/listings");
            }}
            icon={<HomeOutlinedIcon sx={iconStyle} />}
          />
          <BottomNavigationAction
            onClick={() => {
              navigate("/profile");
            }}
            icon={<AccountCircleOutlinedIcon sx={iconStyle} />}
          />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}
