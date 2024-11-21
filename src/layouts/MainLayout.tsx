// src/layouts/MainLayout.tsx

import React from 'react';
import './MainLayout.css'; // Optional: Add your styles here

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="layout">
      <header className="header">
        <h1>Core UI</h1>
      </header>
      <div className="main-content">
        <aside className="sidebar">
          <nav>
            <ul>
              <li>Dashboard</li>
              <li>Settings</li>
              <li>Profile</li>
            </ul>
          </nav>
        </aside>
        <main className="content">{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;
