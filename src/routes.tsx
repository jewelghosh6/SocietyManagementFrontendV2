import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
// import Dashboard from "./components/Dashboard";
// import DashboardPage from "./pages/DashboardPage";
import ForgetPasswordPage from "./pages/ForgetPasswordPage";
import DashboardPage from "./pages/DashboardPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/auth",
    children: [
      {
        path: "sign-in",
        element: <SignInPage />,
      },
      {
        path: "sign-up",
        element: <SignUpPage />,
      },
      {
        path: "forget-password",
        element: <ForgetPasswordPage />
      }
    ],
  },
  {
    path: "/flats",
    element: <div>flats</div>,
  },
  {
    path: "/visitor",
    element: <div>visitor</div>,
  },
  {
    path: "/vehicle",
    element: <div>vehicle</div>,
  },
  {
    path: "/dashboard",
    element: <DashboardPage />,
  },
]);
