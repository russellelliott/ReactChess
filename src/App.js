import logo from './logo.svg';
import './App.css';
import Board1 from "./boards/board1";

//For the router/navbar stuff
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
        <nav>
          <Link to="/"> Home </Link>
          <Link to="/board1"> Board1</Link>
                  
        </nav>
        <Routes>
              <Route path="/" element={<Board1/>} />
              <Route path="/board1" element={ <Board1 /> } />
        </Routes>
      </Router>
   
  );
}

export default App;
