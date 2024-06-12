import { useRef } from "react";
import { Outlet } from "react-router-dom"
import useBreadCrumb from "../hooks/useBreadCrumb";
import BreadcrumbsComp from "../components/BreadcrumbsComp";

const FlatDetailsInnerLayout = () => {
    let locationRef = useRef<null | never>(null);
    let breadcrumbs = useBreadCrumb();

    // function getLocation() {
    //     if ("geolocation" in navigator) {
    //         navigator.geolocation.getCurrentPosition(showPosition, showError);
    //     } else {
    //         locationRef.current.innerHTML = "Geolocation is not supported by this browser.";
    //     }
    // }
    return (
        <>
            <div ref={locationRef} className="m-3  p-4 shadow h-100">
                <BreadcrumbsComp breadcrumbs={breadcrumbs} />
                <Outlet />

            </div>
        </>
    )
}

export default FlatDetailsInnerLayout