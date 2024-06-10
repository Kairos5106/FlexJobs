import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './forumStyle.css'; // Import the CSS file for styling
import axios from 'axios'; // Import axios for making HTTP requests

const forumDetails = () => {
    const { id } = useParams(); // Access the URL parameter
    const [forum, setForum] = useState(null);
    const [content, setContent] = useState('');
    const [comments, setComments] = useState([]);
    const [fontSize, setFontSize] = useState(16); // Default font size
    const [sortBy, setSortBy] = useState('newest');
    const [upvotedComments, setUpvotedComments] = useState({});
    const [downvotedComments, setDownvotedComments] = useState({});


    useEffect(() => {
        
    
        // fetchForumDetails();
        axios.get(`http://localhost:3000/forum/posts/${id}`)
            .then(response => {
                setForum(response.data);
            })
            .catch(error => {
                console.error('Error fetching forum details:', error);
            });

            axios.get('http://localhost:3000/forum-comments')
            .then(response => {
                // Filter comments based on forum ID
                
                const filteredComments = response.data.filter(comments => comments.forumId === id);
                setComments(filteredComments.map(comment => ({
                    ...comment,
                    timeAgo: calculateTimeAgo(comment.timestamp)
                })));

            })
            .catch(error => {
                console.error('Error fetching comments:', error);
            });

    }, [id]);

    const calculateTimeAgo = (timestamp) => {
        const currentTime = new Date();
        const commentTime = new Date(timestamp);
        const difference = currentTime - commentTime;
        const seconds = Math.floor(difference / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (days > 0) {
            return `${days} days ago`;
        } else if (hours > 0) {
            return `${hours} hours ago`;
        } else if (minutes > 0) {
            return `${minutes} minutes ago`;
        } else {
            return `${seconds} seconds ago`;
        }
    };

    const toggleUp = (commentId) => {
        const isUpvoted = upvotedComments[commentId] || false;
        handleUpvote(commentId)
       
        // Update the state synchronously
        setUpvotedComments(prevState => ({
            ...prevState,
            [commentId]: !isUpvoted // Toggle the current state
        }));
        setComments(prevComments => prevComments.map(comment => {
            if (comment._id === commentId) {
                return {
                    ...comment,
                    upvote: isUpvoted ? comment.upvote - 1 : comment.upvote + 1 // Increase or decrease the upvote count based on the toggle
                };
            }
            return comment;
        }));
    }

    const toggleDown = (commentId) => {
        const isDownvoted = downvotedComments[commentId] || false;
        handleDownvote(commentId)
       
        // Update the state synchronously
        setDownvotedComments(prevState => ({
            ...prevState,
            [commentId]: !isDownvoted // Toggle the current state
        }));
        setComments(prevComments => prevComments.map(comment => {
            if (comment._id === commentId) {
                return {
                    ...comment,
                    downvote: isDownvoted ? comment.downvote - 1 : comment.downvote + 1 // Increase or decrease the upvote count based on the toggle
                };
            }
            return comment;
        }));
    }

    const handleUpvote = async (commentId) => {
        try {
            // Check the current state of the comment
            const isUpvoted = upvotedComments[commentId] || false;
            
            // Toggle the vote
            if (isUpvoted) {
                // Remove the upvote
                await axios.patch(`http://localhost:3000/remove-upvote-comment/${commentId}`);
            } else {
                // Upvote the comment
                await axios.patch(`http://localhost:3000/upvote-comment/${commentId}`);
            }
    
            
        } catch (error) {
            console.error('Error toggling upvote:', error);
            alert('Error toggling upvote');
        }
    };
    
    const handleDownvote = async (commentId) => {
        try {
            // Check the current state of the comment
            const isDownvoted = downvotedComments[commentId] || false;
            
            // Toggle the vote
            if (isDownvoted) {
                // Remove the upvote
                await axios.patch(`http://localhost:3000/remove-downvote-comment/${commentId}`);
            } else {
                // Upvote the comment
                await axios.patch(`http://localhost:3000/downvote-comment/${commentId}`);
            }
    
            
        } catch (error) {
            console.error('Error toggling upvote:', error);
            alert('Error toggling upvote');
        }
    };
   


    
    const sortComments = (comments) => {
        switch (sortBy) {
            case 'newest':
                return [...comments].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
            case 'oldest':
                return [...comments].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
            case 'mostUpvote':
                return [...comments].sort((a, b) => b.upvote - a.upvote);
            default:
                return comments;
        }
    };

    // Inside the ForumDetails component

    const handleChangeSortBy = (value) => {
        let text = 'Newest'; // Default value
        switch (value) {
            case 'oldest':
                text = 'Oldest';
                break;
            case 'mostUpvote':
                text = 'Most Upvote';
                break;
            default:
                break;
        }
        setSortBy(text);
    };

console.log('Sorted by:', sortBy);
console.log('Comments:', comments);

    
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
        if (url) {
            const selection = window.getSelection();
            if (selection.rangeCount > 0) {
                const range = selection.getRangeAt(0);
                const link = document.createElement('a');
                link.href = url;
                link.textContent = selection.toString();
                range.deleteContents();
                range.insertNode(link);
            }
        }
    };


    const handleChangeFontSize = (e) => {
        const newSize = parseInt(e.target.value);
        document.execCommand('fontSize', false, newSize);
        setFontSize(newSize);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Basic validation
        if (!content.trim()) {
            alert('Please enter both title and content');
            return;
        }
    
        const newPost = {
            forumId: id,
            content,
            upvote: 0,
            downvote: 0,
            timestamp: new Date().toISOString(), // Convert to ISO string format
          };
    
        try {
            // Make a POST request to your backend API endpoint to create a new forum topic
            const response = await axios.post('http://localhost:3000/post-forum-comments', newPost); // Update the URL to point to the new route
            console.log(response.data); // Log the response data
            alert('Forum topic created successfully');
            // Optionally, you can redirect the user to another page
        } catch (error) {
            console.error('Error creating forum topic:', error);
            alert('Error creating forum topic');
        }
    };

    const handleScrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      };

    if(!forum){
        return <div>loading</div>
    }
    
    
    return (
        <div className="forum-header-and-section">
            
    
            {/* Discussion Forum title */}
            <div>
                <h1 id="discussion-forum-title">{comments.content}</h1>
            </div>

            {/* Topic */}
            <div className="topic-details-box">
                <h1>{forum.title}</h1>
                <div dangerouslySetInnerHTML={{ __html: forum.content }}></div>
                <h3>by <span className="username">{forum.username}</span></h3>
            </div>


            {/* Sorting, page number and add new post */}
            <div className="sorting-page-newpost-container">
                <div className="dropdown">
                    <button className="dropdown-btn">Sort By : {sortBy}</button>
                    <div className="dropdown-content">
                        <a href="#" onClick={() => handleChangeSortBy('newest')}>Newest</a>
                        <a href="#" onClick={() => handleChangeSortBy('oldest')}>Oldest</a>
                        <a href="#" onClick={() => handleChangeSortBy('mostUpvote')}>Most Upvote</a>
                    </div>
                </div>
                <div className="page-selector">
                    <a href="#" className="page-number">&lt;&lt;</a>
                    <a href="#" className="page-number">&lt;</a>
                    <a href="#" className="page-number">1</a>
                    <a href="#" className="page-number">2</a>
                    <a href="#" className="page-number">3</a>
                    <a href="#" className="page-number">4</a>
                    <a href="#" className="page-number">&gt;</a>
                    <a href="#" className="page-number">&gt;&gt;</a>
                </div>
            </div>
        
            
            {comments.map((comment, index) => (
            <div key={index} className="post">
                <div className="profilepic-name">
                    <img className="profilepic" src="images/profile_picture.png" alt="Profile Picture" />
                </div>
                
                <div className="post-content-container">
                    <div className="comment-container">
                        <div className="post-content">
                            <div dangerouslySetInnerHTML={{ __html: comment.content }}></div>
                        </div> 
                <div className="post-content-details-container">
                <span className="time">{comment.timeAgo}</span>
                    <button className="quote">
                        ❞
                    </button>
                    

                    <button className="upvote" onClick={() => toggleUp(comment._id)}
    style={{ backgroundColor: upvotedComments[comment._id] ? '#f1f1f1' : 'transparent' }}>▲</button>
                    <span className="upvoteCount">{comment.upvote}</span>
                    <button className="downvote"  onClick={() => toggleDown(comment._id)}
    style={{ backgroundColor: downvotedComments[comment._id] ? '#f1f1f1' : 'transparent' }}>▼</button>
                    <span className="downvoteCount">{comment.downvote}</span>
                    <span className="numbering">
                        #{index + 1} 
                    </span>
                </div>
            </div>
        </div>
    </div>
))}


            

            
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

            {/* Go top button */}
            <button className="scroll-to-top-btn" onClick={handleScrollToTop}>
      ⬆
    </button>

            {/* Footer */}
            <footer className="footer">
                <p>&copy; 2024 by Team 20</p>
                <p><a href="mailto:u2100667@siswa.um.edu.my">u2100667@siswa.um.edu.my</a></p>
            </footer>
        </div>
    );
}

export default forumDetails;
