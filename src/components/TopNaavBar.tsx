import { FiMessageSquare } from "react-icons/fi";
import { IoNotificationsOutline } from "react-icons/io5";
import ThemeToggleComp from "./ThemeToggleComp";
import { useState } from "react";
import DrawerForDashboardMenu from "./DrawerForDashMenu";

const TopNavBar = () => {
    const [userData] = useState(JSON.parse(localStorage.getItem("userData") ?? ""))
    return (
        <div className="position-sticky top-0 z-1 shadow d-flex justify-content-between  justify-content-md-end align-items-center py-2 py-md-3 px-4" style={{ backgroundColor: "white" }}>
            <DrawerForDashboardMenu />
            <div className="d-flex align-items-center">
                <ThemeToggleComp />
                <div className="mx-3 position-relative"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Messages">
                    <FiMessageSquare className="cursor_pointer" size={"25px"} />
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
                <div className="user_name_nav_wrapper ps-4 d-flex align-items-center cursor_pointer ">
                    <div className=" account_initials" style={{ borderLeft: "1px solid grey" }}>
                        {/* <VscAccount className="cursor_pointer" size={"25px"} /> */}
                        <span className="m-auto name_initial_wrapper">{userData.first_name.charAt(0).toUpperCase()}</span>
                    </div>
                    <div className="name_nav d-flex flex-column ms-2 line_height_18 d-none d-md-flex">
                        <span className="fw-bolder fs-16">{userData.first_name + " " + userData.last_name}</span>
                        <span className="text-secondary fs-13">{userData.role}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TopNavBar;