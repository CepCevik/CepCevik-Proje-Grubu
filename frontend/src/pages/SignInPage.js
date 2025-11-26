
import React, { useState } from "react";
import SignInForm from "../components/forms/SignInForm";
import { loginUser } from "../api/auth";
import ytuImage from "../components/ytu.jpg"; 
import { useNavigate } from "react-router-dom";

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

      // App.js’de user state’ini güncelle
      onLogin({ role: res.role, token: res.token, type: res.role });

      // LocalStorage’a kaydet
      localStorage.setItem("token", res.token);
      localStorage.setItem("role", res.role);
      localStorage.setItem("user", JSON.stringify({ role: res.role, token: res.token, type: res.role }));

      setMessage("Giriş başarılı!");

      // Role’e göre yönlendir
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
          backgroundColor: "rgba(255,255,255,0.85)",
          padding: "40px",
          borderRadius: "10px",
          width: "350px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          textAlign: "center",
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>Sign In</h2>

        <SignInForm
          formData={formData}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />

        {message && (
          <p style={{ marginTop: "10px", color: "red", fontWeight: "bold" }}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default SignInPage;
