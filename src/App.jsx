import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import VistaInicio from './vistas/vistaInicio';
import VistaJuego from './vistas/vistaJuego';
import VistaPartidas from './vistas/vistaPartidas';
import VistaRanking from './vistas/vistaRanking';
import { PartidasProvider } from './vistas/PartidasContext';

function App() {
  return (
    <PartidasProvider>
      <Router>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
          <div className="container-fluid">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item"><Link className="nav-link" to="/">Inicio</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/juego">Juego</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/partidas">Partidas</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/ranking">Ranking</Link></li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<VistaInicio />} />
            <Route path="/juego" element={<VistaJuego />} />
            <Route path="/partidas" element={<VistaPartidas />} />
            <Route path="/ranking" element={<VistaRanking />} />
          </Routes>
        </div>
      </Router>
    </PartidasProvider>
  );
}

export default App;