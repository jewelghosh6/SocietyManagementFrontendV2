import { IoSend } from "react-icons/io5";
import { SelectedChatContext } from "./GroupChatComp";
import { useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { IoIosAttach } from "react-icons/io";
import { MdOutlineEmojiEmotions } from "react-icons/md";
// import { socket } from "../utils/SocketInstance";
import formatToTimeString from "../utils/formatDateTime";
import VoiceRecognition from "./shared/VoiceRecognition";
import { MessageTailExt } from "./shared/MessageTail";
import { useForm } from "react-hook-form";
import { axiosInstance } from "../utils/axiosInstance";
// import { Image } from "react-bootstrap";
import useSocket from "../hooks/useSocket";
import { CgProfile } from "react-icons/cg";


const MessageContainerComp = () => {
    // const [token] = useState(localStorage.getItem('accessToken') ?? "");
    const socket = useSocket();


    const selectedChat = useContext(SelectedChatContext);
    const [transcript, setTranscript] = useState<string>('');
    const [conversationDettail, setConversationDettail] = useState<any>({});

    const navigate = useNavigate();
    const [userData] = useState(JSON.parse(localStorage.getItem('userData') ?? ""));
    const [messageList, setMessageList] = useState<any[]>([]);

    const msgContainerRef = useRef<HTMLDivElement>(null);
    const { chatEventKey } = useParams();
    const { register, handleSubmit } = useForm()



    useLayoutEffect(() => {
        console.log("selectedChat", selectedChat);
        console.log("socket", socket)
        setConversationDettail(selectedChat);


        //If selectedChat from context is null then make api call and retrive details for this conversation by chatEventKey

        if (!selectedChat.participants) {
            axiosInstance.get(`/chat/get-conversation-info?chatEventKey=${chatEventKey}`)
                .then(res => {
                    console.log(res.data)
                    setConversationDettail(res.data.data)
                    fetchMessagesAndSetMessagesList(res.data.data.participants.sender.conversation_id)
                }).catch(err => console.log(err));
        }
        console.log("conversationDettail.participants", typeof conversationDettail.participants);

        if (selectedChat.participants) fetchMessagesAndSetMessagesList(selectedChat.participants.sender['conversation_id'])

        //Make API call and retrive old messages for this conversation

        if (socket) {
            socket.on('direct_message', (newMessage) => {
                if (chatEventKey === newMessage.chatEventKey) {
                    setMessageList((prevMessages: any[]) => [...prevMessages, newMessage]);
                    scrollToBottom();
                }
            });
            socket.on('group_message', (newMessage) => {
                if (chatEventKey === newMessage.chatEventKey) {
                    setMessageList((prevMessages: any[]) => [...prevMessages, newMessage]);
                    scrollToBottom();
                }
            });
        }

        // return () => {
        //     if (socket) {
        //         socket.off('direct_message');
        //     }



        // return () => {
        //     if (socket) socket.off('direct_message', () => console.log("socket disconnected"));
        // };

    }, [socket, selectedChat])

    const fetchMessagesAndSetMessagesList = async (conversation_id: any) => {
        try {
            let resp = await axiosInstance.get(`/chat/get-messages?conversation_id=${conversation_id}`)
            console.log("get-msg", resp.data);
            setMessageList(resp.data.data)
        } catch (error) {
            console.error(error)
        }
    }

    // useEffect(() => {
    //     console.log({ selectedChat });
    //     setConversationDettail(selectedChat);

    //     scrollToBottom();

    // }, [selectedChat]);

    useEffect(() => {
        scrollToBottom();
    }, [messageList]);

    const sendMessage = (data = {}) => {
        console.log("inside sendMessage,transcript: ", transcript, data);
        setMessageList((prevMessages: any[]) => [...prevMessages, { message_text: transcript, user_id: userData.id, created_at: new Date() }]);
        scrollToBottom();

        if (socket && conversationDettail.participants?.sender.conversation.conversation_type === "direct") {
            socket.emit('direct_message', {
                recipientId: conversationDettail.participants?.recipient[0]["user_id"],
                message: transcript,
                chatEventKey: chatEventKey,
                conversationId: conversationDettail.participants.sender.conversation_id,
                senderName: `${userData.first_name} ${userData.last_name}`
            });
        }

        if (socket && conversationDettail.participants?.sender.conversation.conversation_type === "group") {
            socket.emit('group_message', {
                message: transcript,
                chatEventKey: chatEventKey,
                conversationId: conversationDettail.participants.sender.conversation_id,
                senderName: `${userData.first_name} ${userData.last_name}`
            });
        }

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
                    <div className="account_initials cursor_pointer " >
                        {/* <span className="m-auto name_initial_wrapper me-2">{selectedChat.charAt(0).toUpperCase()}</span> */}
                        <CgProfile size={36} />
                    </div>
                </div>
                <div>
                    <span>
                        {
                            conversationDettail.participants?.sender.conversation.conversation_type === "direct" ?
                                conversationDettail.participants?.recipient[0]['user']["first_name"] +
                                " " + conversationDettail.participants?.recipient[0]['user']["last_name"]
                                : conversationDettail.participants?.sender.conversation.conversation_name
                        }
                    </span>
                </div>
            </div>
            <div className="msg_container py-2 px-3" ref={msgContainerRef}>
                {messageList.map((item: any, i) => (
                    <div key={i} className={`d-flex position-relative  ${item.user_id === userData.id ? "justify_flex_end" : "justify_flex_start"}`}>
                        {/* <div className="position-relative"> */}
                        <MessageTailExt direction={item.user_id === userData.id ? "right" : "left"} />
                        <div className={`my-2 px-1 py-2 single_msg_body ${item.user_id === userData.id ? " bg-blue-300 msg_box_right" : " bg-indigo-100 msg_box_left"}`}>
                            {/* <Image className="w-100" src="https://res.cloudinary.com/dfo1wgior/image/upload/v1720382487/pfj9sfyqhvzhpljujr4e.png" alt="test_img" /> */}

                            <p className="px-2  my-1 d-flex flex-column">
                                {(conversationDettail.participants?.sender.conversation.conversation_type === "group" &&
                                    item.user_id !== userData.id) && <strong>{item.senderName}</strong>}
                                {item.message_text}
                            </p>
                            <div className="msg_time text-secondary text-right">
                                <span className="pe-2 pb-2 ">{formatToTimeString(new Date(item.created_at))}</span>
                            </div>
                        </div>
                        {/* </div> */}
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit(sendMessage)}>
                <div className="conversation_footer_input bg-green-100 row mx-0 px-1 py-2 ">
                    <div className="col-9 col-sm-10 d-flex justify-content-center align-items-center p-0">
                        <div className="d-flex align-items-center w-100">
                            <span className=" msg_input_emoji_btn"><MdOutlineEmojiEmotions size={24} /></span>
                            {/* //Have to add emoji-picker-react for emoji input */}
                            <span className="cursor-pointer pe-2  msg_input_attachment_btn"><IoIosAttach size={24} /></span>
                            <input type="text" value={transcript} placeholder="Type Your Message"
                                {...register('message')} onChange={handleChange} className="w-100 form-control msg_input" />
                        </div>
                    </div>
                    <div className="col-3 col-sm-2 p-0 d-flex justify-content-center align-items-center">
                        <div className="m-0 mr-md-1">
                            <VoiceRecognition setTranscript={setTranscript} onChange={handleChange} />
                        </div>
                        <button className="btn p-0 bg-none" type="submit" >
                            <IoSend size={24} color="blue" />
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
};

export default MessageContainerComp;
