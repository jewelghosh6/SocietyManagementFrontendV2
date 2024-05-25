import { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoutes = () => {
    const [userAuthenticated] = useState<null | string>(localStorage.getItem('accessToken'));

    return (
        userAuthenticated ? <Outlet /> : <Navigate to="/auth/sign-in" />
    );
};

export default PrivateRoutes;
