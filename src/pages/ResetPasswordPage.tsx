import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

const ResetPasswordPage = () => {
  const { passwordResetToken } = useParams();
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    console.log("passwordResetToken", passwordResetToken);

  }, [])

  const formSubmitHandler = (data: any) => {
    console.log(data);


  }

  return (
    <div className="d-flex justify-content-center align-items-center " style={{ height: "100vh" }}>


      <div className="">
        <div className="shadow rounded p-4 p-sm-5 my-4 mx-3">
          <div className=" mb-5">
            <h3 className="text-center">Set New Password</h3>
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