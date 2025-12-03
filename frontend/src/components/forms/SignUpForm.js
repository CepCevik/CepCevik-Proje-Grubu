import React, { useState } from "react";
import UserTypeSelect from "../inputs/UserTypeSelect";
import "./Auth.css"; // CSS dosyasını import et

const SignUpForm = ({ formData, onChange, onSubmit, userType }) => {
  const [localErrors, setLocalErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    let errors = {};
    if (!formData.email) errors.email = "Email zorunlu";
    if (!formData.password) errors.password = "Şifre zorunlu";

    if (userType === "student") {
      if (!formData.name) errors.name = "İsim zorunlu";
      if (!formData.nick_name) errors.nick_name = "Rumuz zorunlu";
      if (!formData.number) errors.number = "Öğrenci numarası zorunlu";
      if (!formData.department) errors.department = "Bölüm zorunlu";
      if (!formData.term) errors.term = "Sınıf zorunlu";
    }

    if (userType === "club") {
      if (!formData.name) errors.name = "Kulüp adı zorunlu";
    }

    setLocalErrors(errors);

    if (Object.keys(errors).length === 0) {
      onSubmit(e);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <UserTypeSelect
        value={userType}
        onChange={(val) => onChange("type", val)}
      />

      <input
        className="auth-input"
        type="email"
        name="email"
        placeholder="E-posta Adresi"
        value={formData.email || ""}
        onChange={(e) => onChange(e.target.name, e.target.value)}
      />
      {localErrors.email && <p className="error-text">{localErrors.email}</p>}

      <input
        className="auth-input"
        type="password"
        name="password"
        placeholder="Şifre"
        value={formData.password || ""}
        onChange={(e) => onChange(e.target.name, e.target.value)}
      />
      {localErrors.password && <p className="error-text">{localErrors.password}</p>}

      {userType === "student" && (
        <>
          <input
            className="auth-input"
            type="text"
            name="name"
            placeholder="İsim Soyisim"
            value={formData.name || ""}
            onChange={(e) => onChange(e.target.name, e.target.value)}
          />
          {localErrors.name && <p className="error-text">{localErrors.name}</p>}

          <input
            className="auth-input"
            type="text"
            name="nick_name"
            placeholder="Rumuz (Nick Name)"
            value={formData.nick_name || ""}
            onChange={(e) => onChange(e.target.name, e.target.value)}
          />
          {localErrors.nick_name && <p className="error-text">{localErrors.nick_name}</p>}

          <input
            className="auth-input"
            type="text"
            name="number"
            placeholder="Öğrenci Numarası"
            value={formData.number || ""}
            onChange={(e) => onChange(e.target.name, e.target.value)}
          />
          {localErrors.number && <p className="error-text">{localErrors.number}</p>}

          <input
            className="auth-input"
            type="text"
            name="department"
            placeholder="Bölüm"
            value={formData.department || ""}
            onChange={(e) => onChange(e.target.name, e.target.value)}
          />
          {localErrors.department && <p className="error-text">{localErrors.department}</p>}

          <input
            className="auth-input"
            type="number"
            name="term"
            placeholder="Sınıf (Örn: 1, 2, 3, 4)"
            value={formData.term || ""}
            onChange={(e) => onChange(e.target.name, e.target.value)}
          />
          {localErrors.term && <p className="error-text">{localErrors.term}</p>}
        </>
      )}

      {userType === "club" && (
        <>
          <input
            className="auth-input"
            type="text"
            name="name"
            placeholder="Kulüp Adı"
            value={formData.name || ""}
            onChange={(e) => onChange(e.target.name, e.target.value)}
          />
          {localErrors.name && <p className="error-text">{localErrors.name}</p>}

          <textarea
            className="auth-input"
            name="description"
            placeholder="Kulüp Açıklaması (Opsiyonel)"
            value={formData.description || ""}
            onChange={(e) => onChange(e.target.name, e.target.value)}
          />
        </>
      )}

      <button className="auth-button" type="submit">Kayıt Ol</button>
    </form>
  );
};

export default SignUpForm;
