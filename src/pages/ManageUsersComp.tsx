import { useLayoutEffect, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react"; // React Grid Logic


import { ColDef } from "ag-grid-community";
import config from "../environments/config";
import EditButtonRenderer from "../components/TableCellRenderer/EditButtonRenderer";
import DeleteButtonRenderer from "../components/TableCellRenderer/DeleteButtonRenderer";
// import ManageUsersModal from "./Modals/ManageUsersModal";
import RegisterRequestDropdown from "../components/RegisterRequestDropdown";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Player } from '@lottiefiles/react-lottie-player';
import animation from "../Lottie/refresh-btn-lottie.json"
import RoleBadge from "../components/RoleBadge";
import { axiosInstance } from "../utils/axiosInstance";


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
    const [searchText, setSearchText] = useState('');
    const [refreshAt, setRefreshAt] = useState(new Date())

    // const axiosInstance = useAxiosInterceptors();

    const playerRef = useRef<Player | null>(null); // Explicitly type the ref as Player or null

    const handleLottieIconClick = () => {
        if (playerRef.current) {
            playerRef.current.play();
        }
    };


    const [registerRequestsData, setRegisterRequestsData] = useState([]);
    // const [userToEdit, setUserToEdit] = useState<number>(0);
    useLayoutEffect(() => {
        //For getting all users whose acoount is not under review
        fetchUserData()
        // refreshUserData();
        //For getting No of Register request
        axiosInstance.get(`${config.API_URL}/user/register-request`).then((res: any) => {
            console.log("/register-request", res.data);
            setRegisterRequestsData(res.data.data)

        })


    }, [])



    // Column Definitions: Defines & controls grid columns.
    const [colDefs] = useState<ColDef<IRow>[]>([
        { headerName: 'Id', field: "id", minWidth: 50 },
        {
            headerName: 'Name',
            valueGetter: (params: any) => {
                return `${params.data.first_name} ${params.data.last_name}`;
            },
            minWidth: 170
        },
        { headerName: 'Email Id', field: "email_id", minWidth: 160 },
        { headerName: 'Mobile Number', field: "mobile_number", minWidth: 140 },
        {
            headerName: 'Is Active', field: "is_active", editable: true, minWidth: 80 // Make the column editable if needed
        },
        {
            headerName: 'Roles', field: "roles",
            cellRenderer: RoleBadge, // Use custom cell renderer for edit button
            minWidth: 165, // Adjust the width of the column as needed
            suppressMenu: true, // Hide column menu
            cellRendererParams: {
                onClick: (row: any) => console.log("row", row)
                // Callback function to handle edit button click
                // data:
            },
        },
        // { headerName: 'Permissions', field: "permissions" },
        {
            headerName: 'Edit',
            // field: 'editButton', // Field to hold the edit button data
            cellRenderer: EditButtonRenderer, // Use custom cell renderer for edit button
            minWidth: 75, // Adjust the width of the column as needed
            suppressMenu: true, // Hide column menu
            cellRendererParams: {
                onClick: (row: any) => handleEditClick(row), // Callback function to handle edit button click
            },
        },
        {
            headerName: 'Delete',
            cellRenderer: DeleteButtonRenderer, // Use custom cell renderer for edit button
            minWidth: 75, // Adjust the width of the column as needed
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
        // setUserToEdit(rowData.id)
        setShowModal(true);
        console.log("setShowModal(true);", showModal);

    };

    // const modalCloseHandler = () => {
    //     setShowModal(false)
    // }

    const fetchUserData = async () => {
        try {
            let userData = await axiosInstance.get(`${config.API_URL}/user/view-all`);
            setUserData(userData.data.data)
            return userData;
        } catch (error) {
            console.error(error)
            throw error;
        }
        // .then(res => {
        //     // console.log(res);
        //     setUserData(res.data)
        // }).catch(err => )
    }
    const refreshUserData = () => {
        handleLottieIconClick()
        toast.promise(fetchUserData(), {
            loading: "Loading...",
            success: (response) => {
                setRefreshAt(new Date())
                return response?.data.message
            },
            error: (error) => {
                // setIsPlaying(false);

                return error?.response?.data.message
            }
        });
    }



    return (
        <>
            <div className="">
                <div className="manage_user mb-4 d-flex justify-content-end justify-content-md-between">
                    <h5 className="d-none d-md-inline">Manage Users,Add,remove role permissions user details</h5>
                    <div className="reg_req position-relative  "
                        // style={{ width: "100%" }}
                        onClick={() => navigate("/manage-users/register-request")}>
                        <RegisterRequestDropdown registerRequestsData={registerRequestsData} />
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger "
                        >
                            {registerRequestsData.length}
                            <span className="visually-hidden ">Register Request</span>
                        </span>
                    </div>
                </div>
                <div className="d-flex justify-content-between search_text_input g-0  mb-3">

                    <input
                        className="form-control  custom_input "
                        style={{ width: "30%" }}
                        type="text"
                        // id="floatingText"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        placeholder="Search..."
                    />
                    <div className="refresh_data d-flex flex-column text-secondary "
                    >
                        <span className="cursor_pointer d-flex justify-content-between" onClick={refreshUserData}>
                            <span className="me-2 fs_15">Refresh Data</span>
                            <div className="refresh_lotie">
                                <Player src={animation} ref={playerRef}
                                    style={{ width: "25px", height: "25px" }}
                                    loop={false}
                                    autoplay={false} // Set autoplay to false to control playback manually
                                />
                            </div>
                        </span>
                        <span className="fs_10">Last refreshed:{refreshAt.toLocaleTimeString()}</span>
                    </div>
                </div>

                <div
                    className={"ag-theme-quartz table-container"}
                    style={{ width: "100%", height: "300px" }}
                >
                    <AgGridReact
                        rowData={userData}
                        columnDefs={colDefs}
                        defaultColDef={defaultColDef}
                        quickFilterText={searchText} // Apply search filter
                        pagination={true}
                        paginationPageSize={10}
                    // onRowClicked={onRowClicked}
                    // onCellValueChanged={onCellValueChanged}
                    />
                </div>
            </div>
            {/* <ManageUsersModal show={showModal} handleClose={modalCloseHandler} userData={userData[userToEdit]} /> */}
        </>
    );
};

export default GridExample;