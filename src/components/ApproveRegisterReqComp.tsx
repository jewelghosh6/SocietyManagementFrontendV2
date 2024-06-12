import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import config from "../environments/config";
import toast from "react-hot-toast";
import { axiosInstance } from "../utils/axiosInstance";


interface FormState {
    [key: string]: boolean;
}
const ApproveRegisterReqComp = () => {
    // const axiosInstance = useAxiosInterceptors();
    const { id } = useParams();
    const [userDetails, setUserDetails] = useState<any>({})
    const [roleList, setRoleList] = useState([]);
    const [permissionList, setPermissionList] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        fetchUserReqDetails();
        fetchRolesList();
        fetchPermissionsList();

    }, [])

    const fetchUserReqDetails = async () => {
        try {
            let response = await axiosInstance.get(`/user/register-request/${id}`);
            console.log("Response from api", response.data.data);
            setUserDetails(response.data.data)
        } catch (error) {
            console.log(error);
        }
    }

    const fetchRolesList = async () => {
        try {
            let response = await axiosInstance.get(`/roles/get-all`);
            console.log("Response from api fetchRolesList", response.data.data);
            setRoleList(response.data.data)
        } catch (error) {
            console.log(error);
        }
    }

    const fetchPermissionsList = async () => {
        try {
            let response = await axiosInstance.get(`/permissions/get-all`);
            console.log("Response from api fetchPermissionsList", response.data.data);
            setPermissionList(response.data.data)
        } catch (error) {
            console.log(error);
        }
    }

    // Initialize the state with the roleList, setting each role as unchecked initially
    const [formState, setFormState] = useState<FormState>(
        {
            ...roleList.reduce((acc: any, item: any) => {
                acc[`role-${item.id}`] = false;
                return acc;
            }, {}), ...permissionList.reduce((acc: any, item: any) => {
                acc[`permission-${item.id}`] = false;
                return acc;
            }, {})
        }
    );


    // Handle checkbox change
    const handleCheckboxChange = async (event: any) => {

        const { id, checked } = event.target;
        let roleId = id?.split("-")[1];
        console.log("roleId", roleId);

        try {
            let permList = await axios.get(`${config.API_URL}/permissions/get/${roleId}`);
            // console.log("permList", permList.data.data);
            let permpList: any = permList.data.data.map((item: any) => item.permission_id)
            // console.log("permpList", permpList);


            setFormState(() => ({
                ...roleList.reduce((acc: any, item: any) => {
                    acc[`role-${item.id}`] = false;
                    return acc;
                }, {}),
                [id]: checked,
                ...permissionList.reduce((acc: any, item: any) => {
                    if (permpList.includes(item.id)) {
                        acc[`permission-${item.id}`] = true;
                    }
                    else acc[`permission-${item.id}`] = false;
                    return acc;
                }, {}),
                // ...permList.reduce((acc: any, item: any) => {
                //     acc[`permission-${item.id}`] = true;
                // }, {})
            }));

        } catch (error) {
            console.log(error);
        }
    };

    // Handle form submission
    const handleSubmit = async (event: any) => {
        event.preventDefault();
        // Get selected roles based on the form state
        const selectedRoles = roleList.filter((item: any) => formState[`role-${item.id}`]);
        console.log('Selected roles:', selectedRoles);

        const selectedPermissions = permissionList.filter((item: any) => formState[`permission-${item.id}`]);
        console.log('Selected permission:', selectedPermissions);

        if (!selectedRoles.length || !selectedPermissions.length) {
            toast.error("Please select any role for the user to approve user's register request")
            return;
        }

        try {
            let resp = await axiosInstance.post(`${config.API_URL}/user/register-request/approve`, {
                userId: id, roles: selectedRoles, permissions: selectedPermissions
            })
            console.log("/user/register-request/approve", resp.data);
            if (resp.data.success) {
                toast.success("User request approved");
                navigate("/manage-users/register-request")
            }

        } catch (error) {
            console.log(error);

        }

    };


    return (
        <div className="container mt-4 g-0">
            <div className="">
                <div className="card-body">
                    <h4 className="card-title">Approve Register Request and Assign Roles</h4>
                    <p className="card-text">
                        <strong>User ID:</strong> {id}
                    </p>
                    <div className="mb-3">
                        <p>
                            <strong>Name:</strong> {userDetails.first_name + " " + userDetails.last_name}
                        </p>
                        <p>
                            <strong>Email:</strong> {userDetails.email_id}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="roles_permission d-block d-lg-flex mb-3 fs-13">
                            <div className="roles_section  px-1 me-lg-2 w-100  mb-4 mb-lg-0">
                                <h5 className="">Roles</h5>
                                <div className="card p-3">
                                    {roleList.map((item: any, index) => (
                                        <div className="form-check" key={index}>
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                id={`role-${item.id}`}
                                                checked={formState[`role-${item.id}`] ?? false}
                                                onChange={handleCheckboxChange}
                                            />
                                            <label className="form-check-label" htmlFor={`role-${item.id}`}>
                                                {item.role_name}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="permissions_section  px-1 w-100">
                                <h5 className="">Permissions</h5>
                                <div className="card p-3" style={{
                                    maxHeight: "242px",
                                    overflowY: "scroll"
                                }}>
                                    {permissionList.map((item: any, index) => (
                                        <div className="form-check permission_checkbox" key={index}>
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                id={`permission-${item.id}`}
                                                checked={formState[`permission-${item.id}`] ?? false}
                                                onChange={handleCheckboxChange}
                                                disabled={true}
                                            />
                                            <label className="form-check-label" htmlFor={`permission-${item.id}`}>
                                                {item.permission_name}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="d-flex justify-content-end">
                            <button className="btn btn-primary" type="submit">Approve Request</button>
                        </div>
                    </form>
                </div>
            </div>
        </div >
    )
}

export default ApproveRegisterReqComp