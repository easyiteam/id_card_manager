import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Icon from '@mui/material/Icon';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import MDBox from '@/components/MDBox';
import MDTypography from '@/components/MDTypography';
import MDInput from '@/components/MDInput';
import MDButton from '@/components/MDButton';

import DashboardLayout from '@/examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from '@/examples/Navbars/DashboardNavbar';
import Footer from '@/examples/Footer';

import Dropzone from './data/Dropzone';
import './styles.css';

// import { AuthContext } from '@/context';
import DataTable from 'react-data-table-component';

import axios from 'axios';

const TextField = styled.input`
  height: 32px;
  width: 200px;
  border-radius: 3px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border: 1px solid #e5e5e5;
  padding: 0 32px 0 16px;

  &:hover {
    cursor: pointer;
  }
`;

const ClearButton = styled(MDButton)`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  height: 34px;
  width: 32px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// eslint-disable-next-line react/prop-types
const FilterComponent = ({ filterText, onFilter, onClear }) => (
  <>
    <TextField
      id="search"
      type="text"
      placeholder="Filtrer par nom"
      aria-label="Champ de recherche"
      value={filterText}
      onChange={onFilter}
    />
    <ClearButton type="button" onClick={onClear}>
      X
    </ClearButton>
  </>
);

function SettingFunction() {
  // const authContext = useContext(AuthContext);
  const [allSignAuthors, setSignAuthors] = useState([]);

  // const [setting, setSetting] = useState({});
  const [newSettingErrors, setNewSettingError] = useState(null);

  const [inputs, setInputs] = useState({
    sign_author: '',
    signature: '',
  });

  const [file, setFile] = useState('');
  const [selectedFile, setSelectedFile] = useState([]);

  function photoNormalPath(photo) {
    return photo.substring(photo.lastIndexOf(''), 9);
  }

  // IMAGE UPLOADING
  const onDrop = useCallback((acceptedFiles) => {
    setSelectedFile(acceptedFiles[0]);
    // Loop through accepted files
    acceptedFiles.map((file) => {
      // Initialize FileReader browser API
      const reader = new FileReader();
      // onload callback gets called after the reader reads the file data
      reader.onload = function (e) {
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

    const formData = new FormData();
    formData.append('sign_author', inputs.sign_author);
    formData.append('signature', selectedFile);

    try {
      await axios
        .post(`${import.meta.env.VITE_APP_API_URL}/setting/create`, formData)
        .then((response) => {
          // console.log(response.data)
          if (!response.data.errors) {
            setInputs({
              sign_author: '',
              signature: '',
            });

            setErrors({
              signAuthorError: false,
              signatureError: false,
            });
            setSignAuthors([...allSignAuthors, response.data]);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (res) {
      if ('message' in res) {
        setNewSettingError(res.message);
      } else {
        setNewSettingError(res.errors[0].detail);
      }
    }

    return () => {
      setInputs({
        sign_author: '',
        signature: '',
      });

      // setFile("");

      setErrors({
        signAuthorError: false,
        signatureError: false,
      });
    };
  };

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_APP_API_URL}/setting/getAll`)
      .then((response) => {
        if (!response.data.errors) {
          setSignAuthors(response.data);
        }
      });
  }, []);

  const columns = [
    {
      name: "Logo de l'entreprise",
      selector: (row) => (
        <img
          src={row.signature ? photoNormalPath(row.signature) : ''}
          alt={'Photo de ' + row.sign_author}
          style={{ width: '60px', height: '60px', borderRadius: '50%' }}
        />
      ),
      // row.photo,
    },
    {
      name: 'Nom et prénoms',
      selector: (row) => row.sign_author,
      sortable: true,
    },
    {
      name: 'Actions',
      selector: () => (
        <MDBox display="flex" style={{ justifyContent: 'center' }}>
          <Link
            to=""
            style={{
              marginRight: '6px',
              width: '30px',
              height: '30px',
              fontSize: '23px',
              padding: '3px',
              cursor: 'pointer',
              border: 'none',
              color: 'white',
              backgroundColor: 'blue',
              borderRadius: '50%',
              outline: 'none',
            }}>
            <Icon>edit</Icon>
          </Link>
          <Link
            to=""
            style={{
              width: '30px',
              height: '30px',
              fontSize: '23px',
              padding: '3px',
              cursor: 'pointer',
              border: 'none',
              color: 'white',
              backgroundColor: 'red',
              borderRadius: '50%',
              outline: 'none',
            }}>
            <Icon>delete</Icon>
          </Link>
        </MDBox>
      ),
    },
  ];

  const [filterText, setFilterText] = useState('');
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const filteredItems = allSignAuthors.filter(
    (item) =>
      item.sign_author &&
      item.sign_author.toLowerCase().includes(filterText.toLowerCase()),
  );

  const subHeaderComponentMemo = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText('');
      }
    };

    return (
      <FilterComponent
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);

  const paginationComponentOptions = {
    rowsPerPageText: 'Lignes par page',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Totaux',
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3} style={{}}>
        <MDBox pb={3}>
          <Grid spacing={3} sm={12} md={12} lg={12}>
            <Card item sm={12} md={12} lg={12}>
              <MDTypography variant="h3" pl={3} pt={2}>
                Ajouter un signataire
              </MDTypography>
              <MDBox justifyContent="space-between" alignItems="center" p={3}>
                <MDTypography variant="h6" gutterBottom mb={2} color="error">
                  Tous les champs sont obligatoires (*)
                </MDTypography>
                {newSettingErrors && (
                  <MDTypography
                    variant="caption"
                    color="error"
                    fontWeight="light"
                    pt={2}>
                    {newSettingErrors}
                  </MDTypography>
                )}
                <MDBox
                  component="form"
                  role="form"
                  method="POST"
                  onSubmit={submitHandler}
                  encType="multipart/form-data">
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
                        <Dropzone onDrop={onDrop} accept={'image/*'} />
                      </MDBox>
                    </Grid>
                    <Grid item xs={12} md={6} lg={6}>
                      <MDBox mb={2}>
                        {file != '' ? (
                          <img
                            src={file}
                            alt=""
                            style={{ width: '180px', height: '180px' }}
                          />
                        ) : (
                          ''
                        )}
                      </MDBox>
                    </Grid>
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
          <MDBox>
            <DataTable
              title="Liste des signataires"
              columns={columns}
              data={filteredItems}
              defaultSortFieldId={1}
              pagination
              paginationComponentOptions={paginationComponentOptions}
              paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
              subHeader
              subHeaderComponent={subHeaderComponentMemo}
              // selectableRows
              persistTableHead
            />
          </MDBox>
        </Card>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default SettingFunction;
