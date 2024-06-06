import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './Module2.css';
import { useParams } from 'react-router-dom';


const JobDetails = () => {
    const {id} = useParams();
    const [job, setJob] = useState({});
    console.log("Job ID:", id);

    // Fetch and display the particular job
    useEffect(() => {
        fetch(`http://localhost:3000/all-jobs/${id}`)
            .then(res => res.json())
            .then(data => setJob(data))
            .catch(err => console.error('Failed to fetch job details:', err));
    }, [id]);

    // Function to calculate the duration since the date posted
    const calculateDuration = () => {
        // Convert datePosted to a Date object
        const postedDate = new Date(job.datePosted);

        // Calculate the difference in milliseconds between the current date and the posted date
        const difference = Date.now() - postedDate.getTime();

        // Convert the difference to days
        const days = Math.floor(difference / (1000 * 3600 * 24));

        // Return the duration
        return `${days} days ago`;
    };

    return (
        <div>
            {/* Top Section */}
            <div className="back-link-section">
                <a href="#" className="back-link" onClick={() => window.history.back()}>
                    <i className="fa-solid fa-left-long"></i> Go Back
                </a>
            </div>

            {/* Job Details */}
            <div className="job-details-section">
                <div className="section row mx-0">
                    {/* Job Details */}
                    <div className="job-details col-md-9">
                        <div className="job-details-content">
                            <div>
                                {/* Job title */}
                                <h1 className="h1" id="job-title">{job.jobTitle}</h1>

                                {/* Apply button */}
                                {/* Apply button */}
                                <Link to={{
                                    pathname: "/ApplyJob",
                                    state: {
                                        jobId: job._id,
                                        jobTitle: job.jobTitle,
                                        companyName: job.companyName,
                                        jobLocation: job.jobLocation
                                    }
                                }} className="btn btn-primary apply-job-button">
                                    Apply Now
                                </Link>
                            </div>

                            <hr />

                            {/* Job small details */}
                            <div className="job-small-details job-small-details-jobdetails">
                                <div className="job-small-details-item location">
                                    <span className="input-icon"><i className="fa-solid fa-location-dot"></i></span>
                                    <span className="word-beside-icon" id="job-location">{job.jobLocation}</span>
                                </div>
                                <div className="job-small-details-item experience-level">
                                    <span className="input-icon"><i className="fa-solid fa-briefcase"></i></span>
                                    <span className="word-beside-icon" id="job-experience-level">{job.experienceLevel}</span>
                                </div>
                                <div className="job-small-details-item salary">
                                    <span className="input-icon"><i className="fa-solid fa-dollar-sign"></i></span>
                                    <span className="word-beside-icon" id="job-salary">{job.minSalary}-{job.maxSalary}</span>
                                </div>
                                <div className="job-small-details-item time">
                                    <span className="input-icon"><i className="fa-solid fa-clock"></i></span>
                                    <span className="word-beside-icon" id="date-posted">{calculateDuration()}</span>
                                </div>
                            </div>

                            {/* About the job */}
                            <div className="about-the-job col">
                                <h3 className="h3">About the Job</h3>
                                <p id="about-the-job">{job.aboutTheJob}</p>
                            </div>
                        </div>
                    </div>

                    {/* About the Company */}
                    <div className="about-company-panel col">
                        <div className="about-company-content">
                            <div>
                                {/* Company name */}
                                <h4 className="h4" id="company-name">{job.companyName}</h4>
                                <img src={job.companyLogo} id="companyLogo" alt="Company Logo" />
                                <p className="about-company">Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam sunt aliquam nostrum, voluptate est maiores quam ex quis qui incidunt facilis suscipit quo fuga aliquid distinctio alias repudiandae beatae dolor!</p>

                                {/* Read More link */}
                                <div className="read-more">
                                    <a href="https://www.google.com" className="about-company-link" target="_blank" rel="noopener noreferrer">Read More</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default JobDetails