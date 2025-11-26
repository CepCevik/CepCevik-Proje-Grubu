import React from "react";

const UserTypeSelect = ({ value, onChange }) => (
  <select value={value || ""} onChange={(e) => onChange(e.target.value)}>
    <option value="">Select User Type</option>
    <option value="student">Student</option>
    <option value="club">Club</option>
  </select>
);

export default UserTypeSelect;
