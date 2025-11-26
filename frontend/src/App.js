// frontend/src/App.js

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import StudentDashboard from "../src/pages/StudentDashborad";
import ClubDashboard from "../src/pages/ClupDashboard";
import ProfilePage from "./pages/ProfilePage"; // <--- YENİ IMPORT

// Basit PrivateRoute bileşeni
const PrivateRoute = ({ user, children, allowedType }) => {
  if (!user) {
    return <Navigate to="/login" />;
  }
  if (allowedType && user.type !== allowedType) {
    // yetkisiz kullanıcı dashboarda girmeye çalışırsa
    return <Navigate to="/" />;
  }
  return children;
};

const App = () => {
  const [user, setUser] = useState(null);

  // LocalStorage'dan login bilgisi alıp sayfa yenilenince oturumu koruyabiliriz
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    // Çıkış yaptıktan sonra ana sayfaya yönlendir
    window.location.href = "/";
  };

  return (
    <Router>
      <Routes>
        {/* Ana sayfa */}
        <Route path="/" element={<HomePage user={user} />} />

        {/* Login */}
        <Route path="/login" element={<SignInPage onLogin={handleLogin} />} />

        {/* SignUp */}
        <Route path="/signup" element={<SignUpPage />} />

        {/* Öğrenci dashboard (private) */}
        <Route
          path="/student"
          element={
            <PrivateRoute user={user} allowedType="student">
              <StudentDashboard onLogout={handleLogout} />
            </PrivateRoute>
          }
        />

        {/* Kulüp dashboard (private) */}
        <Route
          path="/club"
          element={
            <PrivateRoute user={user} allowedType="club">
              <ClubDashboard onLogout={handleLogout} />
            </PrivateRoute>
          }
        />
        
        {/* Profil Sayfası (private) */}
        <Route 
          path="/profile" 
          element={
            <PrivateRoute user={user}>
              <ProfilePage onLogout={handleLogout} /> 
            </PrivateRoute>
          } 
        />

        {/* Tanımlanmayan rotalar için */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;