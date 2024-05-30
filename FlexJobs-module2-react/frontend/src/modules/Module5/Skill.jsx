import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus, faCircle } from '@fortawesome/free-solid-svg-icons';
import "./Education.css"; 


function SkillSection() {
  const [skillData, setSkillData] = useState([
    {
      id: 1,
      skillName: "JavaScript",
    },
    {
      id: 2,
      skillName: "React",
    },
  ]);

  // State to manage the editing status of each skill entry
  const [editSkillId, setEditSkillId] = useState(null);

  const [isAddingSkill, setIsAddingSkill] = useState(false);

  // Function to handle adding a new skill entry
  const addSkill = (newSkill) => {
    setSkillData([...skillData, newSkill]);
    setIsAddingSkill(false); // Hide the form after adding skill
  };

  // Function to handle deleting a skill entry
  const deleteSkill = (id) => {
    setSkillData(skillData.filter((skill) => skill.id !== id));
  };

  // Function to handle toggling the edit mode of a skill entry
  const toggleEditSkill = (id) => {
    setEditSkillId(id === editSkillId ? null : id);
  };

  // Function to handle updating a skill entry
  const updateSkill = (updatedSkill) => {
    setSkillData(
      skillData.map((skill) =>
        skill.id === updatedSkill.id ? updatedSkill : skill
      )
    );
    setEditSkillId(null); // Exit edit mode after updating
  };

  const skillItems = skillData.map((skill) => (
    <div key={skill.id} className="m-item">
      <div className="m-content">
        <div className="m-details">
          {editSkillId === skill.id ? (
            <EditSkillForm
              skill={skill}
              updateSkill={updateSkill}
            />
          ) : (            <>
              <li className="skill-name">{skill.skillName}</li>
            </>
          )}
        </div>
      </div>
      <div>
        <button onClick={() => toggleEditSkill(skill.id)}>
          {editSkillId === skill.id ? (
            <button onClick={() => deleteSkill(skill.id)}>
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
        <h2 className="section-title">Skills</h2>
        <button className="add-button" onClick={() => setIsAddingSkill(true)}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
      {skillItems}
      {isAddingSkill && (
        <AddSkillForm
          addSkill={addSkill}
          onCancel={() => setIsAddingSkill(false)}
        />
      )}
    </div>
  );
}

function AddSkillForm({ addSkill }) {
  const [skillName, setSkillName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (!skillName) return;
    // Call addSkill function from parent component
    addSkill({ id: Date.now(), skillName });
    // Clear input fields
    setSkillName("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={skillName}
        onChange={(e) => setSkillName(e.target.value)}
        placeholder="Skill Name"
      />
      <button type="submit">Add Skill</button>
    </form>
  );
}

function EditSkillForm({ skill, updateSkill }) {
  const [skillName, setSkillName] = useState(skill.skillName);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (!skillName) return;
    // Call updateSkill function from parent component
    updateSkill({ ...skill, skillName });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={skillName}
        onChange={(e) => setSkillName(e.target.value)}
        placeholder="Skill Name"
      />
      <button type="submit">Update</button>
    </form>
  );
}

export default SkillSection;
