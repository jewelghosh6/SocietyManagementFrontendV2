import { useRef } from "react";
import { Outlet } from "react-router-dom"

const FlatDetailsInnerLayout = () => {
    let locationRef = useRef<null | never>(null);
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
                <Outlet />
                {/* <button onClick={getLocation}>Get Location</button> */}
                <p id="location"></p>
            </div>
        </>
    )
}

export default FlatDetailsInnerLayout