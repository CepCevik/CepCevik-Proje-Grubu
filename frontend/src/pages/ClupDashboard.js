import React from "react";
import BackgroundWrapper from "../components/BackgroundWrapper";

const ClubDashboard = () => {
  return (
    <BackgroundWrapper image="ytu.jpg">
      <div style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
      }}>
        <div style={{
          backgroundColor: "rgba(0,0,0,0.6)",
          padding: "30px",
          borderRadius: "12px"
        }}>
          <h1>🏛️ Kulüp Paneli</h1>
          <p>Hoş geldiniz! Etkinlik oluşturabilir, üyeleri yönetebilirsiniz.</p>
        </div>
      </div>
    </BackgroundWrapper>
  );
};

export default ClubDashboard;
