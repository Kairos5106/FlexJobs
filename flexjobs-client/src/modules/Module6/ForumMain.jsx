import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import axios for making HTTP requests

import './forumStyle.css'; // Import the CSS file for styling

const ForumMain = () => {
    const [popularTopics, setPopularTopics] = useState([]);
    const [featuredTopics, setFeaturedTopics] = useState([]);

    useEffect(() => {
        // Fetch popular topics
        axios.get('http://localhost:3000/popular-topics')
            .then(response => {
                setPopularTopics(response.data);
            })
            .catch(error => {
                console.error('Error fetching popular topics:', error);
            });

        // Fetch featured topics
        axios.get('http://localhost:3000/featured-topics')
            .then(response => {
                setFeaturedTopics(response.data);
            })
            .catch(error => {
                console.error('Error fetching featured topics:', error);
            });
    }, []);

    return (
        <div className="forum-header-and-section">
            {/* Discussion Forum title */}
            <div>
                <h1 id="discussion-forum-title">Discussion Forum</h1>
            </div>

            {/* Search bar and add new post button */}
            <div className="search-bar">
                <input type="text" id="search-input" placeholder="What are you looking for?" />
                <Link to="/NewForum" className="add-post-button">Add New Topic</Link>
            </div>

            <div id="search-results">
                {/* Results will be displayed here */}
            </div>

            {/* Current popular topics */}
            <h1 className="topics-title">Current Popular Topics</h1>

            <div className="recycler-view-popular-topics">
                {/* Display popular topics */}
                {popularTopics.map(topic => (
                    <div className="topics-item" key={topic._id}>
                        <div className="left">
                        <Link to={`/forum/${topic._id}`} className="topics">
                            <h1>{topic.title}</h1>
                        </Link>

                            <h2 className="author">by <span className="username">{topic.username}</span></h2>
                        </div>
                        <div className="middle">
                            <h3 className="latestby">Latest Post By</h3>
                        </div>
                        <div className="right">
                            <h1 className="latestauthor">{topic.username}</h1>
                            {/* Convert the timestamp to a human-readable format */}
                            <h1 className="latesttime">{new Date(topic.timestamp).toLocaleDateString()}</h1>
                        </div>
                    </div>
                ))}
            </div>

            {/* Featured topics */}
            <h1 className="topics-title">Featured Topics</h1>

            <div className="recycler-view-popular-topics">
                {/* Display featured topics */}
                {featuredTopics.map(topic => (
                    <div className="topics-item" key={topic._id}>
                        <div className="left">
                            <a href="forumDetails.html" className="topics">
                                <h1>{topic.title}</h1>
                            </a>
                            <h2 className="author">by <span className="username">{topic.username}</span></h2>
                        </div>
                        <div className="middle">
                            <h3 className="latestby">Latest Post By</h3>
                        </div>
                        <div className="right">
                            <h1 className="latestauthor">{topic.username}</h1>
                            <h1 className="latesttime">{new Date(topic.timestamp).toLocaleDateString()}</h1>
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer */}
            <footer className="footer">
                <p>&copy; 2024 by Team 20</p>
                <p><a href="mailto:u2100667@siswa.um.edu.my">u2100667@siswa.um.edu.my</a></p>
            </footer>
        </div>
    );
};

export default ForumMain;
