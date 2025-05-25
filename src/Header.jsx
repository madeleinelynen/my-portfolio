import React from 'react';
import './Header.css';
import HamburgerMenu from './HamburgerMenu';

function Header() {
  return (
    <header className="main-header">
         <HamburgerMenu /> 
      <div className="header-content">
        <div className="title-block">
          <h1 className="name">Madeleine</h1>
          <p className="tagline">Software Developer</p>
        </div>
      </div>
    </header>
  );
}

export default Header;
