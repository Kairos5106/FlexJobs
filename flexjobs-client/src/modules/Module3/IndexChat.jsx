import React from 'react';
import ReactDOM from 'react-dom';
import Chat from './Chat'; 

const IndexChat = () => {
  return (
    ReactDOM.render(
      <React.StrictMode>
        <Chat />
      </React.StrictMode>,
      document.getElementById('root')
    )
  )
}


export default IndexChat;