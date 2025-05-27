import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ProjectDropdown.css';

function ProjectDropdown() {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="project-dropdown"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button className="dropdown-toggle">Projekte ➤</button>

      {open && (
        <div className="dropdown-menu">
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

export default ProjectDropdown;
