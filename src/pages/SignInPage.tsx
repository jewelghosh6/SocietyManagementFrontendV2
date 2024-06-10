import axios from "axios";
import config from "../environments/config";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Image } from "react-bootstrap";

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
        localStorage.setItem("accessTokenExpireAt", resp.data.accessTokenExpireAt)

        navigate('/dashboard');
      }
      return resp;
    } catch (error: any) {
      if (error.response.data.error_code === "account_under_review") {
        navigate('/account-under-review');
      }
      console.error('Error from Signin api call', error);
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
      <div className="row  align-items-center justify-content-center" style={{ height: "100vh" }}>
        <Image className="d-none d-md-block col-md-6 col-lg-7 col-xl-4" src="/illustrations/signin.svg" height="500px" />

        <div className=" col-12 col-md-6 col-lg-5 col-xl-4">
          <div className="  shadow rounded px-4 py-5 px-md-4 py-md-5  my-4 mx-auto sign_in_form_div" style={{ maxWidth: "400px" }}>
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
                  <input {...register("remember_me", { required: false })} type="checkbox" className="form-check-input" id="rememberMeCheckBox" />
                  <label className="form-check-label" htmlFor="rememberMeCheckBox">Remeber me</label>
                </div>
                <span className="link_text_color cursor_pointer" onClick={() => navigate("/auth/forget-password")}>Forgot Password</span>
              </div>
              {/* <div className="justify-content-end" style={{ display: "flex", }}> */}
              <button type="submit" className="btn w-100 btn_primary py-3  mb-4 ">Sign In</button>
              {/* </div> */}
            </form>
            <p className="text-center mb-0">Don't have an Account? <span className="cursor_pointer text-bold color_blue_hover link_text_color" onClick={() => navigate("/auth/sign-up")}>Sign Up</span></p>
          </div>
        </div>
      </div>
    </div>
  </>
};

export default SignInPage;
