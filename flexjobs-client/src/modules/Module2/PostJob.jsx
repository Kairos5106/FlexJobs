import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Module2.css';

const PostJob = () => {
    const [tags, setTags] = useState([]);
    const [formData, setFormData] = useState({
        jobTitle: '',
        companyName: '',
        minSalary: '',
        maxSalary: '',
        jobLocation: '',
        experienceLevel: '',
        aboutTheJob: '',
        postedBy: '',
        companyLogo: null,
    });

    // Add new skill tag
    const handleAddTag = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            const tag = e.target.value.trim();
            if (tag.length > 1 && !tags.includes(tag)) {
                setTags([...tags, tag]);
                console.log("Added tag:", tag);
                console.log("Current tags:", [...tags, tag]);
            }
            e.target.value = "";
        }
    };

    // Remove skill tag
    const handleRemoveTag = (tagToRemove) => {
        const newTags = tags.filter(tag => tag !== tagToRemove);
        setTags(newTags);
        console.log("Removed tag:", tagToRemove);
        console.log("Current tags:", newTags);
    };

    // Handle form data change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Handle file input change
    const handleFileChange = (e) => {
        setFormData(prevState => ({
            ...prevState,
            companyLogo: e.target.files[0]
        }));
    };

    // Handle form submission
    const onSubmit = async (e) => {
        e.preventDefault();

        // Convert the file to base64 (for simplicity)
        const convertToBase64 = (file) => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = error => reject(error);
            });
        };

        let companyLogoBase64 = null;
        if (formData.companyLogo) {
            companyLogoBase64 = await convertToBase64(formData.companyLogo);
        }

        const jobData = { ...formData, skills: tags, companyLogo: companyLogoBase64, datePosted: new Date().toISOString() };

        try {
            const response = await fetch("http://localhost:3000/post-job", {
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify(jobData)
            });

            const result = await response.json();
            if (response.ok) {
                console.log('Job posted successfully:', result);
                alert('Job posted successfully!');
                // Clear form and tags
                setFormData({
                    jobTitle: '',
                    companyName: '',
                    minSalary: '',
                    maxSalary: '',
                    jobLocation: '',
                    experienceLevel: '',
                    aboutTheJob: '',
                    postedBy: '',
                    companyLogo: null,
                });
                setTags([]);
            } else {
                console.error('Error posting job:', result);
                alert('Error posting job: ' + result.message);
            }
        } catch (error) {
            console.error('Error posting job:', error);
            alert('Error posting job: ' + error.message);
        }
    };

    return (
        <div className="post-a-job section" id="post-a-job">
            <form className="post-a-job-form" id="post-a-job-form" onSubmit={onSubmit}>
                {/* Job title and company name */}
                <div className="row g-2 job-form-row">
                    <div className="col-sm-6">
                        <label htmlFor="jobTitle">Job Title</label>
                        <input type="text" className="form-control" id="jobTitle" name="jobTitle" placeholder="Ex: Web Developer" required value={formData.jobTitle} onChange={handleChange} />
                    </div>
                    <div className="col-sm-6">
                        <label htmlFor="companyName">Company Name</label>
                        <input type="text" className="form-control" id="companyName" name="companyName" placeholder="Ex: Google" required value={formData.companyName} onChange={handleChange} />
                    </div>
                </div>

                {/* Salary */}
                <div className="row g-2 job-form-row">
                    <div className="col-sm-6">
                        <label htmlFor="minSalary">Minimum Salary</label>
                        <input type="text" className="form-control" id="minSalary" name="minSalary" placeholder="Ex: 2000" required value={formData.minSalary} onChange={handleChange} />
                    </div>
                    <div className="col-sm-6">
                        <label htmlFor="maxSalary">Maximum Salary</label>
                        <input type="text" className="form-control" id="maxSalary" name="maxSalary" placeholder="Ex: 10000" required value={formData.maxSalary} onChange={handleChange} />
                    </div>
                </div>

                {/* Job location & Experience level */}
                <div className="row g-2 job-form-row">
                    <div className="col-sm-6">
                        <label htmlFor="jobLocation">Job Location</label>
                        <input type="text" className="form-control" id="jobLocation" name="jobLocation" placeholder="Ex: Kuala Lumpur" required value={formData.jobLocation} onChange={handleChange} />
                    </div>
                    <div className="col-sm-6">
                        <label htmlFor="experienceLevel">Experience Level</label>
                        <div className="dropdown-custom">
                            <select className="form-control" id="experienceLevel" name="experienceLevel" required value={formData.experienceLevel} onChange={handleChange}>
                                <option value="">Choose</option>
                                <option value="Entry-Level">Entry-Level</option>
                                <option value="Mid-Level">Middle-Level</option>
                                <option value="Senior-Level">Senior-Level</option>
                            </select>
                            <i className="fa-solid fa-caret-down dropdown-icon"></i>
                        </div>
                    </div>
                </div>

                {/* About the job */}
                <div className="row g-2 job-form-row">
                    <div className="col-sm-12">
                        <label htmlFor="aboutTheJob">About the Job</label>
                        <textarea className="form-control" id="aboutTheJob" name="aboutTheJob" placeholder="Job Description" required value={formData.aboutTheJob} onChange={handleChange}></textarea>
                    </div>
                </div>

                {/* Skills */}
                <div className="row g-2 job-form-row">
                    <div className="col-sm-12 skills-content">
                        <label htmlFor="skills">Skills</label>
                        <div className="tag-box form-control">
                            <ul>
                                {tags.map(tag => (
                                    <li key={tag}>
                                        {tag} <i className="fa-solid fa-xmark" onClick={() => handleRemoveTag(tag)}></i>
                                    </li>
                                ))}
                                <input type="text" id="skills" onKeyDown={handleAddTag} />
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Job posted by & Company logo */}
                <div className="row g-2 job-form-row">
                    <div className="col-sm-6">
                        <label htmlFor="postedBy">Job Posted By</label>
                        <input type="email" className="form-control" id="postedBy" name="postedBy" placeholder="abc@gmail.com" required value={formData.postedBy} onChange={handleChange} />
                    </div>
                    <div className="col-sm-6">
                        <label htmlFor="companyLogo">Company Logo</label>
                        <input type="file" className="form-control" id="companyLogo" name="companyLogo" accept="image/png, image/jpeg" onChange={handleFileChange} />
                    </div>
                </div>

                {/* Submit button */}
                <div className="submit-button-postajob d-flex justify-content-end">
                    <button className="btn btn-primary" id="submit-button-postajob" type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default PostJob;