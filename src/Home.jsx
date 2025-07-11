import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import './style.css';
import About from './About';
import AnimatedNumberBlock from './components/AnimatedNumberBlock';
import HomeSelection from './HomeSelection';

import flamecoachThumb from './assets/images/Flamecoach/Tile.png';
import flamecoach2Thumb from './assets/images/Flamecoach2/Flamecoach2Tile.png';
import aufwindThumb from './assets/images/Aufwind/Tile.png';
import oddyThumb from './assets/images/Oddy/OddyTile.png';
import vodafoneOMRThumb from './assets/images/VodafoneOMR/Tile.png';
import vodafoneGigacarThumb from './assets/images/5GCar/Tile.png';
import softrevisionThumb from './assets/images/SoftRevision/Tile.png';
import schumannThumb from './assets/images/Schumann/Tile.png';
import essenThumb from './assets/images/EssenCityguide/Tile.png';
import tirolThumb from './assets/images/Tirol/Tile.png';
import thyssenInfraThumb from './assets/images/ThyssenInfrastructure/Tile.png';
import trikottaufeThumb from './assets/images/Trikottaufe/Tile.png';

import flamecoachHover from './assets/images/Flamecoach/HoverTile.png';
import flamecoach2Hover from './assets/images/Flamecoach2/Flamecoach2HoverTile.png';
import aufwindHover from './assets/images/Aufwind/HoverTile.png';
import oddyHover from './assets/images/Oddy/OddyHoveringTile.png';
import vodafoneOMRHover from './assets/images/VodafoneOMR/HoverTile.png';
import vodafoneGigacarHover from './assets/images/5GCar/HoverTile.png';
import softrevisionHover from './assets/images/SoftRevision/HoverTile.png';
import schumannHover from './assets/images/Schumann/HoveringTile.png';
import essenHover from './assets/images/EssenCityguide/Tile.png';
import tirolHover from './assets/images/Tirol/HoveringTile.png';
import thyssenInfraHover from './assets/images/ThyssenInfrastructure/HoverTile.png';
import trikottaufeHover from './assets/images/Trikottaufe/HoverTile.png';

function Home() {
  const aboutScrollRef = useRef(null);
  const projectsSectionRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const updateTileSize = () => {
      const grid = gridRef.current;
      if (!grid) return;

      const gridWidth = grid.offsetWidth;
      const computedStyle = window.getComputedStyle(grid);

      const colCount = computedStyle
        .getPropertyValue("grid-template-columns")
        .split(" ")
        .length;

      const gap = parseFloat(computedStyle.getPropertyValue("gap")) || 0;
      const totalGap = gap * (colCount - 1);
      const tileSize = (gridWidth - totalGap) / colCount;

      grid.style.setProperty("--tile-size", `${tileSize}px`);
    };

    updateTileSize();

    window.addEventListener("resize", updateTileSize);
    return () => window.removeEventListener("resize", updateTileSize);
  }, []);

  const scrollToProjectGrid = () => {
    projectsSectionRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    });
  };

  const scrollToAbout = () => {
    aboutScrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const projects = [
    { path: '/flamecoach', label: 'Flamecoach', img: flamecoachThumb, hoverImg: flamecoachHover },
    { path: '/flamecoach2', label: 'Flamecoach 2', img: flamecoach2Thumb, hoverImg: flamecoach2Hover },
    { path: '/aufwind', label: 'Aufwind', img: aufwindThumb, hoverImg: aufwindHover },
    { path: '/oddy', label: 'Oddy VR', img: oddyThumb, hoverImg: oddyHover },
    { path: '/vodafoneomr', label: 'Vodafone OMR', img: vodafoneOMRThumb, hoverImg: vodafoneOMRHover },
    { path: '/vodafonegigacar', label: 'Vodafone 5G Car', img: vodafoneGigacarThumb, hoverImg: vodafoneGigacarHover },
    { path: '/softrevision', label: 'Soft Revision', img: softrevisionThumb, hoverImg: softrevisionHover },
    { path: '/schumann', label: 'Schumann VR', img: schumannThumb, hoverImg: schumannHover },
    { path: '/essencityguide', label: 'Essen 1887', img: essenThumb, hoverImg: essenHover },
    { path: '/tirol', label: 'Experience Tirol', img: tirolThumb, hoverImg: tirolHover },
    { path: '/terrainfra', label: 'Terra Infrastructure', img: thyssenInfraThumb, hoverImg: thyssenInfraHover },
    { path: '/trikottaufe', label: 'Fortuna Trikottaufe', img: trikottaufeThumb, hoverImg: trikottaufeHover }
  ];

  return (
    <>
      <div className="hero-section">
        <div className="hero-screen">
          <div className="hero-left">
            <HomeSelection onClickProjekte={scrollToProjectGrid} onClickAbout={scrollToAbout} />
          </div>
          <div className="hero-right">
            <div className="hero-text-block">
              <p className="hero-headline">Madeleine Lynen</p>
              <p className="hero-subline">
                Software Developer mit Fokus auf die Unity Engine und die Entwicklung von XR- und Mobile Projekten
              </p>
            </div>
            <div className="stats-row">
              <AnimatedNumberBlock
                max={20}
                suffix="+"
                text="Projekte erfolgreich abgeschlossen"
              />
              <AnimatedNumberBlock
                max={6}
                suffix="+"
                text="Jahre Berufserfahrung"
              />
            </div>
          </div>
        </div>
      </div>

      <div ref={aboutScrollRef}>
        <About />
      </div>

      <div className="projects-section" ref={projectsSectionRef}>
        <h2 className="projects-heading">
          Projektauszug
        </h2>

<div className="projects-grid" ref={gridRef}>
  {projects.map((proj, i) => (
    <Link to={proj.path} key={i} className="home-tile">
      <img src={proj.img} alt={proj.label} className="tile-img default" />
      <img src={proj.hoverImg} alt={`${proj.label} Hover`} className="tile-img hover" />
      <div className="tile-overlay">
        <span className="tile-label">{proj.label}</span>
      </div>
    </Link>
  ))}
</div>
       
      </div>
    </>
  );
}

export default Home;
