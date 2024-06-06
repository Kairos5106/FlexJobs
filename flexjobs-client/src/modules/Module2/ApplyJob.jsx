import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './Module2.css';

const ApplyJob = () => {
    // Construct the job application object
    const [applicationFormData, setApplicationFormData] = useState({
        fullName: '',
        contactNumber: '',
        email: '',
        resume: '',
    });

    // Handle form data change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setApplicationFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Handle file input change
    const handleFileChange = (e) => {
        setApplicationFormData(prevState => ({
            ...prevState,
            resume: e.target.files[0]
        }));
    };

    // Function to submit the job application
    const onSubmit = async (e) => {
        e.preventDefault();

        const applicationData = { 
            ...applicationFormData,
            jobId: job._id,
            jobTitle: job.jobTitle,
            companyName: job.companyName,
            jobLocation: job.jobLocation,
            dateApplied: new Date().toISOString()
        };

        try {
            const response = await fetch("http://localhost:3000/post-job-application", {
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify(applicationData)
            });

            const result = await response.json();
            if (response.ok) {
                console.log("Application saved successfully:", result);
                alert("Great job! You've applied successfully. Keep an eye on the 'Jobs Applied' section in your profile to track its status.");
            } else {
                console.error('Error posting application:', result);
                alert('Error posting application: ' + result.message);
            }
        } catch (error) {
            console.error('Error posting application:', error);
            alert('Error posting application: ' + error.message);
        }
    };

    return (
        <div className="section apply-job">
            <div className="col-md-6" id="apply-job">
                <form className="apply-job-form" id="apply-job-form" onSubmit={onSubmit}>
                    {/* Full name */}
                    <div className="row g-2 job-form-row">
                        <div className="col-sm-12">
                            <label htmlFor="fullName">Full Name</label>
                            <input type="text" className="form-control" id="fullName" name="fullName" placeholder="" required value={applicationFormData.fullName} onChange={handleChange} />
                        </div>
                    </div>

                    {/* Contact number */}
                    <div className="row g-2 job-form-row">
                        <div className="col-sm-12">
                            <label htmlFor="contactNumber">Contact Number</label>
                            <input type="text" className="form-control" id="contactNumber" name="contactNumber" placeholder="" required value={applicationFormData.contactNumber} onChange={handleChange} />
                        </div>
                    </div>

                    {/* Email */}
                    <div className="row g-2 job-form-row">
                        <div className="col-sm-12">
                            <label htmlFor="email">Email</label>
                            <input type="email" className="form-control" id="email" name="email" placeholder="" required value={applicationFormData.email} onChange={handleChange} />
                        </div>
                    </div>

                    {/* Resume */}
                    <div className="row g-2 job-form-row">
                        <div className="col-sm-12">
                            <label htmlFor="resume">Upload Resume</label>
                            <input type="file" className="form-control" id="resume" accept=".pdf,.doc,.docx" required onChange={handleFileChange}/>
                        </div>
                    </div>

                    {/* Submit button */}
                    <div className="submit-button-postajob d-flex justify-content-end">
                        <button className="btn btn-primary" id="submit-button-postajob" type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ApplyJob