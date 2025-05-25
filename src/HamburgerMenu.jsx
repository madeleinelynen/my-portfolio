import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
        <Link to="/" onClick={() => setOpen(false)}>Home</Link>
        <Link to="/flamecoach" onClick={() => setOpen(false)}>Flamecoach</Link>
        <Link to="/flamecoach2" onClick={() => setOpen(false)}>Flamecoach2</Link>
        <Link to="/aufwind" onClick={() => setOpen(false)}>Aufwind</Link>
        <Link to="/oddy" onClick={() => setOpen(false)}>Oddy</Link>
        <Link to="/vodafoneomr" onClick={() => setOpen(false)}>VodafoneOMR</Link>
        <Link to="/softrevision" onClick={() => setOpen(false)}>SoftRevision</Link>
        <Link to="/vodafonecar" onClick={() => setOpen(false)}>VodafoneCar</Link>

        </div>
      )}
    </div>
  );
}

export default HamburgerMenu;
