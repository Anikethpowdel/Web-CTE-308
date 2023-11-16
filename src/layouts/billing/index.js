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

function Billing() {
  return (
    <DashboardLayout>
      <DashboardNavbar absolute isMini />
      <MDBox mt={8}>
        <MDBox mb={3} style={{ width: '1400px' }}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={8}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6} xl={4}>
                <Link to="/department/1">
                  <DefaultInfoCard
                    icon="account_balance"
                    title="Department of Civil"
                    description="Building the future, brick by brick: where innovation meets infrastructure"
                    value="D01"
                  />
                </Link>
                </Grid>
                <Grid item xs={12} md={6} xl={4}>
                  <Link to="/department/2" >
                    <DefaultInfoCard
                      icon="account_balance"
                      title="Department of Electrical"
                      description="Powering progress, sparking innovation: where circuits meet creativity."
                      value="D02"
                    />
                  </Link>
                  
                </Grid>
                <Grid item xs={12} md={6} xl={4}>
                  <Link to="/department/3" >
                    <DefaultInfoCard
                      icon="account_balance"
                      title="Electronic and Communication"
                      description="Connecting worlds, engineering the future: where signals shape tomorrow."
                      value="D03"
                    />
                  </Link> 
                </Grid>
                <Grid item xs={12} md={6} xl={4}>
                  <Link to="/department/4" >
                    <DefaultInfoCard
                      icon="account_balance"
                      title="Department of Information Technology"
                      description="Unleashing innovation, coding the future: where technology transforms possibilities."
                      value="D04"
                    />
                  </Link>
                  
                </Grid>
                <Grid item xs={12} md={6} xl={4}>
                  <Link to="/department/6" >
                    <DefaultInfoCard
                      icon="account_balance"
                      title="Department of Architecture"
                      description="Designing dreams, shaping skylines: where creativity meets construction."
                      value="D05"
                    />
                  </Link>
                  
                </Grid>
                <Grid item xs={12} md={6} xl={4}>
                  <Link to="/department/5" >
                    <DefaultInfoCard
                      icon="account_balance"
                      title="Department of Science and Humanities"
                      description="Exploring frontiers, shaping perspectives: where curiosity meets humanity."
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

export default Billing;
