import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate import edildi
import BackgroundWrapper from "../components/BackgroundWrapper";
import SignUpForm from "../components/forms/SignUpForm";
import { signupStudent, signupClub } from "../api/auth";
import "../components/forms/Auth.css"; // CSS dosyasını import et

const SignUpPage = () => {
  const navigate = useNavigate(); // navigate tanımlandı
  const [formData, setFormData] = useState({
    type: "",
    email: "",
    password: "",
    name: "",
    nick_name: "",
    number: "",
    department: "",
    term: "",
    description: "",
  });
  const [userType, setUserType] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
    if (name === "type") setUserType(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      let res;
      if (userType === "student") {
        const studentData = {
          email: formData.email,
          password: formData.password,
          name: formData.name,
          nick_name: formData.nick_name,
          number: formData.number,
          department: formData.department,
          term: formData.term,
        };
        res = await signupStudent(studentData);
      } else if (userType === "club") {
        const clubData = {
          email: formData.email,
          password: formData.password,
          name: formData.name,
          description: formData.description,
        };
        res = await signupClub(clubData);
      }

      setMessage(res.message || "Kayıt başarılı!");
      // Formu temizle
      setFormData({
        type: "", email: "", password: "", name: "", nick_name: "",
        number: "", department: "", term: "", description: "",
      });
      setUserType("");
      
    } catch (error) {
      console.error(error);
      setMessage(error.message || "Kayıt sırasında bir hata oluştu");
    }
  };

  return (
    <BackgroundWrapper image="ytu.jpg">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          padding: "20px",
        }}
      >
        <div
          style={{
            width: "380px",
            backgroundColor: "rgba(255,255,255,0.95)",
            padding: "30px",
            borderRadius: "12px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
          }}
        >
          <h1 style={{ textAlign: "center", marginBottom: "25px", color: "#333" }}>
            Kayıt Ol
          </h1>
  
          <SignUpForm
            formData={formData}
            onChange={handleChange}
            onSubmit={handleSubmit}
            userType={userType}
          />

          {/* YENİ EKLENEN GERİ DÖN BUTONU */}
          <button 
            className="auth-back-button" 
            onClick={() => navigate("/")}
          >
            ← Ana Sayfaya Dön
          </button>
  
          {message && (
            <p
              style={{
                marginTop: "20px",
                backgroundColor: message.includes("hata") ? "rgba(231, 76, 60, 0.1)" : "rgba(46, 204, 113, 0.1)",
                padding: "10px",
                borderRadius: "8px",
                textAlign: "center",
                color: message.includes("hata") ? "#c0392b" : "#27ae60",
                fontSize: "14px",
                fontWeight: "500"
              }}
            >
              {message}
            </p>
          )}
        </div>
      </div>
    </BackgroundWrapper>
  );
};

export default SignUpPage;
