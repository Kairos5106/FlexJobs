import React, { useState,useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus, faCircle } from '@fortawesome/free-solid-svg-icons';
import "./Education.css"; 


function SkillSection() {
  const [skillData, setSkillData] = useState([]);
  const [isAddingSkill, setIsAddingSkill] = useState(false);
  const [editSkillId, setEditSkillId] = useState(null);

  useEffect(() => {
    fetchSkill();
  }, []);

  const fetchSkill = async () => {
    const response = await fetch('http://localhost:3000/skill');
    const data = await response.json();
    setSkillData(data);
  };

  const addSkill = async (newSkill) => {
    await fetch('http://localhost:3000/skill', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newSkill),
    });
    fetchSkill();
    setIsAddingSkill(false);
  };

  const deleteSkill = async (_id) => {
    await fetch(`http://localhost:3000/skill/${_id}`, {
      method: 'DELETE',
    });
    fetchSkill();
  };

  const updateSkill = async (updatedSkill) => {
    const { _id, ...updateData } = updatedSkill;
    console.log('Update Data:', updateData);
    await fetch(`http://localhost:3000/skill/${_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    });
    fetchSkill();
    setEditSkillId(null);
  };

  const toggleEditSkill = (id) => {
    setEditSkillId(id === editSkillId ? null : id);
  };

  const skillItems = skillData.map((skill) => (
    <div key={skill._id} className="m-item">
      <div className="m-content">
        <div className="m-details">
          {editSkillId === skill._id ? (
            <EditSkillForm
              skill={skill}
              updateSkill={updateSkill}
              cancelEdit={() => setEditSkillId(null)}

            />
          ) : (            <>
              <li className="skill-name">{skill.skillName}</li>
            </>
          )}
        </div>
      </div>
      <div className="button">
        <button onClick={() => toggleEditSkill(skill._id)}>
          <FontAwesomeIcon icon={faEdit} />
        </button>
        </div>
        <div className="button">
        <button onClick={() => deleteSkill(skill._id)}>
          <FontAwesomeIcon icon={faTrash} />
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

function AddSkillForm({ addSkill, onCancel }) {
  const [skillName, setSkillName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (!skillName) return;
    // Call addSkill function from parent component
    addSkill({skillName });
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
       <div className="button">
      <button type="submit">Add Skill</button>
      <button type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}

function EditSkillForm({ skill, updateSkill,cancelEdit }) {
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
      <div className="button">
      <button type="submit">Update</button>
      <button type="button" onClick={cancelEdit}>Cancel</button>
      </div>
    </form>
  );
}

export default SkillSection;