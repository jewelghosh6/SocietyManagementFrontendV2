import { createContext, useEffect, useState } from "react"
// import { ConversationList } from "../utils/SampleConversationnList";
// import { IoSend } from "react-icons/io5";
// import { SampleMsgList } from "../utils/SampleMsgList";
import { Outlet, useLocation, useNavigate, NavLink } from "react-router-dom";
import useMediaQuery from "../hooks/useMediaQuery";
import SearchBox from "./SearchBox";
import { axiosInstance } from "../utils/axiosInstance";
// import useSocket from "../hooks/useSocket";
// import toast from "react-hot-toast";
export const SelectedChatContext = createContext({ participants: { recipient: [], sender: { conversation_id: 0 } } })


const GroupChatComp = () => {
    const [conversationList, setConversationList] = useState([])
    const [searchResults, setSearchresult] = useState<any>()
    const navigate = useNavigate()
    const [chat, setChat] = useState<any>({});

    const location = useLocation();
    const isMobileMedQuery = useMediaQuery('(max-width: 767px)');
    const regex = /^\/chat\/[A-Za-z0-9]{2,}$/;
    const [showMsgContainerOnly, setShowMsgContainerOnly] = useState(regex.test(location.pathname) && isMobileMedQuery);

    useEffect(() => {
        setShowMsgContainerOnly(regex.test(location.pathname) && isMobileMedQuery);
    }, [location.pathname, isMobileMedQuery])


    const fetchConversations = async () => {
        try {
            let resp = await axiosInstance.get('/chat/fetch-conversations');
            console.log({ data: resp.data.data });
            setConversationList(resp.data.data)

        } catch (error) {
            console.log(error);

        }
    }
    useEffect(() => {
        fetchConversations().then(res => console.log(res)).catch(err => console.error(err));

    }, [])



    // console.log({ location }, { showMsgContainerOnly });
    // console.log("regex.test(location.pathname)", regex.test(location.pathname));

    const handleUserSearch = async (inputValue: string) => {
        // console.log("Search query: ", inputValue);
        try {
            let resp = await axiosInstance.get(`/chat/get-users-lists?search-key=${inputValue}`);
            // console.log({ resp });
            setSearchresult({ users: resp.data.data.users, groups: resp.data.data.groups })
        } catch (error) {
            console.error(error);
        }
    }

    const startConversationHandler = async (user_id: number) => {
        try {
            console.log("chat created for userId:", user_id);
            let resp = await axiosInstance.post('/chat/create', { user_id, conversation_type: 'direct' });
            console.log({ resp });
            navigate(`/chat/${resp.data.data.event_key}`)
        } catch (error) {
            console.error(error);
        }
    }

    const joinGroupHandler = async (conversation_id: number) => {
        try {
            // console.log("chat created for userId:", user_id);
            let resp = await axiosInstance.post('/chat/group/join', { conversation_id });
            console.log({ resp });
            // navigate(`/chat/${resp.data.data.event_key}`)


        } catch (error) {
            console.error(error);
        }

    }

 



    return (
        <div className="row   msg_container_height g-0 p-0 px-md-3 py-md-2 ">
            <div className={`${showMsgContainerOnly ? "d-none" : "d-inline col-md-4 bg-gray-200 conversation_list rounded "}`} >
                <div className="user_search_box p-2 ">
                    <SearchBox onSearch={handleUserSearch} />
                </div>
                {searchResults?.users.length || searchResults?.groups.length ? <h5>New Chats & Groups</h5> : ""}
                {
                    searchResults?.groups.map((item: any, i: number) => (
                        <div key={i} className=" px-2 py-1  m-1 cursor-pointer border-bottom-1"
                            onClick={() => {
                                setChat({ conversation_type: "group", ...item })
                                joinGroupHandler(item.id)
                            }}
                        >
                            <div className="row">
                                <div className="col-2">
                                    <div className="user_name_nav_wrapper  d-flex align-items-center cursor_pointer ">
                                        <div className=" account_initials" >
                                            <span className="m-auto name_initial_wrapper">{item.conversation_name.charAt(0).toUpperCase()}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-10">
                                    <span className="font-bold me-2">{item.conversation_name}</span>
                                    <span className="text-secondary font_size_12px">Tap to join Group</span>
                                </div>

                            </div>
                        </div>
                    ))
                }
                {
                    searchResults?.users.map((item: any, i: number) => (
                        <div key={i} className=" px-2 py-1  m-1 cursor-pointer border-bottom-1"
                            onClick={() => {
                                setChat({ conversation_type: "direct", ...item })
                                startConversationHandler(item.id)
                            }}>
                            <div className="row">
                                <div className="col-2">
                                    <div className="user_name_nav_wrapper  d-flex align-items-center cursor_pointer ">
                                        <div className=" account_initials" >
                                            <span className="m-auto name_initial_wrapper">{item.first_name.charAt(0).toUpperCase()}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-10">
                                    <span className="font-bold me-2">{item.first_name + " " + item.last_name}</span>
                                    <span className="text-secondary font_size_12px">Tap to start conversation</span>
                                </div>

                            </div>
                        </div>
                    ))
                }
                {(searchResults?.users.length || searchResults?.groups.length) && conversationList.length ? <h5>Exsisting Chats</h5> : ""}

                <div className="px-3 py-2 ">
                    {
                        conversationList.map((conversation: any, i) =>
                            <NavLink to={`/chat/${conversation.participants.sender.conversation.event_key}`} key={i}
                                className={({ isActive }) => `${isActive ? "active_chat" : ""}  col-10 p-0  m-0 cursor-pointer `}
                                onClick={() => {
                                    setChat(conversation)
                                }}>
                                <div className="row conversation_box">
                                    <div className="col-2">
                                        {/* <img src="" alt="" /> */}
                                        <div className="user_name_nav_wrapper  d-flex align-items-center cursor_pointer ">
                                            <div className=" account_initials" >
                                                <span className="m-auto name_initial_wrapper">
                                                    {conversation.participants.sender.conversation.conversation_type === "direct" ?
                                                        conversation.participants?.recipient[0].user.first_name.charAt(0).toUpperCase() :
                                                        conversation.participants.sender.conversation.conversation_name.charAt(0).toUpperCase()
                                                    }
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className={`col-10 `}>
                                        <div className="d-flex justify-content-between">
                                            <span className="fw-bolder">
                                                {
                                                    conversation.participants.sender.conversation.conversation_name ||
                                                    (conversation.participants.recipient[0].user.first_name + " " +
                                                        conversation.participants.recipient[0].user.last_name)
                                                }
                                            </span>
                                            <div className="d-flex flex-column justify-content-center">
                                                <div className="text-center"><span className="badge text-bg-success  ">4</span></div>
                                                <span className="text-secondary ">
                                                    {/* {conversation.lastMessageAt} */}
                                                </span>
                                            </div>
                                        </div>
                                        <span className="text-secondary">{conversation.lastMessage}</span>
                                    </div>

                                </div>
                            </NavLink>
                        )
                    }
                </div>
            </div>
            <div
                className="d-sm-inline col-sm-12 col-md-8 bg-cyan-50 conversation_detail_div "
            // className={`${showMsgContainerOnly || !isMobileMedQuery ? "d-inline col-sm-12 col-md-8 bg-cyan-50 conversation_detail_div " : "d-none"}`}
            >
                <SelectedChatContext.Provider value={chat}>
                    <Outlet />
                </SelectedChatContext.Provider>
            </div>
            {/* <button onClick={sendNotification}>Send Notification</button> */}

        </div >
    )
}

export default GroupChatComp