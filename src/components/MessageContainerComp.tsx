import { IoSend } from "react-icons/io5"
// import { SampleMsgList } from "../utils/SampleMsgList"
import { SelectedChatContext } from "./GroupChatComp";
import { useContext, useEffect, useRef, useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
// import { useForm } from "react-hook-form";
import { IoIosAttach } from "react-icons/io";
import { MdOutlineEmojiEmotions } from "react-icons/md";
// import { axiosInstance } from "../utils/axiosInstance";
import { socket } from "../utils/SocketInstance";
import formatToTimeString from "../utils/formatDateTime";
import VoiceRecognition from "./shared/VoiceRecognition";




const MessageContainerComp = () => {
    const selectedChat = useContext(SelectedChatContext);
    const [transcript, setTranscript] = useState<string>('');

    const navigate = useNavigate();
    // const { chatId } = useParams()
    const [userData] = useState(JSON.parse(localStorage.getItem('userData') ?? ""))
    const [messageList, setMessageList] = useState<any[]>([])

    const msgContainerRef = useRef<HTMLDivElement>(null); // Define type for msgContainerRef

    // const { register, handleSubmit, reset } = useForm()
    useEffect(() => {
        // axiosInstance.get(`/chat/fetch-messages?event-key=${chatId}`).then(res => console.log(res.data)).catch(err => console.error(err));
        // if (chatId) {
        // socket.on('direct_message', (data) => {
        //     console.log(data);

        // })

        // Listen for new messages from socket.io
        console.log({ selectedChat });

        socket.on('direct_message', (newMessage) => {
            console.log({ newMessage });
            setMessageList((prevMessages: any[]) => [...prevMessages, newMessage]); // Update messages state with new message
            scrollToBottom();
        });
        scrollToBottom();

        // }

    }, [])

    // Scroll to bottom whenever messages change
    useEffect(() => {
        scrollToBottom();
    }, [messageList]);

    const sendMEssage = () => {
        // console.log("data", data.message)
        // socket.emit("direct_message", { message: data.message, user_id: userData.id })
        console.log(selectedChat.participants?.recipient[0]["user_id"], ".......");

        setMessageList((prevMessages: any[]) => [...prevMessages, { message: transcript, user_id: userData.id, sent_at: new Date() }]); // Update messages state with new message



        socket.emit('direct_message', {
            recipientId: selectedChat.participants?.recipient[0]["user_id"],
            message: transcript,
        });
        // reset()
        setTranscript("")
    }

    const scrollToBottom = () => {
        if (msgContainerRef.current) {
            msgContainerRef.current.scrollTop = msgContainerRef.current.scrollHeight;
        }
    };





    return (
        <>
            <div className="bg-black-alpha-100 conversation_detail_header py-2 d-flex z-1 align-items-center">
                <div className="user_name_nav_wrapper  d-flex align-items-center mx-2 ">
                    <span className="ms-2 me-3 p-1 cursor_pointer back-arrow" onClick={() => navigate('/chat')}>
                        <IoArrowBack size={22} />
                    </span>
                    <div className=" account_initials  cursor_pointer" >
                        {/* <span className="m-auto name_initial_wrapper me-2">{selectedChat.charAt(0).toUpperCase()}</span> */}
                    </div>
                </div>
                <div>
                    <span>{selectedChat.participants?.recipient[0]["first_name"] + " " + selectedChat.participants?.recipient[0]["last_name"]}</span>
                    {/* <span>User Name</span> */}
                </div>
            </div>
            <div className="msg_container p-2 " ref={msgContainerRef}>
                {
                    messageList.map((item: any, i) => (
                        <div key={i} className={`d-flex  ${item.user_id == userData.id ?
                            "justify_flex_end" : "justify_flex_start "}`}>
                            <div className={` my-2 rounded  d-flex  ${item.user_id == userData.id ?
                                "bg-blue-300" : "bg-indigo-100 "}`}>

                                <span className={` px-3 py-0 my-3   `}>
                                    {item.message}
                                </span>
                                <div className="msg_time text-secondary d-flex align-items-end">
                                    <span className="pe-2 pb-2"> {formatToTimeString(new Date(item.sent_at))}</span>
                                </div>
                            </div>
                        </div>))
                }
            </div>
            {/* <form onSubmit={handleSubmit(sendMEssage)}> */}
            <div className="conversation_footer_input bg-green-100 row mx-0 px-1 py-2">
                <div className=" col-10 d-flex justify-content-center align-items-center ">
                    <span><MdOutlineEmojiEmotions size={24} /></span>
                    <span className="cursor-pointer pe-2"> <IoIosAttach size={24} /></span>
                    {/* <input type="text" {...register("message", { required: true })} className="w-100 form-control" /> */}
                    <input type="text" value={transcript} onChange={(e) => { setTranscript(`${e.target.value}`) }} className="w-100 form-control" />

                </div>
                <div className=" col-2 p-0 d-flex justify-content-center align-items-center ">
                    <div className="mr-1">
                        <VoiceRecognition setTranscript={setTranscript} />
                    </div>

                    <button className="btn bg-none " type="button" onClick={sendMEssage}>
                        <IoSend className="" size={24} />
                    </button>
                </div>
            </div >
            {/* </form> */}
        </>
    )
}

export default MessageContainerComp