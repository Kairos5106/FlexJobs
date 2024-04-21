// Call getUserSpecificJobs and renderJobs when the page loads
document.addEventListener("DOMContentLoaded", () => {
    const userSpecificJobs = getUserSpecificJobs();
    console.log(userSpecificJobs);
    renderJobs(userSpecificJobs);
});

function getUserSpecificJobs() {
    const storedUserJobs = localStorage.getItem("jobs");
    if (storedUserJobs) {
        return JSON.parse(storedUserJobs);
    }
    return [];
}

// Render jobs
function renderJobs(jobsToRender) {
    const jobsList = document.getElementById("user-jobs-list");
    jobsList.innerHTML = ""; // Clear existing jobs

    // Sort jobs by datePosted in descending order
    const sortedJobs = jobsToRender.sort((a, b) => new Date(b.datePosted) - new Date(a.datePosted));
    
    sortedJobs.forEach(job => {
        const duration = calculateDuration(job.datePosted);
        const jobCard = document.createElement('tr');

        jobCard.innerHTML = `
            <th scope="row">${job.userId}</th>
            <td>${job.jobTitle}</td>
            <td>${job.companyName}</td>
            <td>${duration}</td>
            <td class="modify-job-button">
                <button type="button" class="normal-button edit-button" id="edit-job-button">Edit</button>
            </td>
            <td class="modify-job-button">
                <button type="button" class="normal-button delete-button" id="delete-job-button">Delete</button>
            </td>
        `;

        // Add onclick event for delete button
        const deleteButton = jobCard.querySelector('.delete-button');
        deleteButton.addEventListener('click', () => deleteJob(job));

        jobsList.appendChild(jobCard);
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

// DELETE a job from jobs array
function deleteJob(jobToDelete) {
    let userSpecificJobs = getUserSpecificJobs();

    // Filter out the job to delete
    userSpecificJobs = userSpecificJobs.filter(job => 
        !(job.userId === jobToDelete.userId &&
          job.jobTitle === jobToDelete.jobTitle &&
          job.companyName === jobToDelete.companyName)
    );
    
    // Update localStorage
    localStorage.setItem("jobs", JSON.stringify(userSpecificJobs));
    
    // Re-render the jobs
    renderJobs(userSpecificJobs);
}
