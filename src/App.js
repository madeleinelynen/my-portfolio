import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProjectCard from './ProjectCard';
import './App.css';
import Header from './Header';

function Home() {
  return <h2>Software Developer</h2>;
}

function Flamecoach() {
  return (
    <>
      <h2>Flamecoach</h2>
      <ProjectCard />
    </>
  );
}

function Flamecoach2() {
  return <h2>Flamecoach 2</h2>;
}

function Aufwind() {
  return <h2>Aufwind</h2>;
}

function Oddy() {
  return <h2>Oddy</h2>;
}

function VodafoneOMR() {
  return <h2>Vodafone OMR</h2>;
}

function SoftRevision() {
  return <h2>Soft Revision</h2>;
}

function VodafoneCar() {
  return <h2>Vodafone 5GCar</h2>;
}

function App() {
  return (
    <Router basename="/my-portfolio">
      <div className="App">
        <Header />        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/flamecoach" element={<Flamecoach />} />
          <Route path="/flamecoach2" element={<Flamecoach2 />} />
          <Route path="/aufwind" element={<Aufwind />} />
          <Route path="/oddy" element={<Oddy />} />
          <Route path="/vodafoneomr" element={<VodafoneOMR />} />
          <Route path="/softrevision" element={<SoftRevision />} />
          <Route path="/vodafonecar" element={<VodafoneCar />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
