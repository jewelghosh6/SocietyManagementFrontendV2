import { Outlet } from "react-router-dom"
import BreadcrumbsComp from "../components/BreadcrumbsComp";
import useBreadCrumb from "../hooks/useBreadCrumb";

const ManageUsersInnerLayout = () => {

    let breadcrumbs = useBreadCrumb();
    return (
        <div className="m-3  p-4 shadow">
            <BreadcrumbsComp breadcrumbs={breadcrumbs} />
            <Outlet />
        </div>
    )
}

export default ManageUsersInnerLayout