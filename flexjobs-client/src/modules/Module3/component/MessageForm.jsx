import React, { useState } from 'react';
import { sendMessage, isTyping } from 'react-chat-engine';
import { PictureOutlined, SendOutlined } from '@ant-design/icons';

const MessageForm = (props) => {
    const [value, setValue] = useState('');
    const [preview, setPreview] = useState(null);    // to preview image before sending
    const { chatId, creds } = props;

    const handleSubmit = (event) => {
        event.preventDefault();

        const text = value.trim();

        const message = {
            text: value,
            attachments: preview ? [preview] : []
        };
    
        setPreview(null);

        if(text.length > 0) {
            sendMessage(creds, chatId, { text });
            setValue('');
        } 

        if (preview) {
            sendMessage(creds, chatId, { files: [preview] });
            setPreview(null);
        }
            
    }

    const handleChange = (event) => {
        setValue(event.target.value);
        isTyping(props, chatId);
    }

    const handleUpload = (event) => {
        sendMessage(creds, chatId, { files: event.target.files, text: '' })
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview({ name: file.name, file: reader.result });
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
                    <img src={preview.file} alt="Image Preview" />
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
}

export default MessageForm;