import React from 'react'
import './style-inbox.css';
import './script.js';

const Inbox = () => {
    return (
        <div className='top-section'>
            <body class="inbox-body">
                <div class="container-inbox">
                    <div class="column-inbox">
                        <h1 class="h1-inbox">Chats</h1>
                        <div class="row-inbox">
                            <table class="table-inbox" id="inbox-table">
                                <tr class="selected-inbox" data-image="./images-inbox/msg1.png">
                                    <td>
                                        <p class="name">Mr Ahmad</p>
                                        <p class="message">Hey there! I am...</p>
                                    </td>
                                    <td class="timestamp">10:34am</td>
                                </tr>

                                <tr data-image="./images-inbox/msg2.png">
                                    <td>
                                        <p class="name">Martha</p>
                                        <p class="message">I will need someone...</p>
                                    </td>
                                    <td class="timestamp">3:31pm</td>
                                </tr>
                                <tr data-image="./images-inbox/msg3.png">
                                    <td>
                                        <p class="name">Web Dev group</p>
                                        <p class="message">Does anyone here knows how...</p>
                                    </td>
                                    <td class="timestamp">11:52am</td>
                                </tr>
                                <tr data-image="./images-inbox/msg4.png">
                                    <td>
                                        <p class="name">Photo shoot group</p>
                                        <p class="message">Anyone free to...</p>
                                    </td>
                                    <td class="timestamp">2:10pm</td>
                                </tr>
                                <tr data-image="./images-inbox/msg5.png">
                                    <td>
                                        <p class="name">Lee Cheng</p>
                                        <p class="message">Hi, I will be assigning...</p>
                                    </td>
                                    <td class="timestamp">5:48pm</td>
                                </tr>
                            </table>
                        </div>
                    </div>

                    <div class="line"></div>

                    <div class="column-message">
                        <div class="default-display" id="default-display">
                            /* <img class="message-vector" src="./images-inbox/message-vector.png" alt="Message vector" />
                            <p class="start-conversation">Start a conversation with employers or users</p> */
                        </div>
                        <div>
                            <img id="image-container" src="./images-inbox/msg1.png" alt="Message container" />
                        </div>


                        <div class="message-box" id="message-box">
                            <textarea class="message-input" id="message-input" placeholder="Type your message"></textarea>
                            <img class="send-vector" id="send-vector" src="./images-inbox/send-vector.png" alt="Send" />
                        </div>
                    </div>

                </div>

            </body>

        </div>
    )
}

export default Inbox