import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import axios for making HTTP requests

import './forumStyle.css'; // Import the CSS file for styling

const ForumMain = () => {
    const [popularTopics, setPopularTopics] = useState([]);
    const [featuredTopics, setFeaturedTopics] = useState([]);
    const [searchQuery, setSearchQuery] = useState(''); // State to hold the search query
    const [searchResults, setSearchResults] = useState([]); // State to hold the search results

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

    useEffect(() => {
        const query = searchQuery.toLowerCase();

        if (query.trim() === '') {
            setSearchResults([]);
            return;
        }

        const allTopics = [...popularTopics];
        const filteredTopics = allTopics.filter(topic =>
            topic.title && topic.title.toLowerCase().includes(query)
        );

        // Sort filtered topics by relevance (you can adjust this logic)
        const sortedTopics = filteredTopics.sort((a, b) => {
            const aIndex = a.title ? a.title.toLowerCase().indexOf(query) : -1;
            const bIndex = b.title ? b.title.toLowerCase().indexOf(query) : -1;
            return aIndex - bIndex;
        });

        setSearchResults(sortedTopics.slice(0, 5)); // Show only top 5 results
    }, [searchQuery, popularTopics, featuredTopics]);

    return (
        <div className="forum-header-and-section">
            {/* Discussion Forum title */}
            <div className='forum-and-post'>
                <h1 id="discussion-forum-title">Discussion Forum</h1>
                <Link to="/NewForum" className="add-post-button">Add New Topic</Link>
            </div>
            
            {/* Search bar and add new post button */}
            <div className="search-bar">
                <input
                    type="text"
                    id="search-input"
                    placeholder="What are you looking for?"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>


           {/* Search results dropdown */}
    {searchResults.length > 0 && (
        <div className="search-results-dropdown">
            {searchResults.map(topic => (
                <div className="searched-item" key={topic._id}>
                    <Link to={`/forum/${topic._id}`} className="topics" style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                            <h1 className='searched-title'>{topic.title}</h1>
                        </div>
                        <div>
                            <p className='searched-date'>{new Date(topic.timestamp).toLocaleDateString()}</p>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    )}


            {/* Current popular topics */}
            <h1 className="topics-title-popular">Current Popular Topics</h1>

            <div className="recycler-view-popular-topics">
                {/* Display popular topics */}
                {popularTopics.map(topic => (
                    <div className="topics-item" key={topic._id}>
                        <div className="left">
                            <Link to={`/forum/${topic._id}`} className="topics">
                                <h1>{topic.title}</h1>
                            </Link>
                        </div>
                        <div className="middle">
                            <h3 className="latestby">By</h3>
                            <h1 className="latestauthor">{topic.username ? topic.username : 'Anonymous'}</h1>
                        </div>
                        <div className="right">
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
                            <Link to={`/forum/${topic._id}`} className="topics">
                                <h1>{topic.title}</h1>
                            </Link>
                        </div>
                        <div className="middle">
                            <h3 className="latestby">By</h3>
                            <h1 className="latestauthor">{topic.username ? topic.username : 'Anonymous'}</h1>
                        </div>
                        <div className="right">
                            
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
