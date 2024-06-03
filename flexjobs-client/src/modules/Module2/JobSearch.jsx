import React, { useEffect, useState } from 'react';
import '../../App.css';
import Banner from './Banner';
import Card from './Card';
import Jobs from './Jobs';
import './Module2.css';

const JobSearch = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [jobs, setJobs] = useState([]);
    const [query, setQuery] = useState("");
    const [locationQuery, setLocationQuery] = useState("");

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
    const handleInputChange = (event) => {
        setQuery(event.target.value);
        // for debugging
        console.log(event.target.value);
    };

    // Handle input change in input field from banner (job location)
    const handleLocationInputChange = (event) => {
        setLocationQuery(event.target.value);
        // for debugging
        console.log(event.target.value);
    };    

    

    // Radio filtering for side panel
    const handleChange = (event) => {
        setSelectedCategory(event.target.value);
    }

    // Main function to filter data
    const filteredData = (jobs, selected, query, locationQuery) => {
        let filteredJobs = jobs;

        // Filter jobs based on input field query
        if(query) {
            const filteredByTitle = jobs.filter((job) => job.jobTitle.toLowerCase().includes(query.toLowerCase()));
            filteredJobs = filteredByTitle;
        }

        // Filter jobs based on input field location
        if(locationQuery) {
            const filteredByLocation = jobs.filter((job) => job.jobLocation.toLowerCase().includes(locationQuery.toLowerCase()));
            filteredJobs = filteredByLocation;
        }

        // Filter jobs based on side panel
        if(selected) {
            filteredJobs = filteredJobs.filter(job => (
                parseInt(job.minSalary) === parseInt(selected) || 
                job.datePosted === selected
            ));
            console.log(filteredJobs);
        }

        console.log(filteredJobs);
        return filteredJobs.map((data, i) => <Card key={i} data={data}/>)
    }
    const result = filteredData(jobs, selectedCategory, query, locationQuery);
    const jobCount = result.length;

    return (
        <>
            {/* Banner */}
            <Banner
                query={query}
                locationQuery={locationQuery}
                handleInputChange={handleInputChange}
                handleLocationInputChange={handleLocationInputChange}
            />

            {/* Main content */}
            <div className='section row mx-0'>
                {/* Side panel - filters */}
                <div className='col-md-3 filter-panel'>
                    Filter Panel (Left)
                    <br></br>
                    <br></br>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt nostrum ab tempora alias accusamus. Temporibus vel numquam enim officia aspernatur eaque ut vero eos aliquam atque, quas at voluptatum obcaecati.
                </div>

                {/* Centre panel - jobs list */}
                <div className='col jobs-panel'>
                    <Jobs result={result} jobCount={jobCount}/> 
                </div>
            </div>
        </>
    );
}

export default JobSearch;