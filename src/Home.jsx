import { Link } from 'react-router-dom';
import './Home.css';
import AnimatedNumberBlock from './components/AnimatedNumberBlock';
import AnimatedHighlightList from './components/AnimatedHighlightList';
import { useRef, useEffect } from 'react';
import AutoResizingText from './components/AutoResizingText';

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

const projekteRef = useRef(null);
const aboutRef = useRef(null);

    const description = [
    'Kernkompetenz in der Programmierung in C#',
    'Erste Erfahrungen in C++, Python, Dart, HTML',
    'Kompetenz in der Entwicklung von VR/AR-Projekten',
    'Erfahrung in der Mobile-Entwicklung auf Android & iOS Systemen (Flutter, React, Unity)',
    'Sicherer Umgang mit der Unity Engine und Erfahrung mit der Unreal Engine',
    'Versionskontrolle mit GitHub, SourceTree, Git Extensions, oder Perforce',
    'Zusätzliche Erfahrung im Bereich UI/UX-Konzeption, Game Design, Level Design',
  ];

  const tilesPerRow = 5;
  const gridRef = useRef();
  const aboutScrollRef = useRef();

  const scrollToGrid = () => {
    gridRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToAbout = () => {
    aboutScrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const leftRef = useRef();
  const rightRef = useRef();

useEffect(() => {
  if (leftRef.current && rightRef.current) {
    const leftHeight = leftRef.current.offsetHeight;
    rightRef.current.style.height = `${leftHeight}px`;
  }
}, []);

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
    <div className="hero-screen">
      <div className="hero-left" style={{ position: 'relative' }}>
           <AutoResizingText
              words={['MADELEINE', 'LYNEN']}
              textalign="left"
              enableHover={false}
            />
          <div className="stats-row">
            <AnimatedNumberBlock
              max={30}
              suffix="+"
              title="Projekte erfolgreich abgeschlossen"
              text=""
            />
            <AnimatedNumberBlock
              max={6}
              suffix="+"
              title="Jahre Berufserfahrung als Software Developer"
              text=""
            />
          </div>

          <AnimatedHighlightList content={description} />
        
      </div>

  <div className="hero-right">
    <AutoResizingText
      words={['PROJEKTE', 'ABOUT']}
      textalign='right'
      projekteRef={projekteRef}
      aboutRef={aboutRef}
      onClickProjekte={scrollToGrid}
      onClickAbout={scrollToAbout}
      enableHover={true}
    />
  </div>
    </div>
  </div>

<div ref={aboutScrollRef} className="about-section">
  <div className="about-content">
    <h3 className="about-title"> About</h3>
    <p>...</p>
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
