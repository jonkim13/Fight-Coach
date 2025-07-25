import React, { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, updateDoc } from 'firebase/firestore';
import { db, storage, auth } from '../firebase';
import './EditProfilePage.css';

function EditProfilePage() {
  const [profilePicFile, setProfilePicFile] = useState(null);
  const [profilePicPreview, setProfilePicPreview] = useState(null);
  const [name, setName] = useState('');
  const [height, setHeight] = useState('');
  const [style, setStyle] = useState([]);
  const [gym, setGym] = useState('');
  const [bio, setBio] = useState('');

  const fightingStylesList = [
    "Boxing", "Muay Thai", "Kickboxing", "Brazilian Jiu-Jitsu", "Wrestling", "Karate", "Taekwondo", "Other"
  ];

  const heightOptions = [
    "5'0\"", "5'1\"", "5'2\"", "5'3\"", "5'4\"", "5'5\"", "5'6\"", "5'7\"", "5'8\"", "5'9\"",
    "5'10\"", "5'11\"", "6'0\"", "6'1\"", "6'2\"", "6'3\"", "6'4\""
  ];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicFile(file);
      setProfilePicPreview(URL.createObjectURL(file));
    }
  };

  const handleStyleSelect = (selectedStyle) => {
    if (style.includes(selectedStyle)) {
      setStyle(style.filter((s) => s !== selectedStyle));
    } else {
      setStyle([...style, selectedStyle]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;

    if (!user) {
      alert('User not logged in');
      return;
    }

    try {
      let profilePicUrl = '';

      if (profilePicFile) {
        const storageRef = ref(storage, `profile_pictures/${user.uid}`);
        await uploadBytes(storageRef, profilePicFile);
        profilePicUrl = await getDownloadURL(storageRef);
      }

      await updateDoc(doc(db, 'users', user.uid), {
        name,
        height,
        style,
        gym,
        bio,
        ...(profilePicUrl && { profilePicUrl }),
        updatedAt: new Date()
      });

      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error updating profile');
    }
  };

  return (
    <div className="edit-profile-container">
      <h1>Edit Your Profile</h1>
      <form className="edit-profile-form" onSubmit={handleSubmit}>
        
        <div className="profile-pic-section">
          {profilePicPreview ? (
            <img src={profilePicPreview} alt="Profile Preview" className="profile-pic-preview" />
          ) : (
            <div className="profile-placeholder">Profile Picture</div>
          )}
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>

        <div className="input-group">
          <label>Full Name:</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Height:</label>
          <div className="height-scroll">
            {heightOptions.map((h) => (
              <div
                key={h}
                className={`height-option ${height === h ? 'selected' : ''}`}
                onClick={() => setHeight(h)}
              >
                {h}
              </div>
            ))}
          </div>
        </div>

        <div className="input-group">
          <label>Fighting Style(s):</label>
          <div className="fighting-style-grid">
            {fightingStylesList.map((s) => (
              <div
                key={s}
                className={`fighting-style-option ${style.includes(s) ? 'selected' : ''}`}
                onClick={() => handleStyleSelect(s)}
              >
                {s}
              </div>
            ))}
          </div>
        </div>

        <div className="input-group">
          <label>Gym Name:</label>
          <input
            type="text"
            placeholder="Enter your gym"
            value={gym}
            onChange={(e) => setGym(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Bio:</label>
          <textarea
            placeholder="Write a short bio about yourself..."
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
          />
        </div>

        <button type="submit" className="save-btn">Save Changes</button>

      </form>
    </div>
  );
}

export default EditProfilePage;