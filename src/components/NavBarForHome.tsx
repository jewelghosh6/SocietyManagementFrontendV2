import { useNavigate } from "react-router-dom";

const NavBarForHome = () => {
  const navigate = useNavigate();
  return (
    <div className="shadow py-2 px-4 d-flex justify-content-between ">
      <div className="side_navbar_header">
        <a href="#">
          <h3 style={{ color: "var(--cs-primary_bg_color)" }}>
            <span className="gradient-text">Society Management</span>
          </h3>
        </a>
      </div>
      <div className="auth_options d-flex">
        <div className="sign_in me-3">
          <button
            className="btn_secondary"
            onClick={() => navigate("/auth/sign-in")}
          >
            <span className="gradient-text">Sign In</span>
          </button>
        </div>
        <div className="sign_up">
          <button
            className="btn_primary"
            onClick={() => navigate("/auth/sign-up")}
          >
            <span>Sign Up</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavBarForHome;
