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
import { Route, useParams } from "react-router-dom";

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
import divider from "@/assets/images/divider.png";

import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import { Icon, inputAdornmentClasses } from "@mui/material";
import axios from "axios";
import ReactToPrint from "react-to-print";

function ShowCard() {
  
  const authContext = useContext(AuthContext);

  const [typeCard, setTypeCard] = useState("");

  const [theCard, setCard] = useState({});
  const { id } = useParams()

  let componentRef = null;
  let componentRefPro = null;
  const [state, setState] = useState({
    isLoading: false,
  });
  const [signAuthor, setAuthCom] = useState([]);
  const [signPhoto, setPhotoCom] = useState([]);

  const [signProAuthor, setAuthProCom] = useState([]);
  const [signProPhoto, setPhotoProCom] = useState([]);

  function photoNormalPath(photo) {
    return photo.substring(photo.lastIndexOf(''), 9)
  }
  
  axios.post(`${process.env.REACT_APP_API_URL}/card/getACard`, { cardId: id })
                    .then((response) => {
                      if(!response.data.errors) {

                        setCard(response.data)

                        if(response.data.type == "1") {
                          setAuthCom(response.data.sign_author.sign_author);
                          const filePath = photoNormalPath(response.data.sign_author.signature);
                          setPhotoCom(filePath);
                        } else if(response.data.type == "2") {
                          setAuthProCom(response.data.sign_author.sign_author);
                          const filePath = photoNormalPath(response.data.sign_author.signature);
                          setPhotoProCom(filePath);
                        }
                      }
                    });


  const todayDate = new Date()
  const yyyy = todayDate.getFullYear();
  let mm = todayDate.getMonth() + 1; // Months start at 0!
  let dd = todayDate.getDate();

  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;

  const formattedToday = dd + '/' + mm + '/' + yyyy;

  function formatDate(input) {
    let datePart = input.match(/\d+/g),
    year = datePart[0].substring(0), // get only two digits
    month = datePart[1], day = datePart[2];

    return day+'/'+month+'/'+year;
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(e)
    
  };

  function setComponentRef (ref) {
    componentRef = ref;
  }
  
  function setComponentRefPro (refPro) {
    componentRefPro = refPro;
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3} style={{  }}>

        { theCard.type == "1" ?
          <MDBox>
            <MDBox>
              <MDTypography variant="h4" gutterBottom mb={2} color="primary" style={{ marginBottom: "30px", textAlign: "center"}}>
              CARTE DE COMMISSION D'EMPLOI
              </MDTypography>
              <Grid spacing={3} className="" display="flex" ref={setComponentRef}>
                <Grid className="" style={{ marginLeft: "5%", width: "43%", marginRight: "5%" }}>
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
                          Carte N° : {theCard.card_number}
                        </MDTypography>
                      </MDBox>
                      <MDBox display="flex" justifyContent="center" alignItems="center">
                        <MDBox sx={{ height: "270px", width: "50%", border: "5px solid #E5E5E5", borderRadius: "10px", padding: "3%"}}>
                          <img src={ theCard.photo ? photoNormalPath(theCard.photo) : "" } alt="" style={{ width: '100%', height: "100%"}}  />
                        </MDBox>
                      </MDBox>
                      <MDBox display="flex" justifyContent="center" alignItems="center" textAlign="center" pt={5} pl={6.5} pr={6.5} pb={2}>
                        <MDTypography variant="h6" gutterBottom mb={2} style={{ color: "#000" }}>
                          Par arrêté <strong>PV N° {theCard.pv != "" ? theCard.pv : "..."}</strong> du { theCard.pv_date != "" ? theCard.pv_date : "..."}, { theCard.gender == "M" ? "Mr" : theCard.gender == "F" ? "Mme" : "..." } {theCard.name != "" ? theCard.name : "..."} {theCard.surname != "" ? theCard.surname : "..."} a prêté serment prescrit par la loi devant le Tribunal Civil de Cotonou
                        </MDTypography>
                      </MDBox>
                    </MDBox>
                    <MDBox sx={{ marginBottom: '-15px', position: "absolute", bottom: "0" }}>
                      <img src={bgBottom} alt="" style={{ width: '100%'}}  />
                    </MDBox>
                  </Card>
                </Grid>
                <Grid className="" style={{ width: "43%", }}>
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
                        Au nom du peuple béninois, Mr le Directeur Général des Douanes requiert toutes les autorités constituées civiles et militaires de prêter à { theCard.gender == "M" ? "Mr" : theCard.gender == "F" ? "Mme" : "..." } {theCard.name != "" ? theCard.name : "..."} {theCard.surname != "" ? theCard.surname : "..."} aide, appui et protection dans tous ce qui se rattache à l’exercice des fonctions qui lui sont confiées.
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
                        <img src={ signPhoto } alt="Logo entreprise" style={{ width: "190px", height: "190px", marginLeft: "100px", marginRight: "100px" }} />
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

            <MDBox mt={2} mb={1} display="flex" spacing={3} sx={{ }}>
              <MDButton variant="gradient" color="secondary" type="button" sx={{ marginLeft: "10%", marginRight: "20%"}}>
                Modifier
              </MDButton>
              <MDBox sx={{ marginRight: "20%"}}>
                <ReactToPrint
                  trigger={() => {
                    // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
                    // to the root node of the returned component as it will be overwritten.
                    return <MDButton variant="gradient" color="info" type="button">
                              <Icon>printed</Icon>
                              &nbsp; Imprimer
                            </MDButton>;
                  }}
                  content={() => componentRef}
                />
              </MDBox>
              <MDButton variant="gradient" color="error">
                Supprimer
              </MDButton>
            </MDBox>
          </MDBox>

         : "" }

         { theCard.type == "2" ?
            <MDBox> 
              <MDBox>
                <MDTypography variant="h4" gutterBottom color="primary" style={{ marginBottom: "30px", textAlign: "center"}}>
                  CARTE PROFESSIONNELLE
                </MDTypography>
                <MDBox className="" style={{ marginLeft: "20%", width: "60%", marginRight: "20%", marginBottom: "60px" }}>
                  <MDBox className="" ref={setComponentRefPro} >
                    <Card style={{ width: "323px", height: "480px", paddingTop: "5px", color: "#000", }}>
                      <MDBox display="flex" justifyContent="space-between" alignItems="center">
                        <MDBox>
                          <img src={directionLogo} alt="Logo direction douanes" style={{ width: '161px', height: "43px", marginLeft: '12.6px', marginTop: "7px", padding: "3.6px", opacity: "1", zIndex: "9999",}} />
                        </MDBox>
                        <MDBox>
                          <img src={douaneLogo} alt="Logo direction douanes" style={{ width: '43px', height: "43px", float: 'right', marginTop: '2px', marginRight: "28px", zIndex: "9999",}}  />
                        </MDBox>
                      </MDBox>
                      <hr />
                      <MDBox sx={{ marginLeft: "-15px" }}>
                        <MDBox justifyContent="center" alignItems="center" textAlign="center" style={{ marginTop: "8px",}}>
                          <MDTypography style={{ fontWeight: "800", fontSize: "13px", color: "#000", textAlign:"center" }}>
                            DIRECTION GÉNÉRALE DES DOUANES
                          </MDTypography>
                        </MDBox>
                        <MDBox sx={{
                            backgroundImage: `url(${bgCard})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                            color: "#000",
                            alignItems:"center",
                            justifyContent:"center",
                            justifyItems: "center",
                            paddingLeft: "12%",
                            paddingRight: "12%",
                            marginBottom: "-20px"
                          }} >
                          <MDBox justifyContent="center" alignItems="center" textAlign="center">
                            <MDTypography style={{ color: "#000", fontWeight: "700", fontSize: "15px", marginTop: "2px" }}>
                              CARTE PROFESSIONNELLE
                            </MDTypography>
                          </MDBox>
                          <MDBox display="flex" justifyContent="center" alignItems="center" textAlign="center">
                            <MDTypography style={{ color: "#000", fontWeight: "700", fontSize: "13.3px", marginBottom: "2px" }}>
                              N° : {theCard.card_number}
                            </MDTypography>
                          </MDBox>
                          <MDBox display="flex" justifyContent="center" alignItems="center" sx={{ height: "170px", width: "100%", border: "2px solid #E5E5E5", borderRadius: "10px", padding: "10px", }}>
                            <MDBox style={{  width: "50%", height: "159px", paddingRight: "10px", paddingTop: "10px", overflow: "hidden"}}>
                              <img src={ theCard.photo ? photoNormalPath(theCard.photo) : "" } alt="" style={{ width: '98px', height: "118px", marginLeft: "3px", zIndex: "9999",}}  />
                              <MDTypography style={{ color: "#000", textAlign: "center", paddingRight: "-10px", fontSize:"13px", fontWeight: "800", }}>
                                Mle: {theCard.matricule_number}
                              </MDTypography>
                            </MDBox>
                            <MDBox style={{ width: "50%", height: "129px",}}>
                              <MDBox justifyContent="center" alignItems="center" style={{ width: '120px', marginTop: "4.3px", marginLeft:"16px" }}>
                                <img src={douaneLogo} alt="" style={{ width: '76px', height: "86px"}}  />
                              </MDBox>
                              <MDTypography style={{color: "#000", textAlign: "center", fontSize:"13px", fontWeight: "800", marginTop: "2px" }}>
                                {theCard.grade}
                              </MDTypography>
                            </MDBox>
                          </MDBox>
                          <MDBox mt={2} sx={{ width: "100%", height: "130px", overflow: "hidden"}} >
                            <MDBox display="flex" mb={0.3} >
                                <MDTypography style={{ fontSize: "14px", fontWeight: "500", color: "#000", width: "50%", overflow: "hidden",}}>
                                  Nom: 
                                </MDTypography>
                                <MDTypography style={{ fontSize: "14px", color: "#000", width: "50%", overflow: "hidden", fontWeight: "800"}}>
                                  {theCard.name != "" ? theCard.name : "..."}
                                </MDTypography>
                            </MDBox>
                            <MDBox display="flex" mb={0.3} >
                                <MDTypography style={{ fontSize: "14px", fontWeight: "500", color: "#000", width: "50%", overflow: "hidden",}}>
                                  Prénom(s): 
                                </MDTypography>
                                <MDTypography style={{ fontSize: "14px", color: "#000", width: "50%", overflow: "hidden", fontWeight: "800"}}>
                                  {theCard.surname != "" ? theCard.surname : "..."}
                                </MDTypography>
                            </MDBox>
                            <MDBox display="flex" mb={0.3} >
                                <MDTypography style={{ fontSize: "14px", fontWeight: "500", color: "#000", width: "50%", overflow: "hidden",}}>
                                  Date de naissance: 
                                </MDTypography>
                                <MDTypography style={{ fontSize: "14px", color: "#000", width: "50%", overflow: "hidden", fontWeight: "800"}}>
                                  { theCard.bornDate != "" ? theCard.bornDate : "..." }
                                </MDTypography>
                            </MDBox>
                            <MDBox display="flex" mb={0.3} >
                                <MDTypography style={{ fontSize: "14px", fontWeight: "500", color: "#000", width: "50%", overflow: "hidden",}}>
                                  Lieu de naissance:
                                </MDTypography>
                                <MDTypography style={{ fontSize: "14px", color: "#000", width: "50%", overflow: "hidden", fontWeight: "800"}}>
                                  {theCard.bornPlace != "" ? theCard.bornPlace : "..."}
                                </MDTypography>
                            </MDBox>
                            <MDBox display="flex" mb={0.3} >
                                <MDTypography style={{ fontSize: "14px", fontWeight: "500", color: "#000", width: "50%", overflow: "hidden",}}>
                                  Groupe sanguin:   
                                </MDTypography>
                                <MDTypography style={{ fontSize: "14px", color: "red", width: "50%", overflow: "hidden", fontWeight: "500"}}>
                                  {theCard.bloodGroup != "" ? theCard.bloodGroup : "..."}
                                </MDTypography>
                            </MDBox>
                          </MDBox>
                        </MDBox>
                      </MDBox>
                      <MDBox sx={{ marginBottom: '-15px', position: "absolute", bottom: "0" }}>
                        <img src={bgBottom} alt="" style={{ width: '100%', zIndex: "9999",}}  />
                      </MDBox>
                    </Card>
                    <Card style={{ width: "323px", height: "483px", paddingTop: "5px", color: "#000", overflow: "hidden", marginTop: "20px" }}>
                      <MDBox sx={{ marginLeft: "-15px" }}>
                        <MDBox display="flex" justifyContent="space-between" alignItems="center" sx={{
                            height: "120px",
                            marginBottom: "40px",
                          }} >
                          <MDBox style={{ position: "absolute"}}>
                            <img src={bgTop} alt="" style={{ width: "100%", height: "180px", zIndex: "1" }} />
                          </MDBox>
                          <MDBox style={{ marginTop: "", marginBottom: "50px", marginLeft: "127px", marginRight: "165px"}}>
                            <img src={douaneLogo} alt="Logo direction douanes" style={{ width: "69px", height: "78px", position: "absolute", zIndex: "9999", }} />
                          </MDBox>
                        </MDBox>
                        <MDBox sx={{
                            backgroundImage: `url(${bgCard})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                            color: "#000",
                            marginTop: "10px"
                          }} >
                          <MDBox display="flex" justifyContent="center" alignItems="center" textAlign="center" pl={3} pr={3}>
                            <MDTypography style={{  fontSize: "14px", fontWeight: "500", color: "#000" }}>
                            Cette carte est strictement personnelle et incessible et tient aussi lieu de carte professionnelle. <br/>Contact d’urgence : 21 54 64 66
                            </MDTypography>
                          </MDBox>
                          <MDBox style={{ justifyContent:"center", alignItems:"center", textAlign:"center", marginBottom: "5px" }}>
                            <img src={ divider } alt="Diviseur" style={{ width: "60%", height: "0.8px",}} />
                          </MDBox>
                          <MDBox display="flex" justifyContent="center" alignItems="center" textAlign="center">
                            <MDTypography style={{ fontSize: "14px", fontWeight: "500", color: "#000", marginLeft: "20px", marginRight: "20px", marginBottom: "15px" }}>
                              Fait à Cotonou, le { formattedToday }
                            </MDTypography>
                          </MDBox>
                          <MDBox style={{ justifyContent:"center", alignItems:"center", textAlign:"center", marginBottom: "10px" }}>
                            <img src={ signProPhoto } alt="Logo entreprise" style={{ width: "80px", height: "80px", marginLeft: "116px", marginRight: "116px" }} />
                          </MDBox>
                          <MDBox display="flex" justifyContent="center" alignItems="center" textAlign="center" marginBottom="25px">
                            <MDTypography style={{ fontSize: "15px", fontWeight: "500", color: "#000", marginLeft: "20px", marginRight: "20px", marginBottom: "10px" }}>
                            { signProAuthor }
                            </MDTypography>
                          </MDBox>
                        </MDBox>
                        <MDBox sx={{ marginBottom: '-10px', position: "absolute", bottom: "0" }}>
                          <img src={bgBottom} alt="" style={{ width: '100%', zIndex: "9999",}}  />
                        </MDBox>
                      </MDBox>
                    </Card>
                  </MDBox>
                </MDBox>
              </MDBox>
              <MDBox mt={2} mb={1} display="flex" spacing={3} sx={{ }}>
                <MDButton variant="gradient" color="secondary" type="button" sx={{ marginLeft: "10%", marginRight: "20%"}}>
                  Modifier
                </MDButton>
                <MDBox sx={{ marginRight: "20%"}}>
                  <ReactToPrint
                    trigger={() => {
                      // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
                      // to the root node of the returned component as it will be overwritten.
                      return <MDButton variant="gradient" color="info" type="button">
                                <Icon>printed</Icon>
                                &nbsp; Imprimer
                              </MDButton>;
                    }}
                    content={() => componentRefPro}
                  />
                </MDBox>
                <MDButton variant="gradient" color="error">
                  Supprimer
                </MDButton>
              </MDBox>
            </MDBox>
          : "" }


      </MDBox>
      <MDBox style={{ position: "absolute", bottom: "0"}}>
        <Footer />
      </MDBox>
    </DashboardLayout>
  );
}

export default ShowCard;
