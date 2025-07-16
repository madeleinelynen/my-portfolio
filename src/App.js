import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import './App.css';
import './style.css';

import FlamecoachPage from './pages/FlamecoachPage';
import Flamecoach2Page from './pages/Flamecoach2Page';
import AufwindPage from './pages/AufwindPage';
import OddyPage from './pages/OddyPage';
import VodafoneOMRPage from './pages/VodafoneOMRPage';
import VodafoneGigacarPage from './pages/VodafoneGigacar';
import SoftRevisionPage from './pages/SoftRevisionPage';
import SchumannPage from './pages/SchumannPage';
import EssenCityguide from './pages/EssenCityguide';
import TirolPage from './pages/Tirol';
import ThyssenInfrastructurePage from './pages/ThyssenInfrastructurePage';
import TrikottaufePage from './pages/TrikottaufePage';

import React from 'react';
import ReactDOM from 'react-dom';


function App() {
  return (
    <Router>
      <div className="main-layout-wrapper">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/flamecoach" element={<FlamecoachPage />} />
          <Route path="/flamecoach2" element={<Flamecoach2Page />} />
          <Route path="/aufwind" element={<AufwindPage />} />
          <Route path="/oddy" element={<OddyPage />} />
          <Route path="/vodafoneomr" element={<VodafoneOMRPage />} />
          <Route path="/vodafonegigacar" element={<VodafoneGigacarPage />} />
          <Route path="/softrevision" element={<SoftRevisionPage />} />
          <Route path="/schumann" element={<SchumannPage />} />
          <Route path="/essencityguide" element={<EssenCityguide />} />
          <Route path="/tirol" element={<TirolPage />} />
          <Route path="/terrainfra" element={<ThyssenInfrastructurePage />} />
          <Route path="/trikottaufe" element={<TrikottaufePage />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;
