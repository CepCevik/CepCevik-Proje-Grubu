/*import React from "react";

function InputField({ label, value, onChange, type = "text" }) {
  return (
    <div style={{ marginBottom: "15px", width: "300px" }}>
      <label style={{ display: "block", marginBottom: "5px" }}>{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        style={{
          width: "100%",
          padding: "10px",
          fontSize: "16px",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      />
    </div>
  );
}

export default InputField;
*/

import React from "react";

function InputField({ label, name, value, onChange, placeholder = "", type = "text" }) {
  return (
    <div style={{ marginBottom: "15px", width: "300px" }}>
      {label && <label style={{ display: "block", marginBottom: "5px" }}>{label}</label>}
      <input
        type={type}
        name={name}               // <-- FormData ile eşleşmek için name gerekli
        value={value}
        onChange={onChange}
        placeholder={placeholder} // <-- Hint olarak gösterilecek
        style={{
          width: "100%",
          padding: "10px",
          fontSize: "16px",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      />
    </div>
  );
}

export default InputField;
