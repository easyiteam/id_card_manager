

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import MenuItem from '@mui/material/MenuItem';
import Menu from "@mui/material/Menu";

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
import "./styles.css";

// Data
import SettingService from "@/services/setting-service";
import { AuthContext } from "@/context";
import settingData from "@/layouts/settings/data/settingData";

import data from "@/layouts/dashboard/components/Projects/data";

function SettingFunction() {
  
  const authContext = useContext(AuthContext);

  const { columns, rows } = data();
  console.log(columns)

  const [setting, setSetting] = useState({});
  const [newSettingErrors, setNewSettingError] = useState(null);

  const [inputs, setInputs] = useState({
    sign_author: "",
    signature: "",
  });

  const [file, setFile] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  // IMAGE UPLOADING
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const onDrop = useCallback(acceptedFiles => {
    setInputs({ ...inputs, signature: acceptedFiles[0] } );
        // Loop through accepted files
    acceptedFiles.map(file => {
      // Initialize FileReader browser API
      const reader = new FileReader();
      // onload callback gets called after the reader reads the file data
      reader.onload = function(e) {
        // add the image into the state. Since FileReader reading process is asynchronous, its better to get the latest snapshot state (i.e., prevState) and update it.
        // setInputs( { ...inputs, signature: e.target.result } );
        setFile(e.target.result);
      };
      
      // Read the file as Data URL (since we accept only images)
      reader.readAsDataURL(file);
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
    const formData = new FormData();
    formData.append('file', inputs.signature);
    formData.append('sign_author', inputs.sign_author);
    formData.append('signature', inputs.signature);
    console.log(formData)

    const settingData = {
      data: {
        type: "settings",
        attributes: { ...formData },
      },
    };

    console.log(settingData)

    try {
      // const response = await SettingService.create(settingData);
      // authContext.login(response.access_token, response.refresh_token);
      // console.log(response)
      await fetch(`${process.env.REACT_APP_API_URL}/setting/create`, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': `application/vnd.api+json; multipart/form-data; boundary=---XYZ`,
          "Accept": "application/vnd.api+json", 
          'Access-Control-Allow-Credentials': true
        },
      });
      console.log('File uploaded successfully!');
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
        <MDBox pb={3}>
          <Grid container spacing={3} sm={12} md={12} lg={12}>
              <Card sm={12} md={12} lg={12}>
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
                  <MDBox component="form" role="form" method="POST" onSubmit={submitHandler} enctype="multipart/form-data">
                    <MDBox mb={2}>
                      <MDInput
                        type="text"
                        label="Nom et prénoms du signataire*"
                        fullWidth
                        name="sign_author"
                        value={inputs.sign_author}
                        onChange={changeHandler}
                        error={errors.signAuthorError}
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
                         { file != "" ? <img src={file} alt="" style={{ width: "180px", height: "180px" }} /> : "" }
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
            {/* <DataTable
              table={{ columns, rows }}
              showTotalEntries={false}
              isSorted={false}
              noEndBorder
              entriesPerPage={false}
            /> */}
          </MDBox>
        </Card>
       
        </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default SettingFunction;
