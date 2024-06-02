import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LayoutMain from "./Layouts/LayoutMain";
import DashBoardComp from "./components/DashBoardComp";
import FlatsComp from "./components/FlatsComp";
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

function App() {

  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />

        <Route path="/home" element={<NavBarForHome />} />

        <Route path="/"  >
          <Route path="/auth/sign-in" element={<SignInPage />} />
          <Route path="/auth/sign-up" element={<SignUpPage />} />
          <Route path="/auth/forget-password" element={<ForgetPasswordPage />} />
        </Route>

        <Route path="/account-under-review" element={<RegistrationStatus />} />

        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<LayoutMain />} >
            <Route path="/dashboard" element={<DashBoardComp />} />

            <Route path="/manage-users" element={<ManageUsersInnerLayout />} >
              <Route path="/manage-users/register-request/:id" element={<ApproveRegisterReqComp />} />
              <Route path="/manage-users/register-request" element={<RegisterRequestComp />} />
              <Route path="/manage-users" element={<ManageUsersComp />} />
            </Route>

            <Route path="/flat-details" element={<FlatDetailsInnerLayout />}  >
              <Route path="/flat-details" element={<FlatsComp />} />
            </Route>
            <Route path="/my-flat" element={<MyFlatDetailComp />} />

            <Route path="/flat-allotment" element={<FaltAllotmentComp />} />
            <Route path="/visitors" element={<VisitorComp />} />
            <Route path="/vehicle" element={<VehicleComp />} />
            <Route path="/suggestions" element={<SuggestionComplaintsComp />} />

            <Route path="/group-chat" element={< GroupChatInnerLayout />} >
              <Route path="/group-chat" element={<GroupChatComp />} />
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
