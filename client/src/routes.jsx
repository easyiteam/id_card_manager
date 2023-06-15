
import Dashboard from "@/layouts/dashboard";
import AddCard from "@/layouts/addcard";
import DeleteCard from "@/layouts/deletecard";
import AllCards from "@/layouts/allcards";
import ShowCard from "@/layouts/showcard";
import Settings from "@/layouts/settings";

import Login from "@/auth/login";

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
