import React from "react";
import { Modal, Button, Typography, Box, TextField } from "@mui/material";
import DeleteButton from 'components/CustomDeleteButton';

const EditModal = ({ open, onClose, onConfirm, editedValues, setEditedValues }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 300,
          bgcolor: "background.paper",
          borderRadius: "5px",
          boxShadow: 24,
          p: 2,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Edit Staff Member
        </Typography>
        <label>SID: {editedValues.sid}</label>
        <br />

        <label htmlFor="name">Name:</label>
        <TextField
          id="name"
          value={editedValues.name}
          onChange={(e) => setEditedValues({ ...editedValues, name: e.target.value })}
        />
        <br />

        <label htmlFor="designation">Designation:</label>
        <TextField
          id="designation"
          value={editedValues.designation}
          onChange={(e) => setEditedValues({ ...editedValues, designation: e.target.value })}
        />
        <br />

        <label htmlFor="imageurl">Image URL:</label>
        <TextField
          id="imageurl"
          value={editedValues.imageurl}
          onChange={(e) => setEditedValues({ ...editedValues, imageurl: e.target.value })}
        />
        <br />

        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <DeleteButton onClick={onClose}>
            Cancel
          </DeleteButton>
          <DeleteButton onClick={onConfirm}>
            Save
          </DeleteButton>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditModal;
