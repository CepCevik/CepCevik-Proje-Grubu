import React from "react";
import "./BackgroundWrapper.css"; // css dosyasını oluştur

const BackgroundWrapper = ({ children }) => {
  return <div className="background-wrapper">{children}</div>;
};

export default BackgroundWrapper;
