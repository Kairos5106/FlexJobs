import React, { useState, useEffect, useRef } from "react";
import MessageForm from "./MessageForm";
import MyMessage from "./MyMessage";
import TheirMessage from "./TheirMessage";

const ChatFeed = (props) => {
    const { chats, activeChat, userName, messages, setActiveChat, createChat } = props;
    const [newChatTitle, setNewChatTitle] = useState("");
    const [messageIds, setMessageIds] = useState([]);
    const [localMessages, setLocalMessages] = useState({});

    const chatFeedRef = useRef(null);

    useEffect(() => {
        if (chats && !activeChat) {
            const firstChatId = Object.keys(chats)[0];
            setActiveChat(firstChatId);
        }
    }, [chats, activeChat, setActiveChat]);

    useEffect(() => {
        setLocalMessages(messages);
        setMessageIds(Object.keys(messages));
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        if (chatFeedRef.current) {
            chatFeedRef.current.scrollTop = chatFeedRef.current.scrollHeight;
        }
    };

    const chat = chats && chats[activeChat];

    const renderReadReceipts = (message, isMyMessage) => {
        return chat.people.map((person, index) => {
            if (person.last_read === message.id) {
                const avatar = person?.person?.avatar;
                const initials = person.person.username.charAt(0).toUpperCase(); // Assuming the username is available
                return (
                    <div
                        key={`read_${index}`}
                        className="read-receipt"
                        style={{
                            float: isMyMessage ? 'right' : 'left',
                            backgroundImage: avatar ? `url(${avatar})` : 'none',
                            backgroundSize: 'cover', // Ensure the image covers the div
                            backgroundPosition: 'center', // Center the image in the div
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: '12px',
                            backgroundColor: 'gray', // Background color for initials
                            width: '24px', // Adjust size as needed
                            height: '24px', // Adjust size as needed
                            borderRadius: '50%' // Make it a circle
                        }}
                    >
                        {!avatar && initials}
                    </div>
                );
            }
            return null;
        });
    };
    

    const renderMessages = () => {
        return messageIds.map((messageId, index) => {
            const message = localMessages[messageId];
            const lastMessage = index === 0 ? null : localMessages[messageIds[index - 1]];
            const isMyMessage = message.sender.username === userName;

            return (
                <div key={messageId} style={{ width: '100%' }}>
                    <div className="message-block">
                        {isMyMessage
                            ? <MyMessage message={message} />
                            : <TheirMessage message={message} lastMessage={lastMessage} />}
                    </div>
                    {!isMyMessage && (
                        <div className="read-receipts" style={{ marginRight: isMyMessage ? '18px' : '0px', marginLeft: isMyMessage ? '0px' : '68px' }}>
                            {renderReadReceipts(message, isMyMessage)}
                        </div>
                    )}
                </div>
            );
        });
    };

    const handleCreateChat = () => {
        if (newChatTitle.trim()) {
            createChat(newChatTitle);
            setNewChatTitle("");
        }
    };

    const handleSendMessage = (message) => {
        setLocalMessages((prevMessages) => ({
            ...prevMessages,
            [message.id]: message
        }));
        setMessageIds((prevIds) => [...prevIds, message.id]);
        scrollToBottom();
    };

    return (
        <div className="chat-feed-container">
            {chats && Object.keys(chats).length > 0 ? (
                chat ? (
                    <>
                        <div className="chat-title-container">
                            <div className="chat-title">{chat.title}</div>
                            <div className="chat-subtitle">
                                {chat.people.map((person) => person.person.username).join(', ')}
                            </div>
                        </div>
                        <div className="chat-feed" ref={chatFeedRef}>
                            {renderMessages()}
                            <div style={{ height: '100px' }} />
                            <div className="message-form-container">
                                <MessageForm {...props} chatId={activeChat} onSendMessage={handleSendMessage} />
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="default-message">
                        <p>Please select a chat to start messaging.</p>
                    </div>
                )
            ) : (
                <div className="default-message">
                    <p>Loading...</p>
                </div>
            )}
        </div>
    );
};

export default ChatFeed;
