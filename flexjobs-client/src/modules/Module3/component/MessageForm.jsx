import React, { useState, useEffect, useRef } from 'react';
import { sendMessage, isTyping } from 'react-chat-engine';
import { PictureOutlined, SendOutlined } from '@ant-design/icons';

const MessageForm = (props) => {
    const { chatId, creds, onSendMessage } = props;
    const [value, setValue] = useState('');
    const [preview, setPreview] = useState(null);
    const chatFeedRef = useRef(null);

    useEffect(() => {
        scrollToBottom();
    }, [onSendMessage]);

    const scrollToBottom = () => {
        if (chatFeedRef.current) {
            chatFeedRef.current.scrollTop = chatFeedRef.current.scrollHeight;
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (preview) {
            const formData = new FormData();
            formData.append('files', preview.file);
            sendMessage(creds, chatId, { files: [preview.file] }, (message) => {
                setPreview(null);
                onSendMessage(message);
                scrollToBottom();
            });
        } else {
            const text = value.trim();
            if (text.length > 0) {
                sendMessage(creds, chatId, { text }, (message) => {
                    setValue('');
                    onSendMessage(message);
                    scrollToBottom();
                });
            }
        }
    };

    const handleChange = (event) => {
        setValue(event.target.value);
        isTyping(props, chatId);
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview({ name: file.name, file });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = () => {
        setPreview(null);
    };

    return (
        <form className="message-form" onSubmit={handleSubmit}>
            <label htmlFor='upload-button'>
                <span className='image-button'>
                    <PictureOutlined className="picture-icon"/>
                </span>
            </label>
            <input
                type="file"
                multiple={false}
                id="upload-button"
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />

            {preview ? (
                <div className="image-preview">
                    <img src={URL.createObjectURL(preview.file)} alt="Image Preview" />
                    <button type="button" onClick={handleRemoveImage}>Remove</button>
                </div>
            ) : (
                <input
                    id="message-input"
                    className="message-input"
                    placeholder="Send a message ..."
                    value={value}
                    onChange={handleChange}
                    disabled={!!preview}
                />
            )}

            <button type="submit" className='send-button'>
                <SendOutlined className='send-icon' />
            </button>
        </form>
    );
};

export default MessageForm;
