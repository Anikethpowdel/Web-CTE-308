import React, { useState } from 'react';
import MDButton from 'components/MDButton';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

const EditModal = ({ open, onClose }) => {
  const [focusedInput, setFocusedInput] = useState(null);
  const [formData, setFormData] = useState({
    // Add your required fields here
    ModuleCode: '',
    ModuleName: '',
    LectureHour: '',
    TutorialHour: '',
    PracticalHour: '',
    ModuleCredit: '',
    TheoryCAMarks: '',
    TheoryExamMarks: '',
    PracticalCAMarks: '',
    SemesterNumber: '',
    ModuleOwner: '',
    ModuleCoordinator: '',
    PID: '',
    BorrowedModule: '',
  });
  const [validationErrors, setValidationErrors] = useState({

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

    let error = '';

  switch (fieldName) {
    case 'ModuleName':
      // Check if ModuleName contains any numbers
      if (/\d/.test(value)) {
        error = 'Module Name cannot contain numbers';
      }
      break;
    case 'TutorialHour':
    case 'PracticalHour':
    case 'LectureHour':
      // Check if TutorialHour, PracticalHour, LectureHour is a number and not greater than 99
      if (isNaN(value) || parseInt(value) > 99) {
        error = 'Invalid input. Must be a number and less than 100';
      }
      break;
    case 'ModuleCredit':
      // Check if ModuleCredit is a number
      if (isNaN(value)) {
        error = 'Module Credit must be a number';
      }
      break;
    // Add similar cases for other fields with specific validations
    default:
      break;
  }
  // Add your validation logic here

    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };



  const isSaveDisabled = Object.values(formData).some((value) => !value.trim());

  const handleSave = async () => {
    setLoading(true);
    console.log(formData);

    const requestData = [
      {
        mid: formData.ModuleCode,
        mname: formData.ModuleName,
        module_credit: formData.ModuleCredit,
        lecture_hour: formData.LectureHour,
        practical_hour: formData.PracticalHour,
        theory_ca_marks: formData.TheoryCAMarks,
        theory_exam_marks: formData.TheoryExamMarks,
        practical_ca_marks: formData.PracticalCAMarks,
        semno: formData.SemesterNumber,
        module_owner: formData.ModuleOwner,
        module_coordinator: formData.ModuleCoordinator,
        pid: formData.PID,
        borrowed_module: formData.BorrowedModule
      }
    ];
    console.log(requestData);

    try {
      const response = await fetch('https://node-api-6l0w.onrender.com/api/v1/students/programme/addModule', {
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
        <h2 align="Center">Add Module</h2>

      {/* Module Code */}
      <div style={inputGroupStyle}>
          <label style={labelStyle}>Module Code:</label>
          <input
            type="text"
            style={{
              ...inputStyle,
              borderBottom: focusedInput === 'ModuleCode' ? '1px solid #4CAF50' : '1px solid #000',
              borderColor: validationErrors.ModuleCode ? 'red' : '',
            }}
            onFocus={() => handleInputFocus('ModuleCode')}
            onBlur={handleInputBlur}
            onChange={(e) => handleInputChange('ModuleCode', e.target.value)}
            value={formData.ModuleCode} 
          />

        </div>

        {/* Module Name */}
        <div style={inputGroupStyle}>
          <label style={labelStyle}>Module Name:</label>
          <input
            type="text"
            style={{
              ...inputStyle,
              borderBottom: focusedInput === 'ModuleName' ? '1px solid #4CAF50' : '1px solid #000',
              borderColor: validationErrors.ModuleName ? 'red' : '',
            }}
            onFocus={() => handleInputFocus('ModuleName')}
            onBlur={handleInputBlur}
            onChange={(e) => handleInputChange('ModuleName', e.target.value)}
            value={formData.ModuleName} 
          />
          {validationErrors.ModuleName && <span style={{ color: 'red' }}>{validationErrors.ModuleName}</span>}
        </div>

        {/* Lecture Hour */}
        <div style={inputGroupStyle}>
          <label style={labelStyle}>Lecture Hour:</label>
          <input
            type="text"
            style={{
              ...inputStyle,
              borderBottom: focusedInput === 'LectureHour' ? '1px solid #4CAF50' : '1px solid #000',
              borderColor: validationErrors.LectureHour ? 'red' : '',
            }}
            onFocus={() => handleInputFocus('LectureHour')}
            onBlur={handleInputBlur}
            onChange={(e) => handleInputChange('LectureHour', e.target.value)}
            value={formData.LectureHour} 
          />
        </div>
         {/* Tutorail Hour */}
         <div style={inputGroupStyle}>
          <label style={labelStyle}>Tutorail Hour:</label>
          <input
            type="text"
            style={{
              ...inputStyle,
              borderBottom: focusedInput === 'TutorialHour' ? '1px solid #4CAF50' : '1px solid #000',
              borderColor: validationErrors.TutorialHour ? 'red' : '',
            }}
            onFocus={() => handleInputFocus('TutorialHour')}
            onBlur={handleInputBlur}
            onChange={(e) => handleInputChange('TutorialHour', e.target.value)}
            value={formData.TutorialHour} 
          />
        </div>
        
         {/* Practical Hour */}
         <div style={inputGroupStyle}>
          <label style={labelStyle}>Practical Hour:</label>
          <input
            type="text"
            style={{
              ...inputStyle,
              borderBottom: focusedInput === 'PracticalHour' ? '1px solid #4CAF50' : '1px solid #000',
              borderColor: validationErrors.PracticalHour ? 'red' : '',
            }}
            onFocus={() => handleInputFocus('PracticalHour')}
            onBlur={handleInputBlur}
            onChange={(e) => handleInputChange('PracticalHour', e.target.value)}
            value={formData.PracticalHour} 
          />
        </div>
         {/* Module Credit */}
         <div style={inputGroupStyle}>
          <label style={labelStyle}>Module Credit:</label>
          <input
            type="text"
            style={{
              ...inputStyle,
              borderBottom: focusedInput === 'ModuleCredit' ? '1px solid #4CAF50' : '1px solid #000',
              borderColor: validationErrors.ModuleCredit ? 'red' : '',
            }}
            onFocus={() => handleInputFocus('ModuleCredit')}
            onBlur={handleInputBlur}
            onChange={(e) => handleInputChange('ModuleCredit', e.target.value)}
            value={formData.ModuleCredit} 
          />
        </div>
        {/* Theory CA Marks */}
        <div style={inputGroupStyle}>
          <label style={labelStyle}>Theory CA Marks:</label>
          <input
            type="text"
            style={{
              ...inputStyle,
              borderBottom: focusedInput === 'TheoryCAMarks' ? '1px solid #4CAF50' : '1px solid #000',
              borderColor: validationErrors.TheoryCAMarks ? 'red' : '',
            }}
            onFocus={() => handleInputFocus('TheoryCAMarks')}
            onBlur={handleInputBlur}
            onChange={(e) => handleInputChange('TheoryCAMarks', e.target.value)}
            value={formData.TheoryCAMarks} 
          />
        </div>
        {/* TheoryExamMarks*/}
        <div style={inputGroupStyle}>
          <label style={labelStyle}>Theory Exam Marks:</label>
          <input
            type="text"
            style={{
              ...inputStyle,
              borderBottom: focusedInput === 'TheoryExamMarks' ? '1px solid #4CAF50' : '1px solid #000',
              borderColor: validationErrors.TheoryExamMarks ? 'red' : '',
            }}
            onFocus={() => handleInputFocus('TheoryExamMarks')}
            onBlur={handleInputBlur}
            onChange={(e) => handleInputChange('TheoryExamMarks', e.target.value)}
            value={formData.TheoryExamMarks} 
          />
        </div>

        {/* PracticalCAMarks*/}
        <div style={inputGroupStyle}>
          <label style={labelStyle}>Practical CA Marks:</label>
          <input
            type="text"
            style={{
              ...inputStyle,
              borderBottom: focusedInput === 'PracticalCAMarks' ? '1px solid #4CAF50' : '1px solid #000',
              borderColor: validationErrors.PracticalCAMarks ? 'red' : '',
            }}
            onFocus={() => handleInputFocus('PracticalCAMarks')}
            onBlur={handleInputBlur}
            onChange={(e) => handleInputChange('PracticalCAMarks', e.target.value)}
            value={formData.PracticalCAMarks} 
          />
        </div>
        {/* SemesterNumber*/}
        <div style={inputGroupStyle}>
          <label style={labelStyle}>Semester Number:</label>
          <input
            type="text"
            style={{
              ...inputStyle,
              borderBottom: focusedInput === 'SemesterNumber' ? '1px solid #4CAF50' : '1px solid #000',
              borderColor: validationErrors.SemesterNumber ? 'red' : '',
            }}
            onFocus={() => handleInputFocus('SemesterNumber')}
            onBlur={handleInputBlur}
            onChange={(e) => handleInputChange('SemesterNumber', e.target.value)}
            value={formData.SemesterNumber} 
          />
        </div>
        {/* ModuleOwner*/}
        <div style={inputGroupStyle}>
          <label style={labelStyle}>Module Owner:</label>
          <input
            type="text"
            style={{
              ...inputStyle,
              borderBottom: focusedInput === 'ModuleOwner' ? '1px solid #4CAF50' : '1px solid #000',
              borderColor: validationErrors.ModuleOwner ? 'red' : '',
            }}
            onFocus={() => handleInputFocus('ModuleOwner')}
            onBlur={handleInputBlur}
            onChange={(e) => handleInputChange('ModuleOwner', e.target.value)}
            value={formData.ModuleOwner} 
          />
        </div>

         {/* Module Coordinator*/}
         <div style={inputGroupStyle}>
          <label style={labelStyle}>Module Coordinator:</label>
          <input
            type="text"
            style={{
              ...inputStyle,
              borderBottom: focusedInput === 'ModuleCoordinator' ? '1px solid #4CAF50' : '1px solid #000',
              borderColor: validationErrors.ModuleCoordinator ? 'red' : '',
            }}
            onFocus={() => handleInputFocus('ModuleCoordinator')}
            onBlur={handleInputBlur}
            onChange={(e) => handleInputChange('ModuleCoordinator', e.target.value)}
            value={formData.ModuleCoordinator} 
          />
        </div>
        {/* BorrowedModule*/}
        <div style={inputGroupStyle}>
          <label style={labelStyle}>Borrowed Module:</label>
          <input
            type="text"
            style={{
              ...inputStyle,
              borderBottom: focusedInput === 'BorrowedModule' ? '1px solid #4CAF50' : '1px solid #000',
              borderColor: validationErrors.BorrowedModule ? 'red' : '',
            }}
            onFocus={() => handleInputFocus('BorrowedModule')}
            onBlur={handleInputBlur}
            onChange={(e) => handleInputChange('BorrowedModule', e.target.value)}
            value={formData.BorrowedModule} 
          />
        </div>
        <div style={inputGroupStyle}>
          <label style={labelStyle}>PID:</label>
          <input
            type="text"
            style={{
              ...inputStyle,
              borderBottom: focusedInput === 'PID' ? '1px solid #4CAF50' : '1px solid #000',
              borderColor: validationErrors.PID ? 'red' : '',
            }}
            onFocus={() => handleInputFocus('PID')}
            onBlur={handleInputBlur}
            onChange={(e) => handleInputChange('PID', e.target.value)}
            value={formData.PID} 
          />
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
