// CustomStyledButton.js
import { Button } from "@mui/material";
import { styled } from "@mui/system";

const CustomStyledButton = styled(Button)({
  // Default styles
  color: "error", // Set text color to "error" (you can use any valid color)
  borderColor: "red", // Set border color to red
  backgroundColor: "white",

  // Hover styles
  "&:hover": {
    backgroundColor: "red", // Change background color on hover
    color: "white", // Change text color on hover
  },
});

export default CustomStyledButton;
