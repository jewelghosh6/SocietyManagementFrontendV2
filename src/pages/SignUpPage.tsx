import axios from "axios";
import { FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import config from "../environments/config";
import { Image } from "react-bootstrap";
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
      let resp = await axios.post(`${config.API_URL}/user/register`, data);
      if (resp.data.success) navigate('/account-under-review')
      console.log("resp", resp);

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
    <div
      className="row align-items-center justify-content-center"
      style={{ height: "100vh" }}
    >
      <Image className="d-none d-md-block  col-md-6 col-lg-5 col-xl-4" src="/illustrations/signup2.svg" height="100%" />

      <div className="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4">
        <div className="shadow rounded p-4 p-sm-5 my-4 mx-3">
          <div className="text-center mb-3">
            <h3>Sign Up</h3>
          </div>
          <form onSubmit={handleSubmit(formSubmitHandler)}>
            <div className="row fl_name">
              <div className=" col-12 col-md-6  form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingText"
                  placeholder="jhondoe"
                  {...register("firstName", { required: true })}
                />
                <label htmlFor="floatingText">First Name</label>
              </div>
              <div className="col-12 col-md-6  form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingText"
                  placeholder="jhondoe"
                  {...register("lastName", { required: true })}
                />
                <label htmlFor="floatingText">Last Name</label>
              </div>
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
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                placeholder="name@example.com"
                {...register("mobile", { required: true })}
              />
              <label htmlFor="floatingInput">Mobile</label>
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
  );
};

export default SignUpPage;
