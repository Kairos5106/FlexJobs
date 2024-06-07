import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import "./5.3 JobApplied.css";

const JobApplied = () => {
  const [jobApplications, setJobApplications] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const location = useLocation();
  const email = location.state?.email; 


  useEffect(() => {
    if (!email) return;

    const fetchData = async () => {
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

    fetchData();
  }, [email]);

  const handleDetailsButtonClick = (job) => {
    setSelectedJob(job);
    setShowDetails(true);
  };

  const handleCloseButtonClick = () => {
    setShowDetails(false);
  };

  return (
    <div>
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
            <button className="close-button" onClick={handleCloseButtonClick}>&times;</button>
            <div>
              <h2>{selectedJob.jobTitle}</h2>
              <p><strong>Company:</strong> {selectedJob.companyName}</p>
              <p><strong>Location:</strong> {selectedJob.jobLocation}</p>
              <p><strong>Email:</strong> {selectedJob.email}</p>
              <p><strong>Full Name:</strong> {selectedJob.fullName}</p>
              <p><strong>Contact Number:</strong> {selectedJob.contactNumber}</p>
              {/* Add other details as necessary */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobApplied;
