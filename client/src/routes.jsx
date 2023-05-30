  /**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/** 
  All of the routes for the Material Dashboard 2 React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Material Dashboard 2 React layouts
import Dashboard from "@/layouts/dashboard";
import Tables from "@/layouts/tables";
import AddCard from "@/layouts/addcard";
import EditCard from "@/layouts/editcard";
import DeleteCard from "@/layouts/deletecard";
import AllCards from "@/layouts/allcards";
import ShowCard from "@/layouts/showcard";
import Settings from "@/layouts/settings";
import Billing from "@/layouts/billing";
import RTL from "@/layouts/rtl";
import Notifications from "@/layouts/notifications";
import Profile from "@/layouts/profile";
import SignIn from "@/layouts/authentication/sign-in";
import SignUp from "@/layouts/authentication/sign-up";

import UserProfile from "@/layouts/user-profile";
import UserManagement from "@/layouts/user-management";

import Login from "@/auth/login";
import Register from "@/auth/register";
import ForgotPassword from "@/auth/forgot-password";
import ResetPassword from "@/auth/reset-password";

// @mui icons
import Icon from "@mui/material/Icon";

const routes = [
  {
    type: "examples",
    name: "Tableau de bord",
    key: "dashboard",
    title: "Tableau de bord",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Liste des cartes",
    key: "allcards",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/allcards",
    component: <AllCards />,
  },
  {
    type: "collapse",
    name: "Créer une carte",
    key: "addcard",
    icon: <Icon fontSize="small">add</Icon>,
    route: "/addcard",
    component: <AddCard />,
  },
  {
    name: "Affichage d'une carte",
    key: "showcard",
    icon: <Icon fontSize="small">show</Icon>,
    route: "/showcard/:id",
    component: <ShowCard />,
  },
  {
    name: "Modifier une carte",
    key: "editcard",
    icon: <Icon fontSize="small">edit</Icon>,
    route: "/editcard/:id",
    component: <EditCard />,
  },
  {
    name: "Supprimer une carte",
    key: "deletecard",
    icon: <Icon fontSize="small">delete</Icon>,
    route: "/deletecard/:id",
    component: <DeleteCard />,
  },
  {
    type: "collapse",
    name: "Paramètres",
    key: "settings",
    icon: <Icon fontSize="small">settings</Icon>,
    route: "/settings",
    component: <Settings />,
  },
  {
    type: "auth",
    name: "Connexion",
    key: "login",
    icon: <Icon fontSize="small">add</Icon>,
    route: "/auth/login",
    component: <Login />,
  },
];

export default routes;
