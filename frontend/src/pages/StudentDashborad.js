import React, { useEffect, useState } from "react";
import BackgroundWrapper from "../components/BackgroundWrapper";
import ButtonLarge from "../components/ButtonLarge";
import { useNavigate } from "react-router-dom";
import { fetchClubs, joinClub, fetchEvents, fetchAnnouncements } from "../api/clubService"; // Yeni API fonksiyonları eklendi

const StudentDashboard = ({ onLogout }) => {
  const navigate = useNavigate();
  const [clubs, setClubs] = useState([]);
  const [events, setEvents] = useState([]); // Etkinlikler için state
  const [announcements, setAnnouncements] = useState([]); // Duyurular için state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAllData() {
      try {
        // Tüm verileri eş zamanlı olarak çekiyoruz
        const [clubsData, eventsData, announcementsData] = await Promise.all([
          fetchClubs(),
          fetchEvents(),
          fetchAnnouncements()
        ]);
        setClubs(clubsData);
        setEvents(eventsData);
        setAnnouncements(announcementsData);
      } catch (error) {
        console.error("Veriler yüklenirken hata oluştu:", error);
      } finally {
        setLoading(false);
      }
    }
    loadAllData();
  }, []);

  const handleJoinToggle = async (clubId) => {
    try {
      await joinClub(clubId);
      // Listeyi güncellemek için tekrar çekiyoruz
      const updatedClubs = await fetchClubs();
      setClubs(updatedClubs);
    } catch (error) {
      alert("Kulüp işlemi başarısız oldu.");
    }
  };

  return (
    <BackgroundWrapper image="ytu.jpg">
      <div style={containerStyle}>
        <div style={contentBoxStyle}>
          <h1>🎓 Öğrenci Paneli</h1>
          
          <div style={buttonGroupStyle}>
            <ButtonLarge text="Profilim" onClick={() => navigate("/profile")} />
            <ButtonLarge text="Çıkış Yap" onClick={onLogout} />
          </div>

          {loading ? <p>Yükleniyor...</p> : (
            <div style={{ textAlign: "left" }}>
              
              {/* --- DUYURULAR BÖLÜMÜ --- */}
              <section style={sectionStyle}>
                <h2 style={sectionTitleStyle}>📢 Güncel Duyurular</h2>
                <div style={listContainerStyle}>
                  {announcements.length > 0 ? announcements.map((ann) => (
                    <div key={ann.id} style={announcementCardStyle}>
                      <h4 style={{ margin: "0 0 5px 0", color: "#007bff" }}>{ann.title}</h4>
                      <p style={{ fontSize: "12px", margin: "0 0 10px 0", fontStyle: "italic" }}>🏛️ {ann.club_name}</p>
                      <p style={{ fontSize: "14px" }}>{ann.content}</p>
                      <small style={{ color: "#888" }}>{new Date(ann.created_at).toLocaleDateString('tr-TR')}</small>
                    </div>
                  )) : <p>Henüz bir duyuru paylaşılmadı.</p>}
                </div>
              </section>

              {/* --- ETKİNLİKLER BÖLÜMÜ --- */}
              <section style={sectionStyle}>
                <h2 style={sectionTitleStyle}>📅 Yaklaşan Etkinlikler</h2>
                <div style={gridContainerStyle}>
                  {events.length > 0 ? events.map((event) => (
                    <div key={event.id} style={eventCardStyle}>
                      <h4 style={{ margin: "0 0 5px 0", color: "#ffcc00" }}>{event.title}</h4>
                      <p style={{ fontSize: "12px", margin: "0 0 8px 0" }}>🏛️ {event.club_name}</p>
                      <p style={{ fontSize: "13px", height: "40px", overflow: "hidden" }}>{event.description}</p>
                      <div style={eventFooterStyle}>
                        <span>📍 {event.location || "Belirtilmedi"}</span>
                        <span>⏰ {new Date(event.date).toLocaleString('tr-TR')}</span>
                      </div>
                    </div>
                  )) : <p>Planlanmış etkinlik bulunmuyor.</p>}
                </div>
              </section>

              {/* --- KULÜPLER BÖLÜMÜ --- */}
              <section style={sectionStyle}>
                <h2 style={sectionTitleStyle}>🏛️ Tüm Kulüpler</h2>
                <div style={gridContainerStyle}>
                  {clubs.map((club) => (
                    <div key={club.id} style={clubCardStyle}>
                      <h3 style={{ margin: "0 0 10px 0" }}>{club.name}</h3>
                      <p style={{ fontSize: "13px", color: "#ddd", marginBottom: "15px" }}>{club.description}</p>
                      <button 
                        onClick={() => handleJoinToggle(club.id)}
                        style={club.is_joined ? joinedBtnStyle : joinBtnStyle}
                      >
                        {club.is_joined ? "Ayrıl" : "Katıl"}
                      </button>
                    </div>
                  ))}
                </div>
              </section>

            </div>
          )}
        </div>
      </div>
    </BackgroundWrapper>
  );
};

// --- STİLLER ---
const containerStyle = { minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "40px", color: "white" };
const contentBoxStyle = { backgroundColor: "rgba(0,0,0,0.8)", padding: "30px", borderRadius: "12px", width: "90%", maxWidth: "1100px", textAlign: "center" };
const buttonGroupStyle = { display: "flex", justifyContent: "center", gap: "10px", marginBottom: "40px" };

const sectionStyle = { marginBottom: "40px" };
const sectionTitleStyle = { borderBottom: "1px solid rgba(255,255,255,0.2)", paddingBottom: "10px", marginBottom: "20px" };
const listContainerStyle = { display: "flex", flexDirection: "column", gap: "15px" };
const gridContainerStyle = { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px" };

const announcementCardStyle = { backgroundColor: "rgba(255,255,255,0.1)", padding: "15px", borderRadius: "8px", borderLeft: "4px solid #007bff" };
const eventCardStyle = { backgroundColor: "rgba(255,255,255,0.05)", padding: "15px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)" };
const eventFooterStyle = { display: "flex", justifyContent: "space-between", marginTop: "15px", fontSize: "11px", color: "#aaa" };

const clubCardStyle = { backgroundColor: "rgba(255,255,255,0.1)", padding: "20px", borderRadius: "8px", textAlign: "center" };
const joinBtnStyle = { backgroundColor: "#28a745", color: "white", border: "none", padding: "10px 20px", borderRadius: "4px", cursor: "pointer", fontWeight: "bold", width: "100%" };
const joinedBtnStyle = { ...joinBtnStyle, backgroundColor: "#dc3545" };

export default StudentDashboard;