import React from "react";
import { Modal, Button, Typography, Box } from "@mui/material";
import DeleteButton from 'components/CustomDeleteButton'

const DeleteConfirmationModal = ({ open, onClose, onConfirm }) => {
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
          Are you sure you want to delete this staff member?
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <DeleteButton onClick={onClose}>
            Cancel
          </DeleteButton>
          <DeleteButton onClick={onConfirm}>
            Delete
          </DeleteButton>
        </Box>
      </Box>
    </Modal>
  );
};

export default DeleteConfirmationModal;
