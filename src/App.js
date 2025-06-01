import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom'
import FlamecoachPage from './Pages/FlamecoachPage';
import Flamecoach2Page from './Pages/Flamecoach2Page';
import AufwindPage from './Pages/AufwindPage';
import OddyPage from './Pages/OddyPage';
import Home from './Home';
import Header from './Header';
import './App.css';

function App() {
  return (
    <Router basename="/my-portfolio">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/flamecoach" element={<FlamecoachPage />} />
        <Route path="/flamecoach2" element={<Flamecoach2Page />} />
        <Route path="/aufwind" element={<AufwindPage />} />
        <Route path="/oddy" element={<OddyPage />} />
      </Routes>
    </Router>
  );
}

export default App;
