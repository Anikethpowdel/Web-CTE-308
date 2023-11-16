import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import MDButton from 'components/MDButton';
import { useState } from 'react';

const AddModal = ({ open, onClose, staffDetails }) => {
  const [focusedInput, setFocusedInput] = useState(null);
  const [formData, setFormData] = useState({
    StaffID: '',
    StartingTenure: '',
    EndingTenure: '',
  });
  const [validationErrors, setValidationErrors] = useState({
    StaffID: '',
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


    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));

    console.log(`Field ${fieldName} changed to: ${value}`);
  };


  const isSaveDisabled = Object.values(formData).some((value) => !value.trim());

  const departmentNo = staffDetails[0].deptno;

  const handleSave = async () => {
    const newStaffId = formData.StaffID;
    if (!formData.StaffID){
      console.log("StaffId is empty");
      return;
    }
   console.log(newStaffId);
    setLoading(true);

    const requestData = [
      {
        deptid: departmentNo,
        staffid: formData.StaffID,
        starting_tenure : formData.StartingTenure,
        ending_tenure : formData.EndingTenure,

      }
    ];
    console.log('Request Data:', requestData); 

    try {
      const response = await fetch('https://node-api-6l0w.onrender.com/api/v1/students/department/HOD', {
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

  const handleAddClick =() => {
    setAddModalOpen(true);
  };
  const handleAddModalClose = () => {
    setAddModalOpen(false);
    }
  




  return (
    <div style={{ display: open ? 'block' : 'none', position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)' }}>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', width: '400px', maxHeight: '80vh', overflowY: 'auto' }}>
        <h2 align="Center">Add Head of Department</h2>

       
        
         {/* Dropdown for StaffIDs */}
        <FormControl style={{ marginBottom: '20px', width: '100%' }}>
          <InputLabel id="staffIdLabel" style={{ height:"20px"}}>StaffID:</InputLabel>
          <Select
            labelId="staffIdLabel"
            label="StaffID"
            style={{
              borderBottom: focusedInput === 'StaffID' ? '1px solid #4CAF50' : '1px solid #000',
              fontSize: '20px',
            }}
            onFocus={() => handleInputFocus('StaffID')}
            onBlur={handleInputBlur}
            onChange={(e) => handleInputChange('StaffID', e.target.value)}
            value={formData.StaffID} 
          >
            <MenuItem value="">Select StaffID</MenuItem>
            {staffDetails &&
              staffDetails.map((staff) => (
                <MenuItem key={staff.sid} value={staff.sid}>
                  {staff.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>

        {/* Starting Tenure */}
        <div style={{ marginBottom: '20px', width: '100%' }}>
          <label htmlFor="startingTenure" style={{ marginBottom: '5px', display: 'block' }}>
            Starting Tenure: 
          </label>
          <input
            id="startingTenure"
            type="date"
            value={formData.StartingTenure}
            onFocus={() => handleInputFocus('StartingTenure')}
            onBlur={handleInputBlur}
            onChange={(e) => handleInputChange('StartingTenure', e.target.value)}
            style={{ height: '50px', width: '100%', padding: '10px', fontSize: '16px' }}
          />
        </div>

        {/* Ending Tenure */}
        <div style={{ marginBottom: '20px', width: '100%' }}>
          <label htmlFor="endingTenure" style={{ marginBottom: '5px', display: 'block' }}>
            Ending Tenure: 
          </label>
          <input
            id="endingTenure"
            type="date"
            value={formData.EndingTenure}
            onFocus={() => handleInputFocus('EndingTenure')}
            onBlur={handleInputBlur}
            onChange={(e) => handleInputChange('EndingTenure', e.target.value)}
            style={{ height: '50px', width: '100%', padding: '10px', fontSize: '16px' }}
          />
        </div>

        
        {/* Department*/}
        <FormControl style={{ marginBottom: '20px', width: '100%',  height : "10px"}}>
          <InputLabel id="departmentNoLabel">Department No:</InputLabel>
          <Select
            labelId="departmentNoLabel"
            label="Department No"
            style={{
              borderBottom: focusedInput === 'DepartmentNo' ? '1px solid #4CAF50' : '1px solid #000',
              fontSize: '20px',
            }}
            value={departmentNo}
            onFocus={() => handleInputFocus('DepartmentNo')}
            onBlur={handleInputBlur}
            disabled // Make it read-only
          >
            <MenuItem value={departmentNo}>{departmentNo}</MenuItem>
          </Select>
        </FormControl>

        
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
  padding: '10px',
  marginBottom: '5px',
  transition: 'border-bottom 0.3s',
  fontSize: '20px',
};
// ... (your existing styles)

export default AddModal;
