import { useLayoutEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react"; // React Grid Logic
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme

import { ColDef } from "ag-grid-community";
import axios from "axios";
import config from "../environments/config";
import EditButtonRenderer from "./EditButtonRenderer";
import DeleteButtonRenderer from "./DeleteButtonRenderer";
import ManageUsersModal from "./ManageUsersModal";
import RegisterRequestDropdown from "./RegisterRequestDropdown";
import { useNavigate } from "react-router-dom";

// Row Data Interface
interface IRow {
    id: number;
    first_name: string;
    last_name: string;
    mobile_number: string;
    email_id: string;
    is_active: boolean;
    roles: string;
    permissions: string[];
}


// interface Location {
//     pathname: string;
// }

// Create new GridExample component
const GridExample = () => {
    // Row Data: The data to be displayed.
    // const [rowData, setRowData] = useState<IRow[]>([
    //     { make: "Tesla", model: "Model Y", price: 64950, electric: true },
    //     { make: "Ford", model: "F-Series", price: 33850, electric: false },
    //     { make: "Toyota", model: "Corolla", price: 29600, electric: false },
    //     { make: "Mercedes", model: "EQA", price: 48890, electric: true },
    //     { make: "Fiat", model: "500", price: 15774, electric: false },
    //     { make: "Nissan", model: "Juke", price: 20675, electric: false },
    // ]);
    const [showModal, setShowModal] = useState(false);
    const [userData, setUserData] = useState([])
    const navigate = useNavigate();

    const [registerRequestsData, setRegisterRequestsData] = useState([]);
    const [userToEdit, setUserToEdit] = useState<number>(0);
    useLayoutEffect(() => {
        //For getting all users whose acoount is not under review
        axios.get(`${config.API_URL}/user/view-all`).then(res => {
            // console.log(res);
            setUserData(res.data)
        }).catch(err => console.error(err))

        //For getting No of Register request
        axios.get(`${config.API_URL}/user/register-request`).then((res: any) => {
            console.log("/register-request", res.data);
            setRegisterRequestsData(res.data.data)

        })


    }, [])



    // Column Definitions: Defines & controls grid columns.
    const [colDefs] = useState<ColDef<IRow>[]>([
        { headerName: 'Id', field: "id" },
        { headerName: 'First Name', field: "first_name" },
        { headerName: 'Last Name', field: "last_name" },
        { headerName: 'Email Id', field: "email_id" },
        { headerName: 'Mobile Number', field: "mobile_number" },
        {
            headerName: 'Is Active', field: "is_active", editable: true // Make the column editable if needed
        },
        // {
        //     headerName: 'Roles', field: "roles",
        //     // valueFormatter: (rolesArr:[]) => {
        //     //     return rolesArr.map((item: any) => item.role_name).toString()
        //     // }
        //     // cellRendererFramework: MultiSelectCellRenderer, // Use custom cell renderer
        //     editable: true,// Make the column editable if needed
        //     // cellEditor: 'agRichSelectCellEditor',
        //     // cellEditorParams: {
        //     //     values: ['United States', 'Canada', 'Mexico'],
        //     // },
        // },
        // { headerName: 'Permissions', field: "permissions" },
        {
            headerName: 'Edit',
            // field: 'editButton', // Field to hold the edit button data
            cellRenderer: EditButtonRenderer, // Use custom cell renderer for edit button
            width: 100, // Adjust the width of the column as needed
            suppressMenu: true, // Hide column menu
            cellRendererParams: {
                onClick: (row: any) => handleEditClick(row), // Callback function to handle edit button click
            },
        },
        {
            headerName: 'Delete',
            cellRenderer: DeleteButtonRenderer, // Use custom cell renderer for edit button
            width: 100, // Adjust the width of the column as needed
            suppressMenu: true, // Hide column menu
            // cellRendererParams: {
            //     onClick: (row: any) => console.log("edit button clicked")
            //     //handleEditClick(row), // Callback function to handle edit button click
            // },
        },
    ]);

    const defaultColDef: ColDef = {
        flex: 1,
    };

    const handleEditClick = (rowData: IRow) => {
        // Implement edit logic here (open edit dialog, update row data, etc.)
        console.log('Edit clicked for row:', rowData);
        setUserToEdit(rowData.id)
        setShowModal(true);
        console.log("setShowModal(true);", showModal);

    };
    // const onCellValueChanged = (params: any) => {
    //     console.log(`changed from ${params.oldValue} to ${params.newValue}`);
    // };
    // const onRowClicked = (event: any) => {
    //     const clickedRowData = event.data; // This is the row object
    //     console.log('Clicked Row:', clickedRowData);
    //     // You can perform actions based on the clicked row data here
    // };

    const modalCloseHandler = () => {
        setShowModal(false)
    }

    // const breadcrumbs = [
    //     { title: 'App', url: '/dashboard' },
    //     { title: 'Manage Users', url: '/manage-users' },
    //     { title: 'Register Request', url: '/manage-users/register-requests' },
    //     // { title: 'Current Page', url: location.pathname }, // Current page
    // ];



    return (
        <>
            <div className="">
                <div className="manage_user mb-4 d-flex justify-content-between">
                    <h5>Manage Users,Add,remove role permissions user details</h5>
                    <div className="reg_req position-relative" onClick={() => navigate("/manage-users/register-request")}>
                        <RegisterRequestDropdown registerRequestsData={registerRequestsData} />
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger "
                        >
                            {registerRequestsData.length}
                            <span className="visually-hidden">Register Request</span>
                        </span>
                    </div>
                </div>

                <div
                    className={"ag-theme-quartz table-container"}
                    style={{ width: "100%", height: "65vh" }}
                >
                    <AgGridReact
                        rowData={userData}
                        columnDefs={colDefs}
                        defaultColDef={defaultColDef}
                    // onRowClicked={onRowClicked}
                    // onCellValueChanged={onCellValueChanged}
                    />
                </div>
            </div>
            <ManageUsersModal show={showModal} handleClose={modalCloseHandler} userData={userData[userToEdit]} />
        </>
    );
};

export default GridExample;