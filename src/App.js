import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FlamecoachPage from './Pages/FlamecoachPage';
import Flamecoach2Page from './Pages/Flamecoach2Page';
import AufwindPage from './Pages/AufwindPage';
import './App.css';
import Header from './Header';

function Home() {
  return <h2>Software Developer</h2>;
}

function Flamecoach() {
  return (
    <>
      <FlamecoachPage/>
    </>
  );
}

function Flamecoach2() {
  return (<>
    <Flamecoach2Page/>
  </>);
}

function Aufwind() {
  return (  <>
    <AufwindPage/>
  </>);
}

function Oddy() {
  return <h2>Oddy</h2>;
}

function VodafoneOMR() {
  return <h2>Vodafone OMR</h2>;
}

function SoftRevision() {
  return <h2>Soft Revision</h2>;
}

function VodafoneCar() {
  return <h2>Vodafone 5GCar</h2>;
}

function App() {
  return (
    <Router basename="/my-portfolio">
      <div className="App">
        <Header />        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/flamecoach" element={<Flamecoach />} />
          <Route path="/flamecoach2" element={<Flamecoach2 />} />
          <Route path="/aufwind" element={<Aufwind />} />
          <Route path="/oddy" element={<Oddy />} />
          <Route path="/vodafoneomr" element={<VodafoneOMR />} />
          <Route path="/softrevision" element={<SoftRevision />} />
          <Route path="/vodafonecar" element={<VodafoneCar />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
