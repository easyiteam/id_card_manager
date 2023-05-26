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
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
import authorsTableData from "layouts/tables/data/authorsTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";
import AuthService from "services/auth-service";
import { AuthContext } from "context";

import directionLogo from "assets/images/logo-finances.png";
import douaneLogo from "assets/images/douane_logo.png";
import bgCard from "assets/images/bg_card.png";
import bgBottom from "assets/images/bg_bottom.png";
import imageTest from "assets/images/image_test.png";

function Tables() {
  const { columns, rows } = authorsTableData();
  const { columns: pColumns, rows: pRows } = projectsTableData();
  const authContext = useContext(AuthContext);

  const [user, setUser] = useState({});
  const [credentialsErros, setCredentialsError] = useState(null);
  const [rememberMe, setRememberMe] = useState(false);

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    emailError: false,
    passwordError: false,
  });

  const addUserHandler = (newUser) => setUser(newUser);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const changeHandler = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    // check rememeber me?
    e.preventDefault();

    const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (inputs.email.trim().length === 0 || !inputs.email.trim().match(mailFormat)) {
      setErrors({ ...errors, emailError: true });
      return;
    }

    if (inputs.password.trim().length < 6) {
      setErrors({ ...errors, passwordError: true });
      return;
    }

    const newUser = { email: inputs.email, password: inputs.password };
    addUserHandler(newUser);

    const myData = {
      data: {
        type: "token",
        attributes: { ...newUser },
      },
    };

    try {
      const response = await AuthService.login(myData);
      authContext.login(response.access_token, response.refresh_token);
    } catch (res) {
      if (res.hasOwnProperty("message")) {
        setCredentialsError(res.message);
      } else {
        setCredentialsError(res.errors[0].detail);
      }
    }

    return () => {
      setInputs({
        email: "",
        password: "",
      });

      setErrors({
        emailError: false,
        passwordError: false,
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
                <MDTypography variant="h6" gutterBottom mb={2}>
                  Tous les champs sont obligatoires (*)
                </MDTypography>
                {credentialsErros && (
                  <MDTypography variant="caption" color="error" fontWeight="light" pt={2}>
                    {credentialsErros}
                  </MDTypography>
                )}
                <MDBox component="form" role="form" method="POST" onSubmit={submitHandler}>
                  <MDBox mb={2}>
                    <MDInput
                      type="text"
                      label="PV*"
                      fullWidth
                      value={inputs.email}
                      name="pv"
                      onChange={changeHandler}
                      error={errors.emailError}
                    />
                  </MDBox>
                  <MDBox mb={2}>
                    <MDInput
                      type="text"
                      label="Nom*"
                      fullWidth
                      name="name"
                      value={inputs.password}
                      onChange={changeHandler}
                      error={errors.passwordError}
                    />
                  </MDBox>
                  <MDBox mb={2}>
                    <MDInput
                      type="text"
                      label="Prénoms*"
                      fullWidth
                      name="surname"
                      value={inputs.password}
                      onChange={changeHandler}
                      error={errors.passwordError}
                    />
                  </MDBox>
                  <MDBox mt={2} mb={1}>
                    <MDButton variant="gradient" color="info" fullWidth type="submit">
                      Enregistrer
                    </MDButton>
                  </MDBox>
                </MDBox>
              </MDBox>
              </Card>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Card style={{ borderRadius: "5px", overflow: "hidden", color: "#000" }}>
                <MDBox display="flex" justifyContent="space-between" alignItems="center" mt={2} mb={2}>
                  <MDBox item xs={8} md={8} lg={8}>
                    <img src={directionLogo} alt="Logo direction douanes" style={{ width: '70%', marginLeft: '20px'}} />
                  </MDBox>
                  <MDBox item xs={4} md={4} lg={4}>
                  <img src={douaneLogo} alt="Logo direction douanes" style={{ width: '45%', float: 'right', marginRight: '20px'}}  />
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
                      Carte N° : A_002435
                    </MDTypography>
                  </MDBox>
                  <MDBox display="flex" justifyContent="center" alignItems="center">
                    <MDBox sx={{ height: "270px", width: "50%", border: "5px solid #E5E5E5", borderRadius: "10px", padding: "3%"}}>
                      <img src={imageTest} alt="" style={{ width: '100%', height: "100%"}}  />
                    </MDBox>
                  </MDBox>
                  <MDBox display="flex" justifyContent="center" alignItems="center" textAlign="center" pt={5} pl={6.5} pr={6.5} pb={2}>
                    <MDTypography variant="h6" gutterBottom mb={2} style={{ color: "#000" }}>
                      Par arrêté <strong>PV N° 23456776</strong> du 22/06/2004, Mr AGBO Idrissou Ledjine a prêté serment prescrit par la loi devant le Tribunal Civil de Cotonou
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
