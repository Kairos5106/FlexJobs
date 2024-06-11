import React, { useState,useEffect } from "react";
import "./Education.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';

function EducationSection() {
  const [educationData, setEducationData] = useState([]);
  const [isAddingEducation, setIsAddingEducation] = useState(false);
  const [editEducationId, setEditEducationId] = useState(null);

  useEffect(() => {
    fetchEducation();
  }, []);

  const fetchEducation = async () => {
    const response = await fetch('http://localhost:3000/education');
    const data = await response.json();
    setEducationData(data);
  };

  const addEducation = async (newEducation) => {
    await fetch('http://localhost:3000/education', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newEducation),
    });
    fetchEducation();
    setIsAddingEducation(false);
  };

  const deleteEducation = async (_id) => {
    await fetch(`http://localhost:3000/education/${_id}`, {
      method: 'DELETE',
    });
    fetchEducation();
  };

  const updateEducation = async (updatedEducation) => {
    const { _id, ...updateData } = updatedEducation;
    console.log('Update Data:', updateData);
    await fetch(`http://localhost:3000/education/${_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    });
    fetchEducation();
    setEditEducationId(null);
  };

  const toggleEditEducation = (id) => {
    setEditEducationId(id === editEducationId ? null : id);
  };

  const educationItems = educationData.map((education) => (
    <div key={education._id} className="m-item">
      <div className="m-content">
        <img
          src="./images/uni.jpg"
          alt="Institution Logo"
          className="m-logo"

        />
        <div className="m-details">
          {editEducationId === education._id ? (
            <EditEducationForm
              education={education}
              updateEducation={updateEducation}
              cancelEdit={() => setEditEducationId(null)}
            />
          ) : (
            <>
              <p>Institution: {education.institution}</p>
              <p>Study Level/Course Name: {education.degree}</p>
              <p>Dates: {education.dates}</p>
            </>
          )}
        </div>
      </div>
      <div className="uniquebutton">
      <button onClick={() => toggleEditEducation(education._id)}>
          <FontAwesomeIcon icon={faEdit} />
        </button>
        </div>
        <div className="uniquebutton">
        <button onClick={() => deleteEducation(education._id)}>
          <FontAwesomeIcon icon={faTrash} />
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
    </div>
  );
}

function AddEducationForm({ addEducation, onCancel }) {
  const [institution, setInstitution] = useState("");
  const [degree, setDegree] = useState("");
  const [dates, setDates] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (!institution || !degree || !dates) return;
    // Call addEducation function from parent component
    addEducation({institution, degree, dates });
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
      <div className="button">
      <button type="submit">Add Education</button>
      <button type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}

function EditEducationForm({ education, updateEducation, cancelEdit  }) {
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
      <div className="button">
      <button type="submit">Update</button>
      <button type="button" onClick={cancelEdit}>Cancel</button>
      </div>
    </form>
  );
}

export default EducationSection;