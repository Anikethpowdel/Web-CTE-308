// @mui material components
import Grid from "@mui/material/Grid";
import { Link } from 'react-router-dom';

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";

function Billing() {
  return (
    <DashboardLayout>
      <DashboardNavbar absolute isMini />
      <MDBox mt={8}>
        <MDBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={8}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6} xl={4}>
                <Link to="/department/1">
                  <DefaultInfoCard
                    icon="account_balance"
                    title="Department 1"
                    description="Description for Department 1"
                    value="Value for Department 1"
                  />
                </Link>
                </Grid>
                <Grid item xs={12} md={6} xl={4}>
                  <Link to="/department/2" >
                    <DefaultInfoCard
                      icon="account_balance"
                      title="Department 2"
                      description="Description for Department 2"
                      value="Value for Department 2"
                    />
                  </Link>
                  
                </Grid>
                <Grid item xs={12} md={6} xl={4}>
                  <DefaultInfoCard
                    icon="account_balance"
                    title="Department 3"
                    description="Description for Department 3"
                    value="Value for Department 3"
                  />
                </Grid>
                <Grid item xs={12} md={6} xl={4}>
                  <DefaultInfoCard
                    icon="account_balance"
                    title="Department 4"
                    description="Description for Department 4"
                    value="Value for Department 4"
                  />
                </Grid>
                <Grid item xs={12} md={6} xl={4}>
                  <DefaultInfoCard
                    icon="account_balance"
                    title="Department 5"
                    description="Description for Department 5"
                    value="Value for Department 5"
                  />
                </Grid>
                <Grid item xs={12} md={6} xl={4}>
                  <DefaultInfoCard
                    icon="account_balance"
                    title="Department 6"
                    description="Description for Department 6"
                    value="Value for Department 6"
                  />
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

export default Billing;
