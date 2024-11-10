import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import Starships from './assets/Starships'
import StarshipDetail from './assets/StarshipDetail';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Starships />} />
        <Route path="/starship/:id" element={<StarshipDetail/>} />
      </Routes>
    </Router>
  );
}

export default App
