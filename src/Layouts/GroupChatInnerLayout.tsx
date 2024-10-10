import { Outlet } from "react-router-dom"

const GroupChatInnerLayout = () => {
    return (
        <div className="shadow p-0 p-md-2 m-0 m-md-3 vh-100">
            {/* <h3>Chat</h3> */}
            <Outlet />
        </div>
    )
}

export default GroupChatInnerLayout