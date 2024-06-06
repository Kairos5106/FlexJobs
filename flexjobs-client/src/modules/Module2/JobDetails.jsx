import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './Module2.css';
import { useParams } from 'react-router-dom';


const JobDetails = () => {
    const {id} = useParams();
    const [job, setJob] = useState({});
    console.log("Job ID:", id);

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
                                <button type="button" className="btn btn-primary apply-job-button" id="apply-job-button" data-bs-toggle="modal" data-bs-target="#applyNowPopup">Apply</button>
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

            {/* Apply now pop up */}
            <div className="modal fade" id="applyNowPopup" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="applyNowPopup" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="applyNowPopupTitle">Start Your Application</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="full-name" className="col-form-label">Full Name:</label>
                                    <input type="text" className="form-control" id="full-name" required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="contact-number" className="col-form-label">Contact Number:</label>
                                    <input type="text" className="form-control" id="contact-number" required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="col-form-label">Email:</label>
                                    <input type="email" className="form-control" id="email" required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="resume" className="col-form-label">Upload Resume:</label>
                                    <input type="file" className="form-control" id="resume" accept=".pdf,.doc,.docx" required />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" id="submit-application-button" data-bs-toggle="modal" data-bs-target="#appliedPopup">Submit</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Application submitted pop up */}
            <div className="modal fade" id="appliedPopup" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="appliedPopup" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="appliedPopupTitle">Application Submitted Successfully!</h1>
                        </div>
                        <div className="modal-body">
                            <p>Great job! You've applied successfully. Keep an eye on your 'My Applications' in your profile to track its status.</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" aria-label="Close">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default JobDetails