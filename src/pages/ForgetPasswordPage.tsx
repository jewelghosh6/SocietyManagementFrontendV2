import axios from "axios";
import { Image } from "react-bootstrap"
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import config from "../environments/config";
import toast from "react-hot-toast";

const ForgetPasswordPage = () => {

  const { register, handleSubmit } = useForm();
  const navigate = useNavigate()

  const formSubmitHandler = async (data: any) => {
    console.log(data);
    try {
      //Request Password Change
      let resp = await axios.post(`${config.API_URL}/auth/forgot-password`, data);
      if (resp.data.success) {
        toast.success("Mail sent! Please Check Your Mail Inbox.")
        navigate('/auth/sign-in')
      }
      console.log("response", resp.data);

    } catch (error: any) {
      console.error(error);
      toast.error(error.response.data.message)
    }

  }


  return (
    <div className="container-fluid">
      <div className="row  align-items-center justify-content-center" style={{ height: "100vh" }}>
        <Image className="d-none d-md-block col-md-6 col-lg-7 col-xl-4" src="/illustrations/forgotpassword.svg" height="500px" />

        <div className=" col-sm-8 col-md-6 col-lg-5 col-xl-4">
          <div className="shadow rounded p-4 p-sm-5 my-4 mx-3">
            <div className=" mb-5">
              <h3 className="text-center">Forgot Password</h3>
            </div>
            <form onSubmit={handleSubmit(formSubmitHandler)}>
              <div className="form-floating mb-4">
                <input {...register("email", { required: true })} type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
                <label htmlFor="floatingInput">Email address</label>
              </div>

              <button type="submit" className="btn w-100 btn_primary py-3  mb-4 text-white">Send Me Instructions</button>
            </form>
            <div className="d-flex align-items-center justify-content-center mb-4">
              <span className="link_text_color cursor_pointer" onClick={() => navigate("/auth/sign-in")}>Back to Sign In</span>
            </div>
          </div>
        </div>
      </div>
    </div>)
}

export default ForgetPasswordPage