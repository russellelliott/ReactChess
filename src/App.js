import logo from './logo.svg';
import './App.css';
import Board1 from "./boards/board1";
import DecayChess from "./boards/DecayChess";
import Home from "./Home"

//For the router/navbar stuff
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
        <nav>
          <Link to="/"> Home </Link>
          <Link to="/board1"> Board1</Link>
          <Link to="/DecayChess"> Decay Chess</Link>
                  
        </nav>
        <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/board1" element={ <Board1 /> } />
              <Route path="/DecayChess" element={ <DecayChess /> } />
        </Routes>
      </Router>
   
  );
}

export default App;
