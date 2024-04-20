const tagBoxInput = document.querySelector(".tag-box input");
const tagList = document.querySelector(".tag-box ul");

let tags = [];

// Add new tag to the array of tags
function addTag(e) {
    if(e.key === "Enter") {
        e.preventDefault();  // prevent form submission
        let tag = e.target.value.trim(); // remove unwanted space in user inputted tag
        console.log(tag);

        if(tag.length > 1 && !tags.includes(tag)) {
            tags.push(tag);
            console.log(tags);
            
            let liTag = `<li>${tag} <i class="fa-solid fa-xmark" onclick="remove(this, '${tag}')"></i></li>`;
            tagList.insertAdjacentHTML("afterbegin", liTag);
        }

        e.target.value = "";
    }
}

// Remove tag when user click on remove icon
function remove(element, tag) {
    let index = tags.indexOf(tag);
    tags = [...tags.slice(0, index), ...tags.slice(index + 1)];
    element.parentElement.remove();
    console.log(tags);
}

tagBoxInput.addEventListener("keydown", addTag);

// Append newly posted job to jobs.json
document.getElementById("post-a-job-form").addEventListener("submit", function(e) {
    e.preventDefault(); // Prevent default form submission
    
    // Retrieve form values
    const jobTitle = document.getElementById("jobTitle").value;
    const companyName = document.getElementById("companyName").value;
    const minSalary = document.getElementById("minimumSalary").value;
    const maxSalary = document.getElementById("maximumSalary").value;
    const jobLocation = document.getElementById("jobLocation").value;
    const employmentType = document.getElementById("employmentType").value;
    const experienceLevel = document.getElementById("experienceLevel").value;
    const aboutTheJob = document.getElementById("aboutTheJob").value;
    const skills = tags.join(", ");

    // Create a new job object
    const newJob = {
        jobTitle: jobTitle,
        companyName: companyName,
        minSalary: minSalary,
        maxSalary: maxSalary,
        jobLocation: jobLocation,
        employmentType: employmentType,
        experienceLevel: experienceLevel,
        aboutTheJob: aboutTheJob,
        skills: skills
    };

    // Set the datePosted to the current time
    const currentDate = new Date().toISOString();
    newJob.datePosted = currentDate;

    // Retrieve existing jobs from localStorage
    let jobs = JSON.parse(localStorage.getItem("jobs")) || [];

    // Add the new job to the existing jobs array
    jobs.push(newJob);

    // Store the updated jobs array back to localStorage
    localStorage.setItem("jobs", JSON.stringify(jobs));

    alert("Job posted successfully!");

    // Optionally, reset the form and tags array
    document.getElementById("post-a-job-form").reset();
    tags = [];
    tagList.innerHTML = ""; // Clear the tag list

});


