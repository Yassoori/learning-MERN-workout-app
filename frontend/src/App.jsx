import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { useAuthContext } from "./hooks/useAuthContext";

// Import Components
import Navbar from "./components/Navbar";
import SingleWorkout from "./pages/SingleWorkout";
// Import Pages
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

function App() {
  const { user } = useAuthContext();

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            {/* if we have a user then show home, else go to login */}
            <Route
              path="/"
              element={user ? <Home /> : <Navigate to="/login" />}
            />
            {/* if we dont have a user then show the login and signup, if we do then show home */}
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/" />}
            />
            <Route
              path="/:id"
              element={user ? <SingleWorkout /> : <Navigate to="/login" />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
