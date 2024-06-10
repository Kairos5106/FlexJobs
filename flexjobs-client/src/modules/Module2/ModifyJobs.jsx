import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Module2.css';
import { Link } from 'react-router-dom';

const ModifyJobs = () => {
    const email = "admin@gmail.com";
    const [jobs, setJobs] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch jobs posted by a user based on email using the route
    useEffect(() => {
        setIsLoading(true);
        fetch(`http://localhost:3000/my-jobs/${email}`)
            .then(res => res.json())
            .then(data => {
                setJobs(data);
                setFilteredJobs(data); // Set filtered jobs initially
                setIsLoading(false);
            })
            .catch(err => console.error('Failed to fetch job details:', err));
    }, []);

    // Search for a particular job based on keyword
    const handleSearch = () => {
        const filteredJobs = jobs.filter(job =>
            job.jobTitle.toLowerCase().includes(searchText.toLowerCase())
        );
        setFilteredJobs(filteredJobs); // Update filtered jobs
    };

    // Reset filtered jobs when search input is empty
    useEffect(() => {
        if (searchText === "") {
            setFilteredJobs(jobs);
        }
    }, [searchText, jobs]);

    // Function to delete a job
    const handleDelete = (jobId) => {
        console.log("To be deleted: ", jobId);
        // Display confirmation modal
        if (window.confirm("Are you sure you want to delete this job?")) {
            fetch(`http://localhost:3000/delete-job/${jobId}`, {
                method: "DELETE"
            })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged === true) {
                    alert("Job deleted successfully.");
                    // Remove the deleted job from the state
                    const updatedJobs = jobs.filter(job => job._id !== jobId);
                    setJobs(updatedJobs);
                    setFilteredJobs(updatedJobs);
                } else {
                    alert("Failed to delete job.");
                }
            })
            .catch(err => console.error('Failed to delete job:', err));
        }
    };

    return (
        <div className='body-module2'>
            <div className="modify-job-module2 section" id="modify-job-module2">
                {/* Search bar */}
                <form className='section'>
                    <div className="flex row g-3 justify-content-center">

                        {/* Input field for location */}
                        <div className="flex col-sm-6">
                            <span className="input-icon"><i className="fa-solid fa-magnifying-glass"></i></span>
                            <input
                                type="text"
                                name="query-search-posted-job"
                                id="query-search-posted-job"
                                className="form-control input-field"
                                placeholder="Enter job title"
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                            />
                        </div>

                        {/* Search button */}
                        <div className="col-auto">
                            <button type="button" className="btn btn-primary" onClick={handleSearch}>Search</button>
                        </div>
                    </div>
                </form>

                {/* Jobs posted table */}
                <div className='table-responsive'>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th scope="col" colSpan="6">
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <div>
                                            All Jobs
                                        </div>
                                        <div>
                                            <Link to="/PostJob">
                                                <button className='btn btn-secondary'>
                                                    Post New Job
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </th>
                            </tr>
                            <tr>
                                <th scope="col">JOB ID</th>
                                <th scope="col">JOB TITLE</th>
                                <th scope="col">COMPANY NAME</th>
                                <th scope="col">POSTED ON</th>
                                <th scope="col">EDIT</th>
                                <th scope="col">DELETE</th>
                            </tr>
                        </thead>
                        <tbody id="user-jobs-list">
                            {filteredJobs.map(job => (
                                <tr key={job._id}>
                                    <th scope="row">{job._id}</th>
                                    <td>{job.jobTitle}</td>
                                    <td>{job.companyName}</td>
                                    <td>{new Date(job.datePosted).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</td>
                                    <td className="modify-job-button">
                                        <button
                                            type="button"
                                            className="btn btn-outline-warning w-100"
                                            onClick={() => handleEdit(job._id)}
                                        >
                                            Edit
                                        </button>
                                    </td>
                                    <td className="modify-job-button">
                                        <button
                                            type="button"
                                            className="btn btn-outline-danger w-100"
                                            onClick={() => handleDelete(job._id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                
                {/* Total number of jobs posted */}
                <div className='d-flex justify-content-end'>
                    <br></br>
                    Total Jobs: {jobs.length}
                </div>
            </div>
        </div>
    )
}

export default ModifyJobs;