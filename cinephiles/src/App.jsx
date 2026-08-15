import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import StartPage from "./Pages/StartPage";
import MoviesPage from "./Pages/MoviesPage";
import SignupPage from "./Pages/SignupPage";
import LoginPage from "./Pages/LoginPage";
import { getSession } from "./utils/auth";

function RequireAuth({ children }) {
  return getSession() ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<StartPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/movies"
        element={
          <RequireAuth>
            <MoviesPage />
          </RequireAuth>
        }
      />
    </Routes>
  );
}

export default App;