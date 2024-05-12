import { FiMessageSquare } from "react-icons/fi";
import { IoNotificationsOutline } from "react-icons/io5";
import { VscAccount } from "react-icons/vsc";
import ThemeToggleComp from "./ThemeToggleComp";

const TopNavBar = () => {
    return (
        <div className="shadow d-flex justify-content-end py-3 px-3" style={{ backgroundColor: "white" }}>
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
            <div className="mx-3 position-relative"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Notification">
                <IoNotificationsOutline className="cursor_pointer" size={"25px"} />
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success ">
                    2
                    <span className="visually-hidden">New notifications</span>
                </span>
            </div>
            <div className="px-3 " style={{ borderLeft: "1px solid grey" }}>
                <VscAccount className="cursor_pointer" size={"25px"} />
            </div>
        </div>
    )
}

export default TopNavBar;