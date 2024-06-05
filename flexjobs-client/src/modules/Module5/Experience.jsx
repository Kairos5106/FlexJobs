import React, { useState,useEffect} from "react";
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

  const deleteExperience = async (id) => {
    await fetch(`http://localhost:3000/experience/${id}`, {
      method: 'DELETE',
    });
    fetchExperiences();
  };

  const updateExperience = async (updatedExperience) => {
    await fetch(`http://localhost:3000/experience/${updatedExperience.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedExperience),
    });
    fetchExperiences();
    setEditExperienceId(null);
  };

  const toggleEditExperience = (id) => {
    setEditExperienceId(id === editExperienceId ? null : id);
  };
  const experienceItems = experienceData.map((experience) => (
    <div key={experience.id} className="m-item">
       <div className="m-content">
        <img
          src="./images/company.jpeg"
          alt="Company Logo"
          className="m-logo"
          
        />
        <div className="m-details">
          {editExperienceId === experience.id ? (
            <EditExperienceForm
              experience={experience}
              updateExperience={updateExperience}
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
      <div>
        <button onClick={() => toggleEditExperience(experience.id)}>
          {editExperienceId === experience.id ? (
            <button onClick={() => deleteExperience(experience.id)}>
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
        <h2 className="section-title">Experience</h2>
        <button className="add-button" onClick={() => setIsAddingExperience(true)}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
      {experienceItems}
      {/* Render AddExperienceForm conditionally */}
      {isAddingExperience && (
        <AddExperienceForm
          addExperience={addExperience}
          onCancel={() => setIsAddingExperience(false)}
        />
      )}
    </div>
  );
}
function AddExperienceForm({ addExperience }) {
    const [position, setPosition] = useState("");
    const [company, setCompany] = useState("");
    const [period, setPeriod] = useState("");
    const [location, setLocation] = useState("");
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Basic validation
      if (!position || !company || !period || !location) return;
      // Call addExperience function from parent component
      addExperience({ id: Date.now(), position, company, period, location });
      // Clear input fields
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
        <button type="submit">Add Experience</button>
      </form>
    );
  }
  
  function EditExperienceForm({ experience, updateExperience }) {
    const [position, setPosition] = useState(education.position);
    const [company, setCompany] = useState(education.company);
    const [period, setPeriod] = useState(education.period);
    const [location, setLocation] = useState(education.location);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (!position || !company || !period || !location) return;
    // Call updateExperience function from parent component
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
      <button type="submit">Update</button>
    </form>
  );
}
export default ExperienceSection;