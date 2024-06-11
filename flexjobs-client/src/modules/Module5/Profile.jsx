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
  const [photoPreview, setPhotoPreview] = useState("./images/defaultpic.jpg");

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

  return (
    <div className="container profile-container">
      <div className="profile-photo">
        <img
          src={photoPreview}
          alt="Profile"
          className="photo-circle"
        />
      </div>
      <div className="profile-details">
        <p><strong>{profileData.name}</strong></p>
        <p>{profileData.email}</p>
        <p>{profileData.phoneNo}</p>
      </div>
    </div>
  );
}

export default ProfileSection;
