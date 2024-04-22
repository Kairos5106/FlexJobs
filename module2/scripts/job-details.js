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
            document.getElementById("job-type").textContent = job.experienceLevel;
            document.getElementById("job-salary").textContent = job.minSalary;
            document.getElementById("about-the-job").textContent = job.aboutTheJob;

            // Calculate job posting duration
            const duration = calculateDuration(job.datePosted);
            document.getElementById("date-posted").textContent = `Posted ${duration} ago`;

            // Set company logo
            const companyLogo = document.getElementById("companyLogo");
            companyLogo.src = job.companyLogo;
        }
        console.log(job)
    })
    .catch(error => {
        console.error("Error fetching job details:", error);
    });

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
        return '1 day';
    } else {
        return `${daysDifference} days`;
    }
}