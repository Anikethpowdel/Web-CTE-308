// @mui material components
import Grid from "@mui/material/Grid";
import { Link } from 'react-router-dom';

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React examples
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";
import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

function Programme() {
  return (
    <DashboardLayout>
      <DashboardNavbar absolute isMini />
      <MDBox mt={8}>
        <MDBox mb={3} style={{ width: '1400px' }}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={8}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6} xl={4}>
                <Link to="/programme/1">
                  <DefaultInfoCard
                    icon="account_balance"
                    title="Bachelor of Engineering in Civil Engineering"
                    description="Description for programme 1"
                    value="P01"
                  />
                </Link>
                </Grid>
                <Grid item xs={12} md={6} xl={4}>
                  <Link to="/programme/2" >
                    <DefaultInfoCard
                      icon="account_balance"
                      title="Bachelor of Architecture"
                      description="Description for Department 2"
                      value="P02"
                    />
                  </Link>
                  
                </Grid>
                <Grid item xs={12} md={6} xl={4}>
                  <Link to="/programme/3" >
                    <DefaultInfoCard
                      icon="account_balance"
                      title="Bachelor Of Engineering in Geology"
                      description="Description for Department 2"
                      value="P03"
                    />
                  </Link> 
                </Grid>
                <Grid item xs={12} md={6} xl={4}>
                  <Link to="/programme/4" >
                    <DefaultInfoCard
                      icon="account_balance"
                      title="Bachelor Of Engineering in water Resources"
                      description="Description for Department 2"
                      value="P04"
                    />
                  </Link>
                  
                </Grid>
                <Grid item xs={12} md={6} xl={4}>
                  <Link to="/programme/5" >
                    <DefaultInfoCard
                      icon="account_balance"
                      title="Bachelor of Electrical Engineering"
                      description="Description for Department 2"
                      value="P05"
                    />
                  </Link>
                  
                </Grid>
                <Grid item xs={12} md={6} xl={4}>
                  <Link to="/programme/6" >
                    <DefaultInfoCard
                      icon="account_balance"
                      title="Bachelor of Electronics and Communication Engineering"
                      description="Description for Department 2"
                      value="P06"
                    />
                  </Link>
                  
                </Grid>
                <Grid item xs={12} md={6} xl={4}>
                  <Link to="/programme/7" >
                    <DefaultInfoCard
                      icon="account_balance"
                      title="Bachelor Of Instrumentation and Control Engineering"
                      description="Description for Department 2"
                      value="P07"
                    />
                  </Link>
                  
                </Grid>
                <Grid item xs={12} md={6} xl={4}>
                  <Link to="/programme/8" >
                    <DefaultInfoCard
                      icon="account_balance"
                      title="Bachelor Of Engineering in Information Technology"
                      description="Description for Department 2"
                      value="P08"
                    />
                  </Link>
                  
                </Grid> 
                <Grid item xs={12} md={6} xl={4}>
                  <Link to="/programme/8" >
                    <DefaultInfoCard
                      icon="account_balance"
                      title="Department of Science and Humanities"
                      description="Description for Department 2"
                      value="D06"
                    />
                  </Link>
                  
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} lg={4}>
              {/* Remove the Invoices component */}
            </Grid>
          </Grid>
        </MDBox>
        <MDBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={7}>
              {/* Remove the BillingInformation component */}
            </Grid>
            <Grid item xs={12} md={5}>
              {/* Remove the Transactions component */}
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Programme;
