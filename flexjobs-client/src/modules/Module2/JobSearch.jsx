import React, { useEffect, useState } from 'react';
import '../../App.css';
import Banner from './Banner';

const JobSearch = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [jobs, setJobs] = useState([]);

    // Fetch data from jobs.json
    useEffect(() => {
        fetch("jobs.json")
            .then(res => res.json())
            .then(data => {
                setJobs(data);
            })
            .catch(err => {
                console.error('Failed to fetch jobs data:', err);
            });
    }, []);

    // Handle input change in input field from banner (job title)
    const [query, setQuery] = useState("");

    const handleInputChange = (event) => {
        setQuery(event.target.value);
        // for debugging
        console.log(event.target.value);
    };

    // Filter jobs based on job title from input field
    const filteredItems = jobs.filter((job) => job.jobTitle.toLowerCase().includes(query.toLowerCase()));
    console.log(filteredItems);

    // Radio filtering for side panel
    const handleChange = (event) => {
        setSelectedCategory(event.target.value)
    }

    // Main function
    const filteredData = (jobs, selected, query) => {
        let filteredJobs = jobs;

        // Filter jobs based on input field query
        if(query) {
            filteredJobs = filteredItems;
        }

        // Filter jobs based on side panel
        if(selected) {
            filteredJobs = filteredJobs.filter({minSalary, datePosted} => (
                parseInt(minSalary) === parseInt(selected) ||

            ));
            console.log(filteredJobs);
        }
    }

    return (
        <>
            {/* Banner */}
            <Banner
                query={query}
                handleInputChange={handleInputChange}
            />

            {/* Centre panel - jobs list */}


            {/* Side panel - filters */}
        </>
    );
}

export default JobSearch;