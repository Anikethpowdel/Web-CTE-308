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

// @mui material components
import BusinessIcon from '@mui/icons-material/Business';
import UpdateIcon from '@mui/icons-material/Update';

import SchoolIcon from '@mui/icons-material/School';
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
import NotificationsIcon from '@mui/icons-material/Notifications';

function Dashboard() {
  const { sales, tasks } = reportsLineChartData;

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon={<BusinessIcon />}  
                title="Department"
                count={6}
                percentage={{
                  color: "success",
                  amount: "+ 0",
                  label: "new department",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon={<SchoolIcon />} 
                title="Programme"
                count="10"
                percentage={{
                  color: "success",
                  amount: "100%",
                  label: "Job Secured Programme",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
            <ComplexStatisticsCard
                color="success"
                icon={<UpdateIcon />}  
                title="New programme"
                count="1"
                percentage={{
                  color: "success",
                  amount: "+1",
                  label: "Mechanical Engineering",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
            <ComplexStatisticsCard
                color="primary"
                icon={<NotificationsIcon />} 
                title="Notification"
                count="+2"
                percentage={{
                  color: "success",
                  amount: "1!",
                  label: "Just updated",
                }}
              />
            </MDBox>
          </Grid>
        </Grid>
        <MDBox mt={4.5}>
      <Grid >
        <Grid  item xs={12} md={6} lg={4}>
              <MDBox >
                <ReportsBarChart
                  color="success"
                  title="Students"
                  description="Students Enrolled in particular Department"
                  date="Updated 2 days ago"
                  chart={reportsBarChartData}
                />
              </MDBox>
            </Grid>
        </Grid>
            
            {/* <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="daily sales"
                  description={
                    <>
                      (<strong>+15%</strong>) increase in today sales.
                    </>
                  }
                  date="updated 4 min ago"
                  chart={sales}
                />
              </MDBox>
            </Grid> */}
        </MDBox>
        <MDBox>
          <Grid container spacing={3}>
            {/* <Grid item xs={12} md={6} lg={8}>
              <Projects />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <OrdersOverview />
            </Grid> */}
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
