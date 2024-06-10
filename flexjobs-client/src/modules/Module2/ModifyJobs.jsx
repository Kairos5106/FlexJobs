import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './Module2.css';

const ModifyJobs = () => {
    const email = "admin@gmail.com"
    const [jobs, setJobs] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    // Fetch jobs posted by a user based on email using the route
    useEffect(() => {
        setIsLoading(true);
        fetch(`http://localhost:3000/my-jobs/${email}`)
            .then(res => res.json())
            .then(data => setJobs(data))
            .catch(err => console.error('Failed to fetch job details:', err));
    }, [])

    return (
        <div className="modify-job-module2" id="modify-job-module2">
            MyJobs: {jobs.length}
        </div>
    )
}

export default ModifyJobs