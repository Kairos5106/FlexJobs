import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./5.3 JobApplied.css";

const JobApplied = () => {
  const [jobDetails, setJobDetails] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const { jobId } = useParams();

  useEffect(() => {
    // Simulated data fetching function
    const fetchData = async () => {
      try {
        //here i still need to modify to replace 
        const response = await fetch(`your_api_endpoint/${jobId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch job details');
        }
        const data = await response.json();
        setJobDetails(data);
      } catch (error) {
        console.error('Error fetching job details:', error);
      }
    };

    fetchData();
  }, [jobId]);

  const handleDetailsButtonClick = () => {
    setShowDetails(true);
  };

  const handleCloseButtonClick = () => {
    setShowDetails(false);
  };

  return (
    <div>
      <h1>Job Applied</h1>
      {jobDetails && (
        <div className="job-cards">
          <div className="card">
            <div className="card-header">
              {jobDetails.title}
            </div>
            <div className="card-body">
              <p>Company: {jobDetails.company}</p>
              <p>Location: {jobDetails.location}</p>
              <p>
                {jobDetails.viewedByEmployer ? (
                  <span><i className="fas fa-check-circle accepted-icon"></i> Viewed by employer</span>
                ) : (
                  <span><i className="fas fa-times-circle rejected-icon"></i> Not viewed by employer</span>
                )}
              </p>
              <button className="details-button" onClick={handleDetailsButtonClick}>
              <i className="fas fa-info-circle"></i> View Details
              </button>
            </div>
          </div>
        </div>
      )}

      {showDetails && (
        <div className="job-details-overlay">
          <div className="job-details">
            <button className="close-button" onClick={handleCloseButtonClick}>&times;</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobApplied;