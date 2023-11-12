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

  // Material Dashboard 2 React example components
  import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
  import DashboardNavbar from "examples/Navbars/DashboardNavbar";
  import Footer from "examples/Footer";

  import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";

  // Overview page components
  import Header from "layouts/billing/components/Header";
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

  function DepartmentDetails() {
    const { id } = useParams();

    // All the states here
    const [departmentData, setDepartmentData] = useState(null);
    const [staffData, setStaffData] = useState(null);
    const [tabValue, setTabValue] = useState(0);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [staffToDelete, setStaffToDelete] = useState(null);
    const [isEditModalOpen, setEditModalOpen] = useState(false);

    const handleEditClick = () => {
      setEditModalOpen(true);
    };
  
    const handleEditModalClose = () => {
      setEditModalOpen(false);
    };
  

  
    

    // Function to convert "id" to the desired format (e.g., "D01" for 1, "D02" for 2, etc.)
    const convertIdToEndpointFormat = (id) => {
      // Perform the conversion here based on your requirements
      return `D${id < 10 ? "0" : ""}${id}`;
    };

      useEffect(() => {
      // Use the converted "id" to construct the API endpoint
      const endpoint = `https://node-api-6l0w.onrender.com/api/v1/students/departmentdetails/${convertIdToEndpointFormat(id)}`;
      const staffEndPoints =`https://node-api-6l0w.onrender.com/api/v1/students/staff/department/${convertIdToEndpointFormat(id)}`;

      // Make an API request to fetch department details based on the "id"
      fetch(endpoint)
        .then((response) => response.json())
        .then((data) => {
          setDepartmentData(data);
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
          })
  
    }, [id]); // This will re-run the effect when "id" changes

    
    if (!departmentData) {
      return <div style={{ marginLeft: "300px", marginTop: "30px" }}>Loading...</div>;
    }
    if (!staffData) {
      return <div style={{ marginLeft: "300px", marginTop: "30px" }}>Loading...</div>;
    }

    const deleteStaffMember = async (staffId) => {
      try {
        const response = await fetch(
          `https://node-api-6l0w.onrender.com/api/v1/students/staff/delete/${staffId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
  
        if (response.ok) {
          // Update the staffData state to reflect the deletion
          setStaffData((prevStaffData) =>
            prevStaffData.filter((staff) => staff.sid !== staffId)
          );
          console.log("Staff member deleted successfully");
        } else {
          console.error("Failed to delete staff member");
        }
      } catch (error) {
        console.error("Error deleting staff member:", error);
      }
    };


    const handleDeleteClick = (staff) => {
      setStaffToDelete(staff);
      setDeleteModalOpen(true);
    };
  
    // Function to close the modal
    const handleModalClose = () => {
      setStaffToDelete(null);
      setDeleteModalOpen(false);
    };
  
    // Function to handle the staff member deletion
    const handleDeleteConfirm = async () => {
      if (staffToDelete) {
        // Call your delete function here
        await deleteStaffMember(staffToDelete.sid);
        // Close the modal
        handleModalClose();
      }
    };
    const handleEditConfirm = ()=>{
      console.log('Handle confirm opened');
    }

    const departmentAims = {
      1: "The Department of Civil Engineering aims to develop students with a thorough background in both theoretical and practical aspects of the core principles of Bachelor of Engineering in Civil Engineering, and of the underlying scientific fundamentals.",
      2: "The Electrical Department aims to provide the graduates to build successful careers in electrical engineering equipped with basic knowledge of electrical machines, power system, power control drives and the management of electrical networks and design, with professional ethics and leadership quality.",
      3: "The ECE Department aims to develop students with a thorough background in both theoretical and practical aspects of the core principles of Electronics and Communication Engineering, and of the underlying scientific fundamentals.",
      4: "The Department of Information Technology aims to develop Information Technology Professionals with specializations in Networking, Software Engineering, or Information Security who will be able to contribute to the development of computing technology in the country through Research, Innovation, Creativity, and Enterprise with ethical and professional responsibility.",
      5: "The Science and Humanities department aims to cultivate interdisciplinary excellence by encouraging collaboration between the sciences and humanities, nurturing critical thinking skills to address complex issues, and bridging the gap between scientific knowledge and humanistic understanding.",
      // Add more departments as needed
    };

  

    
    const numberOfProjects = departmentData.department[0].nprogram; 
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
            <p>{departmentAims[id]}</p>
            <Grid container spacing={1} marginTop={5}>
              <Grid item xs={12} md={6} xl={4}>
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
                    {departmentData.department[0].dname}
                    </Typography>
                  </CardContent>
              </StyledCard>
            </Grid>
              <Grid item xs={12} xl={4}>
                <StyledCard>
                    <CardContent>
                      {/* Icon */}
                      <AccessTimeIcon sx={{ fontSize: 48, color: "white" }} />

                      {/* Department Name */}
                      <Typography variant="h6" color="white" gutterBottom>
                      Programmes Offered
                      </Typography>

                      {/* Established Date */}
                      <Typography variant="body2" color="white">
                      {departmentData.department[0].nprogram}
                      </Typography>
                    </CardContent>
                </StyledCard>
              </Grid>
              <Grid item xs={12} xl={4}>
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
                      {(departmentData.department[0].established_date).split("T")[0]}
                      </Typography>
                    </CardContent>
                </StyledCard>
              </Grid>
            </Grid>
          </MDBox>
          <MDBox pt={2} px={2} lineHeight={1.25}>
            <MDTypography variant="h6" fontWeight="medium">
              Programmes
            </MDTypography>
            
          </MDBox>
          <MDBox p={2}>
            <Grid container spacing={6}>
              {[...Array(numberOfProjects)].map((_, index) => (
                <Grid
                  item
                  key={index}
                  xs={12}
                  md={6}
                  xl={12 / numberOfProjects}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                <DefaultProjectCard
                  image={departmentData.Programme[index].imageurl}
                  label={`project #${index + 1}`}
                  title={departmentData.Programme[index].pname} 
                  description={departmentData.Programme[index].description}
                  action={{
                    type: "internal",
                    route: `/pages/profile/profile-overview/${index + 1}`,
                    color: "info",
                    label: "view project",
                  }}
                  authors={[
                    { image: `team${index + 1}`, name: `Author ${index + 1}` },
                    // Add more authors if needed
                  ]}
                  sx={{ textAlign: "center" }}
                  // Adjust the width and height as needed
                />
                </Grid>
              ))}
            </Grid>
           </MDBox>
             
              </>
            )}
            {currentTab === 1 && (
              <>
                <MDBox mt={5} mb={3}>
                <MDButton variant="contained" color="primary" onClick={handleEditClick} style={{ marginBottom: 30 }}>
                    Add
                  </MDButton>
                  <Grid container spacing={3}>
                    {staffData.map((staff) => (
                      <Grid item key={staff.sid} xs={12} md={6} xl={4}>
                        <StyledCard>
                          <MDAvatar src={staff.imageurl} alt={staff.name} size="xl" shadow="sm" />
                          <MDBox mt={2} />
                          <MDTypography variant="h6">{staff.name}</MDTypography>
                          <MDTypography variant="subtitle2" color="textSecondary">
                            {staff.designation}
                          </MDTypography>
                          <MDTypography variant="body2" color="textSecondary">
                            {staff.email}
                          </MDTypography>
                          <MDBox mt={2} />

                          <DeleteButton
                            onClick={() => handleDeleteClick(staff)}
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
          <DeleteConfirmationModal
                  open={isDeleteModalOpen}
                  onClose={handleModalClose}
                  onConfirm={handleDeleteConfirm}
                />
        </>
        )}
      </Header>
        <Footer />
      </DashboardLayout>
    );
  }

  export default DepartmentDetails;

