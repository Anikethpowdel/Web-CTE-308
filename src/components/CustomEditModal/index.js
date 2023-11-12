import React, { useState } from 'react';
import MDButton from 'components/MDButton';
import Box from '@mui/material/Box';

const EditModal = ({ open, onClose }) => {
  const [focusedInput, setFocusedInput] = useState(null);

  const handleInputFocus = (fieldName) => {
    setFocusedInput(fieldName);
  };

  const handleInputBlur = () => {
    setFocusedInput(null);
  };

  return (
    <div style={{ display: open ? 'block' : 'none', position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)' }}>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', width: '600px', maxHeight: '80vh', overflowY: 'auto' }}>
        <h2 align="Center">Add Staff Member</h2>

        {/* SID */}
        <div style={inputGroupStyle}>
          <label style={labelStyle}>SID:</label>
          <input
            type="text"
            style={{
              ...inputStyle,
              borderBottom: focusedInput === 'SID' ? '1px solid #4CAF50' : '1px solid #000',
            }}
            onFocus={() => handleInputFocus('SID')}
            onBlur={handleInputBlur}
          />
        </div>

        {/* Name */}
        <div style={inputGroupStyle}>
          <label style={labelStyle}>Name:</label>
          <input
            type="text"
            style={{
              ...inputStyle,
              borderBottom: focusedInput === 'Name' ? '1px solid #4CAF50' : '1px solid #000',
            }}
            onFocus={() => handleInputFocus('Name')}
            onBlur={handleInputBlur}
          />
        </div>

        {/* Designation */}
        <div style={inputGroupStyle}>
          <label style={labelStyle}>Designation:</label>
          <input
            type="text"
            style={{
              ...inputStyle,
              borderBottom: focusedInput === 'Designation' ? '1px solid #4CAF50' : '1px solid #000',
            }}
            onFocus={() => handleInputFocus('Designation')}
            onBlur={handleInputBlur}
          />
        </div>

        {/* Email */}
        <div style={inputGroupStyle}>
          <label style={labelStyle}>Email:</label>
          <input
            type="text"
            style={{
              ...inputStyle,
              borderBottom: focusedInput === 'Email' ? '1px solid #4CAF50' : '1px solid #000',
            }}
            onFocus={() => handleInputFocus('Email')}
            onBlur={handleInputBlur}
          />
        </div>

        {/* Image URL */}
        <div style={inputGroupStyle}>
          <label style={labelStyle}>Image URL:</label>
          <input
            type="text"
            style={{
              ...inputStyle,
              borderBottom: focusedInput === 'ImageURL' ? '1px solid #4CAF50' : '1px solid #000',
            }}
            onFocus={() => handleInputFocus('ImageURL')}
            onBlur={handleInputBlur}
          />
        </div>

         {/* Department*/}
         <div style={inputGroupStyle}>
          <label style={labelStyle}>Department No:</label>
          <input
            type="text"
            style={{
              ...inputStyle,
              borderBottom: focusedInput === 'DepartmentNo' ? '1px solid #4CAF50' : '1px solid #000',
            }}
            onFocus={() => handleInputFocus('DepartmentNo')}
            onBlur={handleInputBlur}
          />
        </div>

        {/* Buttons */}
        <Box mt={2} display="flex" justifyContent="center">
          <MDButton
            color="error"
            variant="contained"
            onMouseOver={(e) => (e.target.style.backgroundColor = '#FF5555')}
            onMouseOut={(e) => (e.target.style.backgroundColor = '')}
            onClick={onClose}
          >
            Cancel
          </MDButton>
          <MDButton
            color="success"
            variant="contained"
            sx={{ marginRight: '10px' }}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#4CAF50')}
            onMouseOut={(e) => (e.target.style.backgroundColor = '')}
          >
            Save
          </MDButton>
        </Box>
      </div>
    </div>
  );
};

// Styles
const inputGroupStyle = {
  display: 'flex',
  flexDirection: 'column',
  marginBottom: '20px',
};

const labelStyle = {
  marginBottom: '5px',
  minWidth: '80px',
};

const inputStyle = {
  border: 'none',
  borderBottom: '1px solid #000', // Bottom border around the textbox
  outline: 'none',
  width: '100%',
  padding: '5px',
  marginBottom: '5px',
  transition: 'border-bottom 0.3s',
  fontSize: '20px',
};

export default EditModal;
