import React, { useState, useEffect } from "react";
import { Routes, useNavigate, useLocation, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

function PrivateRoute({ isAuth, children }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, [isAuth, navigate]);

  return isAuth ? children : null;
}

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    } else {
      if (!location.pathname.includes("register")) {
        navigate("/login");
      }
    }
  }, [navigate, location.pathname]);

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute isAuth={!!token}>
              <Home />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
