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
import Icon from "@mui/material/Icon";
import MenuItem from '@mui/material/MenuItem';
import Menu from "@mui/material/Menu";
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
import DataTable from "@/examples/Tables/DataTable";

// Import the dropzone component
import Dropzone from "./data/Dropzone";

// Data
import SettingService from "@/services/setting-service";
import { AuthContext } from "@/context";
import settingData from "@/layouts/settings/data/settingData";

import data from "@/layouts/dashboard/components/Projects/data";

function SettingFunction() {
  
  const authContext = useContext(AuthContext);

  const { columns, rows } = data();

  const [setting, setSetting] = useState({});
  const [newSettingErrors, setNewSettingError] = useState(null);

  const [inputs, setInputs] = useState({
    sign_author: "",
    signature: "",
  });

  // PHOTO UPLOADING
  // Create a state called images using useState hooks and pass the initial value as empty array
  // const [image, setImage] = useState([]);

  const onDrop = useCallback(acceptedFiles => {
    // console.log('gogo', acceptedFiles)
    // Loop through accepted files
    acceptedFiles.map(file => {
      // Initialize FileReader browser API
      const reader = new FileReader();
      // onload callback gets called after the reader reads the file data
      reader.onload = function(e) {
        // add the image into the state. Since FileReader reading process is asynchronous, its better to get the latest snapshot state (i.e., prevState) and update it. 
        setInputs( ...inputs, { signature: e.target.result } );
        // console.log( e.target.result)
      };
      // Read the file as Data URL (since we accept only images)
      reader.readAsDataURL(file);
      // console.log(file)
      return file;
    });
  }, []);

  const [errors, setErrors] = useState({
    signAuthorError: false,
    signatureError: false,
  });

  const addNewSettingHandler = (newSetting) => setSetting(newSetting);


  const changeHandler = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    
    if (inputs.sign_author.trim().length < 3) {
      setErrors({ ...errors, signAuthorError: true });
      return;
    }

    const newSetting = { sign_author: inputs.sign_author, signature: inputs.signature, };
    addNewSettingHandler(newSetting);

    const settingData = {
      data: {
        type: "settings",
        attributes: { ...newSetting, sign_author: newSetting.sign_author, signature: newSetting.signature, },
      },
    };

    try {
      const response = await SettingService.create(settingData);
      // authContext.login(response.access_token, response.refresh_token);
      console.log(response)
    } catch (res) {
      if (res.hasOwnProperty("message")) {
        setNewSettingError(res.message);
      } else {
        setNewSettingError(res.errors[0].detail);
      }
    }

    return () => {
      setInputs({
        sign_author: "",
        signature: ""
      });

      setErrors({
        cardNumberError: false,
        pvError: false,
      });
    };
  };

  // const { columns, rows } = data();
  const [menu, setMenu] = useState(null);

  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);

  const renderMenu = (
    <Menu
      id="simple-menu"
      anchorEl={menu}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(menu)}
      onClose={closeMenu}
    >
      <MenuItem onClick={closeMenu}>Action</MenuItem>
      <MenuItem onClick={closeMenu}>Another action</MenuItem>
      <MenuItem onClick={closeMenu}>Something else</MenuItem>
    </Menu>
  );

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3} style={{  }}>
        <MDBox>
          <Grid container spacing={3}>
              <Card>
                <MDTypography variant="h3">
                  Ajouter un signataire 
                </MDTypography>
                <MDBox justifyContent="space-between" alignItems="center" p={3}>
                  <MDTypography variant="h6" gutterBottom mb={2} color="error">
                    Tous les champs sont obligatoires (*)
                  </MDTypography>
                  {newSettingErrors && (
                    <MDTypography variant="caption" color="error" fontWeight="light" pt={2}>
                      {newSettingErrors}
                    </MDTypography>
                  )}
                  <MDBox component="form" role="form" method="POST" onSubmit={submitHandler}>
                    <MDBox mb={2}>
                      <MDInput
                        type="text"
                        label="Nom et prénoms du signataire*"
                        fullWidth
                        name="sign_author"
                        value={inputs.sign_author}
                        onChange={changeHandler}
                        error={errors.signAuthorErrorError}
                      />
                    </MDBox>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6} lg={6}>
                        <MDBox mb={2}>
                          <Dropzone onDrop={onDrop} accept={"image/*"} />
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
        </MDBox>
        
        <Card>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
        <MDBox>
          <MDTypography variant="h6" gutterBottom>
            Projects
          </MDTypography>
          <MDBox display="flex" alignItems="center" lineHeight={0}>
            <Icon
              sx={{
                fontWeight: "bold",
                color: ({ palette: { info } }) => info.main,
                mt: -0.5,
              }}
            >
              done
            </Icon>
            <MDTypography variant="button" fontWeight="regular" color="text">
              &nbsp;<strong>30 done</strong> this month
            </MDTypography>
          </MDBox>
        </MDBox>
        <MDBox color="text" px={2}>
          <Icon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="small" onClick={openMenu}>
            more_vert
          </Icon>
        </MDBox>
        {renderMenu}
      </MDBox>
      <MDBox>
        <DataTable
          table={{ columns, rows }}
          showTotalEntries={false}
          isSorted={false}
          noEndBorder
          entriesPerPage={false}
        />
      </MDBox>
    </Card>
       
        </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default SettingFunction;
