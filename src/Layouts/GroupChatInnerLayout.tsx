import { Outlet } from "react-router-dom"

const GroupChatInnerLayout = () => {
    return (
        <div className="shadow p-2 m-3">
            {/* <h3>Chat</h3> */}
            <Outlet />
        </div>
    )
}

export default GroupChatInnerLayout