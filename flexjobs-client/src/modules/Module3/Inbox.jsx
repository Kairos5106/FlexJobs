import React, { useState } from 'react';
import './style-inbox.css';

const Inbox = () => {
    const [rows, setRows] = useState([
        { id: 1, name: 'Mr Ahmad', message: 'Hey there! I am...', timestamp: '10:34am', image: './images-inbox/msg1.png' },
        { id: 2, name: 'Martha', message: 'I will need someone...', timestamp: '3:31pm', image: '../../../public/images-inbox/msg2.png' },
        { id: 3, name: 'Web Dev group', message: 'Does anyone here knows how...', timestamp: '11:52am', image: '../../../public/images-inbox/msg3.png' },
        { id: 4, name: 'Photo shoot group', message: 'Anyone free to...', timestamp: '2:10pm', image: '../../../public/images-inbox/msg4.png' },
        { id: 5, name: 'Lee Cheng', message: 'Hi, I will be assigning...', timestamp: '5:48pm', image: '../../../public/images-inbox/msg5.png' }
    ]);

    const [selectedRowIndex, setSelectedRowIndex] = useState(null);
    const [messageInput, setMessageInput] = useState('');

    const handleRowSelect = (index) => {
        setSelectedRowIndex(index);
    };

    const handleMessageInputChange = (event) => {
        setMessageInput(event.target.value);
    };

    const selectedRow = selectedRowIndex !== null ? rows[selectedRowIndex] : null;

    return (
        <div className="container-inbox">
            <div className="column-inbox">
                <h1 className="h1-inbox">Chats</h1>
                <div className="row-inbox">
                    <table className="table-inbox" id="inbox-table">
                        <tbody>
                            {rows.map((row, index) => (
                                <tr
                                    key={row.id}
                                    className={selectedRowIndex === index ? 'selected-inbox' : ''}
                                    onClick={() => handleRowSelect(index)}
                                    data-image={row.image}
                                >
                                    <td>
                                        <p className="name">{row.name}</p>
                                        <p className="message">{row.message}</p>
                                    </td>
                                    <td className="timestamp">{row.timestamp}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="line"></div>

            <div className="column-message">
                <div className="default-display" id="default-display" style={{ display: selectedRow ? 'none' : 'block' }}>
                    Select a message to view
                </div>
                <div>
                    {selectedRow && <img id="image-container" src={selectedRow.image} alt="Message container" />}
                </div>

                <div className="message-box" id="message-box" style={{ display: selectedRow ? 'flex' : 'none' }}>
                    <textarea
                        className="message-input"
                        id="message-input"
                        placeholder="Type your message"
                        value={messageInput}
                        onChange={handleMessageInputChange}
                    ></textarea>
                    <img
                        className="send-vector"
                        id="send-vector"
                        src="./images-inbox/send-vector.png"
                        alt="Send"
                        style={{ display: messageInput.trim() ? 'inline-block' : 'none' }}
                    />
                </div>
            </div>
        </div>
    );
};

export default Inbox;
