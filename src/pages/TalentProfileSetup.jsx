import React, { useState } from 'react';
import { db, storage, auth } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
import './TalentProfileSetup.css';

function TalentProfileSetup() {
  const [step, setStep] = useState(0);
  const [profilePicFile, setProfilePicFile] = useState(null);
  const [profilePicPreview, setProfilePicPreview] = useState(null);
  const [name, setName] = useState('');
  const [height, setHeight] = useState('');
  const [styles, setStyles] = useState([]);
  const [gym, setGym] = useState('');
  const [bio, setBio] = useState('');

  const navigate = useNavigate();

  const heightOptions = [
    "5'0\"", "5'1\"", "5'2\"", "5'3\"", "5'4\"", "5'5\"",
    "5'6\"", "5'7\"", "5'8\"", "5'9\"", "5'10\"", "5'11\"",
    "6'0\"", "6'1\"", "6'2\"", "6'3\"", "6'4\""
  ];

  const styleOptions = ["Muay Thai", "Boxing", "Wrestling", "Jiu-Jitsu", "Kickboxing", "Karate"];

  const handleNext = () => {
    if (step === 0 && !profilePicFile) {
      alert('Please upload a profile picture.');
      return;
    }
    if (step === 1 && name.trim() === '') {
      alert('Please enter your name.');
      return;
    }
    if (step === 2 && height === '') {
      alert('Please select your height.');
      return;
    }
    if (step === 3 && styles.length === 0) {
      alert('Please select at least one fighting style.');
      return;
    }
    if (step === 4 && gym.trim() === '') {
      alert('Please enter your gym.');
      return;
    }
    setStep(step + 1);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicFile(file);
      setProfilePicPreview(URL.createObjectURL(file));
    }
  };

  const toggleStyle = (style) => {
    if (styles.includes(style)) {
      setStyles(styles.filter((s) => s !== style));
    } else {
      setStyles([...styles, style]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user) {
      alert('User not logged in.');
      return;
    }

    try {
      let profilePicUrl = '';

      if (profilePicFile) {
        const storageRef = ref(storage, `profile_pictures/${user.uid}`);
        await uploadBytes(storageRef, profilePicFile);
        profilePicUrl = await getDownloadURL(storageRef);
      }

      await setDoc(doc(db, 'users', user.uid), {
        name,
        height,
        styles,
        gym,
        bio,
        profilePicUrl,
        createdAt: new Date(),
      });

      alert('Profile successfully created!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Error saving profile.');
    }
  };

  return (
    <div className="profile-setup-container">
      <h1>Set Up Your Athlete Profile</h1>

      {step === 0 && (
        <>
          <h2>Upload Profile Picture:</h2>
          <div className="profile-pic-upload">
            {profilePicPreview ? (
              <img src={profilePicPreview} alt="Profile Preview" className="profile-preview" />
            ) : (
              <div className="profile-placeholder">Upload</div>
            )}
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </div>
          <button className="next-btn" onClick={handleNext}>Next</button>
        </>
      )}

      {step === 1 && (
        <>
          <h2>Full Name:</h2>
          <input
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button className="next-btn" onClick={handleNext}>Next</button>
        </>
      )}

      {step === 2 && (
        <>
          <h2>Height:</h2>
          <div className="height-options">
            {heightOptions.map((option) => (
              <button
                key={option}
                className={`height-btn ${height === option ? 'selected' : ''}`}
                onClick={() => setHeight(option)}
              >
                {option}
              </button>
            ))}
          </div>
          <button className="next-btn" onClick={handleNext}>Next</button>
        </>
      )}

      {step === 3 && (
        <>
          <h2>Fighting Styles:</h2>
          <div className="style-options">
            {styleOptions.map((option) => (
              <button
                key={option}
                className={`style-btn ${styles.includes(option) ? 'selected' : ''}`}
                onClick={() => toggleStyle(option)}
              >
                {option}
              </button>
            ))}
          </div>
          <button className="next-btn" onClick={handleNext}>Next</button>
        </>
      )}

      {step === 4 && (
        <>
          <h2>Gym Name:</h2>
          <input
            type="text"
            placeholder="Enter your gym name"
            value={gym}
            onChange={(e) => setGym(e.target.value)}
          />
          <button className="next-btn" onClick={handleNext}>Next</button>
        </>
      )}

      {step === 5 && (
        <>
          <h2>Bio:</h2>
          <textarea
            placeholder="Tell us about yourself"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
          />
          <button className="submit-btn" onClick={handleSubmit}>Submit Profile</button>
        </>
      )}
    </div>
  );
}

export default TalentProfileSetup;