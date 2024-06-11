import React, { useState, useEffect, useContext } from "react";
import "./Profile.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { UserContext } from '../../context/userContext'; 

function ProfileSection() {
  const { user } = useContext(UserContext);

  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phoneNo: "",
    photo: null,
  });

  const [editProfile, setEditProfile] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);

  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name,
        email: user.email,
        phoneNo: user.phoneNo,
        // Assuming you have a user photo field, set it here if available
        photo: user.photo || null,
      });
    }
  }, [user]);

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
          src="./images/profiledefault.png"
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
          <FontAwesomeIcon icon={faEdit} /> Edit profile pic
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
              name="phoneNo"
              value={profileData.phoneNo}
              onChange={handleInputChange}
              placeholder="Phone"
            />
            <button type="submit">Save</button>
          </form>
        ) : (
          <>
            <p><strong>{profileData.name}</strong></p>
            <p>{profileData.email}</p>
            <p>{profileData.phoneNo}</p>
            
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
