import axios from "axios";
import { FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
// interface SignUpObject {
//   firstName: string;
//   lastName: string;
//   email: string;
//   password: string;
// }

const SignUpPage = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate()
  const submitFormData = async (data: any) => {
    try {
      let resp = await axios.post(`http://192.168.23.207:3001/user/register`, data);
      return resp;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error; // Re-throw the error to trigger toast.promise's error handling
    }
  }
  const formSubmitHandler = (data: FieldValues) => {

    toast.promise(submitFormData(data), {
      loading: "Loading...",
      success: (response) => response?.data.message,
      error: (error) => error?.response?.data.message
    });
  };
  return (
    <>
      <script src="./assets/scripts/main.js" />
      <div className="container-fluid position-relative d-flex p-0">
        {/* <!-- Spinner Start --> */}
        {/* <div
          id="spinner"
          className="show bg-dark position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center"
        >
          <div
            className="spinner-border text-primary"
            style={{ width: "3rem", height: "3rem" }}
            role="status"
          >
            <span className="sr-only">Loading...</span> accordion 
          </div>
        </div> */}
        {/* <!-- Spinner End --> */}

        {/* /        <!-- Sign Up Start --> */}
        <div className="container-fluid">
          <div
            className="row h-100 align-items-center justify-content-center"
            style={{ minHeight: "100vh" }}
          >
            <div className="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4">
              <div className="shadow rounded p-4 p-sm-5 my-4 mx-3">
                <div className="text-center mb-3">
                  <h3>Sign Up</h3>
                </div>
                <form onSubmit={handleSubmit(formSubmitHandler)}>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingText"
                      placeholder="jhondoe"
                      {...register("firstName", { required: true })}
                    />
                    <label htmlFor="floatingText">First Name</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingText"
                      placeholder="jhondoe"
                      {...register("lastName", { required: true })}
                    />
                    <label htmlFor="floatingText">Last Name</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      className="form-control"
                      id="floatingInput"
                      placeholder="name@example.com"
                      {...register("email", { required: true })}
                    />
                    <label htmlFor="floatingInput">Email address</label>
                  </div>
                  <div className="form-floating mb-4">
                    <input
                      type="password"
                      className="form-control"
                      id="floatingPassword"
                      placeholder="Password"
                      {...register("password", { required: true })}
                    />
                    <label htmlFor="floatingPassword">Password</label>
                  </div>
                  <div className="d-flex align-items-center justify-content-between mb-4">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="exampleCheck1"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="exampleCheck1"
                      >
                        Remember me                      </label>
                    </div>
                    {/* <a href="">Forgot Password</a> */}
                  </div>
                  <button
                    type="submit"
                    className=" btn_primary assss py-3 w-100 mb-4"
                  >
                    <span className="text-white">Sign Up</span>
                  </button>
                </form>
                <p className="text-center mb-0">
                  Already have an Account? <span className="cursor_pointer text-bold link_text_color" onClick={() => navigate("/auth/sign-in")}>Sign In</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Sign Up End --> */}
      </div>
    </>
  );
};

export default SignUpPage;
