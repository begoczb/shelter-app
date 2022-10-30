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
  background: "#FFD900",
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

export {
  backgroundStyleHome,
  backgroundStyleGen,
  yellowButtonStyle,
  formTextStyle,
};
