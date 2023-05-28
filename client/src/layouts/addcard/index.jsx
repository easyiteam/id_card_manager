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
import CardService from "@/services/card-service";
import { AuthContext } from "@/context";

import directionLogo from "@/assets/images/logo-finances.png";
import douaneLogo from "@/assets/images/douane_logo.png";
import bgCard from "@/assets/images/bg_card.png";
import bgTop from "@/assets/images/bg_top.png";
import bgBottom from "@/assets/images/bg_bottom.png";
import logoSecondFace from "@/assets/images/logo_second_face.png";
// import imageTest from "@/assets/images/image_test.png";

// Import the dropzone component
import Dropzone from "./data/Dropzone";

// cuid is a simple library to generate unique IDs
import cuid from "cuid";

import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import { inputAdornmentClasses } from "@mui/material";

function AddCard() {
  
  const authContext = useContext(AuthContext);

  const [typeCard, setTypeCard] = useState(0);

  const [card, setCard] = useState({});
  const [newCardErrors, setNewCardError] = useState(null);

  const randNumber = Math.floor(10000 + Math.random() * 89998);
  const randProNumber = Math.floor(10 + Math.random() * 88) + "-" + Math.floor(10000 + Math.random() * 89998);
  const randMatriNumber = Math.floor(10000 + Math.random() * 89998);

  const [inputs, setInputs] = useState({
    card_number: randNumber,
    pv: "",
    pv_date: "",
    gender: "",
    name: "",
    surname: "",
    sign_author: "",
    type: 1
  });
  
  const [proInputs, setProInputs] = useState({
    card_number: randProNumber,
    matricule_number: "",
    name: "",
    surname: "",
    grade: "",
    bornDate: "",
    bornPlace: "",
    bloodGroup: "",
    sign_author: "",
    type: 2
  });

  const handleChangeGender = (event) => {
    setInputs({ ...inputs, gender: event.target.value });
  };
    
  const handleComCard = () => {
    setTypeCard(1);
  };

  const handleProCard = () => {
    setTypeCard(2);
  };

  // PHOTO UPLOADING
  // Create a state called images using useState hooks and pass the initial value as empty array
  const [image, setImage] = useState([]);
  const [imagePro, setProImage] = useState([]);

  const onDrop = useCallback(acceptedFiles => {
    // console.log('gogo', acceptedFiles)
    // Loop through accepted files
    acceptedFiles.map(file => {
      // Initialize FileReader browser API
      const reader = new FileReader();
      // onload callback gets called after the reader reads the file data
      reader.onload = function(e) {
        // add the image into the state. Since FileReader reading process is asynchronous, its better to get the latest snapshot state (i.e., prevState) and update it. 
        setImage({ src: e.target.result });
        // console.log( e.target.result)
      };
      // Read the file as Data URL (since we accept only images)
      reader.readAsDataURL(file);
      // console.log(file)
      return file;
    });
  }, []);
  
  const onDropPro = useCallback(acceptedFiles => {
    // console.log('gogo', acceptedFiles)
    // Loop through accepted files
    acceptedFiles.map(file => {
      // Initialize FileReader browser API
      const reader = new FileReader();
      // onload callback gets called after the reader reads the file data
      reader.onload = function(e) {
        // add the image into the state. Since FileReader reading process is asynchronous, its better to get the latest snapshot state (i.e., prevState) and update it. 
        setProImage({ src: e.target.result });
        // console.log( e.target.result)
      };
      // Read the file as Data URL (since we accept only images)
      reader.readAsDataURL(file);
      // console.log(file)
      return file;
    });
  }, []);

  const [errors, setErrors] = useState({
    cardNumberError: false,
    pvError: false,
    pvDateError: false,
    nameError: false,
    surnameError: false,
    genderError: false,
  });
  
  const [errorPros, setProErrors] = useState({
    cardNumberError: false,
    marticuleNumberError: false,
    bornDateError: false,
    bornPlaceError: false,
    nameError: false,
    surnameError: false,
    gradeError: false,
    bloodGroupError: false,
  });

  const addNewCardHandler = (newCard) => setCard(newCard);

  const changeHandler = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const changeProHandler = (e) => {
    setProInputs({
      ...proInputs,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(e)
    
    if (inputs.name.trim().length < 3) {
      setErrors({ ...errors, nameError: true });
      return;
    }

    if(typeCard == 1) {
      const newCard = { card_number: inputs.card_number, pv: inputs.pv, pv_date: inputs.pv_date, gender: inputs.gender, name: inputs.name, surname: inputs.surname, type: 1 };
      addNewCardHandler(newCard);
      
      const cardData = {
        data: {
          type: "cards",
          attributes: { ...newCard, card_number: newCard.card_number },
        },
      };
  
      try {
        const response = await CardService.create(cardData);
        // authContext.login(response.access_token, response.refresh_token);
        console.log(response)
      } catch (res) {
        if (res.hasOwnProperty("message")) {
          setNewCardError(res.message);
        } else {
          setNewCardError(res.errors[0].detail);
        }
      }

    } else if(typeCard == 2) {

      const newCard = { card_number:proInputs.card_number, matricule_number: proInputs.matricule_number, bornDate: proInputs.bornDate, bornPlace: proInputs.bornPlace, bloodGroup: proInputs.bloodGroup, name: inputs.name, surname: inputs.surname, grade: proInputs.grade, type: 2 };
      addNewCardHandler(newCard);
      
      const cardData = {
        data: {
          type: "cards",
          attributes: { ...newCard, card_number: newCard.card_number },
        },
      };
  
      try {
        const response = await CardService.create(cardData);
        // authContext.login(response.access_token, response.refresh_token);
        console.log(response)
      } catch (res) {
        if (res.hasOwnProperty("message")) {
          setNewCardError(res.message);
        } else {
          setNewCardError(res.errors[0].detail);
        }
      }
    }

    return () => {
      setInputs({
        card_number: "",
        pv: "",
        pv_date: "",
        name: "",
        surname: "",
        gender: "",
      });

      setErrors({
        cardNumberError: false,
        pvError: false,
        pvDateError: false,
        nameError: false,
        surnameError: false,
        genderError: false,
      });

      setProInputs({
        card_number: "",
        matricule_number: "",
        name: "",
        surname: "",
        grade: "",
        bornDate: "",
        bornPlace: "",
        bloodGroup: "",
        sign_author: "",
      });

      setProErrors({
        cardNumberError: false,
        marticuleNumberError: false,
        bornDateError: false,
        bornPlaceError: false,
        nameError: false,
        surnameError: false,
        gradeError: false,
        bloodGroupError: false,
      });
    };
  };

  // const div = useRef();
  
  // useLayoutEffect(() => {
  //   console.log(div);
  //   const divAnimate = div.current.getBoundingClientRect().top;
  //   console.log(divAnimate);
  //   const onScroll = () => {
  //     if (divAnimate < window.scrollY) {
  //       // console.log("ok"); 
  //       div.current.style.position = "fixed";
  //       div.current.style.top = 0;
  //       div.current.style.left = 0;
  //     } else {
  //       div.current.style.position = "relative";
  //     }
  //   };
  //   window.addEventListener("scroll", onScroll);
  //   return () => window.removeEventListener("scroll", onScroll);
  // }, []);

  const todayDate = new Date()
  console.log(todayDate)
  // todayDate.toLocaleDateString("fr")

  function formatDate(input) {
    let datePart = input.match(/\d+/g),
    year = datePart[0].substring(0), // get only two digits
    month = datePart[1], day = datePart[2];

    return day+'/'+month+'/'+year;
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
        <MDBox py={3} style={{  }}>
          <MDTypography variant="h4" gutterBottom mb={2}>
            Quelle carte voulez-vous créer ?
          </MDTypography>
          <MDBox display="flex" >
            <MDBox mb={5}>
              <MDButton variant="gradient" color="info" type="button" onClick={handleComCard}>
                Carte de commision
              </MDButton>
            </MDBox>
            <MDBox mb={5} ml={4}>
            <MDButton variant="gradient" color="info" type="button"  onClick={handleProCard}>
              Carte professionnelle
            </MDButton>
          </MDBox>
        </MDBox>

        { typeCard === 1 ?
          <MDBox>
            <MDTypography variant="h4" gutterBottom mb={2} color="primary" style={{ marginBottom: "30px", textAlign: "center"}}>
            CARTE DE COMMISSION D'EMPLOI
            </MDTypography>
            <Grid container spacing={3} className="bigGrid">
              <Grid className="leftGrid">
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
                        <FormControl fullWidth p={2}>
                          <InputLabel id="gender-label">Genre</InputLabel>
                          <Select
                            labelId="gender-label"
                            id="gender"
                            value={inputs.gender}
                            label="Genre"
                            p={2}
                            onChange={handleChangeGender}
                          >
                            <MenuItem value="F">Femme</MenuItem>
                            <MenuItem value="M">Homme</MenuItem>
                          </Select>
                        </FormControl>
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
                          error={errors.nameError}
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
                      <Grid container spacing={3}>
                        <Grid item xs={12} md={6} lg={6}>
                          <MDBox mb={2}>
                            <Dropzone onDrop={onDrop} accept={"image/*"} />
                            {/* <UploadDropzone uploader={uploader}
                                          options={uploadOptions}
                                          onUpdate={files => alert(files.map(x => x.fileUrl).join("\n"))}
                                          height="375px"  
                                          text="Ajouter une photo"
                            /> */}
                          </MDBox>
                        </Grid >
                        <Grid item xs={12} md={6} lg={6}>
                          <MDBox mb={2}>
                            
                          </MDBox>
                        </Grid >
                      </Grid>
                      <MDBox mt={2} mb={1}>
                        <MDButton variant="gradient" color="info" type="submit">
                          Enregistrer
                        </MDButton>
                      </MDBox>
                    </MDBox>
                  </MDBox>
                </Card>
              </Grid> 
              <Grid className="rightGrid">
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
                        Par arrêté <strong>PV N° {inputs.pv}</strong> du { inputs.pv_date != "" ? formatDate(inputs.pv_date) : ""}, { inputs.gender == "M" ? "Mr" : "Mdme" } {inputs.name} {inputs.surname} a prêté serment prescrit par la loi devant le Tribunal Civil de Cotonou
                      </MDTypography>
                    </MDBox>
                  </MDBox>
                  <MDBox sx={{ marginBottom: '-15px', position: "absolute", bottom: "0" }}>
                    <img src={bgBottom} alt="" style={{ width: '100%'}}  />
                  </MDBox>
                </Card>
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
                      Au nom du peuple béninois, Mr le Directeur Général des Douanes requiert toutes les autorités constituées civiles et militaires de prêter à { inputs.gender == "M" ? "Mr" : "Mdme" } {inputs.name} {inputs.surname} aide, appui et protection dans tous ce qui se rattache à l’exercice des fonctions qui lui sont confiées.
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
                        Fait à Cotonou, le 
                      </MDTypography>
                    </MDBox>
                    <MDBox style={{ }}>
                      <img src={logoSecondFace} alt="Logo entreprise" style={{ width: "200px", height: "200px", marginLeft: "100px", marginRight: "100px" }} />
                    </MDBox>
                    <MDBox display="flex" justifyContent="center" alignItems="center" textAlign="center" marginBottom="25px">
                      <MDTypography variant="h5" gutterBottom style={{ color: "#000", marginLeft: "20px", marginRight: "20px" }}>
                        Fait à Cotonou, le 
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
         { typeCard === 2 ?
            <MDBox>
              <MDTypography variant="h4" gutterBottom mb={2} color="primary" style={{ marginBottom: "30px", textAlign: "center"}}>
                CARTE PROFESSIONNELLE
              </MDTypography>
              <Grid container spacing={3} className="bigGrid">
                <Grid className="leftGrid">
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
                            label="N matricule*"
                            fullWidth
                            value={proInputs.matricule_number}
                            name="matricule_number"
                            onChange={changeProHandler}
                            error={errorPros.marticuleNumberError}
                          />
                        </MDBox>
                        <MDBox mb={2}>
                          <MDInput
                            type="text"
                            label="Nom*"
                            fullWidth
                            name="name"
                            value={proInputs.name}
                            onChange={changeProHandler}
                            error={errorPros.nameError}
                          />
                        </MDBox>
                        <MDBox mb={2}>
                          <MDInput
                            type="text"
                            label="Prénoms*"
                            fullWidth
                            name="surname"
                            value={proInputs.surname}
                            onChange={changeProHandler}
                            error={errorPros.surnameError}
                          />
                        </MDBox>
                        <Grid container spacing={3}>
                          <Grid item xs={12} md={6} lg={6}>
                            <MDBox mb={2}>
                              <MDInput
                                type="date"
                                label="Date de naissance*"
                                fullWidth
                                value={proInputs.bornDate}
                                name="bornDate"
                                onChange={changeProHandler}
                                error={errorPros.bornDateError}
                              />
                            </MDBox>
                          </Grid >
                          
                          <Grid item xs={12} md={6} lg={6}>
                            <MDBox mb={2}>
                              <MDInput
                                type="text"
                                label="Lieu de naissance*"
                                fullWidth
                                value={proInputs.bornPlace}
                                name="bornPlace"
                                onChange={changeProHandler}
                                error={errorPros.bornPlaceError}
                              />
                            </MDBox>
                          </Grid >
                        </Grid>
                        <MDBox mb={2}>
                          <MDInput
                            type="text"
                            label="Grade*"
                            fullWidth
                            name="grade"
                            value={proInputs.grade}
                            onChange={changeProHandler}
                            error={errorPros.gradeError}
                          />
                        </MDBox>
                        <MDBox mb={2}>
                          <MDInput
                            type="text"
                            label="Groupe sanguin*"
                            fullWidth
                            name="bloodGroup"
                            value={proInputs.bloodGroup}
                            onChange={changeProHandler}
                            error={errorPros.bloodGroupError}
                          />
                        </MDBox>
                        <Grid container spacing={3}>
                          <Grid item xs={12} md={6} lg={6}>
                            <MDBox mb={2}>
                              <Dropzone onDrop={onDropPro} accept={"image/*"} />
                              {/* <UploadDropzone uploader={uploader}
                                            options={uploadOptions}
                                            onUpdate={files => alert(files.map(x => x.fileUrl).join("\n"))}
                                            height="375px"  
                                            text="Ajouter une photo"
                              /> */}
                            </MDBox>
                          </Grid >
                          <Grid item xs={12} md={6} lg={6}>
                            <MDBox mb={2}>
                              
                            </MDBox>
                          </Grid >
                        </Grid>
                        <MDBox mt={2} mb={1}>
                          <MDButton variant="gradient" color="info" type="submit">
                            Enregistrer
                          </MDButton>
                        </MDBox>
                      </MDBox>
                    </MDBox>
                  </Card>
                </Grid> 
                <Grid className="rightGrid">
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
                          <MDTypography variant="h6" gutterBottom mb={2} style={{ color: "#000", textAlign: "center" }}>
                            Mlle : {proInputs.matricule_number}
                          </MDTypography>
                        </MDBox>
                        <MDBox style={{ width: "150px", height: "270px",  overflow: "hidden"}}>
                          <img src={douaneLogo} alt="" style={{ width: '120px', height: "160px", marginTop: "35px", marginBottom: "8px"}}  />
                          <MDTypography variant="h6" gutterBottom mb={2} style={{ color: "#000", textAlign: "center", }}>
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
                              {proInputs.name != "" ? proInputs.name : ""}
                            </MDTypography>
                        </MDBox>
                        <MDBox display="flex" mb={0.3} >
                            <MDTypography variant="h6" gutterBottom style={{ color: "#000", width: "50%", overflow: "hidden",}}>
                              Prénom(s): 
                            </MDTypography>
                            <MDTypography variant="h6" gutterBottom style={{ color: "#000", width: "50%", overflow: "hidden", fontWeight: "400"}}>
                              {proInputs.surname != "" ? proInputs.surname : ""}
                            </MDTypography>
                        </MDBox>
                        <MDBox display="flex" mb={0.3} >
                            <MDTypography variant="h6" gutterBottom style={{ color: "#000", width: "50%", overflow: "hidden",}}>
                              Date de naissance: 
                            </MDTypography>
                            <MDTypography variant="h6" gutterBottom style={{ color: "#000", width: "50%", overflow: "hidden", fontWeight: "400"}}>
                              {proInputs.bornDate}
                            </MDTypography>
                        </MDBox>
                        <MDBox display="flex" mb={0.3} >
                            <MDTypography variant="h6" gutterBottom style={{ color: "#000", width: "50%", overflow: "hidden",}}>
                              Lieu de naissance:
                            </MDTypography>
                            <MDTypography variant="h6" gutterBottom style={{ color: "#000", width: "50%", overflow: "hidden", fontWeight: "400"}}>
                              {proInputs.bornPlace}
                            </MDTypography>
                        </MDBox>
                        <MDBox display="flex" mb={0.3} >
                            <MDTypography variant="h6" gutterBottom style={{ color: "#000", width: "50%", overflow: "hidden",}}>
                              Groupe sanguin:   
                            </MDTypography>
                            <MDTypography variant="h6" gutterBottom style={{ color: "red", width: "50%", overflow: "hidden", fontWeight: "600"}}>
                              {proInputs.bloodGroup}
                            </MDTypography>
                        </MDBox>
                      </MDBox>
                    </MDBox>
                    <MDBox sx={{ marginBottom: '-15px', position: "absolute", bottom: "0" }}>
                      <img src={bgBottom} alt="" style={{ width: '100%'}}  />
                    </MDBox>
                  </Card>
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
                    <MDBox sx={{
                        backgroundImage: `url(${bgCard})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        color: "#000",
                      }} >
                      <MDBox display="flex" justifyContent="center" alignItems="center" textAlign="center">
                        <MDTypography variant="h5" gutterBottom style={{ color: "#000", marginLeft: "20px", marginRight: "20px" }}>
                          Fait à Cotonou, le 
                        </MDTypography>
                      </MDBox>
                      <MDBox style={{ }}>
                        <img src={logoSecondFace} alt="Logo entreprise" style={{ width: "200px", height: "200px", marginLeft: "100px", marginRight: "100px" }} />
                      </MDBox>
                      <MDBox display="flex" justifyContent="center" alignItems="center" textAlign="center" marginBottom="25px">
                        <MDTypography variant="h5" gutterBottom style={{ color: "#000", marginLeft: "20px", marginRight: "20px" }}>
                          Fait à Cotonou, le 
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

export default AddCard;
