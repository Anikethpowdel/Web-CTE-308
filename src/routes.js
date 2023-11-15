import SignIn from "layouts/authentication/sign-in";
import Billing from "layouts/billing";
import DepartmentDetails from "layouts/billing/DepartmentDetails";
import Dashboard from "layouts/dashboard";
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
import Tables from "layouts/tables";
import ProgrammeDetails from "layouts/tables/ProgrammeDetails";

// @mui icons
import Icon from "@mui/material/Icon";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Departments",
    key: "billing",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/billing",
    component: <Billing />,
  },
  {
    type: "collapse",
    name: "Programmes",
    key: "tables",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/tables",
    component: <Tables />,
  },
  {
    type: "collapse",
    name: "Notifications",
    key: "notifications",
    icon: <Icon fontSize="small">notifications</Icon>,
    route: "/notifications",
    component: <Notifications />,
  },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
    component: <Profile />,
  },
  {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
  {
    type: "route", // Use "route" for individual routes
    name: "Department Details", // The name for the route
    key: "department-details", // A unique key for the route
    route: "/department/:id", // The route path with a parameter ":id"
    component: <DepartmentDetails />, // The component to render
  },
  {
    type: "route", // Use "route" for individual routes
    name: "Programme Details", // The name for the route
    key: "programme-details", // A unique key for the route
    route: "/programme/:id", // The route path with a parameter ":id"
    component: <ProgrammeDetails />, // The component to render
  },
];

export default routes;
