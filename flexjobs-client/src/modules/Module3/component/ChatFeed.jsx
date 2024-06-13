import React, { useState, useEffect, useRef } from "react";
import MessageForm from "./MessageForm";
import MyMessage from "./MyMessage";
import TheirMessage from "./TheirMessage";

const ChatFeed = (props) => {
    const { chats, activeChat, userName, messages, setActiveChat} = props;
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
                </div>
            );
        });
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
