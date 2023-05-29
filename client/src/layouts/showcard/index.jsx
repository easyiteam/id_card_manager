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
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import './styles.css';

import { useCallback, useContext, useLayoutEffect, useRef, useState } from "react";

// Material Dashboard 2 React components
import MDBox from "@/components/MDBox";
import MDTypography from "@/components/MDTypography";
import MDInput from "@/components/MDInput";
import MDButton from "@/components/MDButton";

// Material Dashboard 2 React example components
import DashboardLayout from "@/examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "@/examples/Navbars/DashboardNavbar";
import Footer from "@/examples/Footer";

// Data
import { AuthContext } from "@/context";

import directionLogo from "@/assets/images/logo-finances.png";
import douaneLogo from "@/assets/images/douane_logo.png";
import bgCard from "@/assets/images/bg_card.png";
import bgTop from "@/assets/images/bg_top.png";
import bgBottom from "@/assets/images/bg_bottom.png";
import logoSecondFace from "@/assets/images/logo_second_face.png";

import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import { inputAdornmentClasses } from "@mui/material";
import axios from "axios";
import { Route } from "react-router-dom";

async function ShowCard() {
  
  const authContext = useContext(AuthContext);

  const [typeCard, setTypeCard] = useState("");

  const [card, setCard] = useState({});

  await axios.post(`${process.env.REACT_APP_API_URL}/card/getACard`, { cardId: route.params.cardId })
                    .then((response) => {
                      setCard(response.data)
                    });

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(e)
    
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
        <MDBox py={3} style={{  }}>

        { typeCard === "1" ?
          <MDBox>
            <MDTypography variant="h4" gutterBottom mb={2} color="primary" style={{ marginBottom: "30px", textAlign: "center"}}>
            CARTE DE COMMISSION D'EMPLOI
            </MDTypography>
            <Grid container spacing={3} className="">
              <Grid className="">
                <Card style={{ width: "400px", height: "690px", borderRadius: "5px", overflow: "hidden", color: "#000", marginBottom: "30px" }}>
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
                      marginTop: "-15px"
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
                        <img src={image.src} alt="" style={{ width: '100%', height: "100%"}}  />
                      </MDBox>
                    </MDBox>
                    <MDBox display="flex" justifyContent="center" alignItems="center" textAlign="center" pt={5} pl={6.5} pr={6.5} pb={2}>
                      <MDTypography variant="h6" gutterBottom mb={2} style={{ color: "#000" }}>
                        Par arrêté <strong>PV N° {inputs.pv != "" ? inputs.pv : "..."}</strong> du { inputs.pv_date != "" ? formatDate(inputs.pv_date) : "..."}, { inputs.gender == "M" ? "Mr" : inputs.gender == "F" ? "Mme" : "..." } {inputs.name != "" ? inputs.name : "..."} {inputs.surname != "" ? inputs.surname : "..."} a prêté serment prescrit par la loi devant le Tribunal Civil de Cotonou
                      </MDTypography>
                    </MDBox>
                  </MDBox>
                  <MDBox sx={{ marginBottom: '-15px', position: "absolute", bottom: "0" }}>
                    <img src={bgBottom} alt="" style={{ width: '100%'}}  />
                  </MDBox>
                </Card>
              </Grid>
              <Grid className="">
                <Card style={{ width: "400px", height: "690px", borderRadius: "5px", overflow: "hidden", color: "#000" }}>
                  <MDBox display="flex" justifyContent="space-between" alignItems="center" sx={{
                      height: "180px",
                      marginBottom: "20px",
                    }} >
                    <MDBox style={{ position: "absolute"}}>
                      <img src={bgTop} alt="" style={{ width: "410px", height: "180px", zIndex: "1" }} />
                    </MDBox>
                    <MDBox style={{ marginTop: "0px", marginBottom: "80px", marginLeft: "165px", marginRight: "165px"}}>
                      <img src={douaneLogo} alt="Logo direction douanes" style={{ width: "70px", height: "80px", position: "absolute", zIndex: "9999", }} />
                    </MDBox>
                  </MDBox>
                  <MDBox display="flex" justifyContent="center" alignItems="center" textAlign="center" pl={6.5} pr={6.5} pb={2}>
                    <MDTypography variant="h6" gutterBottom mb={2} style={{ color: "#000" }}>
                      Au nom du peuple béninois, Mr le Directeur Général des Douanes requiert toutes les autorités constituées civiles et militaires de prêter à { inputs.gender == "M" ? "Mr" : inputs.gender == "F" ? "Mme" : "..." } {inputs.name != "" ? inputs.name : "..."} {inputs.surname != "" ? inputs.surname : "..."} aide, appui et protection dans tous ce qui se rattache à l’exercice des fonctions qui lui sont confiées.
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
                      <MDTypography variant="h5" gutterBottom style={{ color: "#000", marginLeft: "20px", marginRight: "20px" }}>
                        Fait à Cotonou, le { formattedToday }
                      </MDTypography>
                    </MDBox>
                    <MDBox style={{ }}>
                      <img src={ signPhoto } alt="Logo entreprise" style={{ width: "200px", height: "200px", marginLeft: "100px", marginRight: "100px" }} />
                    </MDBox>
                    <MDBox display="flex" justifyContent="center" alignItems="center" textAlign="center" marginBottom="25px">
                      <MDTypography variant="h5" gutterBottom style={{ color: "#000", marginLeft: "20px", marginRight: "20px" }}>
                        { signAuthor }
                      </MDTypography>
                    </MDBox>
                  </MDBox>
                  <MDBox sx={{ marginBottom: '-15px', position: "absolute", bottom: "0" }}>
                    <img src={bgBottom} alt="" style={{ width: '100%'}}  />
                  </MDBox>
                </Card>
              </Grid>
            </Grid>
          </MDBox>
         : "" }
         { typeCard === "2" ?
            <MDBox>
              <MDTypography variant="h4" gutterBottom mb={2} color="primary" style={{ marginBottom: "30px", textAlign: "center"}}>
                CARTE PROFESSIONNELLE
              </MDTypography>
              <Grid container spacing={3} className="">
                <Grid className="">
                  <Card style={{ width: "400px", height: "690px", borderRadius: "5px", overflow: "hidden", color: "#000", marginBottom: "30px" }}>
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
                        marginTop: "-15px"
                      }} >
                      <MDBox display="flex" justifyContent="center" alignItems="center" textAlign="center">
                        <MDTypography variant="h5" gutterBottom mt={2} style={{ color: "#000" }}>
                          CARTE PROFESSIONNELLE
                        </MDTypography>
                      </MDBox>
                      <MDBox display="flex" justifyContent="center" alignItems="center" textAlign="center">
                        <MDTypography variant="h5" gutterBottom mb={2} style={{ color: "#000" }}>
                          N° : {proInputs.card_number}
                        </MDTypography>
                      </MDBox>
                      <MDBox display="flex" justifyContent="center" alignItems="center" sx={{ height: "270px", width: "80%", border: "5px solid #E5E5E5", borderRadius: "10px", padding: "3%", marginLeft: "10%", marginRight: "10%"}}>
                        <MDBox mr={2} style={{ marginLeft: "0px", width: "150px", height: "270px",  overflow: "hidden"}}>
                          <img src={imagePro.src} alt="" style={{ width: '148px', height: "210px", marginTop: "15px"}}  />
                          <MDTypography variant="h6" gutterBottom mb={2} style={{ color: "#000", textAlign: "center", fontSize:"15px" }}>
                            Matricule: {proInputs.matricule_number}
                          </MDTypography>
                        </MDBox>
                        <MDBox style={{ width: "148px", height: "270px",}}>
                          <MDBox style={{ width: '120px', maxHeight: "60%", marginTop: "20px", }}>
                            <img src={douaneLogo} alt="" style={{ width: '120px', height: "160px"}}  />
                          </MDBox>
                          <MDTypography variant="h6" gutterBottom mb={2} style={{ color: "#000", textAlign: "center", fontSize:"15px" }}>
                            {proInputs.grade}
                          </MDTypography>
                        </MDBox>
                      </MDBox>
                      <MDBox mt={2} sx={{ width: "80%", height: "400px", marginLeft: "13%", marginRight: "13%", overflow: "hidden"}} >
                        <MDBox display="flex" mb={0.3} >
                            <MDTypography variant="h6" gutterBottom style={{ color: "#000", width: "50%", overflow: "hidden",}}>
                              Nom: 
                            </MDTypography>
                            <MDTypography variant="h6" gutterBottom style={{ color: "#000", width: "50%", overflow: "hidden", fontWeight: "400"}}>
                              {proInputs.name != "" ? proInputs.name : "..."}
                            </MDTypography>
                        </MDBox>
                        <MDBox display="flex" mb={0.3} >
                            <MDTypography variant="h6" gutterBottom style={{ color: "#000", width: "50%", overflow: "hidden",}}>
                              Prénom(s): 
                            </MDTypography>
                            <MDTypography variant="h6" gutterBottom style={{ color: "#000", width: "50%", overflow: "hidden", fontWeight: "400"}}>
                              {proInputs.surname != "" ? proInputs.surname : "..."}
                            </MDTypography>
                        </MDBox>
                        <MDBox display="flex" mb={0.3} >
                            <MDTypography variant="h6" gutterBottom style={{ color: "#000", width: "50%", overflow: "hidden",}}>
                              Date de naissance: 
                            </MDTypography>
                            <MDTypography variant="h6" gutterBottom style={{ color: "#000", width: "50%", overflow: "hidden", fontWeight: "400"}}>
                              { proInputs.bornDate != "" ? formatDate(proInputs.bornDate) : "..." }
                            </MDTypography>
                        </MDBox>
                        <MDBox display="flex" mb={0.3} >
                            <MDTypography variant="h6" gutterBottom style={{ color: "#000", width: "50%", overflow: "hidden",}}>
                              Lieu de naissance:
                            </MDTypography>
                            <MDTypography variant="h6" gutterBottom style={{ color: "#000", width: "50%", overflow: "hidden", fontWeight: "400"}}>
                              {proInputs.bornPlace != "" ? proInputs.bornPlace : "..."}
                            </MDTypography>
                        </MDBox>
                        <MDBox display="flex" mb={0.3} >
                            <MDTypography variant="h6" gutterBottom style={{ color: "#000", width: "50%", overflow: "hidden",}}>
                              Groupe sanguin:   
                            </MDTypography>
                            <MDTypography variant="h6" gutterBottom style={{ color: "red", width: "50%", overflow: "hidden", fontWeight: "600"}}>
                              {proInputs.bloodGroup != "" ? proInputs.bloodGroup : "..."}
                            </MDTypography>
                        </MDBox>
                      </MDBox>
                    </MDBox>
                    <MDBox sx={{ marginBottom: '-15px', position: "absolute", bottom: "0" }}>
                      <img src={bgBottom} alt="" style={{ width: '100%'}}  />
                    </MDBox>
                  </Card>
                </Grid>
                <Grid className="">
                    <Card style={{ width: "400px", height: "690px", borderRadius: "5px", overflow: "hidden", color: "#000" }}>
                      <MDBox display="flex" justifyContent="space-between" alignItems="center" sx={{
                          height: "180px",
                          marginBottom: "20px",
                        }} >
                        <MDBox style={{ position: "absolute"}}>
                          <img src={bgTop} alt="" style={{ width: "410px", height: "180px", zIndex: "1" }} />
                        </MDBox>
                        <MDBox style={{ marginTop: "0px", marginBottom: "80px", marginLeft: "165px", marginRight: "165px"}}>
                          <img src={douaneLogo} alt="Logo direction douanes" style={{ width: "70px", height: "80px", position: "absolute", zIndex: "9999", }} />
                        </MDBox>
                      </MDBox>
                      <MDBox display="flex" justifyContent="center" alignItems="center" textAlign="center" pl={6.5} pr={6.5} pb={2}>
                        <MDTypography variant="h6" gutterBottom mb={2} style={{ color: "#000" }}>
                        Cette carte est strictement personnelle et incessible et tient aussi lieu de carte professionnelle. Contact d’urgence : 21 54 64 66
                        </MDTypography>
                      </MDBox>
                      <MDBox mt={2} sx={{
                          backgroundImage: `url(${bgCard})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          backgroundRepeat: "no-repeat",
                          color: "#000",
                        }} >
                        <MDBox display="flex" justifyContent="center" alignItems="center" textAlign="center">
                          <MDTypography variant="h5" gutterBottom style={{ color: "#000", marginLeft: "20px", marginRight: "20px" }}>
                            Fait à Cotonou, le { formattedToday }
                          </MDTypography>
                        </MDBox>
                        <MDBox style={{ }}>
                          <img src={logoSecondFace} alt="Logo entreprise" style={{ width: "200px", height: "200px", marginLeft: "100px", marginRight: "100px" }} />
                        </MDBox>
                        <MDBox display="flex" justifyContent="center" alignItems="center" textAlign="center" marginBottom="25px">
                          <MDTypography variant="h5" gutterBottom style={{ color: "#000", marginLeft: "20px", marginRight: "20px" }}>
                            Alain HINKATI
                          </MDTypography>
                        </MDBox>
                      </MDBox>
                      <MDBox sx={{ marginBottom: '-15px', position: "absolute", bottom: "0" }}>
                        <img src={bgBottom} alt="" style={{ width: '100%'}}  />
                      </MDBox>
                    </Card>
                  </Grid>
              </Grid>
            </MDBox>
          : "" }
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default ShowCard;
