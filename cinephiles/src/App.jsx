import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import StartPage from "./Pages/StartPage";
import MoviesPage from "./Pages/MoviesPage";
import MovieDetail from "./Pages/MovieDetail";
import SignupPage from "./Pages/SignupPage";
import LoginPage from "./Pages/LoginPage";
import MyAccountPage from "./Pages/MyAccountPage";
import ProfileView from "./Pages/account/ProfileView";
import EditProfilePage from "./Pages/account/EditProfilePage";
import CategoriesPage from "./Pages/account/CategoriesPage";
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
      <Route
        path="/movie/:imdbId"
        element={
          <RequireAuth>
            <MovieDetail />
          </RequireAuth>
        }
      />
      <Route
        path="/account"
        element={
          <RequireAuth>
            <MyAccountPage />
          </RequireAuth>
        }
      >
        <Route index element={<ProfileView />} />
        <Route path="edit" element={<EditProfilePage />} />
        <Route path="categories" element={<Navigate to="favorites" replace />} />
        <Route path="categories/:categoryId" element={<CategoriesPage />} />
      </Route>
    </Routes>
  );
}

export default App;
