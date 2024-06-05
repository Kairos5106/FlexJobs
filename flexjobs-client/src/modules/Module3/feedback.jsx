import React from 'react'
import './style-feedback.css';
import './script-feedback.js';

const Feedback = () => {
    return (
        <div class="container-feedback">
            <form id="feedback-form">
                <h1>Feedback Form</h1>
                <div class="id">
                    <input type="text" placeholder="Name" required/>
                        <i class="far fa-user profile-icon"></i>
                </div>
                <div class="id">
                    <input type="email" placeholder="Email address" required/>
                        <i class="far fa-envelope email-icon"></i>
                </div>

                <label for="category" class="category">Category: </label>
                <select id="category" type="dropdown" size="1" required>
                    <option></option>
                    <option>Website UI</option>
                    <option>Home</option>
                    <option>Jobs</option>
                    <option>Chats</option>
                    <option>Career Test Assessment</option>
                    <option>Payment</option>
                    <option>Others</option>
                </select>


                <div class="rating">
                    <label for="rating-text" class="rating-text">Rating: </label>
                    <span class="star" data-value="1">&#9733;</span>
                    <span class="star" data-value="2">&#9733;</span>
                    <span class="star" data-value="3">&#9733;</span>
                    <span class="star" data-value="4">&#9733;</span>
                    <span class="star" data-value="5">&#9733;</span>
                </div>

                <textarea cols="15" rows="5" placeholder="Enter your feedback" required></textarea>
                <button id="submitButton" type="submit">Send</button>
            </form>
        </div>
    )
}

export default Feedback