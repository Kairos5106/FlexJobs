import React, { useState, useEffect } from 'react';
import { ChatEngine } from 'react-chat-engine';

const ChatComponent = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState(null);

  const PROJECT_ID = '1b440d10-9c1b-431e-8bfc-e026350e8c6e';
  const PRIVATE_KEY = 'ee32d6f6-ae6e-4718-b279-c2e0094f0bf6';
  const USERNAME = 'chatsflexjobs';

  useEffect(() => {
    const projectID = process.env.PROJECT_ID;
    const privateKey = process.env.PRIVATE_KEY;
    const userName = process.env.USERNAME;

    // Check if credentials are loaded
    if (projectID && privateKey && userName) {
      setIsConnected(true);
    } else {
      const errorMsg = 'ChatEngine credentials are not set properly';
      console.error(errorMsg);
      setError(errorMsg);
    }
  }, []);

  if (error) return <div>{error}</div>;
  if (!isConnected) return <div>Connecting...</div>;

  return (
    <ChatEngine
      projectID={process.env.PROJECT_ID}
      userName={process.env.USER_NAME}
      userSecret={process.env.PRIVATE_KEY}
      onConnect={() => console.log('Connected to ChatEngine')}
      onFail={(error) => console.error('Failed to connect to ChatEngine:', error)}
    />
  );
};

export default ChatComponent;
