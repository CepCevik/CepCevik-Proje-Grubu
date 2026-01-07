import React, { useEffect, useState } from "react";
import BackgroundWrapper from "../components/BackgroundWrapper";
import ButtonLarge from "../components/ButtonLarge";
import { useNavigate } from "react-router-dom";
import { fetchClubs, joinClub } from "../api/clubService"; // Yeni servisi import et

const StudentDashboard = ({ onLogout }) => {
  const navigate = useNavigate();
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // Sayfa yüklendiğinde kulüpleri çek
  useEffect(() => {
    loadClubs();
  }, []);

  const loadClubs = async () => {
    try {
      const data = await fetchClubs();
      setClubs(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleJoinToggle = async (clubId) => {
    try {
      const res = await joinClub(clubId);
      setMessage(res.message);
      // Listeyi güncelle (Butonun "Katıldın" olarak değişmesi için)
      loadClubs();
      
      // 3 saniye sonra mesajı temizle
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      alert("İşlem sırasında hata oluştu.");
    }
  };

  return (
    <BackgroundWrapper image="ytu.jpg">
      <div style={{
      minHeight: "100vh", 
      height: "auto",      // İçerik uzadıkça kutu da uzasın
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      paddingTop: "150px", // Navbar'ın altında kalmasın diye artırdık
      paddingBottom: "50px",
      color: "white",
      overflowY: "visible", // Taşmaya izin ver
      position: "relative"
    }}>
        


        
        <div style={{
          backgroundColor: "rgba(0,0,0,0.7)",
          padding: "30px",
          borderRadius: "12px",
          width: "80%",
          maxWidth: "800px",
          textAlign: "center",
          marginBottom: "20px"
        }}>
          <h1>👨‍🎓 Öğrenci Paneli</h1>
          <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginBottom: "20px" }}>
             <ButtonLarge text="Profilim" onClick={() => navigate("/profile")} />
             <ButtonLarge text="Çıkış Yap" onClick={onLogout} />
          </div>
          
          {message && <div style={{ padding: "10px", backgroundColor: "green", borderRadius: "5px", marginBottom: "10px" }}>{message}</div>}

          <h2>Mevcut Kulüpler</h2>
          {loading ? <p>Yükleniyor...</p> : (
            <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              {clubs.map(club => (
                <div key={club.id} style={{ 
                  backgroundColor: "rgba(255,255,255,0.1)", 
                  padding: "15px", 
                  borderRadius: "8px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  textAlign: "left"
                }}>
                  <div>
                    <h3 style={{ margin: "0 0 5px 0" }}>{club.name}</h3>
                    <p style={{ margin: 0, fontSize: "0.9rem", color: "#ddd" }}>{club.description || "Açıklama yok"}</p>
                  </div>

                  {/* BUTON GRUBU */}
                  <div style={{ display: "flex", gap: "10px" }}>
                    {/* 🔵 YENİ: SAYFAYA GİT BUTONU */}
                    <button 
                      onClick={() => navigate(`/club/${club.id}`)}
                      style={{
                        padding: "10px 15px",
                        borderRadius: "5px",
                        border: "none",
                        cursor: "pointer",
                        backgroundColor: "#007bff", // Mavi
                        color: "white",
                        fontWeight: "bold"
                      }}
                    >
                      👁️ Sayfaya Git
                    </button>

                    <button 
                      onClick={() => handleJoinToggle(club.id)}
                      style={{
                        padding: "10px 20px",
                        borderRadius: "5px",
                        border: "none",
                        cursor: "pointer",
                        backgroundColor: club.is_joined ? "#dc3545" : "#28a745",
                        color: "white",
                        fontWeight: "bold"
                      }}
                    >
                      {club.is_joined ? "Ayrıl" : "Katıl"}
                    </button>
                  </div>
                </div>
              ))}
              {clubs.length === 0 && <p>Henüz hiç kulüp yok.</p>}
            </div>
          )}
        </div>
      </div>
    </BackgroundWrapper>
  );
};

export default StudentDashboard;
