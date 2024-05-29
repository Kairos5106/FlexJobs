import React, { useState } from "react";
import "./Education.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';

function OrganizationSection() {
  const [organizationData, setOrganizationData] = useState([
    // Sample initial data
    {
      id: 1,
      organization: "Universiti Malaya Accounting Society",
      position: "Secretary",
      duration: "2005-2006",
      description: "Handling incoming and outgoing correspondence on behalf of the club, including emails, letters, and other forms of communication."
    },
  ]);

  // State to manage the editing status of each organization entry
  const [editOrganizationId, setEditOrganizationId] = useState(null);

  const [isAddingOrganization, setIsAddingOrganization] = useState(false);

  // Function to handle adding a new organization entry
  const addOrganization = (newOrganization) => {
    setOrganizationData([...organizationData, newOrganization]);
    setIsAddingOrganization(false); // Hide the form after adding organization
  };

  // Function to handle deleting an organization entry
  const deleteOrganization = (id) => {
    setOrganizationData(organizationData.filter((org) => org.id !== id));
  };

  // Function to handle toggling the edit mode of an organization entry
  const toggleEditOrganization = (id) => {
    setEditOrganizationId(id === editOrganizationId ? null : id);
  };

  // Function to handle updating an organization entry
  const updateOrganization = (updatedOrganization) => {
    setOrganizationData(
      organizationData.map((org) =>
        org.id === updatedOrganization.id ? updatedOrganization : org
      )
    );
    setEditOrganizationId(null); // Exit edit mode after updating
  };

  const organizationItems = organizationData.map((organization) => (
    <li key={organization.id} className="m-item">
      <div className="m-detail">
          {editOrganizationId === organization.id ? (
            <EditOrganizationForm
              organization={organization}
              updateOrganization={updateOrganization}
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
        <div>
          <button onClick={() => toggleEditOrganization(organization.id)}>
            {editOrganizationId === organization.id ? (
              <button onClick={() => deleteOrganization(organization.id)}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
            ) : (
              <FontAwesomeIcon icon={faEdit} />
            )}
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
      
      {/* Render AddOrganizationForm conditionally */}
      {isAddingOrganization && (
        <AddOrganizationForm
          addOrganization={addOrganization}
          onCancel={() => setIsAddingOrganization(false)}
        />
      )}
    </div>
  );
}

function AddOrganizationForm({ addOrganization }) {
  const [organization, setOrganization] = useState("");
  const [position, setPosition] = useState("");
  const [duration, setDuration] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (!organization || !position || !duration || !description) return;
    // Call addOrganization function from parent component
    addOrganization({ id: Date.now(), organization, position, duration, description });
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
      <button type="submit">Add Organization</button>
    </form>
  );
}

function EditOrganizationForm({ organization, updateOrganization }) {
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
      <button type="submit">Update</button>
    </form>
  );
}

export default OrganizationSection;
