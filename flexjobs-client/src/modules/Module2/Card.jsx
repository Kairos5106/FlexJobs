import React from 'react';
import { Link } from 'react-router-dom';
import './Module2.css';

const Card = ({ data }) => {
    const { id, jobTitle, companyName, companyLogo, minSalary, maxSalary, jobLocation, experienceLevel, skills, aboutTheJob, datePosted } = data;

    // Function to calculate the duration since the date posted
    const calculateDuration = () => {
        // Convert datePosted to a Date object
        const postedDate = new Date(datePosted);

        // Calculate the difference in milliseconds between the current date and the posted date
        const difference = Date.now() - postedDate.getTime();

        // Convert the difference to days
        const days = Math.floor(difference / (1000 * 3600 * 24));

        // Return the duration
        return `${days} days ago`;
    };

    return (
        <div>
            <Link to={`/job/${id}`} className="job-card-link">
                <div className="card-custom flex">
                    <div className="job-thumbnail-col">
                        <img className='job-thumbnail' id="job-thumbnail" src={companyLogo} alt={companyName} />
                    </div>
                    
                    <div className="job-details-col">
                        <p className="company-name">{companyName}</p>
                        <h2 className="job-title">{jobTitle}</h2>
                        <div className="job-small-details">
                            <div className="job-small-details-item location">
                                <span className="input-icon"><i className="fa-solid fa-location-dot"></i></span>
                                <span className="word-beside-icon" id="job-location">{jobLocation}</span>
                            </div>
                            <div class="job-small-details-item experience-level">
                                <span class="input-icon"><i class="fa-solid fa-briefcase"></i></span>
                                <span class="word-beside-icon" id="job-experience-level">{experienceLevel}</span>
                            </div>
                            <div class="job-small-details-item salary">
                                <span class="input-icon"><i class="fa-solid fa-dollar-sign"></i></span>
                                <span class="word-beside-icon" id="job-salary">{minSalary}-{maxSalary}</span>
                            </div>
                            <div class="job-small-details-item time">
                                <span class="input-icon"><i class="fa-solid fa-clock"></i></span>
                                <span class="word-beside-icon" id="date-posted">{calculateDuration()}</span>
                            </div>
                        </div>
                        <p className="job-description" id="job-description">{aboutTheJob}</p>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default Card;
