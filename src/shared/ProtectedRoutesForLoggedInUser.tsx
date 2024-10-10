import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutesForLoggedInUser = () => {
    const [userAuthenticated] = useState<null | string>(localStorage.getItem('accessToken'));

    return (
        !userAuthenticated ? <Outlet /> : <Navigate to="/dashboard" />
    );
}

export default ProtectedRoutesForLoggedInUser