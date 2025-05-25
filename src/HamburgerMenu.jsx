import React, { useState } from 'react';
import './HamburgerMenu.css';

function HamburgerMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="hamburger-wrapper">
      <button className="hamburger-icon" onClick={() => setOpen(!open)}>
        ☰
      </button>

      {open && (
        <div className="menu">
          <a href="#home" onClick={() => setOpen(false)}>Home</a>
          <a href="#flamecoach" onClick={() => setOpen(false)}>Flamecoach</a>
          <a href="#flamecoach2" onClick={() => setOpen(false)}>Flamecoach2</a>
          <a href="#aufwind" onClick={() => setOpen(false)}>Aufwind</a>
          <a href="#oddy" onClick={() => setOpen(false)}>Oddy</a>
          <a href="#vodafoneomr" onClick={() => setOpen(false)}>VodafoneOMR</a>
          <a href="#softrevision" onClick={() => setOpen(false)}>SoftRevision</a>
          <a href="#vodafonecar" onClick={() => setOpen(false)}>VodafoneCar</a>
        </div>
      )}
    </div>
  );
}

export default HamburgerMenu;
