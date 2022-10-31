import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Form from "./Form/Form.jsx";
import { Container } from "@mui/material";
import { modalStyle, yellowButtonStyle } from "../utils/globalStyles.js";

export default function BasicModal({ hostRooms, setHostRooms }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Container>
      <Button onClick={handleOpen} sx={yellowButtonStyle}>
        Add new listing
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Room
          </Typography>
          <Form
            handleClose={handleClose}
            hostRooms={hostRooms}
            setHostRooms={setHostRooms}
          />
        </Box>
      </Modal>
    </Container>
  );
}
