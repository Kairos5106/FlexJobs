import React, { useState } from "react";
import "../../Profile.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

function ProfileSection() {
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    photo: null,
  });

  const [editProfile, setEditProfile] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData({ ...profileData, photo: file });
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEditProfile(false);
  };

  return (
    <div className="container profile-container">
      <div className="profile-photo">
        <img
          src={photoPreview || "./images/default-profile.jpg"}
          alt="Profile"
          className="photo-circle"
        />
        <input
          type="file"
          id="photo-upload"
          style={{ display: "none" }}
          onChange={handlePhotoChange}
        />
        <label htmlFor="photo-upload" className="photo-upload-label">
          <FontAwesomeIcon icon={faEdit} /> Upload photo
        </label>
      </div>
      <div className="profile-details">
        {editProfile ? (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              value={profileData.name}
              onChange={handleInputChange}
              placeholder="Name"
            />
            <input
              type="email"
              name="email"
              value={profileData.email}
              onChange={handleInputChange}
              placeholder="Email"
            />
            <input
              type="tel"
              name="phone"
              value={profileData.phone}
              onChange={handleInputChange}
              placeholder="Phone"
            />
            <button type="submit">Save</button>
          </form>
        ) : (
          <>
            <p><strong>{profileData.name}</strong></p>
            <p>{profileData.email}</p>
            <p>{profileData.phone}</p>
            
          </>
        )}
      </div>
      <button onClick={() => setEditProfile(true)}>
              <FontAwesomeIcon icon={faEdit} />
            </button>
    </div>
  );
}

export default ProfileSection;
