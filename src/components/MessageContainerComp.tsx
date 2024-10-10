import { IoSend, IoArrowBack } from "react-icons/io5";
import { IoIosAttach } from "react-icons/io";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { PiChecks } from "react-icons/pi";
// import { RxCross2 } from "react-icons/rx";
import { useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { axiosInstance } from "../utils/axiosInstance";
// import formatToTimeString from "../utils/formatDateTime";
import VoiceRecognition from "./shared/VoiceRecognition";
import { MessageTailExt } from "./shared/MessageTail";
import useSocket from "../hooks/useSocket";
import { SelectedChatContext } from "./GroupChatComp";
import DateUtilityFunction from "../utils/formatDateTime";
// import { Image } from "react-bootstrap";

const MessageContainerComp = () => {
    const socket = useSocket();
    const selectedChat = useContext(SelectedChatContext);
    const navigate = useNavigate();
    const { chatEventKey } = useParams();
    const { register, handleSubmit } = useForm();

    const [transcript, setTranscript] = useState<string>('');
    const [conversationDettail, setConversationDettail] = useState<any>({});
    const [userData] = useState(JSON.parse(localStorage.getItem('userData') ?? ''));
    const [messageList, setMessageList] = useState<any[]>([]);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(false);

    const msgContainerRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        setConversationDettail(selectedChat);

        if (!selectedChat.participants) {
            axiosInstance
                .get(`/chat/get-conversation-info?chatEventKey=${chatEventKey}`)
                .then((res) => {
                    console.log("---",res);
                    
                    setConversationDettail(res.data.data);
                    fetchMessagesAndSetMessagesList(res.data.data.participants.sender.conversation_id);
                })
                .catch((err) => console.log(err));
        }

        if (selectedChat.participants) fetchMessagesAndSetMessagesList(selectedChat.participants.sender.conversation_id);

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

        return () => {
            if (socket) {
                socket.off('direct_message');
                socket.off('group_message');
            }
        };
    }, [socket, selectedChat]);

    const fetchMessagesAndSetMessagesList = async (conversation_id: any) => {
        try {
            const resp = await axiosInstance.get(`/chat/get-messages?conversation_id=${conversation_id}`);
            setMessageList(resp.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messageList]);

    const sendMessage = () => {
        setMessageList((prevMessages: any[]) => [...prevMessages, { message_text: transcript, user_id: userData.id, created_at: new Date() }]);
        scrollToBottom();

        if (socket && conversationDettail.participants?.sender.conversation.conversation_type === 'direct') {
            socket.emit('direct_message', {
                recipientId: conversationDettail.participants?.recipient[0]['user_id'],
                message: transcript,
                chatEventKey: chatEventKey,
                conversationId: conversationDettail.participants.sender.conversation_id,
                senderName: `${userData.first_name} ${userData.last_name}`,
            });
        }

        if (socket && conversationDettail.participants?.sender.conversation.conversation_type === 'group') {
            socket.emit('group_message', {
                message: transcript,
                chatEventKey: chatEventKey,
                conversationId: conversationDettail.participants.sender.conversation_id,
                senderName: `${userData.first_name} ${userData.last_name}`,
            });
        }

        setTranscript('');
    };

    const scrollToBottom = () => {
        if (msgContainerRef.current) {
            msgContainerRef.current.scrollTop = msgContainerRef.current.scrollHeight;
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        if (newValue.toLowerCase() === 'send') {
            sendMessage();
            return;
        }
        setTranscript(newValue);
    };

    useEffect(() => {
        const handleScroll = () => {
            if (msgContainerRef.current) {
                const scrollLeft = msgContainerRef.current.scrollLeft;
                const scrollWidth = msgContainerRef.current.scrollWidth;
                const clientWidth = msgContainerRef.current.clientWidth;

                setShowLeftArrow(scrollLeft > 0);
                setShowRightArrow(scrollLeft + clientWidth < scrollWidth);
            }
        };

        handleScroll();
        window.addEventListener('resize', handleScroll);
        if (msgContainerRef.current) {
            msgContainerRef.current.addEventListener('scroll', handleScroll);
        }

        return () => {
            window.removeEventListener('resize', handleScroll);
            if (msgContainerRef.current) {
                msgContainerRef.current.removeEventListener('scroll', handleScroll);
            }
        };
    }, [messageList]);

    return (
        <>
            <div className="bg-black-alpha-100 conversation_detail_header py-2 d-flex z-1 align-items-center">
                <div className="user_name_nav_wrapper d-flex align-items-center mx-2">
                    <span className="ms-2 me-3 p-1 cursor_pointer back-arrow" onClick={() => navigate('/chat')}>
                        <IoArrowBack size={22} />
                    </span>
                    <div className="account_initials cursor_pointer">
                        <CgProfile size={36} />
                    </div>
                </div>
                <div>
                    <span>
                        {conversationDettail.participants?.sender.conversation.conversation_type === 'direct'
                            ? conversationDettail.participants?.recipient[0]['user']["first_name"] + ' ' + conversationDettail.participants?.recipient[0]['user']["last_name"]
                            : conversationDettail.participants?.sender.conversation.conversation_name}
                    </span>
                </div>
            </div>
            <div className="msg_container py-2 px-3 position-relative" ref={msgContainerRef} style={{ overflowX: 'auto', maxHeight: '80vh', whiteSpace: 'nowrap' }}>
                {messageList.map((item: any, i) => (
                    <div key={i} className={`d-flex position-relative ${item.user_id === userData.id ? 'justify_flex_end' : 'justify_flex_start'}`}>
                        <MessageTailExt direction={item.user_id === userData.id ? 'right' : 'left'} />
                        <div className={`my-2 px-1 py-2 single_msg_body ${item.user_id === userData.id ? 'bg-blue-300 msg_box_right' : 'bg-indigo-100 msg_box_left'}`}>
                            <p className="px-2 my-1 d-flex flex-column">
                                {conversationDettail.participants?.sender.conversation.conversation_type === 'group' && item.user_id !== userData.id && <strong>{item.senderName}</strong>}
                                {item.message_text}
                            </p>
                            <div className="msg_time text-secondary text-right">
                                <span className="pe-2 pb-2 ">{DateUtilityFunction.formatToTimeString(new Date(item.created_at))}</span>
                                <PiChecks color="blue" size={20} />
                            </div>
                        </div>
                    </div>
                ))}
                {showLeftArrow && (
                    <div className="scroll-arrow scroll-arrow-left" style={{ position: 'absolute', left: 5, top: '50%', transform: 'translateY(-50%)', zIndex: 1000, cursor: 'pointer', backgroundColor: 'rgba(255,255,255,0.8)', borderRadius: '50%' }}>
                        <IoArrowBack size={24} color="blue" onClick={() => msgContainerRef.current && msgContainerRef.current.scrollBy({ left: -100, behavior: 'smooth' })} />
                    </div>
                )}
                {showRightArrow && (
                    <div className="scroll-arrow scroll-arrow-right" style={{ position: 'absolute', right: 5, top: '50%', transform: 'translateY(-50%)', zIndex: 1000, cursor: 'pointer', backgroundColor: 'rgba(255,255,255,0.8)', borderRadius: '50%' }}>
                        <IoArrowBack size={24} color="blue" onClick={() => msgContainerRef.current && msgContainerRef.current.scrollBy({ left: 100, behavior: 'smooth' })} />
                    </div>
                )}
            </div>
            <form onSubmit={handleSubmit(sendMessage)}>
                <div className="">
                     <div
                        className="bg-gray-200 d-flex"
                        style={{ minHeight: '150px', overflow: 'hidden', position: 'relative' }}
                        ref={msgContainerRef}
                    >
                        <div className="position-relative">
                            <div className="d-flex align-items-center" style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}>
                                {/* <div className="col-4 col-md-3 position-relative">
                                    <div className="position-relative">
                                        <span className="position-absolute right-0 top-0 cursor-pointer">
                                            <RxCross2 size={22} color="black" />
                                        </span>
                                        <Image
                                            className="w-100"
                                            src="https://res.cloudinary.com/dfo1wgior/image/upload/v1720382487/pfj9sfyqhvzhpljujr4e.png"
                                            alt="test_img"
                                        />
                                    </div>
                                </div> */}
                                <div className="col-4 col-md-3 position-relative">
                                    <div className="position-relative">
                                        <span
                                            className="position-absolute cursor-pointer"
                                            style={{
                                                top: '2px',
                                                right: '2px',
                                                backgroundColor: 'rgba(0,0,0,0.5)',
                                                borderRadius: '50%',
                                                border: '1px solid white',
                                                padding: '0px 2px',
                                            }}
                                        >
                                            {/* <RxCross2 size={18} color="white" style={{ margin: "-5px 0 0" }} /> */}
                                        </span>
                                        {/* <Image
                                            className="w-100"
                                            src="https://res.cloudinary.com/dfo1wgior/image/upload/v1720382487/pfj9sfyqhvzhpljujr4e.png"
                                            alt="test_img"
                                        /> */}
                                    </div>
                                </div>
                                {/* <div className="col-4 col-md-3 position-relative">
                                    <div className="position-relative">
                                        <span className="position-absolute right-0 top-0 cursor-pointer">
                                            <RxCross2 size={22} color="black" />
                                        </span>
                                        <Image
                                            className="w-100"
                                            src="https://res.cloudinary.com/dfo1wgior/image/upload/v1720382487/pfj9sfyqhvzhpljujr4e.png"
                                            alt="test_img"
                                        />
                                    </div>
                                </div> */}
                                {/* <div className="col-4 col-md-3 position-relative">
                                    <div className="position-relative">
                                        <span className="position-absolute right-0 top-0 cursor-pointer">
                                            <RxCross2 size={22} color="black" />
                                        </span>
                                        <Image
                                            className="w-100"
                                            src="https://res.cloudinary.com/dfo1wgior/image/upload/v1720382487/pfj9sfyqhvzhpljujr4e.png"
                                            alt="test_img"
                                        />
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div> 
                    <div className="conversation_footer_input bg-green-100 row mx-0 px-1 py-2">
                        <div className="col-9 col-sm-10 d-flex justify-content-center align-items-center p-0">
                            <div className="d-flex align-items-center w-100">
                                <span className="msg_input_emoji_btn"><MdOutlineEmojiEmotions size={24} /></span>
                                <span className="pe-2 msg_input_attachment_btn">
                                    <label htmlFor="file_input" className="cursor-pointer">
                                        <IoIosAttach size={24} />
                                    </label>
                                    <input type="file" name="file_input" id="file_input" multiple className="d-none" />
                                </span>
                                <input
                                    type="text"
                                    value={transcript}
                                    placeholder="Type Your Message"
                                    {...register('message')}
                                    onChange={handleChange}
                                    className="w-100 form-control msg_input"
                                />
                            </div>
                        </div>
                        <div className="col-3 col-sm-2 p-0 d-flex justify-content-center align-items-center">
                            <div className="m-0 mr-md-1">
                                <VoiceRecognition setTranscript={setTranscript} onChange={handleChange} />
                            </div>
                            <button className="btn p-0 bg-none" type="submit">
                                <IoSend size={24} color="blue" />
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
};

export default MessageContainerComp;
