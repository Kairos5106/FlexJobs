import React, { useState } from "react";
import MessageForm from "./MessageForm";
import MyMessage from "./MyMessage";
import TheirMessage from "./TheirMessage";

const ChatFeed = (props) => {
    const { chats, activeChat, userName, messages, createChat } = props;
    const [newChatTitle, setNewChatTitle] = useState("");

    const chat = chats && chats[activeChat];

    const renderReadReceipts = (message, isMyMessage) => {
        return chat.people.map((person, index) => person.last_read === message.id && (
            <div
                key={`read_${index}`}
                className="read-receipt"
                style={{
                    float: isMyMessage ? 'right' : 'left',
                    backgroundImage: `url(${person?.person?.avatar})`
                }}
            />
        ));
    };

    const renderMessages = () => {
        const keys = Object.keys(messages);

        return keys.map((key, index) => {
            const message = messages[key];
            const lastMessageKey = index === 0 ? null : keys[index - 1];
            const isMyMessage = userName === message.sender.username;

            return (
                <div key={`msg_${index}`} style={{ width: '100%' }} >
                    <div className="message-block">
                        {
                            isMyMessage
                                ? <MyMessage message={message} />
                                : <TheirMessage message={message} lastMessage={messages[lastMessageKey]} />
                        }
                    </div>
                    <div className="read-receipts" style={{ marginRight: isMyMessage ? '18px' : '0px', marginLeft: isMyMessage ? '0px' : '68px' }} >
                        {renderReadReceipts(message, isMyMessage)}
                    </div>
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

    return (
        <div className="chat-feed-container">
            {chats && Object.keys(chats).length > 0 ? (
                chat ? (
                    <>
                        <div className="chat-title-container">
                            <div className="chat-title">{chat.title}</div>
                            <div className="chat-subtitle">
                                {chat.people.map((person) => `${person.person.username}`).join(', ')}
                            </div>
                        </div>
                        <div className="chat-feed">
                            {renderMessages()}
                            <div style={{ height: '100px' }} />
                            <div className="message-form-container">
                                <MessageForm {...props} chatId={activeChat} />
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
                    <p>Loading...</p> <br/><br /><br />
                    <p>No chats available? Create a new chat to start chatting!</p>
                    <input
                        type="text"
                        value={newChatTitle}
                        onChange={(e) => setNewChatTitle(e.target.value)}
                        placeholder="Enter chat title"
                    />
                    <button onClick={handleCreateChat}>Create Chat</button>
                </div>
            )}
        </div>
    );
}

export default ChatFeed;
