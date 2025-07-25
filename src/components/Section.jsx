import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <ul>
        <li><Link to="/dashboard">Home</Link></li>
        <li><Link to="/edit-profile-page">Edit Profile</Link></li>
        <li><Link to="/dashboard#clips">Clips</Link></li>
        <li><Link to="/dashboard#analyze">Analyze Clips</Link></li>
        <li><Link to="/dashboard#growth">Growth Chart</Link></li>
        <li><Link to="/dashboard#connect">Connect</Link></li>
      </ul>
    </div>
  );
}

export default Sidebar;