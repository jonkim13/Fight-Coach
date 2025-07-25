import React from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar />
      <div style={{ flex: 1, overflowY: 'scroll', height: '100vh' }}>
        <Outlet /> {/* This is where the inner page loads */}
      </div>
    </div>
  );
}

export default Layout;