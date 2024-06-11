import React, { useState,useEffect } from "react";
import "./Education.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';

function OrganizationSection() {
  const [organizationData, setOrganizationData] = useState([]);
  const [isAddingOrganization, setIsAddingOrganization] = useState(false);
  const [editOrganizationId, setEditOrganizationId] = useState(null);

  useEffect(() => {
    fetchOrganization();
  }, []);

  const fetchOrganization = async () => {
    const response = await fetch('http://localhost:3000/organization');
    const data = await response.json();
    setOrganizationData(data);
  };

  const addOrganization = async (newOrganization) => {
    await fetch('http://localhost:3000/organization', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newOrganization),
    });
    fetchOrganization();
    setIsAddingOrganization(false);
  };

  const deleteOrganization = async (_id) => {
    await fetch(`http://localhost:3000/organization/${_id}`, {
      method: 'DELETE',
    });
    fetchOrganization();
  };

  const  updateOrganization = async (updatedOrganization) => {
    const { _id, ...updateData } = updatedOrganization;
    console.log('Update Data:', updateData);
    await fetch(`http://localhost:3000/organization/${_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    });
    fetchOrganization();
    setEditOrganizationId(null);
  };

  // Function to handle toggling the edit mode of an organization entry
  const toggleEditOrganization = (id) => {
    setEditOrganizationId(id === editOrganizationId ? null : id);
  };



  const organizationItems = organizationData.map((organization) => (
    <li key={organization._id} className="m-item">
      <div className="m-detail">
          {editOrganizationId === organization._id ? (
            <EditOrganizationForm
              organization={organization}
              updateOrganization={updateOrganization}
              cancelEdit={() => setEditOrganizationId(null)}

            />
          ) : (
            <>
              <p><strong>{organization.organization}</strong></p>
              <p>{organization.position}</p>
              <p>{organization.duration}</p>
                <li>{organization.description}</li>
              
            </>
          )}
         </div>
         <div className="uniquebutton">
        <button onClick={() => toggleEditOrganization(organization._id)}>
          <FontAwesomeIcon icon={faEdit} />
        </button>
  
        <button onClick={() => deleteOrganization(organization._id)}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
        </div>
     
    </li>
  ));

  return (
    <div className="container">
      <div className="m-header">
        <h2 className="section-title">Organizations</h2>
        <button className="add-button" onClick={() => setIsAddingOrganization(true)}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
    
        {organizationItems}
        {isAddingOrganization && (
        <AddOrganizationForm
          addOrganization={addOrganization}
          onCancel={() => setIsAddingOrganization(false)}
        />
      )}
    </div>
  );
}

function AddOrganizationForm({ addOrganization, onCancel }) {
  const [organization, setOrganization] = useState("");
  const [position, setPosition] = useState("");
  const [duration, setDuration] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (!organization || !position || !duration || !description) return;
    // Call addOrganization function from parent component
    addOrganization({ organization, position, duration, description });
    // Clear input fields
    setOrganization("");
    setPosition("");
    setDuration("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={organization}
        onChange={(e) => setOrganization(e.target.value)}
        placeholder="Organization"
      />
      <input
        type="text"
        value={position}
        onChange={(e) => setPosition(e.target.value)}
        placeholder="Position"
      />
      <input
        type="text"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        placeholder="Duration"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      ></textarea>
      <div className="button">
      <button type="submit">Add Organization</button>
      <button type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}

function EditOrganizationForm({ organization, updateOrganization,cancelEdit }) {
  const [orgName, setOrgName] = useState(organization.organization);
  const [position, setPosition] = useState(organization.position);
  const [duration, setDuration] = useState(organization.duration);
  const [description, setDescription] = useState(organization.description);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (!orgName || !position || !duration || !description) return;
    // Call updateOrganization function from parent component
    updateOrganization({ ...organization, organization: orgName, position, duration, description });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={orgName}
        onChange={(e) => setOrgName(e.target.value)}
        placeholder="Organization"
      />
      <input
        type="text"
        value={position}
        onChange={(e) => setPosition(e.target.value)}
        placeholder="Position"
      />
      <input
        type="text"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        placeholder="Duration"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      ></textarea>
       <div className="button">
      <button type="submit">Update</button>
      <button type="button" onClick={cancelEdit}>Cancel</button>
      </div>
    </form>
  );
}

export default OrganizationSection;