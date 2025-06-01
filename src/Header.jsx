import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className="main-header">
      <div className="header-content">
        <div className="title-block">
          <Link to="/" className="home-link">
            <h1 className="name">Madeleine Lynen | Software Developer</h1>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
