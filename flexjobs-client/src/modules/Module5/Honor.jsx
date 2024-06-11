import React, { useState,useEffect } from "react";
import "./Education.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';

function HonorSection() {
  const [honorData, setHonorData] = useState([]);
  const [isAddingHonor, setIsAddingHonor] = useState(false);
  const [editHonorId, setEditHonorId] = useState(null);

  useEffect(() => {
    fetchHonor();
  }, []);

  const fetchHonor = async () => {
    const response = await fetch('http://localhost:3000/honor');
    const data = await response.json();
    setHonorData(data);
  };

  const addHonor = async (newHonor) => {
    await fetch('http://localhost:3000/honor', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newHonor),
    });
    fetchHonor();
    setIsAddingHonor(false);
  };

  const deleteHonor = async (_id) => {
    await fetch(`http://localhost:3000/honor/${_id}`, {
      method: 'DELETE',
    });
    fetchHonor();
  };

  const updateHonor = async (updatedHonor) => {
    const { _id, ...updateData } = updatedHonor;
    console.log('Update Data:', updateData);
    await fetch(`http://localhost:3000/honor/${_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    });
    fetchHonor();
    setEditHonorId(null);
  };

  const toggleEditHonor = (id) => {
    setEditHonorId(id === editHonorId ? null : id);
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
          {editHonorId === honor._id ? (
            <EditHonorForm
              honor={honor}
              updateHonor={updateHonor}
              cancelEdit={() => setEditHonorId(null)}

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
       <div className="uniquebutton">
        <button onClick={() => toggleEditHonor(honor._id)}>
          <FontAwesomeIcon icon={faEdit} />
        </button>
        </div>
        <div className="uniquebutton">
        <button onClick={() => deleteHonor(honor._id)}>
          <FontAwesomeIcon icon={faTrash} />
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
      {isAddingHonor && (
        <AddHonorForm
          addHonor={addHonor}
          onCancel={() => setIsAddingHonor(false)}
        />
      )}
    </div>
  );
}

function AddHonorForm({ addHonor, onCancel  }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [duration, setDuration] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (!title || !category || !duration) return;
    // Call addHonor function from parent component
    addHonor({ title, category, duration });
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
       <div className="button">
      <button type="submit">Add Honor</button>
      <button type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}

function EditHonorForm({ honor, updateHonor, cancelEdit }) {
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
       <div className="button">
      <button type="submit">Update</button>
      <button type="button" onClick={cancelEdit}>Cancel</button>
      </div>
    </form>
  );
}

export default HonorSection;