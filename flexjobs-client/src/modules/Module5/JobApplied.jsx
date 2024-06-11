import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import "./5.3 JobApplied.css";

const JobApplied = () => {
  const [jobApplications, setJobApplications] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [email, setEmail] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const location = useLocation();
  const initialEmail = location.state?.email;

  useEffect(() => {
    if (initialEmail) {
      setEmail(initialEmail);
      setEmailSubmitted(true);
      fetchJobApplications(initialEmail);
    }
  }, [initialEmail]);

  const fetchJobApplications = async (email) => {
    try {
      const response = await fetch(`http://localhost:3000/job-applications/${email}`);
      if (!response.ok) {
        throw new Error('Failed to fetch job applications');
      }
      const data = await response.json();
      setJobApplications(data);
    } catch (error) {
      console.error('Error fetching job applications:', error);
    }
  };
  const navigate = useNavigate();

  const handleDetailsButtonClick = (job) => {
    setSelectedJob(job);
    setShowDetails(true);
    if (selectedJob) {
      navigate(`/job/${job.jobId}`);
    }
  };


  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleEmailSubmit = (event) => {
    event.preventDefault();
    setEmailSubmitted(true);
    fetchJobApplications(email);
  };

  return (
    <div>
      {!emailSubmitted ? (
        <div className="email-prompt">
          <h1>Please Enter Your Email</h1>
          <form onSubmit={handleEmailSubmit}>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email"
              required
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      ) : (
        <>
          <h1>Job Applied</h1>
          {jobApplications.length > 0 ? (
            <div className="job-cards">
              {jobApplications.map((job, index) => (
                <div className="card-jobapplied" key={index}>
                  <div className="card-header-jobapplied">
                    {job.jobTitle}
                  </div>
                  <div className="card-body-jobapplied">
                    <p>Company: {job.companyName}</p>
                    <p>Location: {job.jobLocation}</p>
                    <p>
                      {job.viewedByEmployer ? (
                        <span><i className="fas fa-check-circle accepted-icon"></i> Viewed by employer</span>
                      ) : (
                        <span><i className="fas fa-times-circle rejected-icon"></i> Not viewed by employer</span>
                      )}
                    </p>
                    <button className="details-button" onClick={() => handleDetailsButtonClick(job)}>
                      <i className="fas fa-info-circle"></i> View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No job applications found</p>
          )}

          {showDetails && selectedJob && (
            <div className="job-details-overlay">
              <div className="job-details">
                <button className="close-button" onClick={handleDetailsButtonClick}></button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default JobApplied;
