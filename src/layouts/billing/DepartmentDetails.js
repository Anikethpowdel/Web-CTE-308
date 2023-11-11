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

  // Material Dashboard 2 React example components
  import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
  import DashboardNavbar from "examples/Navbars/DashboardNavbar";
  import Footer from "examples/Footer";

  import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";

  // Overview page components
  import Header from "layouts/billing/components/Header";
  import IT from "assets/images/IT.jpeg"

  // Data
  import { styled } from "@mui/system";



  const StyledCard = styled(Card)({
    backgroundColor: "black",
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
    const [departmentData, setDepartmentData] = useState(null);

    // Function to convert "id" to the desired format (e.g., "D01" for 1, "D02" for 2, etc.)
    const convertIdToEndpointFormat = (id) => {
      // Perform the conversion here based on your requirements
      return `D${id < 10 ? "0" : ""}${id}`;
    };

      useEffect(() => {
      // Use the converted "id" to construct the API endpoint
      const endpoint = `https://node-api-6l0w.onrender.com/api/v1/students/departmentdetails/${convertIdToEndpointFormat(id)}`;

      // Make an API request to fetch department details based on the "id"
      fetch(endpoint)
        .then((response) => response.json())
        .then((data) => {
          setDepartmentData(data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }, [id]); // This will re-run the effect when "id" changes

    if (!departmentData) {
      return <div style={{ marginLeft: "300px", marginTop: "30px" }}>Loading...</div>;
    }

  

    
    const numberOfProjects = departmentData.department[0].nprogram; 
    return (
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox mb={2} />
        <Header>
          <MDBox mt={5} mb={3}>
            <h1 align="center">Aim</h1>
            <p>The Bachelor of Engineering in Information Technology (BE IT) aims to develop Information Technology Professionals with specializations in Networking, Software Engineering or Information Security who will be able to contribute to the development of computing technology in the country through Research, Innovation, Creativity and Enterprise with ethical and professional responsibility.</p>
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
  image={IT}
  label={`project #${index + 1}`}
  title={departmentData.Programme[index].pname} 
  description={`Description #${index + 1}`}
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

        </Header>
        <Footer />
      </DashboardLayout>
    );
  }

  export default DepartmentDetails;

