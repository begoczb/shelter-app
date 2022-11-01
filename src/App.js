import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage.jsx";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import RoomPage from "./pages/RoomPage";
import Layout from "./pages/Layout";
import ListingsPage from "./pages/ListingsPage";
import IsPrivate from "./components/IsPrivate";
import IsAnonymous from "./components/IsAnonymous";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/signup"
          element={
            <IsAnonymous>
              <SignupPage />
            </IsAnonymous>
          }
        />
        <Route
          path="/login"
          element={
            <IsAnonymous>
              <LoginPage />
            </IsAnonymous>
          }
        />
        <Route path="" element={<Layout />}>
          <Route
            path="/profile"
            element={
              <IsPrivate>
                <ProfilePage />
              </IsPrivate>
            }
          />
          <Route
            path="/listings"
            element={
              <IsPrivate>
                <ListingsPage />
              </IsPrivate>
            }
          />
          <Route
            path="/room/:id"
            element={
              <IsPrivate>
                <RoomPage />
              </IsPrivate>
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
