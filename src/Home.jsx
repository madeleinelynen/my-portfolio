import './Home.css';
import './style.css';

import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { images } from './data/tileThumbnails';
import { useLanguage } from './LanguageContext';

import About from './About';
import AnimatedNumberBlock from './components/AnimatedNumberBlock';
import HomeSelection from './HomeSelection';
import LanguageController from './LanguageController';

function Home() {
  const { t } = useLanguage();
  const aboutScrollRef = useRef(null);
  const projectsSectionRef = useRef(null);
  const gridRef = useRef(null);

 useEffect(() => {
  const grid = gridRef.current;
  if (!grid) return;

  const updateTileSize = () => {
    const gridWidth = grid.offsetWidth;
    const computedStyle = window.getComputedStyle(grid);

    const colCount = computedStyle
      .getPropertyValue("grid-template-columns")
      .split(" ")
      .length;

    const gap = parseFloat(computedStyle.getPropertyValue("gap")) || 0;
    const totalGap = gap * (colCount - 1);
    const tileSize = (gridWidth - totalGap) / colCount;

    requestAnimationFrame(() => {
      grid.style.setProperty("--tile-size", `${tileSize}px`);
    });
  };

  updateTileSize();

  const resizeObserver = new ResizeObserver(() => updateTileSize());
  resizeObserver.observe(grid);

  return () => resizeObserver.disconnect(); }, []);

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
  { path: '/flamecoach', label: 'Flamecoach', img: images.flamecoach.tile, hoverImg: images.flamecoach.hoveredTile },
  { path: '/flamecoach2', label: 'Flamecoach 2', img: images.flamecoach2.tile, hoverImg: images.flamecoach2.hoveredTile },
  { path: '/aufwind', label: 'Aufwind', img: images.aufwind.tile, hoverImg: images.aufwind.hoveredTile },
  { path: '/oddy', label: 'Oddy VR', img: images.oddy.tile, hoverImg: images.oddy.hoveredTile },
  { path: '/vodafoneomr', label: 'Vodafone OMR', img: images.vodafoneOMR.tile, hoverImg: images.vodafoneOMR.hoveredTile },
  { path: '/vodafonegigacar', label: 'Vodafone 5G Car', img: images.vodafoneGigacar.tile, hoverImg: images.vodafoneGigacar.hoveredTile },
  { path: '/softrevision', label: 'Soft Revision', img: images.softrevision.tile, hoverImg: images.softrevision.hoveredTile },
  { path: '/schumann', label: 'Schumann VR', img: images.schumann.tile, hoverImg: images.schumann.hoveredTile },
  { path: '/essencityguide', label: 'Essen 1887', img: images.essen.tile, hoverImg: images.essen.hoveredTile },
  { path: '/tirol', label: 'Experience Tirol', img: images.tirol.tile, hoverImg: images.tirol.hoveredTile },
  { path: '/terrainfra', label: 'Terra Infrastructure', img: images.thyssenInfra.tile, hoverImg: images.thyssenInfra.hoveredTile },
  { path: '/trikottaufe', label: 'Fortuna Trikottaufe', img: images.trikottaufe.tile, hoverImg: images.trikottaufe.hoveredTile }
];

return (
  <>
  <div className="hero-section">      
    <div className="hero-screen">

      <div className="language-controller-bar">
      <LanguageController /> 
      </div>

    <div className="hero-body">
      <div className="hero-left">
        <HomeSelection onClickProjekte={scrollToProjectGrid} onClickAbout={scrollToAbout} />
      </div>
      <div className="hero-right">
        <div className="hero-right-block">
          <div className="hero-text-block">
          <p className="hero-headline">Madeleine Lynen</p>
           <p className="hero-subline"> {t('home', 'subline')} </p>
          </div>
          <div className="stats-row">
          <AnimatedNumberBlock
            max={20}
            suffix="+"
            text={t('home', 'numberBlockProjects')}
          />
          <AnimatedNumberBlock
            max={6}
            suffix="+"
            text={t('home', 'numberBlockExperience')}
          />
          </div>
        </div>
      </div>
    </div>

    </div>
  </div>

  <div ref={aboutScrollRef}>
    <About />
  </div>

  <div className="projects-section" ref={projectsSectionRef}>
    <h2 className="projects-heading">{t('home', 'selectedProjects')}</h2>
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
