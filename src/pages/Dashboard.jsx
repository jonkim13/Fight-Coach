import React from 'react'
import Sidebar from '../components/Sidebar.jsx'
import DashboardSection from '../components/DashboardSection.jsx'
import editProfileImg from '../assets/dashboard/editprofile.jpg'
import clipsImg      from '../assets/dashboard/clips.jpg'
import analyzeImg    from '../assets/dashboard/analyze.jpg'
import growthImg     from '../assets/dashboard/growth.jpg'
import connectImg    from '../assets/dashboard/connect.jpg'
import './Dashboard.css'

export default function Dashboard() {
  return (
    <div className="dashboard-wrapper">
      <Sidebar />

      <div className="dashboard-content">
        {/* ← removed the Home section here */}

        <DashboardSection
          id="edit"
          title="Edit Profile"
          imageSrc={editProfileImg}
          rightTitle="Edit"
        />
        <DashboardSection
          id="clips"
          title="Clips"
          imageSrc={clipsImg}
          rightTitle="Highlights"
        />
        <DashboardSection
          id="analyze"
          title="Analyze Clips"
          imageSrc={analyzeImg}
          rightTitle="Analyze"
        />
        <DashboardSection
          id="growth"
          title="Growth Chart"
          imageSrc={growthImg}
          rightTitle="Growth"
        />
        <DashboardSection
          id="connect"
          title="Connect"
          imageSrc={connectImg}
          rightTitle="Network"
        />
      </div>
    </div>
  )
}