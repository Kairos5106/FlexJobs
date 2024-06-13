import React, { useState } from 'react';
import { ChatEngine } from 'react-chat-engine';
import './style-chat.css';
import ChatFeed from './component/ChatFeed';

const Chat = () => {
    
    return (
        <ChatEngine
            height="100vh"
            projectID={import.meta.env.VITE_CHAT_ENGINE_PROJECT_ID}
            userName={import.meta.env.VITE_CHAT_ENGINE_USER_NAME}
            userSecret={import.meta.env.VITE_CHAT_ENGINE_USER_SECRET}
            renderChatFeed={(chatAppProps) => <ChatFeed { ... chatAppProps} />}
        />
    );
};

export default Chat;