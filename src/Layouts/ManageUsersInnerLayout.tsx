import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom"
import BreadcrumbsComp from "../components/BreadcrumbsComp";

const ManageUsersInnerLayout = () => {

    const [breadcrumbs, setBreadcrumbs] = useState<{ title: string; url: string }[]>([]);
    const location = useLocation();

    useEffect(() => {
        // Define breadcrumb data structure based on current page location
        const pathSegments = location.pathname.split('/').filter(segment => segment !== '');
        const breadcrumbData = pathSegments.map((segment, index) => ({
            title: segment.charAt(0).toUpperCase() + segment.slice(1), // Capitalize first letter
            url: index == pathSegments.length - 1 ? "#" : `/${pathSegments.slice(0, index + 1).join('/')}`
        }));
        console.log(breadcrumbData);

        setBreadcrumbs([...breadcrumbData]);
    }, [location]);
    return (
        <div className="m-3  p-4 shadow">
            <BreadcrumbsComp breadcrumbs={breadcrumbs} />
            <Outlet />
        </div>
    )
}

export default ManageUsersInnerLayout