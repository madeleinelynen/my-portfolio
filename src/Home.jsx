import { Link } from 'react-router-dom';
import './Home.css';
import { useRef } from 'react';

import flamecoachThumb from './assets/images/Flamecoach/Tile.png';
import flamecoach2Thumb from './assets/images/Flamecoach2/Flamecoach2Tile.png';
import aufwindThumb from './assets/images/Aufwind/Tile.png';
import oddyThumb from './assets/images/Oddy/OddyTile.png';
import vodafoneOMRThumb from './assets/images/VodafoneOMR/Tile.png';
import softrevisionThumb from './assets/images/SoftRevision/Tile.png';
import schumannThumb from './assets/images/Schumann/Tile.png';
import essenThumb from './assets/images/EssenCityguide/Tile.png';
import tirolThumb from './assets/images/Tirol/Tile.png';
import trikottaufeThumb from './assets/images/Trikottaufe/Tile.png';

import flamecoachHover from './assets/images/Flamecoach/HoverTile.png';
import flamecoach2Hover from './assets/images/Flamecoach2/Flamecoach2HoverTile.png';
import aufwindHover from './assets/images/Aufwind/HoverTile.png';
import oddyHover from './assets/images/Oddy/OddyHoveringTile.png';
import vodafoneOMRHover from './assets/images/VodafoneOMR/HoverTile.png';
import softrevisionHover from './assets/images/SoftRevision/HoverTile.png';
import schumannHover from './assets/images/Schumann/HoveringTile.png';
import essenHover from './assets/images/EssenCityguide/Tile.png';
import tirolHover from './assets/images/Tirol/HoveringTile.png';
import trikottaufeHover from './assets/images/Trikottaufe/HoverTile.png';

function Home() {
  const tilesPerRow = 3;
  const gridRef = useRef();
  const aboutRef = useRef();

  const scrollToGrid = () => {
    gridRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToAbout = () => {
    aboutRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

const projects = [
  {
    path: '/flamecoach',
    label: 'Flamecoach',
    img: flamecoachThumb,
    hoverImg: flamecoachHover
  },
  {
    path: '/flamecoach2',
    label: 'Flamecoach 2',
    img: flamecoach2Thumb,
    hoverImg: flamecoach2Hover
  },
  {
    path: '/aufwind',
    label: 'Aufwind',
    img: aufwindThumb,
    hoverImg: aufwindHover
  },
  {
    path: '/oddy',
    label: 'Oddy VR',
    img: oddyThumb,
    hoverImg: oddyHover
  },
    {
    path: '/vodafoneomr',
    label: 'Vodafone OMR',
    img: vodafoneOMRThumb,
    hoverImg: vodafoneOMRHover
  },
      {
    path: '/softrevision',
    label: 'Soft Revision',
    img: softrevisionThumb,
    hoverImg: softrevisionHover
  },
        {
    path: '/schumann',
    label: 'Schumann VR',
    img: schumannThumb,
    hoverImg: schumannHover
  },
          {
    path: '/essencityguide',
    label: 'Essen 1887',
    img: essenThumb,
    hoverImg: essenHover
  },
            {
    path: '/tirol',
    label: 'Experience Tirol',
    img: tirolThumb,
    hoverImg: tirolHover
  },
      {
    path: '/trikottaufe',
    label: 'Fortuna Trikottaufe',
    img: trikottaufeThumb,
    hoverImg: trikottaufeHover
  }
];

  return (
    <>
<div className="hero-section">
  <div className="hero-left">
    <h1 className="hero-title">Madeleine Lynen</h1>
    <h2 className="hero-subtitle">Software Developer</h2>
    <p className="hero-description">
      Mit über sechs Jahren Erfahrung in der Entwicklung von Game-Engine-Projekten bringe ich 
      fundiertes Wissen aus allen Phasen der Projektentwicklung mit.
      <br/><br/>
      Ich zeichne mich beruflich aus durch:<br/>
      – Programmierung in C#, C++, Python, Dart (Flutter)<br/>
      - Kompetenz in der Entwicklung von VR/AR- Projekten<br/>
      - Erfahrung in der Mobile-Entwicklung auf Android & iOS Systemen (Flutter, Unity)<br/>
      - Sicherer Umgang mit der Unity Engine und Erfahrung mit der Unreal Engine<br/>
      – Strukturiertes Arbeiten, auch mit Versionskontrolle in GitHub, SourceTree/Git Extensions, Perforce<br/>
      – Kompetenzen im Bereich UI/UX-Konzeption, Game Design, Level Design<br/>
      <br/>
      Ich begleite Projekte als technische Ansprechpartnerin, unterstütze bei Implementierung & Support und 
      präsentiere Produkte auf Messen und Branchenevents.<br/>
    </p>
  </div>
  <div className="hero-right">
    <ul className="hero-nav">
  <li onClick={scrollToGrid}>PROJEKTE</li>
  <li onClick={scrollToAbout}>ABOUT</li>
    </ul>
  </div>
</div>

<div ref={aboutRef} className="about-section">
  <div className="about-content">
    <h3 className="about-title"> About</h3>
    <p>Ich bin Madeleine, ...</p>
  </div>
</div>

<div
  ref={gridRef}
  className="home-grid"
  style={{
    display: 'grid',
    gridTemplateColumns: `repeat(${tilesPerRow}, 1fr)`,
    gap: '0rem',
    width: '100vw',
  }}
>
  {projects.map((proj, i) => (
  <Link to={proj.path} key={i} className="home-tile">
    <img src={proj.img} alt={proj.label} className="tile-img default" />
    <img src={proj.hoverImg} alt={`${proj.label} Hover`} className="tile-img hover" />
    <div className="tile-overlay">
      <span className="tile-label">{proj.label}</span>
    </div>
  </Link>

      ))}
    </div></>
  );
}

export default Home;
