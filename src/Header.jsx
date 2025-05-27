import React from 'react';
import './Header.css';
import ProjectDropdown from './ProjectDropdown';

function Header() {
  return (
    <header className="main-header">
      <div className="header-content">
        <div className="title-block">
          <h1 className="name">Madeleine Lynen | Software Developer </h1>
          {/* <p className="tagline">Software Developer</p> */}
        </div>
        <div className="menu-block">
          <ProjectDropdown />
        </div>
      </div>
    </header>
  );
}

export default Header;
