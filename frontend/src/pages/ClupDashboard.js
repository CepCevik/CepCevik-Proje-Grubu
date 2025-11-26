// frontend/src/pages/ClupDashboard.js

import React from "react";
import BackgroundWrapper from "../components/BackgroundWrapper";
import ButtonLarge from "../components/ButtonLarge"; // <-- Yeni import
import { useNavigate } from "react-router-dom"; // <-- Yeni import

const ClubDashboard = ({ onLogout }) => {
  const navigate = useNavigate();

  return (
    <BackgroundWrapper image="ytu.jpg">
      <div style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
      }}>
        <div style={{
          backgroundColor: "rgba(0,0,0,0.6)",
          padding: "30px",
          borderRadius: "12px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}>
          <h1>🏛️ Kulüp Paneli</h1>
          <p>Hoş geldiniz! Etkinlik oluşturabilir, üyeleri yönetebilirsiniz.</p>

          {/* Yeni Profil Butonu */}
          <ButtonLarge text="Profilim" onClick={() => navigate("/profile")} />
          
          {/* Çıkış Butonu */}
          <ButtonLarge text="Çıkış Yap" onClick={onLogout} />
        </div>
      </div>
    </BackgroundWrapper>
  );
};

export default ClubDashboard;