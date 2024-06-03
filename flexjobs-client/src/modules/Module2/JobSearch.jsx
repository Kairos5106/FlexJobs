import React, { useState } from 'react';
import '../../App.css';
import Banner from './Banner';

const JobSearch = () => {
    const [jobTitle, setJobTitle] = useState("");
    const [jobLocation, setJobLocation] = useState("");

    const handleJobTitleChange = (event) => {
        setJobTitle(event.target.value);
        // for debugging
        console.log("job-title: ", event.target.value);
    };

    const handleJobLocationChange = (event) => {
        setJobLocation(event.target.value);
        // for debugging
        console.log("job-location: ", event.target.value);
    };

    return (
        <>
            <Banner
                jobTitle={jobTitle}
                handleJobTitleChange={handleJobTitleChange}
                jobLocation={jobLocation}
                handleJobLocationChange={handleJobLocationChange}
            />
        </>
    );
}

export default JobSearch;