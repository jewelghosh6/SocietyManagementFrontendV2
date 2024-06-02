import { Dispatch, FC, SetStateAction, useContext } from "react"
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from "react-icons/io"
import { IoHomeSharp } from "react-icons/io5"
import { NavLink } from "react-router-dom"
import { UserSpecificMenuContext } from "../Layouts/LayoutMain"


interface SideNavBarForDashboardProps {
  setNavBarCollapsed: Dispatch<SetStateAction<boolean>>;
  navBarColapsed: boolean;
}
const SideNavBarForDashboard: FC<SideNavBarForDashboardProps> = ({ setNavBarCollapsed, navBarColapsed }) => {

  const UserSpecificMenus = useContext(UserSpecificMenuContext);

  // const navigate = useNavigate();

  const sidenavTogglehandler = () => {
    setNavBarCollapsed((prev: boolean) => !prev)
  }

  return (
    < div className={`sidebar z-2 bg_gradient sidenav_animation d-none d-md-block    ${navBarColapsed ? " px-2 pt-2 pb-3" : " px-3 pb-5"}`}
      style={{
        maxWidth: navBarColapsed ? "81px" : "200px",
        height: "100%",
        position: "relative",
        top: "0px",
        bottom: "0px",
        // overflowY: "scroll",
        // overflowX: "hidden"
      }}>
      <div style={{ position: "relative", left: navBarColapsed ? "86%" : "100%", top: navBarColapsed ? "2px" : "10px" }}>
        <div className="cursor_pointer sidenav_animation">
          {navBarColapsed ?
            <IoIosArrowDroprightCircle
              className="cursor_pointer"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Expand" size={"25px"}
              onClick={sidenavTogglehandler} /> :
            <IoIosArrowDropleftCircle
              className="cursor_pointer"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Collapse"
              size={"25px"}
              onClick={sidenavTogglehandler} />
          }
        </div>

      </div>
      <div className={navBarColapsed ? "pb-3 d-flex justify-content-center" : "pb-4 d-flex justify-content-start"}>
        <IoHomeSharp size={"30px"} />
        {
          navBarColapsed ? "" : <span className="fw-bold ps-2 fs-4 ">MySociety</span>
        }
      </div>
      <div className="text-center fw-bold" >
        {/* My Profile */}
        {/* <div className={navBarColapsed ? "cursor_pointer nav_items py-6px d-flex flex-column " : "cursor_pointer nav_items py-14px d-flex "}>
          <div className={navBarColapsed ? "d-flex justify-content-center pb-1" : ""}><FaUserCircle /></div>
          <span className={navBarColapsed ? " font_size_12px" : "ps-2"}>My Profile</span>
        </div> */}

        {
          UserSpecificMenus.map((item: any, index: number) => {
            return (
              <NavLink key={index}
                className={({ isActive }) =>
                  `margin_left_15 ps-3 cursor_pointer nav_items d-flex hover_menu_item border_radious_10px my-1
                   ${navBarColapsed ? " py-6px  flex-column" : " py-14px"}
                   ${isActive ? 'active-link' : ''}`
                }
                to={item.url}
              // className={}

              // onClick={() => {
              //   navigate(item.url)
              // }}
              >
                <div className={navBarColapsed ? "d-flex justify-content-center pb-1" : ""}>{item.icon}</div>
                <span className={navBarColapsed ? " font_size_12px" : "ps-2"}>{item.title}</span>
              </NavLink>

            )
          })
        }

        {/* Dashboard */}
        {/* <div className={navBarColapsed ?
          "cursor_pointer nav_items py-6px d-flex flex-column " :
          "cursor_pointer nav_items py-14px d-flex "}
          onClick={() => {
            navigate("/dashboard")
          }}>
          <div className={navBarColapsed ? "d-flex justify-content-center pb-1" : ""}><RiDashboard3Fill /></div>
          <span className={navBarColapsed ? " font_size_12px" : "ps-2"}>Dashboard</span>
        </div> */}

        {/* Manage Users */}
        {/* <div className={navBarColapsed ?
          "cursor_pointer nav_items py-6px d-flex flex-column " :
          "cursor_pointer nav_items py-14px d-flex "}
          onClick={() => {
            navigate("/manage-users")
          }}>
          <div className={navBarColapsed ? "d-flex justify-content-center pb-1" : ""}><MdManageAccounts /></div>
          <span className={navBarColapsed ? " font_size_12px" : "ps-2"}>Manage Users</span>
        </div> */}

        {/* Flats */}
        {/* <div className={navBarColapsed ? "cursor_pointer nav_items py-6px d-flex flex-column " : "cursor_pointer nav_items py-14px d-flex "}
          onClick={() => {
            navigate("/flats")
          }}>
          <div className={navBarColapsed ? "d-flex justify-content-center pb-1" : ""}><MdMeetingRoom /></div>
          <span className={navBarColapsed ? " font_size_12px" : "ps-2"}>Flats</span>
        </div> */}
        {/* Flat Allotment */}
        {/* <div className={navBarColapsed ? "cursor_pointer nav_items py-6px d-flex flex-column " : "cursor_pointer nav_items py-14px d-flex "}
          onClick={() => navigate("/flat-allotment")}>
          <div className={navBarColapsed ? "d-flex justify-content-center pb-1" : ""}><MdBallot /></div>
          <span className={navBarColapsed ? " font_size_12px" : "ps-2"}>Flat Allotment</span>
        </div> */}
        {/* Bills */}
        {/* <div className={navBarColapsed ? "cursor_pointer nav_items py-6px d-flex flex-column " : "cursor_pointer nav_items py-14px d-flex "}
          onClick={() => navigate("/bills")}>
          <div className={navBarColapsed ? "d-flex justify-content-center pb-1" : ""}><RiBillFill /></div>
          <span className={navBarColapsed ? " font_size_12px" : "ps-2"}>Bills</span>
        </div> */}
        {/* Visitor & Vehicle */}
        {/* <div className={navBarColapsed ? "cursor_pointer nav_items py-6px d-flex flex-column " : "cursor_pointer nav_items py-14px d-flex "}
          onClick={() => navigate("/visitors")}>
          <div className={navBarColapsed ? "d-flex justify-content-center pb-1" : ""}><IoIosPeople /></div>
          <span className={navBarColapsed ? " font_size_12px" : "ps-2"}>Manage Visitors </span>  
        </div> */}
        {/* Suggestions & Complaints */}
        {/* <div className={navBarColapsed ? "cursor_pointer nav_items py-6px d-flex flex-column " : "cursor_pointer nav_items py-14px d-flex "}
          onClick={() => navigate("/suggestions")}>
          <div className={navBarColapsed ? "d-flex justify-content-center pb-1" : ""}><FaNoteSticky /></div>
          <span className={navBarColapsed ? " font_size_12px" : "ps-2"}> Suggestions</span>
        </div> */}
        {/* Security */}
        {/* <div className={navBarColapsed ? "cursor_pointer nav_items py-6px d-flex flex-column " : "cursor_pointer nav_items py-14px d-flex "}
          onClick={() => navigate("/security")}>
          <div className={navBarColapsed ? "d-flex justify-content-center pb-1" : ""}><FaUserSecret /></div>
          <span className={navBarColapsed ? " font_size_12px" : "ps-2"}>Security</span>
        </div> */}
        {/* Events */}
        {/* <div className={navBarColapsed ?
          "cursor_pointer nav_items py-6px d-flex flex-column " :
          "cursor_pointer nav_items py-14px d-flex "}
          onClick={() => navigate("/events")}>
          <div className={navBarColapsed ? "d-flex justify-content-center pb-1" : ""}><BsCalendarEventFill /></div>
          <span className={navBarColapsed ? " font_size_12px" : "ps-2"}>Events</span>
        </div> */}
        {/* Society Group Chat */}
        {/* <div className={navBarColapsed ? "cursor_pointer nav_items py-6px d-flex flex-column " : "cursor_pointer nav_items py-14px d-flex "}
          onClick={() => navigate("/group-chat")}>
          <div className={navBarColapsed ? "d-flex justify-content-center pb-1" : ""}><PiChatsFill /></div>
          <span className={navBarColapsed ? " font_size_12px" : "ps-2"}>Group Chat</span>
        </div> */}


      </div>
    </div >
  )
}

export default SideNavBarForDashboard