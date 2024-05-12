// import { useState } from 'react'
import "./App.css";
import "./css/home-page.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LayoutMain from "./components/LayoutMain";
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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NavBarForHome />} />

        <Route path="/"  >
          <Route path="/auth/sign-in" element={<SignInPage />} />
          <Route path="/auth/sign-up" element={<SignUpPage />} />
          <Route path="/auth/forget-password" element={<ForgetPasswordPage />} />
        </Route>

        <Route path="/" element={<LayoutMain />} >
          <Route path="/dashboard" element={<DashBoardComp />} />
          <Route path="/manage-users" element={<ManageUsersComp />} />
          <Route path="/flats" element={<FlatsComp />} />
          <Route path="/flat-allotment" element={<FaltAllotmentComp />} />
          <Route path="/visitors" element={<VisitorComp />} />
          <Route path="/vehicle" element={<VehicleComp />} />
          <Route path="/suggestions" element={<SuggestionComplaintsComp />} />
          <Route path="/group-chat" element={<GroupChatComp />} />
          <Route path="/events" element={<EventsComp />} />
          <Route path="/bills" element={<BillsComp />} />
          <Route path="/security" element={<SecurityComp />} />
          <Route path="/vehicle" element={<VehicleComp />} />
        </Route>
      </Routes>
    </BrowserRouter >
  );
}

export default App;
