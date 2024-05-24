import axios from "axios";
import config from "../environments/config";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SignInPage = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate()

  const submitFormData = async (data: any) => {
    try {
      let resp = await axios.post(`${config.API_URL}/auth/sign-in`, data);
      console.log("resp", resp);

      if (resp.data.success) {
        localStorage.setItem("accessToken", resp.data.accessToken)
        localStorage.setItem("refreshToken", resp.data.refreshToken);
        localStorage.setItem("userData", JSON.stringify(resp.data.userData));

        navigate('/dashboard');
      }
      return resp;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error; // Re-throw the error to trigger toast.promise's error handling
    }
  }

  const formSubmitHandler = (data: any) => {
    toast.promise(submitFormData(data), {
      loading: "Loading...",
      success: (response) => response?.data.message,
      error: (error) => error?.response?.data.message
    })

  }
  return <>
    <div className="container-fluid">
      <div className="row h-100 align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
        <div className="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4">
          <div className="shadow rounded p-4 p-sm-5 my-4 mx-3">
            <div className=" mb-3">
              <h3 className="text-center">Sign In</h3>
            </div>
            <form onSubmit={handleSubmit(formSubmitHandler)}>
              <div className="form-floating mb-3">
                <input {...register("email", { required: true })} type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
                <label htmlFor="floatingInput">Email address</label>
              </div>
              <div className="form-floating mb-4">
                <input {...register("password", { required: true })} type="password" className="form-control" id="floatingPassword" placeholder="Password" />
                <label htmlFor="floatingPassword">Password</label>
              </div>
              <div className="d-flex align-items-center justify-content-between mb-4">
                <div className="form-check">
                  <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                  <label className="form-check-label" htmlFor="exampleCheck1">Remeber me</label>
                </div>
                <span className="link_text_color cursor_pointer" onClick={() => navigate("/auth/forget-password")}>Forgot Password</span>
              </div>
              <button type="submit" className="btn btn_primary py-3 w-100 mb-4 text-white">Sign In</button>
            </form>
            <p className="text-center mb-0">Don't have an Account? <span className="cursor_pointer text-bold color_blue_hover link_text_color" onClick={() => navigate("/auth/sign-up")}>Sign Up</span></p>
          </div>
        </div>
      </div>
    </div>
  </>
};

export default SignInPage;
