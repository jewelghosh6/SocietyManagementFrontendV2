import { FiMessageSquare } from "react-icons/fi";
import { IoNotificationsOutline } from "react-icons/io5";
import ThemeToggleComp from "./ThemeToggleComp";

const TopNavBar = () => {
    return (
        <div className="shadow d-flex justify-content-end align-items-center py-3 px-4" style={{ backgroundColor: "white" }}>
            <div>
                <ThemeToggleComp />
            </div>
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
                    <span className="m-auto name_initial_wrapper">J</span>
                </div>
                <div className="name_nav d-flex flex-column ms-2 line_height_18 d-none d-md-flex">
                    <span className="fw-bolder fs-16">Jewel Ghosh</span>
                    <span className="text-secondary fs-13">Society Admin</span>
                </div>
            </div>
        </div>
    )
}

export default TopNavBar;