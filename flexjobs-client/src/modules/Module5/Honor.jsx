import React, { useState } from "react";
import "./Education.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';

function HonorSection() {
  const [honorData, setHonorData] = useState([
    // Sample initial data
    {
      id: 1,
      title: "Outstanding Achievement Award",
      category: "Academic",
      duration: "2018-2019",
    },
    {
      id: 2,
      title: "Leadership Excellence Award",
      category: "Professional",
      duration: "2020",
    },
  ]);

  // State to manage the editing status of each honor entry
  const [editHonorId, setEditHonorId] = useState(null);

  const [isAddingHonor, setIsAddingHonor] = useState(false);

  // Function to handle adding a new honor entry
  const addHonor = (newHonor) => {
    setHonorData([...honorData, newHonor]);
    setIsAddingHonor(false); // Hide the form after adding honor
  };

  // Function to handle deleting a honor entry
  const deleteHonor = (id) => {
    setHonorData(honorData.filter((honor) => honor.id !== id));
  };

  // Function to handle toggling the edit mode of a honor entry
  const toggleEditHonor = (id) => {
    setEditHonorId(id === editHonorId ? null : id);
  };

  // Function to handle updating a honor entry
  const updateHonor = (updatedHonor) => {
    setHonorData(
      honorData.map((honor) =>
        honor.id === updatedHonor.id ? updatedHonor : honor
      )
    );
    setEditHonorId(null); // Exit edit mode after updating
  };

  const honorItems = honorData.map((honor) => (
    <div key={honor.id} className="m-item">
      <div className="m-content">
      <img
          src="./images/award.jpeg"
          alt="Award Logo"
          className="m-logo"
          
        />
        <div className="m-details">
          {editHonorId === honor.id ? (
            <EditHonorForm
              honor={honor}
              updateHonor={updateHonor}
            />
          ) : (
            <>
              <p>Title: {honor.title}</p>
              <p>Category: {honor.category}</p>
              <p>Duration: {honor.duration}</p>
            </>
          )}
        </div>
      </div>
      <div>
        <button onClick={() => toggleEditHonor(honor.id)}>
          {editHonorId === honor.id ? (
            <button onClick={() => deleteHonor(honor.id)}>
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
        <h2 className="section-title">Honor</h2>
        <button className="add-button" onClick={() => setIsAddingHonor(true)}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
      {honorItems}
      {/* Render AddHonorForm conditionally */}
      {isAddingHonor && (
        <AddHonorForm
          addHonor={addHonor}
          onCancel={() => setIsAddingHonor(false)}
        />
      )}
    </div>
  );
}

function AddHonorForm({ addHonor }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [duration, setDuration] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (!title || !category || !duration) return;
    // Call addHonor function from parent component
    addHonor({ id: Date.now(), title, category, duration });
    // Clear input fields
    setTitle("");
    setCategory("");
    setDuration("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Award Title"
      />
      <input
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Award Category"
      />
      <input
        type="text"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        placeholder="Duration"
      />
      <button type="submit">Add Honor</button>
    </form>
  );
}

function EditHonorForm({ honor, updateHonor }) {
  const [title, setTitle] = useState(honor.title);
  const [category, setCategory] = useState(honor.category);
  const [duration, setDuration] = useState(honor.duration);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (!title || !category || !duration) return;
    // Call updateHonor function from parent component
    updateHonor({ ...honor, title, category, duration });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Award Title"
      />
      <input
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Award Category"
      />
      <input
        type="text"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        placeholder="Duration"
      />
      <button type="submit">Update</button>
    </form>
  );
}

export default HonorSection;