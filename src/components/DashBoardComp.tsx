import { useState } from "react"

const DashBoardComp = () => {
    const [userData] = useState(JSON.parse(localStorage.getItem("userData") ?? ""))

    return (
        <div className="m-3 shadow h-100">
            <div className=" p-4">
                <div className="greetings_msg d-flex ">
                    <h3>Welcome {userData.first_name}!</h3>
                    <span className="badge text-bg-primary role_badge">{userData.role}</span>
                </div>

                <div className="d-flex gap-3">
                    <div className="card bg-bluegray-200 dashboard_tile" style={{}}>
                        <div className="card-body text-center">
                            <h5 className="card-title fw-bold">Total Users</h5>
                            <div className="fw-medium">
                                <span>123</span>
                            </div>
                        </div>
                    </div>

                    <div className="card bg-blue-50 dashboard_tile" style={{}}>
                        <div className="card-body text-center">
                            <h5 className="card-title fw-bold">Total Flats</h5>
                            <div className="fw-medium">
                                <span>123</span>
                            </div>
                        </div>
                    </div>

                    <div className="card bg-bluegray-200 dashboard_tile" style={{}}>
                        <div className="card-body text-center">
                            <h5 className="card-title fw-bold">Vistors count</h5>
                            <span>{new Date().toDateString()}</span>
                            <div className="fw-medium">
                                <span>123</span>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default DashBoardComp