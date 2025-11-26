
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import StudentDashboard from "../src/pages/StudentDashborad";
import ClubDashboard from "../src/pages/ClupDashboard";

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
  };

  return (
    <Router>
      <Routes>
        {/* Ana sayfa */}
        <Route path="/" element={<HomePage />} />

        {/* Login */}
        <Route path="/login" element={<SignInPage onLogin={handleLogin} />} />

        {/* SignUp */}
        <Route path="/signup" element={<SignUpPage />} />

        {/* Öğrenci dashboard (private) */}
        <Route
          path="/student"
          element={
            <PrivateRoute user={user} allowedType="student">
              <StudentDashboard user={user} onLogout={handleLogout} />
            </PrivateRoute>
          }
        />

        {/* Kulüp dashboard (private) */}
        <Route
          path="/club"
          element={
            <PrivateRoute user={user} allowedType="club">
              <ClubDashboard user={user} onLogout={handleLogout} />
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
