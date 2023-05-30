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

// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

import { useCallback, useContext, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";

// Material Dashboard 2 React components
import MDBox from "@/components/MDBox";
import MDTypography from "@/components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "@/examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "@/examples/Navbars/DashboardNavbar";
import Footer from "@/examples/Footer";

// Data
import { AuthContext } from "@/context";

import axios from "axios";

function Dashboard() {

  const authContext = useContext(AuthContext);

  const [typeCard, setTypeCard] = useState("");

  const [cards, setCards] = useState([]);

  const [allComCard, setComCard] = useState([]);
  const [allProCard, setProCard] = useState([]);
  const [AllSignAuthors, setAllSignAuthors] = useState([]);

  const allSign = axios.get(`${process.env.REACT_APP_API_URL}/setting/getAll`)
  .then((response) => {
    if(!response.data.errors) {
      setAllSignAuthors(response.data)
    }
  });

  const theCard = axios.get(`${process.env.REACT_APP_API_URL}/card/getAll`)
                    .then((response) => {
                      if(!response.data.errors) {

                        setCards(response.data)
                        // console.log(response.data)

                        if(response.data.type == "1") {
                          setComCard(response.data);
                        } else if(response.data.type == "2") {
                          setProCard(response.data);
                        }
                      }
                    });

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <Card sx={{ backgroundColor: "info" }}>
                <MDBox display="flex" justifyContent="space-between" pt={1} px={2}>
                  <MDBox textAlign="right" lineHeight={1.25} display="flex">
                    <MDTypography variant="h4" fontWeight="light" color="text">
                      Signataires
                    </MDTypography>
                    <MDTypography variant="h4" sx={{ float: "right", right: "20px", position: "absolute"}}>{AllSignAuthors ? AllSignAuthors.length : ""}</MDTypography>
                  </MDBox>
                </MDBox>
                <Divider />
              </Card>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Card>
                <MDBox display="flex" justifyContent="space-between" pt={1} px={2}>
                  <MDBox textAlign="right" lineHeight={1.25} display="flex">
                    <MDTypography variant="h4" fontWeight="light" color="text">
                      Cartes de commission
                    </MDTypography>
                    <MDTypography variant="h4" sx={{ float: "right", right: "20px", position: "absolute"}}>{allComCard ? allComCard.length : ""}</MDTypography>
                  </MDBox>
                </MDBox>
                <Divider />
              </Card>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Card>
                <MDBox display="flex" justifyContent="space-between" pt={1} px={2}>
                  <MDBox textAlign="right" lineHeight={1.25} display="flex">
                    <MDTypography variant="h4" fontWeight="light" color="text">
                      Cartes professionelle
                    </MDTypography>
                    <MDTypography variant="h4" sx={{ float: "right", right: "20px", position: "absolute"}}>{allProCard ? allProCard.length : ""}</MDTypography>
                  </MDBox>
                </MDBox>
                <Divider />
              </Card>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <MDBox style={{ position: "fixed", bottom: "10px"}}>
        <Footer />
      </MDBox>
    </DashboardLayout>
  );
}

export default Dashboard;
