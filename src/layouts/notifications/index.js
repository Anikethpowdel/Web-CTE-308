/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDAlert from "components/MDAlert";
import MDBox from "components/MDBox";
import MDSnackbar from "components/MDSnackbar";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

function Notifications() {
  const [successSB, setSuccessSB] = useState(false);
  const [infoSB, setInfoSB] = useState(false);
  const [warningSB, setWarningSB] = useState(false);
  const [errorSB, setErrorSB] = useState(false);

  const openSuccessSB = () => setSuccessSB(true);
  const closeSuccessSB = () => setSuccessSB(false);
  const openInfoSB = () => setInfoSB(true);
  const closeInfoSB = () => setInfoSB(false);
  const openWarningSB = () => setWarningSB(true);
  const closeWarningSB = () => setWarningSB(false);
  const openErrorSB = () => setErrorSB(true);
  const closeErrorSB = () => setErrorSB(false);

  const alertContent = (name) => (
    <MDTypography variant="body2" color="white">
      A New module CTE 404 is  added in 
      <MDTypography component="a" href="#" variant="body2" fontWeight="medium" color="white">
        Department of Civil Engineering
      </MDTypography>
      Mechanical Engineering
    </MDTypography>
  );

  const renderSuccessSB = (
    <MDSnackbar
      color="success"
      icon="check"
      title="Material Dashboard"
      content="Added new Department"
      dateTime="11 mins ago"
      open={successSB}
      onClose={closeSuccessSB}
      close={closeSuccessSB}
      bgWhite
    />
  );

  const renderInfoSB = (
    <MDSnackbar
      icon="notifications"
      title="Material Dashboard"
      content="Added new Programme Under Department of Civil Engineering"
      dateTime="11 mins ago"
      open={infoSB}
      onClose={closeInfoSB}
      close={closeInfoSB}
    />
  );

  const renderWarningSB = (
    <MDSnackbar
      color="warning"
      icon="star"
      title="Material Dashboard"
      content="Deleted programme from Department of Electrical Engineering"
      dateTime="11 mins ago"
      open={warningSB}
      onClose={closeWarningSB}
      close={closeWarningSB}
      bgWhite
    />
  );

  const renderErrorSB = (
    <MDSnackbar
      color="error"
      icon="warning"
      title="Material Dashboard"
      content="Added new Programme Mechanical Engineering"
      dateTime="11 mins ago"
      open={errorSB}
      onClose={closeErrorSB}
      close={closeErrorSB}
      bgWhite
    />
  );

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={6} mb={3}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} lg={8}>
            <Card>
              <MDBox p={2}>
                <MDTypography variant="h5">Notification</MDTypography>
              </MDBox>
              <MDBox pt={2} px={2}>
                <MDAlert color="primary" dismissible>
                  {alertContent("primary")}
                </MDAlert>
                <MDAlert color="secondary" dismissible>
                <MDTypography variant="body2" color="white">
      A Programme is Deleted in 
      <MDTypography component="a" href="#" variant="body2" fontWeight="medium" color="white">
        Department of Electrical Engineering
      </MDTypography>
      Master in Renewal Engineering
    </MDTypography>
                </MDAlert>
                <MDAlert color="success" dismissible>
                <MDTypography variant="body2" color="white">
      A New Module Test101 is  added 
      <MDTypography component="a" href="#" variant="body2" fontWeight="medium" color="white">
        Department of Engineering in Electronics
      </MDTypography>
     
    </MDTypography>
                </MDAlert>
                <MDAlert color="error" dismissible>
                <MDTypography variant="body2" color="white">
      A Staff is removed from
      <MDTypography component="a" href="#" variant="body2" fontWeight="medium" color="white">
        Department of Civil Engineering
      </MDTypography>
       Master in Construction Management
    </MDTypography>
                </MDAlert>
                <MDAlert color="warning" dismissible>
                <MDTypography variant="body2" color="white">
      A New Staff is  added in 
      <MDTypography component="a" href="#" variant="body2" fontWeight="medium" color="white">
        Department of  Engineering in Information Technology
      </MDTypography>
      Software Engineering
    </MDTypography>
                </MDAlert>
                <MDAlert color="info" dismissible>
                  {alertContent("info")}
                </MDAlert>
                <MDAlert color="light" dismissible>
                <MDTypography variant="body2" color="white">
      A Staff is Deleted from 
      <MDTypography component="a" href="#" variant="body2" fontWeight="medium" color="white">
        Department of Civil Engineering
      </MDTypography>
      Mechanical Engineering
    </MDTypography>
                </MDAlert>
                <MDAlert color="dark" dismissible>
                <MDTypography variant="body2" color="white">
      A New HOD is added in 
      <MDTypography component="a" href="#" variant="body2" fontWeight="medium" color="white">
        Department of Civil Engineering
      </MDTypography>
      Mechanical Engineering
    </MDTypography>
                </MDAlert>
              </MDBox>
            </Card>
          </Grid>

          <Grid item xs={12} lg={8}>
            <Card>
              <MDBox p={2} lineHeight={0}>
                <MDTypography variant="h5">Notifications</MDTypography>
                <MDTypography variant="button" color="text" fontWeight="regular">
                  Updated 10 hrs ago
                </MDTypography>
              </MDBox>
              {/* <MDBox p={2}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6} lg={3}>
                    <MDButton variant="gradient" color="success" onClick={openSuccessSB} fullWidth>
                      success notification
                    </MDButton>
                    {renderSuccessSB}
                  </Grid>
                  <Grid item xs={12} sm={6} lg={3}>
                    <MDButton variant="gradient" color="info" onClick={openInfoSB} fullWidth>
                      info notification
                    </MDButton>
                    {renderInfoSB}
                  </Grid>
                  <Grid item xs={12} sm={6} lg={3}>
                    <MDButton variant="gradient" color="warning" onClick={openWarningSB} fullWidth>
                      warning notification
                    </MDButton>
                    {renderWarningSB}
                  </Grid>
                  <Grid item xs={12} sm={6} lg={3}>
                    <MDButton variant="gradient" color="error" onClick={openErrorSB} fullWidth>
                      error notification
                    </MDButton>
                    {renderErrorSB}
                  </Grid>
                </Grid>
              </MDBox> */}
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Notifications;
