import { Outlet } from "react-router-dom"

const GroupChatInnerLayout = () => {
    return (
        <div className="shadow p-4 m-3">GroupChatInnerLayout
            <Outlet />
        </div>
    )
}

export default GroupChatInnerLayout