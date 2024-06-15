import "./styles.css";
import * as React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import ListDisplay from "./ListDisplay";
import MovieDetails from "./MovieDetails";
import { MovieContext } from "./Context";

export default function App() {
  const [movieItems, setMovieItems] = React.useState([]);
  return (
    <div className="App">
      <MovieContext.Provider value={[movieItems, setMovieItems]}>
        <Router>
          <div>
            <nav>
              <ul>
                <Link to="/">Dashboard</Link>
                <div></div>
                <Link to="/listDisplay">DisplayPage</Link>
              </ul>
            </nav>
            <Routes>
              <Route path="/" element={<>Dashboard </>} />
              <Route path="/listDisplay" element={<ListDisplay />} />
              <Route path="/movieDetails" element={<MovieDetails />} />
            </Routes>
          </div>
        </Router>
      </MovieContext.Provider>
    </div>
  );
}
