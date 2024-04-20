// Initial state
let jobTitleQuery = "";
let locationQuery = "";

// Render jobs
function renderJobs(jobsToRender) {
    const jobsList = document.querySelector(".cards");
    jobsList.innerHTML = ""; // Clear existing jobs
    
    jobsToRender.forEach(job => {
        const duration = calculateDuration(job.datePosted);
        const jobCard = `
        <li class="card flex">
            <div class="job-thumbnail-col">
                <img src="${job.companyLogo}" alt="${job.companyName} Logo">
            </div>
            <div class="job-details-col">
                <p class="company-name">${job.companyName}</p>
                <h2 class="job-title">${job.jobTitle}</h2>
                <div class="job-small-details">
                    <div class="job-small-details-item location">
                        <span class="input-icon"><i class="fa-solid fa-location-dot"></i></span>
                        <span class="word-beside-icon">${job.jobLocation}</span>
                    </div>
                    <div class="job-small-details-item type">
                        <span class="input-icon"><i class="fa-solid fa-briefcase"></i></span>
                        <span class="word-beside-icon">${job.employmentType}</span>
                    </div>
                    <div class="job-small-details-item salary">
                        <span class="input-icon"><i class="fa-solid fa-dollar-sign"></i></span>
                        <span class="word-beside-icon">${job.minSalary}-${job.maxSalary}</span>
                    </div>
                    <div class="job-small-details-item time">
                        <span class="input-icon"><i class="fa-solid fa-clock"></i></span>
                        <span class="word-beside-icon">${duration}</span>
                    </div>
                </div>
                <p>${job.aboutTheJob}</p>
            </div>
        </li>`;
        
        jobsList.innerHTML += jobCard;
    });
}

// Calculate duration since date posted of a job
function calculateDuration(datePosted) {
    const currentDate = new Date();
    const postedDate = new Date(datePosted);

    const timeDifference = currentDate.getTime() - postedDate.getTime();

    // Convert time difference to days
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    if (daysDifference === 0) {
        return 'Today';
    } else if (daysDifference === 1) {
        return '1 day ago';
    } else {
        return `${daysDifference} days ago`;
    }
}

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

// Jobs list dynamic
let jobs = [];

document.addEventListener("DOMContentLoaded", () => {
    fetch("./dummy-data/jobs.json")
        .then(res => res.json())
        .then(data => {
            jobs = data;
            console.log(jobs); // Log the fetched JSON data
            renderJobs(jobs); // Render all jobs initially
        })
        .catch(error => {
            console.error("Error fetching jobs:", error);
        });
});

// Filter jobs based on jobTitleQuery
function filterJobs() {
    const filteredJobs = jobs.filter(job => {
        const jobTitle = job.jobTitle.toLowerCase();
        return jobTitle.includes(jobTitleQuery.toLowerCase());
    });
    
    console.log(filteredJobs);
    renderJobs(filteredJobs);
}

// Filter jobs based on locationQuery
function filterLocation() {
    const filteredLocations = jobs.filter(job => {
        const location = job.jobLocation.toLowerCase();
        return location.includes(locationQuery.toLowerCase());
    });
    
    console.log(filteredLocations);
    renderJobs(filteredLocations);
}
