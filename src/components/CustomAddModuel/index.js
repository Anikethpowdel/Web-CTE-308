import React, { useState } from 'react';
import MDButton from 'components/MDButton';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

const EditModal = ({ open, onClose }) => {
  const [focusedInput, setFocusedInput] = useState(null);
  const [formData, setFormData] = useState({
    SID: '',
    Name: '',
    Designation: '',
    Email: '',
    ImageURL: '',
    DepartmentNo: '',
  });
  const [validationErrors, setValidationErrors] = useState({
    SID: '',
    Name: '',
    Email: '',
    ImageURL: '',
    DepartmentNo: '',
    // Add more fields for validation errors if needed
  });
  const [loading, setLoading] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);

  const handleInputFocus = (fieldName) => {
    setFocusedInput(fieldName);
  };

  const handleInputBlur = () => {
    setFocusedInput(null);
  };

  const handleInputChange = (fieldName, value) => {
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: '',
    }));

  // Add your validation logic here
  if (fieldName === 'SID' && !value.startsWith('RUB')) {
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: 'SID must start with "RUB"',
    }));
  }

  if (fieldName === 'Name' && !isNaN(value)) {
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: 'Name cannot be a number',
    }));
  }

  if (fieldName === 'Email' && !/^.+\.cst@rub\.edu\.bt$/.test(value)) {
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: 'Email must be in the format name.cst@rub.edu.bt',
    }));
  }
  if (fieldName === 'ImageURL' && !isValidURL(value)) {
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: 'Invalid URL',
    }));
  }

  if (fieldName === 'DepartmentNo' && !isValidDepartment(value)) {
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: 'Invalid Department ID. Allowed values are D01, D02, D03, D04, D05',
    }));
  }


    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const isValidURL = (str) => {
    try {
      new URL(str);
      return true;
    } catch (error) {
      return false;
    }
  };

  const isValidDepartment = (value) => {
    const allowedDepartments = ['D01', 'D02', 'D03', 'D04', 'D05'];
    return allowedDepartments.includes(value);
  };

  const isSaveDisabled = Object.values(formData).some((value) => !value.trim());

  const handleSave = async () => {
    setLoading(true);

    const requestData = [
      {
        sid: formData.SID,
        name: formData.Name,
        designation: formData.Designation,
        email: formData.Email,
        imageurl: formData.ImageURL,
        deptno: formData.DepartmentNo,
      }
    ];

    try {
      const response = await fetch('https://node-api-6l0w.onrender.com/api/v1/students/department/addStaff', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        setSuccessModalOpen(true);
        // You can add any additional logic here (e.g., show a success message, close the modal, etc.)
      } else {
        setErrorModalOpen(true);
      }
    } catch (error) {
      setErrorModalOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSuccessModalClose = () => {
    setSuccessModalOpen(false);
    onClose();
  };

  const handleErrorModalClose = () => {
    setErrorModalOpen(false);
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
              borderColor: validationErrors.SID ? 'red' : '', // Set border color to red if there's a validation error
            }}
            onFocus={() => handleInputFocus('SID')}
            onBlur={handleInputBlur}
            onChange={(e) => handleInputChange('SID', e.target.value)}
          />
          {/* Display validation error message */}
          {validationErrors.SID && <p style={{ color: 'red', margin: 0 }}>{validationErrors.SID}</p>}
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
            onChange={(e) => handleInputChange('Name', e.target.value)}
          />
          {validationErrors.Name && <p style={{ color: 'red', margin: 0 }}>{validationErrors.Name}</p>}
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
            onChange={(e) => handleInputChange('Designation', e.target.value)}
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
              borderColor: validationErrors.Email ? 'red' : '', // Set border color to red if there's a validation error
            }}
            onFocus={() => handleInputFocus('Email')}
            onBlur={handleInputBlur}
            onChange={(e) => handleInputChange('Email', e.target.value)}
          />
          {/* Display validation error message */}
          {validationErrors.Email && <p style={{ color: 'red', margin: 0 }}>{validationErrors.Email}</p>}
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
            onChange={(e) => handleInputChange('ImageURL', e.target.value)}
          />
          {validationErrors.ImageURL && <p style={{ color: 'red', margin: 0 }}>{validationErrors.ImageURL}</p>}
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
            onChange={(e) => handleInputChange('DepartmentNo', e.target.value)}
          />
          {validationErrors.DepartmentNo && <p style={{ color: 'red', margin: 0 }}>{validationErrors.DepartmentNo}</p>}
        </div>
        
        {/* ... (your existing input fields) */}

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
            onClick={handleSave}
            disabled={isSaveDisabled || loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Save'}
          </MDButton>
        </Box>

        {/* Success Modal */}
        <div style={{ display: successModalOpen ? 'block' : 'none', position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)' }}>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', width: '400px' }}>
            <h2 align="Center">Success</h2>
            <p align="center">Staff member added successfully!</p>
            <Box mt={2} display="flex" justifyContent="center">
              <MDButton
                color="success"
                variant="contained"
                onClick={handleSuccessModalClose}
              >
                OK
              </MDButton>
            </Box>
          </div>
        </div>

        {/* Error Modal */}
        <div style={{ display: errorModalOpen ? 'block' : 'none', position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)' }}>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', width: '400px' }}>
            <h2 align="Center">Error</h2>
            <p align="center">Failed to add staff member. Please try again later.</p>
            <Box mt={2} display="flex" justifyContent="center">
              <MDButton
                color="error"
                variant="contained"
                onClick={handleErrorModalClose}
              >
                OK
              </MDButton>
            </Box>
          </div>
        </div>
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
// ... (your existing styles)

export default EditModal;
