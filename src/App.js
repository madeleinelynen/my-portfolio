import React from 'react';
import ProjectCard from './ProjectCard';

function App() {
  return (
    <div style={{
      backgroundColor: '##2a2a2a',
      color: '#f0f0f0',
      minHeight: '100vh',
      padding: '2rem',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1>Madeleine Lynen</h1>
      <h1>Developer Portfolio</h1>
      <ProjectCard />
    </div>
  );
}

export default App;