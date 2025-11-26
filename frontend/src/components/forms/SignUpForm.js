/*import React from "react";
import UserTypeSelect from "../inputs/UserTypeSelect";

const SignUpForm = ({ formData, onChange, onSubmit }) => (
  <form onSubmit={onSubmit}>
    <UserTypeSelect value={formData.type} onChange={(val) => onChange("type", val)} />

    <input
      type="email"
      name="email"
      placeholder="Email"
      value={formData.email || ""}
      onChange={(e) => onChange(e.target.name, e.target.value)}
      required
    />
    <input
      type="text"
      name="username"
      placeholder="Username"
      value={formData.username || ""}
      onChange={(e) => onChange(e.target.name, e.target.value)}
      required
    />
    <input
      type="password"
      name="password"
      placeholder="Password"
      value={formData.password || ""}
      onChange={(e) => onChange(e.target.name, e.target.value)}
      required
    />

    {formData.type === "student" && (
      <>
        <input
          type="text"
          name="student_number"
          placeholder="Student Number"
          value={formData.student_number || ""}
          onChange={(e) => onChange(e.target.name, e.target.value)}
          required
        />
        <input
          type="text"
          name="department"
          placeholder="Department"
          value={formData.department || ""}
          onChange={(e) => onChange(e.target.name, e.target.value)}
          required
        />
      </>
    )}

    {formData.type === "club" && (
      <>
        <input
          type="text"
          name="club_name"
          placeholder="Club Name"
          value={formData.club_name || ""}
          onChange={(e) => onChange(e.target.name, e.target.value)}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description || ""}
          onChange={(e) => onChange(e.target.name, e.target.value)}
        />
      </>
    )}

    <button type="submit">Sign Up</button>
  </form>
);

export default SignUpForm;
*/

import React, { useState } from "react";
import UserTypeSelect from "../inputs/UserTypeSelect";

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
      // description opsiyonel
    }

    setLocalErrors(errors);

    if (Object.keys(errors).length === 0) {
      onSubmit(e); // Parent component fonksiyonunu çağır
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <UserTypeSelect
        value={userType}
        onChange={(val) => onChange("type", val)}
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email || ""}
        onChange={(e) => onChange(e.target.name, e.target.value)}
      />
      {localErrors.email && <p style={{ color: "red" }}>{localErrors.email}</p>}

      <input
        type="password"
        name="password"
        placeholder="Şifre"
        value={formData.password || ""}
        onChange={(e) => onChange(e.target.name, e.target.value)}
      />
      {localErrors.password && <p style={{ color: "red" }}>{localErrors.password}</p>}

      {userType === "student" && (
        <>
          <input
            type="text"
            name="name"
            placeholder="İsim"
            value={formData.name || ""}
            onChange={(e) => onChange(e.target.name, e.target.value)}
          />
          {localErrors.name && <p style={{ color: "red" }}>{localErrors.name}</p>}

          <input
            type="text"
            name="nick_name"
            placeholder="Rumuz"
            value={formData.nick_name || ""}
            onChange={(e) => onChange(e.target.name, e.target.value)}
          />
          {localErrors.nick_name && <p style={{ color: "red" }}>{localErrors.nick_name}</p>}

          <input
            type="text"
            name="number"
            placeholder="Öğrenci Numarası"
            value={formData.number || ""}
            onChange={(e) => onChange(e.target.name, e.target.value)}
          />
          {localErrors.number && <p style={{ color: "red" }}>{localErrors.number}</p>}

          <input
            type="text"
            name="department"
            placeholder="Bölüm"
            value={formData.department || ""}
            onChange={(e) => onChange(e.target.name, e.target.value)}
          />
          {localErrors.department && <p style={{ color: "red" }}>{localErrors.department}</p>}

          <input
            type="number"
            name="term"
            placeholder="Sınıf"
            value={formData.term || ""}
            onChange={(e) => onChange(e.target.name, e.target.value)}
          />
          {localErrors.term && <p style={{ color: "red" }}>{localErrors.term}</p>}
        </>
      )}

      {userType === "club" && (
        <>
          <input
            type="text"
            name="name"
            placeholder="Kulüp Adı"
            value={formData.name || ""}
            onChange={(e) => onChange(e.target.name, e.target.value)}
          />
          {localErrors.name && <p style={{ color: "red" }}>{localErrors.name}</p>}

          <textarea
            name="description"
            placeholder="Açıklama (opsiyonel)"
            value={formData.description || ""}
            onChange={(e) => onChange(e.target.name, e.target.value)}
          />
        </>
      )}

      <button type="submit">Kayıt Ol</button>
    </form>
  );
};

export default SignUpForm;
