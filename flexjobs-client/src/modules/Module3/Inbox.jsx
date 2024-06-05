import React from 'react'
import './style-inbox.css';
import './script.js';

const Inbox = () => {
    return (
        <div className="container-inbox">
            <div className="column-inbox">
                <h1 className="h1-inbox">Chats</h1>
                <div className="row-inbox">
                    <table className="table-inbox" id="inbox-table">
                        <tr className="selected-inbox" data-image="./images-inbox/msg1.png">
                            <td>
                                <p className="name">Mr Ahmad</p>
                                <p className="message">Hey there! I am...</p>
                            </td>
                            <td className="timestamp">10:34am</td>
                        </tr>

                        <tr data-image="./images-inbox/msg2.png">
                            <td>
                                <p className="name">Martha</p>
                                <p className="message">I will need someone...</p>
                            </td>
                            <td className="timestamp">3:31pm</td>
                        </tr>
                        <tr data-image="./images-inbox/msg3.png">
                            <td>
                                <p className="name">Web Dev group</p>
                                <p className="message">Does anyone here knows how...</p>
                            </td>
                            <td className="timestamp">11:52am</td>
                        </tr>
                        <tr data-image="./images-inbox/msg4.png">
                            <td>
                                <p className="name">Photo shoot group</p>
                                <p className="message">Anyone free to...</p>
                            </td>
                            <td className="timestamp">2:10pm</td>
                        </tr>
                        <tr data-image="./images-inbox/msg5.png">
                            <td>
                                <p className="name">Lee Cheng</p>
                                <p className="message">Hi, I will be assigning...</p>
                            </td>
                            <td className="timestamp">5:48pm</td>
                        </tr>
                    </table>
                </div>
            </div>

            <div className="line"></div>

            <div className="column-message">
                <div className="default-display" id="default-display">
                </div>
                <div>
                    <img id="image-container" src="/images-inbox/msg1.png" alt="Message container" />
                </div>


                <div className="message-box" id="message-box">
                    <textarea className="message-input" id="message-input" placeholder="Type your message"></textarea>
                    <img className="send-vector" id="send-vector" src="./images-inbox/send-vector.png" alt="Send" />
                </div>
            </div>

        </div>
    );
};

export default Inbox;