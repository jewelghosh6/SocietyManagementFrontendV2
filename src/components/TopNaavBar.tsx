import { FiMessageSquare } from "react-icons/fi";
import { IoNotificationsOutline, IoSettingsSharp } from "react-icons/io5";
import ThemeToggleComp from "./ThemeToggleComp";
import { useState } from "react";
import DrawerForDashboardMenu from "./DrawerForDashMenu";
import { Dropdown } from "react-bootstrap";
import { FaSignOutAlt } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../utils/axiosInstance";
import config from "../environments/config";
import toast from "react-hot-toast";
import { GoPasskeyFill } from "react-icons/go";



const TopNavBar = () => {
    const [refreshToken] = useState(localStorage.getItem("refreshToken"));
    // const axiosInstance = useAxiosInterceptors();
    const [userData] = useState(JSON.parse(localStorage.getItem("userData") ?? ""))
    const navigate = useNavigate();

    const signOutButtonClickHandler = () => {
        toast.promise(signOutButtonClick(), {
            loading: "Signing Out...",
            success: (resp) => {
                console.log(resp.data);
                localStorage.clear();
                navigate("/auth/sign-in")
                return "Signed Out Successfully."
            },
            error: (err) => {
                console.error(err);
                return "Error in Signing Out"
            }
        })

    }

    const signOutButtonClick = async () => {
        console.log("sign out button clicked");
        try {
            let resp = await axiosInstance.post(`${config.API_URL}/auth/sign-out`, { refreshToken: refreshToken });
            return resp;
        } catch (error) {
            throw error;
        }
    }

    return (
        <div className="position-sticky top-0 z-1 shadow d-flex justify-content-between  justify-content-md-end align-items-center py-2 py-md-3 px-4" style={{ backgroundColor: "white" }}>
            <DrawerForDashboardMenu />
            <div className="d-flex align-items-center topnav_options">
                <ThemeToggleComp />
                <div className="mx-3 position-relative"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Messages">
                    <FiMessageSquare className="cursor_pointer" size={"22px"} />
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success "
                    >
                        5
                        <span className="visually-hidden">unread messages</span>
                    </span>
                </div>
                <div className="ms-3 me-4 position-relative"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Notification">
                    <IoNotificationsOutline className="cursor_pointer" size={"26px"} />
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success ">
                        2
                        <span className="visually-hidden">New notifications</span>
                    </span>
                </div>


                <Dropdown className="ps-4" style={{ borderLeft: "1px solid grey" }}>
                    <Dropdown.Toggle >
                        <div className="user_name_nav_wrapper  d-flex align-items-center cursor_pointer ">
                            <div className=" account_initials" >
                                {/* <VscAccount className="cursor_pointer" size={"22px"} /> */}
                                <span className="m-auto name_initial_wrapper">{userData.first_name.charAt(0).toUpperCase()}</span>
                            </div>
                            <div className="name_nav d-flex flex-column ms-2 line_height_18 d-none d-md-flex">
                                <span className="fw-bolder fs-16 text-dark">{userData.first_name + " " + userData.last_name}</span>
                                <span className="text-secondary fs-13 text-start">{userData.role}</span>
                            </div>
                        </div>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Header>
                            <div className="user_name_nav_wrapper  d-flex  align-items-center cursor_pointer ">
                                <div className=" account_initials me-2" >
                                    {/* <VscAccount className="cursor_pointer" size={"22px"} /> */}
                                    <span className="m-auto name_initial_wrapper">{userData.first_name.charAt(0).toUpperCase()}</span>
                                </div>
                                <div className="name_nav d-flex flex-column ms-2 line_height_18">
                                    <span className="fw-bolder fs-18 text-dark">{userData.first_name + " " + userData.last_name}</span>
                                    <span className="text-secondary fs-13">{userData.role}</span>
                                </div>
                            </div>
                        </Dropdown.Header>
                        <Dropdown.Divider />
                        <div className="d-flex flex-column  py-2 fs-14 dropdown_dashboard_topnav">
                            <Link to={"user/my-profile"} className="py-1 px-3"><MdAccountCircle className="me-2 " size={20} />My Profile</Link>
                            <Link to={"user/account-settings"} className="py-1 px-3"><IoSettingsSharp className="me-2" size={20} />Account Settings</Link>
                            <Link to={"auth/change-password"} className="py-1 px-3"><GoPasskeyFill className="me-2" size={20} />Change Password</Link>


                            <span role="button" onClick={signOutButtonClickHandler} className="py-1 link_color px-3">
                                <FaSignOutAlt className="me-2" size={20} />
                                Sign Out
                            </span>
                        </div>
                    </Dropdown.Menu>
                </Dropdown >
            </div >
        </div >
    )
}

export default TopNavBar;