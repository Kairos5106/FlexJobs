import React from 'react';

const TheirMessage = ({ lastMessage, message }) => {
    const isFirstMessageByUser = !lastMessage || lastMessage.sender.username !== message.sender.username;

    const getInitials = (name) => {
        const initials = name.split(' ').map(word => word.charAt(0).toUpperCase()).join('');
        return initials;
    };

    const avatar = message?.sender?.avatar || null;
    const initials = getInitials(message.sender.username);

    return (
        <div className="message-row">
            {isFirstMessageByUser && (
                <div className="message-avatar">
                    {avatar ? (
                        <div
                            className="avatar-image"
                            style={{ 
                                backgroundImage: `url(${avatar})`,
                                backgroundSize: 'cover', // Ensure the image covers the div
                                backgroundPosition: 'center', // Center the image in the div
                                width: '40px', // Adjust size as needed
                                height: '40px', // Adjust size as needed
                                borderRadius: '50%' // Make it a circle
                            }}
                        />
                    ) : (
                        <div className="initials-avatar">
                            {initials}
                        </div>
                    )}
                </div>
            )}
            {message?.attachments?.length > 0
                ? (
                    <img
                        src={message.attachments[0].file}
                        alt="message-attachment"
                        className="message-image"
                        style={{ marginLeft: isFirstMessageByUser ? '4px' : '48px' }}
                    />
                ) : (
                    <div className="message" style={{ float: 'left', backgroundColor: '#D9F6FF', marginLeft: isFirstMessageByUser ? '4px' : '48px' }}>
                        <div className="message-sender-name">
                            {message.sender.username}
                        </div>
                        {message.text}
                    </div>
                )
            }
        </div>
    );
}

export default TheirMessage;
