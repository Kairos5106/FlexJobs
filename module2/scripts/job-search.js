/* Banner dynamic ========================================================================================================= */
// Initial state
let jobTitleQuery = "";
let locationQuery = "";

// Handle input change
function handleJobTitleInputChange(event) {
    jobTitleQuery = event.target.value;
    console.log(jobTitleQuery);
    filterJobs();
}

function handleLocationInputChange(event) {
    locationQuery = event.target.value;
    console.log(locationQuery);
    filterLocation();
}

// Add event listener to input fields
document.getElementById("job-title").addEventListener("input", handleJobTitleInputChange);
document.getElementById("job-location").addEventListener("input", handleLocationInputChange);

/* Jobs List dynamic ========================================================================================================= */
let jobs = [];

document.addEventListener("DOMContentLoaded", () => {
    fetch("./dummy-data/jobs.json")
        .then(res => res.json())
        .then(data => {
            jobs = data;
            console.log(jobs); // Log the fetched JSON data
        })
        .catch(error => {
            console.error("Error fetching jobs:", error);
        });
});

// Function to filter jobs based on jobTitleQuery
function filterJobs() {
    const filteredJobs = jobs.filter(job => {
        const jobTitle = job.jobTitle.toLowerCase();
        return jobTitle.includes(jobTitleQuery.toLowerCase());
    });
    
    console.log(filteredJobs);
    renderJobs(filteredJobs);
}

// Function to filter jobs based on locationQuery
function filterLocation() {
    const filteredLocations = jobs.filter(job => {
        const location = job.jobLocation.toLowerCase();
        return location.includes(locationQuery);
    });
    
    console.log(filteredLocations);
    renderJobs(filteredLocations);
}