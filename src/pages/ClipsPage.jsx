// src/pages/ClipsPage.jsx

import React, { useState, useEffect } from 'react';
import { ref, uploadBytes, getDownloadURL, listAll } from 'firebase/storage';
import { db, storage } from '../firebase';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { auth } from '../firebase';
import './ClipsPage.css';

function ClipsPage() {
  const [videoFile, setVideoFile] = useState(null);
  const [title, setTitle] = useState('');
  const [clips, setClips] = useState([]);

  const user = auth.currentUser;

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setVideoFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!videoFile || !title) {
      alert('Please select a video and enter a title');
      return;
    }

    try {
      const storageRef = ref(storage, `clips/${user.uid}/${Date.now()}_${videoFile.name}`);
      await uploadBytes(storageRef, videoFile);
      const url = await getDownloadURL(storageRef);

      await addDoc(collection(db, 'clips'), {
        uid: user.uid,
        title,
        videoUrl: url,
        createdAt: new Date()
      });

      alert('Clip uploaded successfully!');
      setTitle('');
      setVideoFile(null);
      fetchClips();
    } catch (error) {
      console.error('Upload Error:', error);
      alert('Error uploading clip');
    }
  };

  const fetchClips = async () => {
    if (!user) return;
    const q = query(collection(db, 'clips'), where('uid', '==', user.uid));
    const querySnapshot = await getDocs(q);

    const clipsArray = [];
    querySnapshot.forEach((doc) => {
      clipsArray.push({ id: doc.id, ...doc.data() });
    });

    setClips(clipsArray);
  };

  useEffect(() => {
    fetchClips();
  }, []);

  return (
    <div className="clips-page">
      <h1>Upload a New Clip</h1>
      <div className="upload-section">
        <input type="file" accept="video/*" onChange={handleFileChange} />
        <input type="text" placeholder="Enter a title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <button onClick={handleUpload}>Upload</button>
      </div>

      <h2>Your Clips</h2>
      <div className="clips-grid">
        {clips.map((clip) => (
          <div key={clip.id} className="clip-card">
            <video src={clip.videoUrl} controls width="250" />
            <p>{clip.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ClipsPage;
