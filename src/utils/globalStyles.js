import { TextField } from "@mui/material";
import { alpha, createTheme, styled } from "@mui/material/styles";

const backgroundStyleHome = {
  gap: 2,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  height: "100%",
  maxWidth: "100vw",
  background: "linear-gradient(180deg, #7D0C2E 0%, #EC4073 100%)",

  color: "white",
};

const backgroundStyleGen = {
  background: "#7D0C2E",
  gap: 2,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  height: "100%",
  maxWidth: "100vw",
  color: "white",
};

const yellowButtonStyle = {
  width: "fit-content",
  height: "2rem",
  fontSize: "1rem",
  color: "black",
  backgroundColor: "#FFD900",
  "&:hover": {
    backgroundColor: "#FFD900",
  },
  boxShadow:
    "2px 2px 4px rgba(0, 0, 0, 0.25), inset 2px 2px 10px rgba(0, 0, 0, 0.25)",
  borderRadius: "15px",
  alignSelf: "center",
};

const formTextStyle = {
  backgroundColor: "#FFFFFF",
  boxShadow:
    "2px 2px 4px rgba(0, 0, 0, 0.25), inset 2px 2px 10px rgba(0, 0, 0, 0.25)",
  borderRadius: "25px",
  color: "black",
  "&:hover": {
    backgroundColor: "lightgray",
    marginBottom: "1.8rem",
  },
};

const theme = createTheme({
  status: {
    primary: {
      main: "#7d0c2e",
    },
    secondary: {
      main: "#ffd900",
    },
  },
});

const FormTextField = styled((props) => (
  <TextField InputProps={{ disableUnderline: true }} {...props} />
))(({ theme }) => ({
  "& .MuiFilledInput-root": {
    border: "1px solid #973C57",
    overflow: "hidden",
    width: "100%",
    marginBottom: "1rem",
    borderRadius: "25px",
    backgroundColor: theme.palette.mode === "light" ? "#fcfcfb" : "#2b2b2b",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    "&:hover": {
      backgroundColor: "white",
    },
    "&.Mui-focused": {
      backgroundColor: "white",
      boxShadow: `alpha(#973C57, 0.25)} 0 0 0 2px`,
      borderColor: "#973C57",
    },
    "& label.Mui-focused": {
      color: "#7F1734",
    },
  },
}));

const passwordStyle = {
  m: 1,
  width: "100%",
  "& .MuiFilledInput-root": {
    border: "1px solid #973C57",
    overflow: "hidden",

    borderRadius: "25px",
    backgroundColor: theme.palette.mode === "light" ? "#fcfcfb" : "#2b2b2b",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    "&:hover": {
      backgroundColor: "white",
    },
    "&.Mui-focused": {
      backgroundColor: "white",
      boxShadow: `alpha(#973C57, 0.25)} 0 0 0 2px`,
      borderColor: "#973C57",
    },
    "& label.Mui-focused": {
      color: "#7F1734",
    },
    "&&": {
      margin: "0",
      marginBottom: "1rem",
    },
  },
};

const informationLabel = {
  backgroundColor: "#FFFFFF",
  boxShadow:
    "2px 2px 4px rgba(0, 0, 0, 0.25), inset 2px 2px 10px rgba(0, 0, 0, 0.25)",
  borderRadius: "25px",
  color: "black",
  "&:hover": {
    backgroundColor: "lightgray",
    marginBottom: "1.8rem",
  },
  fontSize: "1.1rem",
  alignSelf: "start",
  padding: "0.8rem",
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "1rem",
};

export {
  backgroundStyleHome,
  backgroundStyleGen,
  yellowButtonStyle,
  formTextStyle,
  FormTextField,
  theme,
  passwordStyle,
  informationLabel,
};
