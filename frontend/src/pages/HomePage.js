import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BackgroundWrapper from "../components/BackgroundWrapper";
import ButtonLarge from "../components/ButtonLarge";

const HomePage = ({ user }) => {
  const navigate = useNavigate();

  // Eğer kullanıcı zaten giriş yapmışsa, rolüne göre otomatik yönlendir
  useEffect(() => {
    if (user) {
      if (user.role === "student") navigate("/student");
      else if (user.role === "club") navigate("/club");
    }
  }, [user, navigate]);

  return (
    <BackgroundWrapper image="ytu.jpg">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          padding: "20px",
        }}
      >
        {/* Beyaz Kutu (Card) Alanı */}
        <div
          style={{
            backgroundColor: "rgba(255,255,255,0.95)", // Hafif şeffaf beyaz arka plan
            padding: "50px 40px",
            borderRadius: "16px", // Daha yumuşak köşeler
            width: "100%",
            maxWidth: "450px", // Çok geniş ekranlarda yayılmasını engeller
            boxShadow: "0 10px 30px rgba(0,0,0,0.3)", // Derinlik hissi veren gölge
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "15px", // Elemanlar arası boşluk
          }}
        >
          {/* Butonlar */}
          <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "15px" }}>
            <ButtonLarge 
              text="Giriş Yap" 
              onClick={() => navigate("/login")} 
              style={{ width: "100%", margin: 0 }} // ButtonLarge'ın varsayılan margin'ini eziyoruz
            />
            <ButtonLarge 
              text="Kayıt Ol" 
              onClick={() => navigate("/signup")} 
              style={{ width: "100%", margin: 0, backgroundColor: "#28a745" }} // Kayıt ol butonu için farklı renk (opsiyonel)
            />
          </div>
          
        </div>
      </div>
    </BackgroundWrapper>
  );
};

export default HomePage;
