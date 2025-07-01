import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import './App.css';
import './style.css';
import FlamecoachPage from './Pages/FlamecoachPage';
import Flamecoach2Page from './Pages/Flamecoach2Page';
import AufwindPage from './Pages/AufwindPage';
import OddyPage from './Pages/OddyPage';
import VodafoneOMRPage from './Pages/VodafoneOMRPage';
import SoftRevisionPage from './Pages/SoftRevisionPage';
import SchumannPage from './Pages/SchumannPage';
import EssenCityguide from './Pages/EssenCityguide';
import TirolPage from './Pages/Tirol';
import TrikottaufePage from './Pages/TrikottaufePage';

function App() {
  return (
    <Router basename="/my-portfolio">
      <div className="main-layout-wrapper">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/flamecoach" element={<FlamecoachPage />} />
          <Route path="/flamecoach2" element={<Flamecoach2Page />} />
          <Route path="/aufwind" element={<AufwindPage />} />
          <Route path="/oddy" element={<OddyPage />} />
          <Route path="/vodafoneomr" element={<VodafoneOMRPage />} />
          <Route path="/softrevision" element={<SoftRevisionPage />} />
          <Route path="/schumann" element={<SchumannPage />} />
          <Route path="/essencityguide" element={<EssenCityguide />} />
          <Route path="/tirol" element={<TirolPage />} />
          <Route path="/trikottaufe" element={<TrikottaufePage />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;
