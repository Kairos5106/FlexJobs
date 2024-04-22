// Initial state
let jobTitleQuery = "";
let locationQuery = "";

// Render jobs
function renderJobs(jobsToRender) {
    const jobsList = document.querySelector(".cards");
    jobsList.innerHTML = ""; // Clear existing jobs

    // Sort jobs by datePosted in descending order
    const sortedJobs = jobsToRender.sort((a, b) => new Date(b.datePosted) - new Date(a.datePosted));
    
    sortedJobs.forEach(job => {
        const duration = calculateDuration(job.datePosted);
        const jobCard = `
        <li class="card-custom flex" data-job-id="${job.id}">
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
                        <span class="word-beside-icon">${job.experienceLevel}</span>
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

    // Event listener for when user click on one particular job card
    document.querySelectorAll(".card-custom").forEach(card => {
        card.addEventListener("click", function() {
            const jobId = this.getAttribute("data-job-id");
            window.location.href = `job-details.html?id=${jobId}`; // Navigate to job-details.html with jobId as query parameter
        });
    });

    // Update h1 based on number of jobs fetched 
    document.getElementById("number-of-jobs").textContent = sortedJobs.length;
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
}

function handleLocationInputChange(event) {
    locationQuery = event.target.value;
    console.log(locationQuery);
}

function handleEmploymentTypeChange(event) {
    const selectedType = event.target.id;
    const filteredEmploymentType = jobs.filter(job => {
        return job.employmentType.toLowerCase() === selectedType.toLowerCase();
    });
    renderJobs(filteredEmploymentType);
}

function handleExperienceLevelChange(event) {
    const selectedLevel = event.target.id;
    const filteredExperienceLevel = jobs.filter(job => {
        return job.experienceLevel.toLowerCase() === selectedLevel.toLowerCase();
    });
    renderJobs(filteredExperienceLevel);
}

// Event listeners for input fields and filter buttons
document.getElementById("job-title").addEventListener("input", handleJobTitleInputChange);
document.getElementById("job-location").addEventListener("input", handleLocationInputChange);

document.querySelectorAll('input[name="employmentType"]').forEach(radio => {
    radio.addEventListener('change', handleEmploymentTypeChange);
});

document.querySelectorAll('input[name="experienceLevel"]').forEach(radio => {
    radio.addEventListener('change', handleExperienceLevelChange);
});

// When user click "button" then render the filtered jobs based on user input
document.querySelector("form").addEventListener("submit", function(event) {
    event.preventDefault();
    searchJobs();

    // Save new jobs to localStorage
    localStorage.setItem("jobs", JSON.stringify(jobs));
})

function searchJobs() {
    const filteredJobs = jobs.filter(job => {
        const jobTitle = job.jobTitle.toLowerCase();
        const location = job.jobLocation.toLowerCase();

        return jobTitle.includes(jobTitleQuery.toLowerCase()) && location.includes(locationQuery.toLowerCase());
    });

    console.log(filteredJobs);
    renderJobs(filteredJobs);
}

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

// Save newly posted jobs to localStorage of browser
document.addEventListener("DOMContentLoaded", () => {
    fetch("./dummy-data/jobs.json")
        .then(res => res.json())
        .then(data => {
            // Assign jobs from jobs.json
            jobs = data;
            console.log("JSON file jobs data: ")
            console.log(jobs);

            // Fetch user-specific jobs from localStorage
            const storedUserJobs = JSON.parse(localStorage.getItem("userJobs")) || [];
            
            // Combine jobs and userJobs arrays
            const allJobs = [...jobs, ...storedUserJobs];
            
            console.log("Merged jobs: ");
            console.log(allJobs); // Log the merged jobs data
            
            renderJobs(allJobs); // Render all jobs
        })
        .catch(error => {
            console.error("Error fetching jobs:", error);
        });
});