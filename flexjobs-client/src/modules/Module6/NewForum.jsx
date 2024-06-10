import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './forumStyle.css'; // Import the CSS file for styling

const NewForum = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [fontSize, setFontSize] = useState(16); // Default font size
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Basic validation
        if (!title.trim() || !content.trim()) {
            alert('Please enter both title and content');
            return;
        }
    
        const newPost = {
            title,
            content,
            upvote: 0,
            downvote: 0,
            timestamp: new Date().toISOString(), // Convert to ISO string format
          };
    
        try {
            // Make a POST request to your backend API endpoint to create a new forum topic
            const response = await axios.post('http://localhost:3000/post-forum-topic', newPost); // Update the URL to point to the new route
            console.log(response.data); // Log the response data
            // alert('Forum topic created successfully');

        } catch (error) {
            console.error('Error creating forum topic:', error);
            alert('Error creating forum topic');
        }
        navigate('/Module6Page');

    };
    
    const makeTextBold = () => {
        document.execCommand('bold', false, null);
    };

    const makeTextItalic = () => {
        document.execCommand('italic', false, null);
    };

    const insertBulletList = () => {
        document.execCommand('insertUnorderedList', false, null);
    };

    const insertNumberedList = () => {
        document.execCommand('insertOrderedList', false, null);
    };

    const makeTextHeading1 = () => {
        document.execCommand('formatBlock', false, '<h1>');
        document.execCommand('justifyLeft', false, null);
    };

    

    const insertLink = () => {
        const url = prompt('Enter the URL:');
        document.execCommand('createLink', false, url);
    };

    const handleChangeFontSize = (e) => {
        const newSize = parseInt(e.target.value);
        document.execCommand('fontSize', false, newSize);
        setFontSize(newSize);
    };



    return (
        <div className="forum-header-and-section">
            {/* Discussion Forum title */}
            <div>
                <h1 id="discussion-forum-title">New Topic</h1>
            </div>

            {/* Topic title input */}
            <form>
                <input
                    type="text"
                    id="topic-title"
                    name="topic-title"
                    placeholder="Enter your topic title here"
                    required
                    style={{ fontSize: '18px' }}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </form>

            {/* Forum toolbar */}
            <div className="forum-toolbar">
                <div className="upload-section">
                    <label htmlFor="file-upload" className="toolbar-button attachment-button">Attachment</label>
                    <input id="file-upload" type="file" style={{ display: 'none' }} />
                </div>
                <button className="toolbar-button emoji-button">😊</button>
                <div className="formatting-toolbar">
                <button className="toolbar-button bold-button" onClick={makeTextBold}>B</button>
                    <button className="toolbar-button italic-button" onClick={makeTextItalic}>I</button>
                    <button className="toolbar-button bullets-button" onClick={insertBulletList}>Bullets</button>
                    <button className="toolbar-button numbering-button" onClick={insertNumberedList}>Numbering</button>
                    <button className="toolbar-button heading1-button" onClick={makeTextHeading1}>H1</button>
                    <button className="toolbar-button link-button" onClick={insertLink}>Link</button>
                    <select onChange={handleChangeFontSize} value={fontSize}>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                    <option value={6}>6</option>
                    {/* Add more font sizes as needed */}
                </select>                </div>
            </div>

            {/* Textarea for entering post content */}
            

            <div
                id="paragraph-input"
                className="paragraph-input"
                contentEditable="true"
                style={{ minHeight: '50vh', border: '1px solid #ccc', padding: '5px', fontSize: '16px' }}
                onChange={(e) => setContent(e.target.innerText)}
                onBlur={(e) => setContent(e.target.innerHTML)} // Save content with formatting
                dangerouslySetInnerHTML={{ __html: content }} // Display content with formatting
            ></div>


            {/* Submit button */}
            <button onClick={handleSubmit} className="submit">Submit</button>

            {/* Footer */}
            <footer className="footer">
                <p>&copy; 2024 by Team 20</p>
                <p><a href="mailto:u2100667@siswa.um.edu.my">u2100667@siswa.um.edu.my</a></p>
            </footer>
        </div>
    );
}

export default NewForum;