import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import './App.css';
import './style.css';

import Flamecoach from './pages/Flamecoach';
import Flamecoach2 from './pages/Flamecoach2';
import Aufwind from './pages/Aufwind';
import OddyVR from './pages/OddyVR';
import VodafoneOMR from './pages/VodafoneOMR';
import Vodafone5GCar from './pages/Vodafone5GCar';
import SoftRevision from './pages/SoftRevision';
import SchumannVR from './pages/SchumannVR';
import Essen1887 from './pages/Essen1887';
import ExperienceTirol from './pages/ExperienceTirol';
import TerraInfrastructure from './pages/TerraInfrastructure';
import Trikottaufe from './pages/Trikottaufe';

function App() {
  return (
    <Router>
      <div className="main-layout-wrapper">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/flamecoach" element={<Flamecoach/>} />
          <Route path="/flamecoach2" element={<Flamecoach2 />} />
          <Route path="/aufwind" element={<Aufwind />} />
          <Route path="/oddy" element={<OddyVR />} />
          <Route path="/vodafoneomr" element={<VodafoneOMR />} />
          <Route path="/vodafonegigacar" element={<Vodafone5GCar />} />
          <Route path="/softrevision" element={<SoftRevision />} />
          <Route path="/schumann" element={<SchumannVR />} />
          <Route path="/essencityguide" element={<Essen1887 />} />
          <Route path="/tirol" element={<ExperienceTirol />} />
          <Route path="/terrainfra" element={<TerraInfrastructure />} />
          <Route path="/trikottaufe" element={<Trikottaufe />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;
