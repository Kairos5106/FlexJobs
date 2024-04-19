// Initial state
let jobTitleQuery = "";
let locationQuery = "";

// Handle input change
function handleJobTitleInputChange(event) {
    jobTitleQuery = event.target.value;
    console.log(jobTitleQuery);
}

function handleLocationInputChange(event) {
    locationQuery = event.target.value;
    console.log(locationQuery);
}

// Add event listener to input fields
document.getElementById("job-title").addEventListener("input", handleJobTitleInputChange);
document.getElementById("job-location").addEventListener("input", handleLocationInputChange);

