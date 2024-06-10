import { ChatEngine } from 'react-chat-engine';
import ChatFeed from './components/ChatFeed';
import './style-chat.css';

const App = () => {
    return (
        <ChatEngine
            height="100vh"
            projectID="1b440d10-9c1b-431e-8bfc-e026350e8c6e"
            userName="chatsflexjobs"
            userSecret="123456"
            renderChatFeed={(chatAppProps) => <ChatFeed { ... chatAppProps} />}
        />
    );
};

export default App;
