import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LayoutMain from "./Layouts/LayoutMain";
import DashBoardComp from "./components/DashBoardComp";
import ManageFlatsComp from "./components/ManageFlatsComp";
import VisitorComp from "./components/VisitorComp";
import VehicleComp from "./components/VehicleComp";
import BillsComp from "./components/BillsComp";
import SuggestionComplaintsComp from "./components/Suggestion&ComplaintsComp";
import GroupChatComp from "./components/GroupChatComp";
import EventsComp from "./components/EventsComp";
import FaltAllotmentComp from "./components/FaltAllotmentComp";
import SecurityComp from "./components/SecurityComp";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import ForgetPasswordPage from "./pages/ForgetPasswordPage";
import NavBarForHome from "./components/NavBarForHome";
import ManageUsersComp from "./components/ManageUsersComp";
import RegisterRequestComp from "./components/RegisterRequestComp";
import ManageUsersInnerLayout from "./Layouts/ManageUsersInnerLayout";
import ApproveRegisterReqComp from "./components/ApproveRegisterReqComp";
import RegistrationStatus from "./pages/RegisterRequestUnderProcessPage";
import PrivateRoutes from "./shared/ProtectedRoutes";
import MyFlatDetailComp from "./components/MyFlatDetailComp";
import MyBillsComp from "./components/MyBillsComp";
import FlatDetailsInnerLayout from "./Layouts/FlatDetailsInnerLayout";
import GroupChatInnerLayout from "./Layouts/GroupChatInnerLayout";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import UserSectionLayout from "./Layouts/UserSectionLayout";
import MyProfilePage from "./pages/MyProfilePage";
import AccountSettings from "./pages/AccountSettings";
import MessageContainerComp from "./components/MessageContainerComp";
import ProtectedRoutesForLoggedInUser from "./shared/ProtectedRoutesForLoggedInUser";

function App() {

  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />

        <Route path="/home" element={<NavBarForHome />} />

        <Route path="/" element={<ProtectedRoutesForLoggedInUser />} >
          <Route path="/auth/sign-in" element={<SignInPage />} />
          <Route path="/auth/sign-up" element={<SignUpPage />} />
          <Route path="/auth/forget-password" element={<ForgetPasswordPage />} />
          <Route path="/auth/reset-password" element={<ResetPasswordPage />} />
          <Route path="/auth/change-password" element={<ChangePasswordPage />} />
        </Route>

        <Route path="/account-under-review" element={<RegistrationStatus />} />

        <Route path="/user" element={<UserSectionLayout />} >
          <Route path="my-profile" element={<MyProfilePage />} />
          <Route path="account-settings" element={<AccountSettings />} />
        </Route>


        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<LayoutMain />} >
            <Route path="/dashboard" element={<DashBoardComp />} />

            <Route path="/manage-users" element={<ManageUsersInnerLayout />} >
              <Route path="/manage-users/register-request/:id" element={<ApproveRegisterReqComp />} />
              <Route path="/manage-users/register-request" element={<RegisterRequestComp />} />
              <Route path="/manage-users" element={<ManageUsersComp />} />
            </Route>

            <Route path="/manage-flats" element={<FlatDetailsInnerLayout />}  >
              <Route path="/manage-flats" element={<ManageFlatsComp />} />
            </Route>
            <Route path="/my-flat" element={<MyFlatDetailComp />} />

            <Route path="/flat-allotment" element={<FaltAllotmentComp />} />
            <Route path="/visitors" element={<VisitorComp />} />
            <Route path="/vehicle" element={<VehicleComp />} />
            <Route path="/suggestions" element={<SuggestionComplaintsComp />} />

            <Route path="/chat" element={< GroupChatInnerLayout />} >
              <Route path="/chat" element={<GroupChatComp />} >
                <Route path="/chat/:chatEventKey" element={< MessageContainerComp />} />
              </Route>
            </Route>

            <Route path="/events" element={<EventsComp />} />
            <Route path="/manage-bills" element={<BillsComp />} />
            <Route path="/my-bills" element={<MyBillsComp />} />
            <Route path="/security" element={<SecurityComp />} />
            <Route path="/vehicle" element={<VehicleComp />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter >
  );
}

export default App;
