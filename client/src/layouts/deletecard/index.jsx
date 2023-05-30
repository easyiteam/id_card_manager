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

import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import { inputAdornmentClasses } from "@mui/material";
import axios from "axios";

function ShowCard() {
  
  const authContext = useContext(AuthContext);

  const [typeCard, setTypeCard] = useState("");

  const [theCard, setCard] = useState({});
  const { id } = useParams()

  const [signAuthor, setAuthCom] = useState([]);
  const [signPhoto, setPhotoCom] = useState([]);

  const [signProAuthor, setAuthProCom] = useState([]);
  const [signProPhoto, setPhotoProCom] = useState([]);

  function photoNormalPath(photo) {
    return photo.substring(photo.lastIndexOf(''), 9)
  }
  
  const cardReq = axios.post(`${process.env.REACT_APP_API_URL}/card/getACard`, { cardId: id })
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

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3} style={{  }}>
        
      </MDBox>
      <MDBox style={{ position: "absolute", bottom: "0"}}>
        <Footer />
      </MDBox>
    </DashboardLayout>
  );
}

export default ShowCard;
