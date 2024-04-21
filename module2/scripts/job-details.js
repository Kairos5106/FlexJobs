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
            document.getElementById("job-location").textContent = job.jobLocation;
            document.getElementById("job-type").textContent = job.employmentType;
            document.getElementById("job-salary").textContent = job.minSalary;
            document.getElementById("date-posted").textContent = job.datePosted;
            document.getElementById("about-the-job").textContent = job.aboutTheJob;

            // Set company logo
            const companyLogo = document.getElementById("companyLogo");
            companyLogo.src = job.companyLogo;
        }
        console.log(job)
    })
    .catch(error => {
        console.error("Error fetching job details:", error);
    });