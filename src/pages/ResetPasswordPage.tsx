import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import config from "../environments/config";
import toast from "react-hot-toast";

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  // useEffect(() => {
  //   console.log("passwordResetToken", searchParams.get('token'))
  // }, [])

  const { isPending, error } = useQuery({
    queryKey: ['verifyPasswordResetToken'],
    queryFn: async () => {
      try {
        let resp = await axios.post(`${config.API_URL}/auth/verify-password-reset-token`,
          {
            token: searchParams.get('token'),
          })
        return resp;
      } catch (error) {
        console.error(error);
        throw error;

      }
    }
  })

  const formSubmitHandler = async (data: any) => {
    console.log("Submitted form data", data);
    try {
      let resp = await axios.post(`${config.API_URL}/auth/set-new-password`, {
        token: searchParams.get('token'),
        ...data
      })
      console.log("Resp from 'set-new-password' API Call: ", resp.data);
      toast.success(resp.data.message);
      navigate('/auth/sign-in');

    } catch (error: any) {
      console.error(error);
      toast.error(error.response.data.message);
      navigate('/auth/sign-in');
    }



  }
  if (isPending) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  return (
    <div className="d-flex justify-content-center align-items-center " style={{ height: "100vh" }}>


      <div className="" style={{ maxWidth: "450px" }}>
        <div className="shadow rounded p-4 p-sm-5 my-4 mx-3">
          <div className=" mb-5">
            <h3 className="text-center">Set New Password</h3>
            <span className="text-secondary">Your Identity has been verified.Please Set your new Password.</span>
          </div>
          <form onSubmit={handleSubmit(formSubmitHandler)}>
            <div className="form-floating mb-4">
              <input {...register("password", { required: true })} type="password" className="form-control" id="floatingInput" placeholder="name@example.com" />
              <label htmlFor="floatingInput">New Password</label>
            </div>
            <div className="form-floating mb-4">
              <input {...register("confirm_password", { required: true })} type="password" className="form-control" id="floatingInput" placeholder="name@example.com" />
              <label htmlFor="floatingInput">Confirm New Password</label>
            </div>

            <button type="submit" className="btn w-100 btn_primary py-3  mb-4 text-white">Update</button>
          </form>
          <div className="d-flex align-items-center justify-content-center mb-4">
            {/* <span className="link_text_color cursor_pointer" onClick={() => navigate("/auth/sign-in")}>Back to Sign In</span> */}
          </div>
        </div>
      </div>
      <div className="d-none d-md-block">
        <img src="/illustrations/resetpass.svg" height="430px" alt="" />
      </div>
    </div>
  )
}

export default ResetPasswordPage