import { Link } from 'react-router-dom';
import './Home.css';

import flamecoachThumb from './assets/images/Flamecoach/FC_Title_Text.png';
import flamecoach2Thumb from './assets/images/Flamecoach2/PortfolioTitle.png';
import aufwindThumb from './assets/images/Aufwind/PortfolioTitle.png';
import oddyThumb from './assets/images/Oddy/PortfolioTitle.png';

import flamecoachHover from './assets/images/Flamecoach/FC_Extinguisher.jpg';
import flamecoach2Hover from './assets/images/Flamecoach2/awg_render.png';
import aufwindHover from './assets/images/Aufwind/PortfolioTitle.png';
import oddyHover from './assets/images/Oddy/PortfolioTitle.png';

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
    label: 'Oddy',
    img: oddyThumb,
    hoverImg: oddyHover
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
