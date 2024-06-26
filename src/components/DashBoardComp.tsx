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
                <div className="card" style={{ width: "10rem" }}>
                    <div className="card-body">
                        <a href="#" className="btn btn-primary">Go somewhere</a>
                        <h5 className="card-title">Card title</h5>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashBoardComp