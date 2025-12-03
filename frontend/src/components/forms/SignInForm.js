import React from "react";
import "./Auth.css"; // CSS dosyasını import et

const SignInForm = ({ formData, onChange, onSubmit }) => (
  <form className="auth-form" onSubmit={onSubmit}>
    <input
      className="auth-input"
      type="email"
      name="email"
      placeholder="E-posta Adresi"
      value={formData.email || ""}
      onChange={(e) => onChange(e.target.name, e.target.value)}
      required
    />
    <input
      className="auth-input"
      type="password"
      name="password"
      placeholder="Şifre"
      value={formData.password || ""}
      onChange={(e) => onChange(e.target.name, e.target.value)}
      required
    />
    <button className="auth-button" type="submit">Giriş Yap</button>
  </form>
);

export default SignInForm;
