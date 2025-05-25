import React from 'react';
import ProjectCard from './ProjectCard';
import './App.css';
import HamburgerMenu from './HamburgerMenu';


function App() {
  return (
    <div className="App">
      <HamburgerMenu />
      <h1>Madeleine Lynen</h1>
      <h1>Developer Portfolio</h1>
      <ProjectCard />
    </div>
  );
}

export default App;