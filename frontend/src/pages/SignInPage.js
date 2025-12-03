import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate import edildi
import SignInForm from "../components/forms/SignInForm";
import { loginUser } from "../api/auth";
import ytuImage from "../components/ytu.jpg"; 
import "../components/forms/Auth.css"; // CSS dosyasını import et

const SignInPage = ({ onLogin }) => {
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (name, value) =>
    setFormData({ ...formData, [name]: value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(formData);

      if (!res.role || !res.token) {
        setMessage("Sunucu role veya token göndermedi.");
        return;
      }

      onLogin({ role: res.role, token: res.token, type: res.role });

      localStorage.setItem("token", res.token);
      localStorage.setItem("role", res.role);
      localStorage.setItem("user", JSON.stringify({ role: res.role, token: res.token, type: res.role }));

      setMessage("Giriş başarılı!");

      if (res.role === "student") {
        navigate("/student");
      } else if (res.role === "club") {
        navigate("/club");
      } else {
        setMessage("Bilinmeyen kullanıcı tipi.");
      }

    } catch (err) {
      setMessage("Login başarısız.");
      console.error(err);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${ytuImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(255,255,255,0.95)", // Okunurluk için opaklığı artırdım
          padding: "40px",
          borderRadius: "12px",
          width: "350px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.2)", // Gölgeyi biraz daha belirginleştirdim
          textAlign: "center",
        }}
      >
        <h2 style={{ marginBottom: "25px", color: "#333" }}>Giriş Yap</h2>

        <SignInForm
          formData={formData}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />

        {/* YENİ EKLENEN GERİ DÖN BUTONU */}
        <button 
          className="auth-back-button" 
          onClick={() => navigate("/")}
        >
          ← Ana Sayfaya Dön
        </button>

        {message && (
          <p style={{ marginTop: "15px", color: "#e74c3c", fontWeight: "500", fontSize: "14px" }}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default SignInPage;
