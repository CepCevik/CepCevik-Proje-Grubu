import React, { useState } from "react";
import BackgroundWrapper from "../components/BackgroundWrapper";
import SignUpForm from "../components/forms/SignUpForm";
import { signupStudent, signupClub } from "../api/auth";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    type: "",
    email: "",
    password: "",
    // student
    name: "",
    nick_name: "",
    number: "",
    department: "",
    term: "",
    // club
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
      setFormData({
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
      setUserType("");
    } catch (error) {
      console.error(error);
      setMessage(
        error.message || "Kayıt sırasında bir hata oluştu"
      );
    }
  };
/*
  return (
    <BackgroundWrapper image="ytu.jpg">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          color: "#fff",
          textAlign: "center",
          padding: "20px",
        }}
      >
        <h1>Kayıt Ol</h1>
        <SignUpForm
          formData={formData}
          onChange={handleChange}
          onSubmit={handleSubmit}
          userType={userType}
        />
        {message && (
          <p
            style={{
              marginTop: "20px",
              backgroundColor: "rgba(0,0,0,0.6)",
              padding: "10px 20px",
              borderRadius: "8px",
              display: "inline-block",
            }}
          >
            {message}
          </p>
        )}
      </div>
    </BackgroundWrapper>
  );
  */
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
        {/* BEYAZ KUTU */}
        <div
          style={{
            width: "380px",
            backgroundColor: "white",
            padding: "30px",
            borderRadius: "12px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
          }}
        >
          <h1
            style={{
              textAlign: "center",
              marginBottom: "20px",
              color: "#333",
            }}
          >
            Kayıt Ol
          </h1>
  
          <SignUpForm
            formData={formData}
            onChange={handleChange}
            onSubmit={handleSubmit}
            userType={userType}
          />
  
          {message && (
            <p
              style={{
                marginTop: "20px",
                backgroundColor: "rgba(0, 100, 0, 0.1)",
                padding: "10px",
                borderRadius: "8px",
                textAlign: "center",
                color: "green",
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
