import React from "react";
import "../forms/Auth.css"; // Aynı CSS'i burada da kullanalım

const UserTypeSelect = ({ value, onChange }) => (
  <select 
    className="auth-select" 
    value={value || ""} 
    onChange={(e) => onChange(e.target.value)}
  >
    <option value="">Kullanıcı Tipi Seçiniz</option>
    <option value="student">Öğrenci</option>
    <option value="club">Kulüp</option>
  </select>
);

export default UserTypeSelect;
