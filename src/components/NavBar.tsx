import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  return (
    <header
      style={{
        backgroundColor: "var(--cs-primary_bg_color)",
        color: "var(--cs_primary_color)",
      }}
    >
      <div className="side_navbar_wrapper d-flex px-4 py-2 justify-content-between">
        <div className="side_navbar_header">
          <h3>
            <a href="#">Society Management</a>
          </h3>
        </div>
        <div className="side_navbar_options d-flex align-items-center">
          <h4
            className="me-4 cursor_pointer"
            onClick={() => navigate("/vehicle")}
          >
            Vehicle
          </h4>
          <h4
            className="me-4 cursor_pointer"
            onClick={() => navigate("/visitor")}
          >
            Visitor
          </h4>
          <h4
            className="me-4 cursor_pointer"
            onClick={() => navigate("/flats")}
          >
            Flats
          </h4>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
