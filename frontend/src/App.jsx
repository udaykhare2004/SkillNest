import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./components/Navbar.jsx";
import ToastProvider, { useToast } from "./components/ToastProvider.jsx";
import Landing from "./pages/Landing.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import AdminCourses from "./pages/AdminCourses.jsx";
import CourseDetail from "./pages/CourseDetail.jsx";

export const API_BASE_URL = "https://skillnest-mbor.onrender.com/api";

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("skillnest_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const AppInner = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { showToast } = useToast();

  useEffect(() => {
    const token = localStorage.getItem("skillnest_token");
    const userStr = localStorage.getItem("skillnest_user");
    if (token && userStr) {
      try {
        setUser(JSON.parse(userStr));
      } catch {
        localStorage.removeItem("skillnest_token");
        localStorage.removeItem("skillnest_user");
      }
    }
  }, []);

  const handleAuthSuccess = (data) => {
    localStorage.setItem("skillnest_token", data.token);
    localStorage.setItem("skillnest_user", JSON.stringify(data.user));
    setUser(data.user);
    showToast("Welcome to SkillNest ✨", "success");
    navigate("/dashboard");
  };

  const handleLogout = () => {
    localStorage.removeItem("skillnest_token");
    localStorage.removeItem("skillnest_user");
    setUser(null);
    showToast("You have been logged out.", "info");
    navigate("/");
  };

  return (
    <div className="app-container">
      <Navbar user={user} onLogout={handleLogout} />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/courses" element={<Home user={user} />} />
          <Route path="/courses/:id" element={<CourseDetail user={user} />} />
          <Route
            path="/login"
            element={user ? <Navigate to="/dashboard" /> : <Login onAuth={handleAuthSuccess} />}
          />
          <Route
            path="/register"
            element={user ? <Navigate to="/dashboard" /> : <Register onAuth={handleAuthSuccess} />}
          />
          <Route path="/dashboard" element={user ? <Dashboard user={user} /> : <Navigate to="/login" />} />
          <Route path="/admin/courses" element={user && user.isAdmin ? <AdminCourses /> : <Navigate to="/" />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  );
};

const App = () => (
  <ToastProvider>
    <AppInner />
  </ToastProvider>
);

export default App;

