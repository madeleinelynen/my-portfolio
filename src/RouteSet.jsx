import { useParams, Navigate, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './LanguageContext';

import Home from './Home';
import Flamecoach from './pages/Flamecoach.jsx';
import Flamecoach2 from './pages/Flamecoach2.jsx';
import Aufwind from './pages/Aufwind.jsx';
import OddyVR from './pages/OddyVR.jsx';
import VodafoneOMR from './pages/VodafoneOMR.jsx';
import Vodafone5GCar from './pages/Vodafone5GCar.jsx';
import SoftRevision from './pages/SoftRevision.jsx';
import SchumannVR from './pages/SchumannVR.jsx';
import Essen1887 from './pages/Essen1887.jsx';
import ExperienceTirol from './pages/ExperienceTirol.jsx';
import TerraInfrastructure from './pages/TerraInfrastructure.jsx';
import Trikottaufe from './pages/Trikottaufe.jsx';

const RouteSet = () => {
  const { lang } = useParams();

  if (!['de', 'en'].includes(lang)) {
    return <Navigate to="/de" replace />;
  }

  return (
    <LanguageProvider initialLang={lang}>
      <div className="main-layout-wrapper">
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="flamecoach" element={<Flamecoach />} />
          <Route path="flamecoach2" element={<Flamecoach2 />} />
          <Route path="aufwind" element={<Aufwind />} />
          <Route path="oddy" element={<OddyVR />} />
          <Route path="vodafoneomr" element={<VodafoneOMR />} />
          <Route path="vodafonegigacar" element={<Vodafone5GCar />} />
          <Route path="softrevision" element={<SoftRevision />} />
          <Route path="schumann" element={<SchumannVR />} />
          <Route path="essencityguide" element={<Essen1887 />} />
          <Route path="tirol" element={<ExperienceTirol />} />
          <Route path="terrainfra" element={<TerraInfrastructure />} />
          <Route path="trikottaufe" element={<Trikottaufe />} />
        </Routes>
      </div>
    </LanguageProvider>
  );
};

export default RouteSet;
