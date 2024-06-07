import React, { useState, useEffect } from "react";
import "./Education.css"; // Assuming you have an Experience.css file for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';

function ExperienceSection() {
  const [experienceData, setExperienceData] = useState([]);
  const [isAddingExperience, setIsAddingExperience] = useState(false);
  const [editExperienceId, setEditExperienceId] = useState(null);

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    const response = await fetch('http://localhost:3000/experience');
    const data = await response.json();
    setExperienceData(data);
  };

  const addExperience = async (newExperience) => {
    await fetch('http://localhost:3000/experience', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newExperience),
    });
    fetchExperiences();
    setIsAddingExperience(false);
  };

  const deleteExperience = async (_id) => {
    await fetch(`http://localhost:3000/experience/${_id}`, {
      method: 'DELETE',
    });
    fetchExperiences();
  };

  const updateExperience = async (updatedExperience) => {
    const { _id, ...updateData } = updatedExperience;
    console.log('Update Data:', updateData);
    await fetch(`http://localhost:3000/experience/${_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    });
    fetchExperiences();
    setEditExperienceId(null);
  };

  const toggleEditExperience = (id) => {
    setEditExperienceId(id === editExperienceId ? null : id);
  };

  const experienceItems = experienceData.map((experience) => (
    <div key={experience._id} className="m-item">
      <div className="m-content">
        <img
          src="./images/company.jpeg"
          alt="Company Logo"
          className="m-logo"
        />
        <div className="m-details">
          {editExperienceId === experience._id ? (
            <EditExperienceForm
              experience={experience}
              updateExperience={updateExperience}
              cancelEdit={() => setEditExperienceId(null)}
            />
          ) : (
            <>
              <p>Position: {experience.position}</p>
              <p>Company: {experience.company}</p>
              <p>Period: {experience.period}</p>
              <p>Location: {experience.location}</p>
            </>
          )}
        </div>
      </div>
      <div className="button">
        <button onClick={() => toggleEditExperience(experience._id)}>
          <FontAwesomeIcon icon={faEdit} />
        </button>
        </div>
        <div className="button">
        <button onClick={() => deleteExperience(experience._id)}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </div>
  ));

  return (
    <div className="container">
      <div className="m-header">
        <h2 className="section-title">Experience</h2>
        <button className="add-button" onClick={() => setIsAddingExperience(true)}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
      {experienceItems}
      {isAddingExperience && (
        <AddExperienceForm
          addExperience={addExperience}
          onCancel={() => setIsAddingExperience(false)}
        />
      )}
    </div>
  );
}

function AddExperienceForm({ addExperience, onCancel }) {
  const [position, setPosition] = useState("");
  const [company, setCompany] = useState("");
  const [period, setPeriod] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!position || !company || !period || !location) return;
    addExperience({ position, company, period, location });
    setPosition("");
    setCompany("");
    setPeriod("");
    setLocation("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={position}
        onChange={(e) => setPosition(e.target.value)}
        placeholder="Position"
      />
      <input
        type="text"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        placeholder="Company"
      />
      <input
        type="text"
        value={period}
        onChange={(e) => setPeriod(e.target.value)}
        placeholder="Period"
      />
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Location"
      />
      <div className="button">
      <button type="submit">Add Experience</button>
      <button type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}

function EditExperienceForm({ experience, updateExperience, cancelEdit }) {
  const [position, setPosition] = useState(experience.position);
  const [company, setCompany] = useState(experience.company);
  const [period, setPeriod] = useState(experience.period);
  const [location, setLocation] = useState(experience.location);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!position || !company || !period || !location) return;
    updateExperience({ ...experience, position, company, period, location });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={position}
        onChange={(e) => setPosition(e.target.value)}
        placeholder="Position"
      />
      <input
        type="text"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        placeholder="Company"
      />
      <input
        type="text"
        value={period}
        onChange={(e) => setPeriod(e.target.value)}
        placeholder="Period"
      />
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Location"
      />
     <div className="button">
      <button type="submit">Update</button>
      <button type="button" onClick={cancelEdit}>Cancel</button>
      </div>
    </form>
  );
}

export default ExperienceSection;
