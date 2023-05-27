/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
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

// Material Dashboard 2 React components
import MDBox from "@/components/MDBox";
import MDTypography from "@/components/MDTypography";
import MDAvatar from "@/components/MDAvatar";
import MDBadge from "@/components/MDBadge";

// Images
import team2 from "@/assets/signatures/team-2.jpg";
// import team3 from "@/assets/signatures/team-3.jpg";
// import team4 from "@/assets/signatures/team-4.jpg";

export default function data() {

    function formatDate(input) {
        let datePart = input.match(/\d+/g),
        year = datePart[0].substring(0), // get only two digits
        month = datePart[1], day = datePart[2];

        return day+'/'+month+'/'+year;
    }

    const SignAuthor = ({ signature, sign_author, created_at, email }) => (
        <MDBox display="flex" alignItems="center" lineHeight={1}>
        <MDAvatar src={signature} sign_author={sign_author} size="sm" />
        <MDBox ml={2} lineHeight={1}>
            <MDTypography display="block" variant="button" fontWeight="medium">
            {sign_author}
            </MDTypography>
            <MDTypography variant="caption">{email}</MDTypography>
            <MDTypography variant="caption">{created_at}</MDTypography>
        </MDBox>
        </MDBox>
    );

    return {
        columns: [
        { Header: "Nom et prénoms", accessor: "signataire", width: "45%", align: "left" },
        { Header: "status", accessor: "status", align: "center" },
        { Header: "ajouté le", accessor: "created_at", align: "center" },
        { Header: "action", accessor: "action", align: "center" },
        ],

        rows: [
        {
            signataire: <SignAuthor signature={team2} sign_author="John Michael" email="john@creative-tim.com" />,
            status: (
            <MDBox ml={-1}>
                <MDBadge badgeContent="online" color="success" variant="gradient" size="sm" />
            </MDBox>
            ),
            created_at: (
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
               { formatDate('26/04/2838') }
            </MDTypography>
            ),
            action: (
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
                Editer
            </MDTypography>
            ),
        },
        ],
    };
}
