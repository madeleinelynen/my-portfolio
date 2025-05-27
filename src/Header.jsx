import React from 'react';
import './Header.css';
import ProjectDropdown from './ProjectDropdown';

function Header() {
  return (
    <header className="main-header">
      <div className="header-content">
        <div className="title-block">
          <h1 className="name">Madeleine Lynen | Software Developer </h1>
        </div>
        <div className="menu-block">
          <ProjectDropdown />
        </div>
      </div>
    </header>
  );
}

export default Header;
