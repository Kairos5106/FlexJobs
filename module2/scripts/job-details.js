// Fetch job details based on id from query parameter
const urlParams = new URLSearchParams(window.location.search);
const jobId = urlParams.get('id');

fetch(`./dummy-data/jobs.json`)
    .then(res => res.json())
    .then(data => {
        const job = data.find(j => j.id == jobId); // Find the job with matching id
        if (job) {
            document.getElementById("job-title").textContent = job.jobTitle;
            document.getElementById("company-name").textContent = job.companyName;
            // ... set other job details
        }
    })
    .catch(error => {
        console.error("Error fetching job details:", error);
    });