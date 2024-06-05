import React, { useState } from "react";
import "./Education.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';

function EducationSection() {
  const [educationData, setEducationData] = useState([
    // Sample initial data
    {
      id: 1,
      institution: "University A",
      degree: "Bachelor of Science",
      dates: "2010-2014",
    },
  ]);

  // State to manage the editing status of each education entry
  const [editEducationId, setEditEducationId] = useState(null);

  const [isAddingEducation, setIsAddingEducation] = useState(false);

  // Function to handle adding a new education entry
  const addEducation = (newEducation) => {
    setEducationData([...educationData, newEducation]);
    setIsAddingEducation(false); // Hide the form after adding education
  };

  // Function to handle deleting an education entry
  const deleteEducation = (id) => {
    setEducationData(educationData.filter((edu) => edu.id !== id));
  };

  // Function to handle toggling the edit mode of an education entry
  const toggleEditEducation = (id) => {
    setEditEducationId(id === editEducationId ? null : id);
  };

  // Function to handle updating an education entry
  const updateEducation = (updatedEducation) => {
    setEducationData(
      educationData.map((edu) =>
        edu.id === updatedEducation.id ? updatedEducation : edu
      )
    );
    setEditEducationId(null); // Exit edit mode after updating
  };

  const educationItems = educationData.map((education) => (
    <div key={education.id} className="m-item">
      <div className="m-content">
        <img
          src="./images/uni.jpg"
          alt="Institution Logo"
          className="m-logo"

        />
        <div className="m-details">
          {editEducationId === education.id ? (
            <EditEducationForm
              education={education}
              updateEducation={updateEducation}
            />
          ) : (
            <>
              <p>{education.institution}</p>
              <p>{education.degree}</p>
              <p>{education.dates}</p>
            </>
          )}
        </div>
      </div>
      <div>
        <button onClick={() => toggleEditEducation(education.id)}>
          {editEducationId === education.id ? (
            <button onClick={() => deleteEducation(education.id)}>
              <FontAwesomeIcon icon={faTrash} />
            </button>

          ) : (
            <FontAwesomeIcon icon={faEdit} />
          )}
        </button>
      </div>
    </div>
  ));

  return (
    <div className="container">
      <div className="m-header">

        <h2 className="section-title">Education</h2>
        <button className="add-button" onClick={() => setIsAddingEducation(true)}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
      {educationItems}
      {isAddingEducation && (
        <AddEducationForm
          addEducation={addEducation}
          onCancel={() => setIsAddingEducation(false)}
        />
      )}
      {/* Button to toggle add education form */}

    </div>

  );
}

function AddEducationForm({ addEducation }) {
  const [institution, setInstitution] = useState("");
  const [degree, setDegree] = useState("");
  const [dates, setDates] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (!institution || !degree || !dates) return;
    // Call addEducation function from parent component
    addEducation({ id: Date.now(), institution, degree, dates });
    // Clear input fields
    setInstitution("");
    setDegree("");
    setDates("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={institution}
        onChange={(e) => setInstitution(e.target.value)}
        placeholder="Institution"
      />
      <input
        type="text"
        value={degree}
        onChange={(e) => setDegree(e.target.value)}
        placeholder="Degree"
      />
      <input
        type="text"
        value={dates}
        onChange={(e) => setDates(e.target.value)}
        placeholder="Dates"
      />
      <button type="submit">Add Education</button>
    </form>
  );
}

function EditEducationForm({ education, updateEducation }) {
  const [institution, setInstitution] = useState(education.institution);
  const [degree, setDegree] = useState(education.degree);
  const [dates, setDates] = useState(education.dates);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (!institution || !degree || !dates) return;
    // Call updateEducation function from parent component
    updateEducation({ ...education, institution, degree, dates });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={institution}
        onChange={(e) => setInstitution(e.target.value)}
        placeholder="Institution"
      />
      <input
        type="text"
        value={degree}
        onChange={(e) => setDegree(e.target.value)}
        placeholder="Degree"
      />
      <input
        type="text"
        value={dates}
        onChange={(e) => setDates(e.target.value)}
        placeholder="Dates"
      />
      <button type="submit">Update</button>
    </form>
  );
}

export default EducationSection;