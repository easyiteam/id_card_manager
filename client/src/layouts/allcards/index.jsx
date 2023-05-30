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
import Icon from "@mui/material/Icon";
import './styles.css';

import { useCallback, useContext, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components';

// Material Dashboard 2 React components
import MDBox from "@/components/MDBox";
import MDButton from "@/components/MDButton";

// Material Dashboard 2 React example components
import DashboardLayout from "@/examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "@/examples/Navbars/DashboardNavbar";
import Footer from "@/examples/Footer";

// Data
import { AuthContext } from "@/context";
import DataTable from 'react-data-table-component';

import axios from "axios";
  
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
)

function AllCards() {
  
  const authContext = useContext(AuthContext);

  const [cards, setCards] = useState([]);

  const [signAuthor, setAuthCom] = useState([]);
  const [signPhoto, setPhotoCom] = useState([]);

  const [signProAuthor, setAuthProCom] = useState([]);
  const [signProPhoto, setPhotoProCom] = useState([]);

  function photoNormalPath(photo) {
    return photo.substring(photo.lastIndexOf(''), 9)
  }

  const theCard = axios.get(`${process.env.REACT_APP_API_URL}/card/getAll`)
                    .then((response) => {
                      if(!response.data.errors) {

                        setCards(response.data)
                        // console.log(response.data)

                        if(response.data.type == "1") {
                          setAuthCom(response.data.sign_author);
                          const filePath = photoNormalPath(response.data.sign_author.signature);
                          setPhotoCom(filePath);
                        } else if(response.data.type == "2") {
                          setAuthProCom(response.data.sign_author);
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
                  
  const columns = [
      {
          name: 'Photo',
          selector: row => 
                      <img 
                        src={ row.photo ? photoNormalPath(row.photo) : "" } 
                        alt={"Photo de " + row.name + " " + row.surname} 
                        style={{ width: "60px", height: "60px", borderRadius: "50%"}}
                      />,
                      // row.photo,
      },
      {
          name: 'N. de Carte',
          selector: row => row.card_number,
          sortable: true,
      },
      {
          name: 'Nom',
          selector: row => row.name,
          sortable: true,
      },
      {
          name: 'Prénoms',
          selector: row => row.surname,
          sortable: true,
      },
      {
        name: 'Type',
        selector: row => row.type == "1" ? "Commission" : row.type == "2" ? "Professionnelle" : "",
        sortable: true,
      },
      {
          name: 'Ajouté le',
          selector: row => formatDate(row.created_at),
          sortable: true,
      },
      {
        name: 'Actions',
        selector: row => <MDBox display="flex" style={{ justifyContent: "center"}}>
                            <Link to={`/showcard/${row._id}`} style={{ marginRight: "6px", width: "30px", height: "30px", fontSize: "23px", padding: "3px", cursor: "pointer", border: "none", color: "white", backgroundColor: "gray", borderRadius: "50%", outline: "none" }}>
                              <Icon>eye</Icon>
                            </Link>
                            <Link to={`/editcard/${row._id}`} style={{ marginRight: "6px", width: "30px", height: "30px", fontSize: "23px", padding: "3px", cursor: "pointer", border: "none", color: "white", backgroundColor: "blue", borderRadius: "50%", outline: "none" }}>
                              <Icon>edit</Icon>
                            </Link>
                            <Link to={`/showcard/${row._id}`} style={{  width: "30px", height: "30px", fontSize: "23px", padding: "3px", cursor: "pointer", border: "none", color: "white", backgroundColor: "red", borderRadius: "50%", outline: "none" }}>
                              <Icon>delete</Icon>
                            </Link>
                          </MDBox>,
      },
  ];

  const [filterText, setFilterText] = useState('');
	const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
	const filteredItems = cards.filter(
		item => item.name && item.name.toLowerCase().includes(filterText.toLowerCase()),
	);

	const subHeaderComponentMemo = useMemo(() => {
		const handleClear = () => {
			if (filterText) {
				setResetPaginationToggle(!resetPaginationToggle);
				setFilterText('');
			}
		};

		return (
			<FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
		);
	}, [filterText, resetPaginationToggle]);

  const paginationComponentOptions = {
    rowsPerPageText: 'Lignes par page',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Totaux',
  };  

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(e)
    
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3} style={{  }}>
        <DataTable
          title="Liste des cartes"
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
      <Footer />
    </DashboardLayout>
  );
}

export default AllCards;
