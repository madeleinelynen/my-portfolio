import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import RouteSet from './RouteSet';

function App() {
  return (
    <Router basename="/">
      <Routes>
        <Route path="/" element={<Navigate to="/de" replace />} />
        <Route path="/:lang/*" element={<RouteSet />} />
      </Routes>
    </Router>
  );
}

export default App;
