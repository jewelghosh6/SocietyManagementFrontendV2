import { IoSend } from "react-icons/io5";
import { SelectedChatContext } from "./GroupChatComp";
import { useContext, useEffect, useRef, useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { IoIosAttach } from "react-icons/io";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { socket } from "../utils/SocketInstance";
import formatToTimeString from "../utils/formatDateTime";
import VoiceRecognition from "./shared/VoiceRecognition";
import { MessageTailExt } from "./shared/MessageTail";

const MessageContainerComp = () => {
    const selectedChat = useContext(SelectedChatContext);
    const [transcript, setTranscript] = useState<string>('');

    const navigate = useNavigate();
    const [userData] = useState(JSON.parse(localStorage.getItem('userData') ?? ""));
    const [messageList, setMessageList] = useState<any[]>([]);

    const msgContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        console.log({ selectedChat });

        socket.on('direct_message', (newMessage) => {
            console.log({ newMessage });
            setMessageList((prevMessages: any[]) => [...prevMessages, newMessage]);
            scrollToBottom();
        });
        scrollToBottom();

    }, [selectedChat]);

    useEffect(() => {
        scrollToBottom();
    }, [messageList]);

    const sendMessage = () => {
        console.log("inside sendMessage,transcript: ", transcript);
        setMessageList((prevMessages: any[]) => [...prevMessages, { message: transcript, user_id: userData.id, sent_at: new Date() }]);

        socket.emit('direct_message', {
            recipientId: selectedChat.participants?.recipient[0]["user_id"],
            message: transcript,
        });

        setTranscript("");
    };

    const scrollToBottom = () => {
        if (msgContainerRef.current) {
            msgContainerRef.current.scrollTop = msgContainerRef.current.scrollHeight;
        }
    };

    const handleChange = (event: any) => {
        const newValue = event.target.value;
        console.log("newValue", newValue);
        if (newValue.toLowerCase() === "send") {
            sendMessage();
            return;
        }
        setTranscript(newValue);
    };

    return (
        <>
            <div className="bg-black-alpha-100 conversation_detail_header py-2 d-flex z-1 align-items-center ">
                <div className="user_name_nav_wrapper d-flex align-items-center mx-2">
                    <span className="ms-2 me-3 p-1 cursor_pointer back-arrow" onClick={() => navigate('/chat')}>
                        <IoArrowBack size={22} />
                    </span>
                    <div className="account_initials cursor_pointer">
                        {/* <span className="m-auto name_initial_wrapper me-2">{selectedChat.charAt(0).toUpperCase()}</span> */}
                    </div>
                </div>
                <div>
                    <span>{selectedChat.participants?.recipient[0]["first_name"] + " " + selectedChat.participants?.recipient[0]["last_name"]}</span>
                </div>
            </div>
            <div className="msg_container py-2 px-3" ref={msgContainerRef}>
                {messageList.map((item: any, i) => (
                    <div key={i} className={`d-flex position-relative  ${item.user_id === userData.id ? "justify_flex_end" : "justify_flex_start"}`}>
                        {/* <div className="position-relative"> */}
                        <MessageTailExt direction={item.user_id === userData.id ? "right" : "left"} />
                        <div className={`my-2 px-1 py-2 single_msg_body ${item.user_id === userData.id ? " bg-blue-300 msg_box_right" : " bg-indigo-100 msg_box_left"}`}>
                            <p className="px-2  my-1">
                                {item.message}
                            </p>
                            <div className="msg_time text-secondary text-right">
                                <span className="pe-2 pb-2 ">{formatToTimeString(new Date(item.sent_at))}</span>
                            </div>
                        </div>
                        {/* </div> */}
                    </div>
                ))}
            </div>
            <div className="conversation_footer_input bg-green-100 row mx-0 px-1 py-2 ">
                <div className="col-9 col-sm-10 d-flex justify-content-center align-items-center p-0">
                    <div className="d-flex align-items-center w-100">
                        <span className=" msg_input_emoji_btn"><MdOutlineEmojiEmotions size={24} /></span>
                        {/* //Have to add emoji-picker-react for emoji input */}
                        <span className="cursor-pointer pe-2  msg_input_attachment_btn"><IoIosAttach size={24} /></span>
                        <input type="text" value={transcript} onChange={handleChange} className="w-100 form-control msg_input" />
                    </div>
                </div>
                <div className="col-3 col-sm-2 p-0 d-flex justify-content-center align-items-center">
                    <div className="m-0 mr-md-1">
                        <VoiceRecognition setTranscript={setTranscript} onChange={handleChange} />
                    </div>
                    <button className="btn p-0 bg-none" type="button" onClick={sendMessage}>
                        <IoSend size={24} />
                    </button>
                </div>
            </div>
        </>
    );
};

export default MessageContainerComp;
