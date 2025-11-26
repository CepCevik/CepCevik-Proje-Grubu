import React from "react";
import "./ButtonLarge.css";

const ButtonLarge = ({ text, onClick }) => {
  return (
    <button className="button-large" onClick={onClick}>
      {text}
    </button>
  );
};

export default ButtonLarge;
