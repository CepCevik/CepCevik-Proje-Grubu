import React from "react";

const SignInForm = ({ formData, onChange, onSubmit }) => (
  <form onSubmit={onSubmit}>
    <input
      type="email"
      name="email"
      placeholder="Email"
      value={formData.email || ""}
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
    <button type="submit">Login</button>
  </form>
);

export default SignInForm;
