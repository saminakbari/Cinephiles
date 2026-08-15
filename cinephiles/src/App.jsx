import { Routes, Route } from "react-router-dom";
import "./App.css";
import StartPage from "./Pages/StartPage";
import MoviesPage from "./Pages/MoviesPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<StartPage />} />
      <Route path="/movies" element={<MoviesPage />} />
    </Routes>
  );
}

export default App;