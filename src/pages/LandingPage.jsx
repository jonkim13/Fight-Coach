import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const maxScroll = 300;
  const progress = Math.min(scrollY / maxScroll, 1);

  const initialCoverHeight = 40; // 🔥 you made it 40, keeping it
  const coverHeight = Math.max(0, initialCoverHeight * (1 - progress));

  const showButtons = progress >= 1;
  const smallTitleOpacity = Math.max(0, (progress - 0.7) * (1 / 0.3)); 

  return (
    <div className="landing-page">
      <div className="hero-section">
        {/* Video */}
        <div className="video-wrapper">
          <video 
            className="background-video" 
            autoPlay 
            muted 
            loop 
          >
            <source src="/BGFight.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Covers */}
        <div className="top-cover" style={{ height: `${coverHeight}vh` }} />
        <div className="bottom-cover" style={{ height: `${coverHeight}vh` }} />

        {/* Big Center Title */}
        <h1 
          className="hero-title" 
          style={{ opacity: 1 - progress }}
        >
          FIGHT COACH
        </h1>

        {/* Small Top-Left Title */}
        <div 
          className="top-left-title"
          style={{ opacity: smallTitleOpacity }}
        >
          FIGHT COACH
        </div>

        {/* Buttons */}
        <div 
          className="button-container"
          style={{ opacity: showButtons ? 1 : 0 }}
        >
          <Link to="/login">
            <button className="recruiter-button">Recruiter</button>
          </Link>
          <Link to="/login">
            <button className="athlete-button">Athlete</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
