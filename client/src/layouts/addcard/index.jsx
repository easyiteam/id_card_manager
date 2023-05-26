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
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

import { useContext, useState } from "react";

// Material Dashboard 2 React components
import MDBox from "@/components/MDBox";
import MDTypography from "@/components/MDTypography";
import MDInput from "@/components/MDInput";
import MDButton from "@/components/MDButton";

// Material Dashboard 2 React example components
import DashboardLayout from "@/examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "@/examples/Navbars/DashboardNavbar";
import Footer from "@/examples/Footer";
import DataTable from "@/examples/Tables/DataTable";

// Data
import authorsTableData from "@/layouts/tables/data/authorsTableData";
import projectsTableData from "@/layouts/tables/data/projectsTableData";
import CardService from "@/services/card-service";
import { AuthContext } from "@/context";

import directionLogo from "@/assets/images/logo-finances.png";
import douaneLogo from "@/assets/images/douane_logo.png";
import bgCard from "@/assets/images/bg_card.png";
import bgBottom from "@/assets/images/bg_bottom.png";
import imageTest from "@/assets/images/image_test.png";

function Tables() {
  const { columns, rows } = authorsTableData();
  const { columns: pColumns, rows: pRows } = projectsTableData();
  const authContext = useContext(AuthContext);

  const [user, setUser] = useState({});
  const [newCardErrors, setNewCardError] = useState(null);

  const [inputs, setInputs] = useState({
    card_number: "",
    pv: "",
    pv_date: "",
    name: "",
    surname: "",
    sex: "",
  });

  const [errors, setErrors] = useState({
    cardNumberError: false,
    pvError: false,
    pvDateError: false,
    nameError: false,
    surnameError: false,
    sexError: false,
  });

  const addNewCardHandler = (newCard) => setUser(newCard);


  const changeHandler = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    // check rememeber me?
    e.preventDefault();
    
    if (inputs.name.trim().length < 3) {
      setErrors({ ...errors, nameError: true });
      return;
    }

    const newCard = { card_number: inputs.card_number, pv: inputs.pv, pv_date: inputs.pv_date, name: inputs.name, surname: inputs.surname, sex: inputs.sex };
    addNewCardHandler(newCard);

    const cardData = {
      data: {
        type: "token",
        attributes: { ...newCard },
      },
    };

    try {
      const response = await CardService.create(cardData);
      // authContext.login(response.access_token, response.refresh_token);
    } catch (res) {
      if (res.hasOwnProperty("message")) {
        setNewCardError(res.message);
      } else {
        setNewCardError(res.errors[0].detail);
      }
    }

    return () => {
      setInputs({
        card_number: "",
        pv: "",
        pv_date: "",
        name: "",
        surname: "",
        sex: "",
      });

      setErrors({
        cardNumberError: false,
        pvError: false,
        pvDateError: false,
        nameError: false,
        surnameError: false,
        sexError: false
      });
    };
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
            <Card>
              <MDBox justifyContent="space-between" alignItems="center" p={3}>
                <MDTypography variant="h6" gutterBottom mb={2} color="error">
                  Tous les champs sont obligatoires (*)
                </MDTypography>
                {newCardErrors && (
                  <MDTypography variant="caption" color="error" fontWeight="light" pt={2}>
                    {newCardErrors}
                  </MDTypography>
                )}
                <MDBox component="form" role="form" method="POST" onSubmit={submitHandler}>
                  <MDBox mb={2}>
                    <MDInput
                      type="text"
                      label="Carte N*"
                      fullWidth
                      value={inputs.card_number}
                      name="card_number"
                      onChange={changeHandler}
                      error={errors.cardNumberError}
                    />
                  </MDBox>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6} lg={6}>
                      <MDBox mb={2}>
                        <MDInput
                          type="text"
                          label="PV N*"
                          fullWidth
                          value={inputs.pv}
                          name="pv"
                          onChange={changeHandler}
                          error={errors.pvError}
                        />
                      </MDBox>
                    </Grid >

                    <Grid item xs={12} md={6} lg={6}>
                      <MDBox mb={2}>
                        <MDInput
                          type="date"
                          label="Date PV*"
                          fullWidth
                          value={inputs.pv_date}
                          name="pv_date"
                          onChange={changeHandler}
                          error={errors.pvDateError}
                        />
                      </MDBox>
                    </Grid >
                  </Grid>
                  <MDBox mb={2}>
                    <MDInput
                      type="text"
                      label="Nom*"
                      fullWidth
                      name="name"
                      value={inputs.name}
                      onChange={changeHandler}
                      error={errors.passwornameErrordError}
                    />
                  </MDBox>
                  <MDBox mb={2}>
                    <MDInput
                      type="text"
                      label="Prénoms*"
                      fullWidth
                      name="surname"
                      value={inputs.surname}
                      onChange={changeHandler}
                      error={errors.surnameError}
                    />
                  </MDBox>
                  <MDBox mt={2} mb={1}>
                    <MDButton variant="gradient" color="info" type="submit">
                      Enregistrer
                    </MDButton>
                  </MDBox>
                </MDBox>
              </MDBox>
              </Card>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Card style={{ borderRadius: "5px", overflow: "hidden", color: "#000" }}>
                <MDBox display="flex" justifyContent="space-between" alignItems="center" mt={1} mb={1}>
                  <MDBox item xs={8} md={8} lg={8}>
                    <img src={directionLogo} alt="Logo direction douanes" style={{ width: '100%', marginLeft: '20px', marginTop: '10px'}} />
                  </MDBox>
                  <MDBox item xs={4} md={4} lg={4}>
                    <img src={douaneLogo} alt="Logo direction douanes" style={{ width: '25%', float: 'right', marginRight: '20px'}}  />
                  </MDBox>
                </MDBox>
                <hr />
                <MDBox display="flex" justifyContent="center" alignItems="center">
                  <MDTypography variant="h6" gutterBottom mt={2} mb={2} style={{ fontWeight: 900, color: "#000" }}>
                    DIRECTION GÉNÉRALE DES DOUANES
                  </MDTypography>
                </MDBox>
                <MDBox sx={{
                    backgroundImage: `url(${bgCard})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    color: "#000",
                  }} >
                  <MDBox display="flex" justifyContent="center" alignItems="center" textAlign="center">
                    <MDTypography variant="h5" gutterBottom mt={2} style={{ color: "#000" }}>
                      COMMISSION D'EMPLOI DES DOUANES
                    </MDTypography>
                  </MDBox>
                  <MDBox display="flex" justifyContent="center" alignItems="center" textAlign="center">
                    <MDTypography variant="h5" gutterBottom mb={2} style={{ color: "#000" }}>
                      Carte N° : {inputs.card_number}
                    </MDTypography>
                  </MDBox>
                  <MDBox display="flex" justifyContent="center" alignItems="center">
                    <MDBox sx={{ height: "270px", width: "50%", border: "5px solid #E5E5E5", borderRadius: "10px", padding: "3%"}}>
                      <img src={imageTest} alt="" style={{ width: '100%', height: "100%"}}  />
                    </MDBox>
                  </MDBox>
                  <MDBox display="flex" justifyContent="center" alignItems="center" textAlign="center" pt={5} pl={6.5} pr={6.5} pb={2}>
                    <MDTypography variant="h6" gutterBottom mb={2} style={{ color: "#000" }}>
                      Par arrêté <strong>PV N° {inputs.pv}</strong> du {inputs.pv_date}, { inputs.sex == "M" ? "Mr" : "Mdme" } {inputs.name} {inputs.surname} a prêté serment prescrit par la loi devant le Tribunal Civil de Cotonou
                    </MDTypography>
                  </MDBox>
                </MDBox>
                <MDBox sx={{ marginBottom: '-15px' }}>
                  <img src={bgBottom} alt="" style={{ width: '100%'}}  />
                </MDBox>
              </Card>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
