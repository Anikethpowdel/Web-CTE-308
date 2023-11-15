import React, { useState } from "react";
import { Modal, Typography, Box, CircularProgress, Button } from "@mui/material";
import DeleteButton from 'components/CustomDeleteButton';

const DeleteModal = ({ open, onClose, onConfirm }) => {
  const [isLoading, setLoading] = useState(false);

  const handleConfirmClick = async () => {
    setLoading(true);
    try {
      await onConfirm(); // Trigger the deletion operation
      // Once the deletion operation is complete, close the modal and reset loading state
      setLoading(false);
      onClose();
    } catch (error) {
      // Handle error if deletion fails
      setLoading(false);
      console.error("Error during deletion:", error);
    }
  };

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
          Are you sure you want to delete this Head of Department?
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <DeleteButton onClick={onClose}>
            Cancel
          </DeleteButton>
          <Button
            variant="contained"
            onClick={handleConfirmClick}
            disabled={isLoading}
          >
            {isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Delete"
            )}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DeleteModal;
