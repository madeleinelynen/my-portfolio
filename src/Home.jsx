import { Link } from 'react-router-dom';
import './Home.css';

import flamecoachThumb from './assets/images/Flamecoach/Tile.png';
import flamecoach2Thumb from './assets/images/Flamecoach2/Flamecoach2Tile.png';
import aufwindThumb from './assets/images/Aufwind/Tile.png';
import oddyThumb from './assets/images/Oddy/OddyTile.png';
import vodafoneOMRThumb from './assets/images/VodafoneOMR/Tile.png';
import softrevisionThumb from './assets/images/SoftRevision/Tile.png';
import schumannThumb from './assets/images/Schumann/Tile.png';
import essenThumb from './assets/images/Schumann/Tile.png';
import tirolThumb from './assets/images/Schumann/Tile.png';
import trikottaufeThumb from './assets/images/Trikottaufe/Tile.png';

import flamecoachHover from './assets/images/Flamecoach/HoverTile.png';
import flamecoach2Hover from './assets/images/Flamecoach2/Flamecoach2HoverTile.png';
import aufwindHover from './assets/images/Aufwind/HoverTile.png';
import oddyHover from './assets/images/Oddy/OddyHoveringTile.png';
import vodafoneOMRHover from './assets/images/VodafoneOMR/HoverTile.png';
import softrevisionHover from './assets/images/SoftRevision/HoverTile.png';
import schumannHover from './assets/images/Schumann/Tile.png';
import essenHover from './assets/images/Schumann/Tile.png';
import tirolHover from './assets/images/Schumann/Tile.png';
import trikottaufeHover from './assets/images/Trikottaufe/HoverTile.png';

function Home() {
  const tilesPerRow = 3;

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
    label: 'Tirol Experience',
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
    <div
      className="home-grid"
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${tilesPerRow}, 1fr)`,
        gap: '0rem',
        width: '100vw'
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
    </div>
  );
}

export default Home;
