import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";


import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import AccessTimeIcon from "@mui/icons-material/AccessTime"; 
import Divider from "@mui/material/Divider";



// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDButton from "components/MDButton";
import DeleteButton from 'components/CustomDeleteButton'
import DeleteConfirmationModal from 'components/DeleteModal'
import EditModal from "components/CustomEditModal"
import AddModal from "components/CustomeAddPLModal"
import DeleteModalHod from "components/CustomeDeleteModalHod";
import ModuleTable from "components/CustomModuelTable";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";

// Overview page components
import Header from "layouts/tables/components/Header";
import ProfilesList from "examples/Lists/ProfilesList";
import IT from "assets/images/IT.jpeg"

// Data
import { styled } from "@mui/system";



const StyledCard = styled(Card)({
  backgroundColor: "gray",
  height: "200px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  transition: "transform 0.3s, color 0.3s", // Add transition for smooth effect

  // Hover styles
  "&:hover": {
    transform: "translateY(-10px)", // Move the card up on hover
    color: "orange", // Change font color on hover
  },
});

function ProgrammeDetails() {
  const { id } = useParams();

  // All the states here
  const [programmeData, setprogrammeData] = useState(null);
  const [staffData, setStaffData] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isDeleteHodModalOpen, setDeleteHodModalOpen] = useState(false);
  const [hodToDelete, setHodTODelete] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [hodData, setHodData] = useState(null);
  const [isAddModalOpen, setAddModalOpen] = useState(false);

  const handleEditClick = () => {
    setEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setEditModalOpen(false);
  };

  const handleAddClick =() => {
    setAddModalOpen(true);
  };
  const handleAddModalClose = () => {
    setAddModalOpen(false);
  }



  

  // Function to convert "id" to the desired format (e.g., "D01" for 1, "D02" for 2, etc.)
  const convertIdToEndpointFormat = (id) => {
    // Perform the conversion here based on your requirements
    return `P${id < 10 ? "0" : ""}${id}`;
  };
  const convertIdToEndpointFormat1 = (id) => {
    // Perform the conversion here based on your requirements
    return `D${id < 10 ? "0" : ""}${id}`;
  };

    useEffect(() => {
    // Use the converted "id" to construct the API endpoint
    const endpoint = `https://node-api-6l0w.onrender.com/api/v1/students/programmedetails/${convertIdToEndpointFormat(id)}`;
    const staffEndPoints =`https://node-api-6l0w.onrender.com/api/v1/students/staff/department/${convertIdToEndpointFormat1(id)}`;
    const plEndpoint = `https://node-api-6l0w.onrender.com/api/v1/students/programme/fullPL/${convertIdToEndpointFormat(id)}`;
    // Make an API request to fetch department details based on the "id"
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        setprogrammeData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

      fetch(staffEndPoints)
      .then((response)=>response.json())
        .then((data)=>{
          setStaffData(data);
        })
        .catch((error)=>{
          console.log("Error fetching StaffData", error);
        });
      fetch(plEndpoint)
        .then((response) => response.json())
        .then((data) => {
          setHodData(data);
        })
        .catch((error) => {
          console.error("Error fetching PL data:", error);
        });

  }, [id]); // This will re-run the effect when "id" changes

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  
  if (!programmeData) {
    return <div style={{ marginLeft: "300px", marginTop: "30px" }}>Loading...</div>;
  }
  if (!staffData) {
    return <div style={{ marginLeft: "300px", marginTop: "30px" }}>Loading...</div>;
  }

  


  const deletePlMember = async (staffId) => {
    try {
      const response = await fetch(
        `https://node-api-6l0w.onrender.com/api/v1/students/programme/removePL/${staffId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        setHodData((prevHoDData) =>
          prevHoDData.filter((hod) => hod.staffid !== staffId)
        );
        console.log("Programme Leader  deleted successfully");
      } else {
        console.error("Failed to delete Programme member");
      }
    } catch (error) {
      console.error("Error deleting Programme member:", error);
    }
  };
  




  const handleHodDeleteClick = (hod) => {
    setHodTODelete(hod);
    setDeleteHodModalOpen(true);

  };

  const handleMOdalHodClose = () =>{
    console.log("cancel clicked");
    setHodTODelete(null);
    setDeleteHodModalOpen(false);
  }

  // Function to close the modal


  // Function to handle the staff member deletion

  const handleHodDeleteConfirm = async () => {
    console.log("ok this wokring, delte clicked");
    if (hodToDelete) {
      console.log(hodToDelete.staffid)
      await deletePlMember(hodToDelete.staffid);
// Ensure hodToDelete is populated correctly
      handleMOdalHodClose();
    }
  };
  



  const handleEditConfirm = ()=>{
    console.log('Handle confirm opened');
  }
  const handleAddConfirm = () =>{
    console.log("Handle Add confirm opened");
  }

 

  const programmeAims = {
    1: "TThe Bachelor of Engineering in Civil Engineering aims to develop students with a thorough background in both theoretical and practical aspects of the core principles of Bachelor of Engineering in Civil Engineering, and of the underlying scientific fundamentals.",
    2: "The Bachelor of Architecture Programme aims to prepare graduates with artistic and creative skills for the global architectural market. This is achieved through practice-based learning in design studios, workshops, and construction sites, fostering both knowledge and personal development.",
    3: "The Bachelor of Engineering in Engineering Geology aims to provide knowledge and skills in engineering geology that is vital to investigation, project planning and execution of construction projects. Graduates will develop the ability to assess and make recommendations on the geological factors regarding location, design, construction, operation and maintenance of engineering works for project implementation.",
    4: "The bachelor of Engineering in Water Engineering program aims to educate professionals in managing water resources, infrastructure design, and sustainability, equipping them to tackle global water challenges effectively.",
    5: "The Bachelor of Engineering in Electrical Engineering aims to provide the graduates to build successful careers in electrical engineering equipped with basic knowledge of electrical machines, power system, power control drives and the management of electrical networks and design, with professional ethics and leadership quality.",
    6: "The Bachelor of Engineering in Electronics and Communication Engineering aims to develop students with a thorough background in both theoretical and practical aspects of the core principles of Electronics and Communication Engineering, and of the underlying scientific fundamentals.",
    7: "The Bachelor of Engineering in Instrumentation and Control Engineering aims produce graduates who can carry out modern automation of industrial systems existing in all engineering disciplines as well as in non-engineering disciplines. It emphasises the analysis, design, synthesis and optimization of control systems in order to provide the best means of controlling their dynamic behaviour to produce favourable or specified outputs.",
    8: "The Bachelor of Engineering in Information Technology aims to develop Information Technology Professionals with specializations in Networking, Software Engineering, or Information Security who will be able to contribute to the development of computing technology in the country through Research, Innovation, Creativity, and Enterprise with ethical and professional responsibility.",
    // Add more departments as needed
  };


  console.log(programmeData)

  
  const numberOfProjects = 3
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header tabValue={tabValue} setTabValue={setTabValue}>
      {(currentTab, changeTab) => (
        <>
          {currentTab === 0 && (
            <>
             <MDBox mt={5} mb={3}>
          <h1 align="center">Aim</h1>
          <p>{programmeAims[id]}</p>
          <Grid container spacing={1} marginTop={5}>
            <Grid item xs={12} md={6} xl={3}>
              <StyledCard>
                <CardContent>
                  {/* Icon */}
                  <AccessTimeIcon sx={{ fontSize: 48, color: "white" }} />

                  {/* Department Name */}
                  <Typography variant="h6" color="white" gutterBottom>
                    Award Title
                  </Typography>

                  {/* Established Date */}
                  <Typography variant="body2" color="white">
                  {programmeData.Programme[0].pname}
                  </Typography>
                </CardContent>
            </StyledCard>
          </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <StyledCard>
                  <CardContent>
                    {/* Icon */}
                    <AccessTimeIcon sx={{ fontSize: 48, color: "white" }} />

                    {/* Department Name */}
                    <Typography variant="h6" color="white" gutterBottom>
                    Programme Duration
                    </Typography>

                    {/* Established Date */}
                    <Typography variant="body2" color="white">
                    {programmeData.Programme[0].programme_duration}
                    </Typography>
                  </CardContent>
              </StyledCard>
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <StyledCard>
                  <CardContent>
                    {/* Icon */}
                    <AccessTimeIcon sx={{ fontSize: 48, color: "white" }} />

                    {/* Department Name */}
                    <Typography variant="h6" color="white" gutterBottom>
                      Established Date
                    </Typography>

                    {/* Established Date */}
                    <Typography variant="body2" color="white">
                    {(programmeData.Programme[0].established_date).split("T")[0]}
                    </Typography>
                  </CardContent>
              </StyledCard>
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <StyledCard>
                  <CardContent>
                    {/* Icon */}
                    <AccessTimeIcon sx={{ fontSize: 48, color: "white" }} />

                    {/* Department Name */}
                    <Typography variant="h6" color="white" gutterBottom>
                    Last Review Date
                    </Typography>

                    {/* Established Date */}
                    <Typography variant="body2" color="white">
                    {programmeData.Programme[0].last_reviewed_date}
                    </Typography>
                  </CardContent>
              </StyledCard>
            </Grid>
          </Grid>
        </MDBox>
            </>
          )}
          {currentTab === 1 && (
            <>
              <ModuleTable/>
            </>
          )}
          {currentTab ==2 && (
            <>
            Hello world
            </>
          )}
           
      {currentTab === 3 && (
        <>
          <MDBox mt={5} mb={3}>
          <MDButton color="primary" onClick={handleAddClick} style={{ marginBottom: 30 }}>
                  Add
                </MDButton>
            <Grid container spacing={3}>
              {hodData.map((hod) => (
                <Grid item key={hod.staffid} xs={12} md={6} xl={4}>
                  <StyledCard >
                    <MDAvatar src={hod.imageurl} alt={hod.name} size="xl" shadow="sm" />
                    <MDBox mt={4} />
                    <MDTypography variant="h6">{hod.name}</MDTypography>
                    <MDTypography variant="subtitle2" color="textSecondary">
                      {hod.designation}
                    </MDTypography>
                    <MDTypography variant="body2" color="textSecondary">
                      {hod.email}
                    </MDTypography>
                    <MDBox mt={2} />
                    <Typography variant="body2" color="textSecondary">
                      Starting Tenure: {formatDate(hod.starting_tenure)}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Ending Tenure: {formatDate(hod.ending_tenure)}
                    </Typography>
                    <DeleteButton
                          onClick={() => handleHodDeleteClick(hod)}
                        >
                          Delete
                        </DeleteButton>
                  </StyledCard>
                </Grid>
              ))}
            </Grid>
          </MDBox>
        </>
      )}

            <EditModal
              open={isEditModalOpen}
              onClose={handleEditModalClose}
              onConfirm={handleEditConfirm}
            />
            <AddModal
              open ={isAddModalOpen}
              onClose={handleAddModalClose}
              onConfrim={handleAddConfirm}
              staffDetails={staffData} 
              PID = {convertIdToEndpointFormat(id)}
             />

            <DeleteModalHod
            open ={isDeleteHodModalOpen}
            onClose={handleMOdalHodClose}
            onConfirm={handleHodDeleteConfirm}
             />
              </>
      )}
    </Header>
      <Footer />
    </DashboardLayout>
  );
}

export default ProgrammeDetails;

