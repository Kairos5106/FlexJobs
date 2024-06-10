import React, { useState, useEffect } from 'react';
import './style-feedback.css';
import axios from 'axios';

// InputField class for form
const InputField = ({ type, placeholder, required, iconClass, value, onChange }) => (
    <div className="id">
        <input
            type={type}
            placeholder={placeholder}
            required={required}
            value={value}
            onChange={onChange}
        />
        <i className={iconClass}></i>
    </div>
);

// Star Rating Component
const StarRating = ({ rating, setRating }) => (
    <div className="rating">
        <label className="rating-text">Rating: </label>
        {[1, 2, 3, 4, 5].map(value => (
            <span
                key={value}
                className={`star ${value <= rating ? 'active' : ''}`}
                data-value={value}
                onClick={() => setRating(value)}
            >
                &#9733;
            </span>
        ))}
    </div>
);

// Feedback Form Component
const FeedbackForm = ({ formData, setFormData, handleSubmit, categories }) => (
    <form id="feedback-form" onSubmit={handleSubmit}>
        <h1>Feedback Form</h1>
        <InputField
            type="text"
            placeholder="Name"
            required={true}
            iconClass="far fa-user profile-icon"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />

        <InputField
            type="email"
            placeholder="Email address"
            required={true}
            iconClass="far fa-envelope email-icon"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />

        <div className="category-container">
            <label htmlFor="category" className="category">Category:</label>
            <select
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
            >
                <option value="">Select a category</option>
                {categories.map((category, index) => (
                    <option key={index} value={category}>{category}</option>
                ))}
            </select>
        </div>

        <StarRating rating={formData.rating} setRating={(value) => setFormData({ ...formData, rating: value })} />

        <textarea
            cols="15"
            rows="5"
            placeholder="Enter your feedback"
            value={formData.feedback}
            onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
            required
        ></textarea>
        <button id="submitButton" type="submit">Send</button>
    </form>
);

// Main Feedback Component
const Feedback = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        category: '',
        rating: 0,
        feedback: ''
    });

    const categories = [
        "Home", "Jobs", "Chat", "Forum", "Portfolio",
        "Career Access Interest", "Payment", "Others"
    ];

    const handleSubmit = (event) => {
        event.preventDefault();
        if (event.target.checkValidity()) {
            axios.post('http://localhost:3000/feedback', formData)
                .then(response => {
                    console.log(response.data);
                    alert("Thank you for giving your feedback!");
                    setFormData({
                        name: '',
                        email: '',
                        category: '',
                        rating: 0,
                        feedback: ''
                    });
                    console.log('Feedback submitted!')
                })
                .catch(error => {
                    console.error('There was an error!', error);
                });
        } else {
            alert("Please fill in all required fields.");
        }
    };

    useEffect(() => {
        const form = document.getElementById("feedback-form");

        const handleStarClick = (event) => {
            const value = parseInt(event.target.getAttribute('data-value'));
            setFormData((prevData) => ({ ...prevData, rating: value }));
        };

        const stars = document.querySelectorAll('.star');
        stars.forEach(star => {
            star.addEventListener('click', handleStarClick);
        });

        return () => {
            stars.forEach(star => {
                star.removeEventListener('click', handleStarClick);
            });
        };
    }, []);

    return (
        <div className="section-feedback">
            <div className="container-feedback">
                <FeedbackForm
                    formData={formData}
                    setFormData={setFormData}
                    handleSubmit={handleSubmit}
                    categories={categories}
                />
            </div>
        </div>
    );
};

export default Feedback;
