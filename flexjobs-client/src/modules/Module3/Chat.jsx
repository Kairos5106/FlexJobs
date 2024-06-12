import React, { useState } from 'react';
import { ChatEngine } from 'react-chat-engine';
import './style-chat.css';
import ChatFeed from './component/ChatFeed';

const Chat = () => {

    return (
        <ChatEngine
            height="100vh"
            // projectID="1b440d10-9c1b-431e-8bfc-e026350e8c6e"
            userName='john_doe'
            userSecret='123456'
            renderChatFeed={(chatAppProps) => <ChatFeed { ... chatAppProps} />}
        />
    );
};

export default Chat;