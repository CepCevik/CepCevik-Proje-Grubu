import React, { useEffect, useState } from "react";
import BackgroundWrapper from "../components/BackgroundWrapper";
import ButtonLarge from "../components/ButtonLarge";
import { useNavigate } from "react-router-dom";
import { fetchMyClubMembers, createEvent, createAnnouncement } from "../api/clubService"; // API servisinden yeni fonksiyonlar eklendi

const ClubDashboard = ({ onLogout }) => {
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form State'leri
  const [eventData, setEventData] = useState({ title: "", description: "", date: "", location: "" });
  const [announcementData, setAnnouncementData] = useState({ title: "", content: "" });

  useEffect(() => {
    async function loadMembers() {
      try {
        const data = await fetchMyClubMembers();
        setMembers(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    loadMembers();
  }, []);

  // Etkinlik Oluşturma İşlemi
  const handleCreateEvent = async (e) => {
    e.preventDefault();
    try {
      await createEvent(eventData);
      alert("Etkinlik başarıyla oluşturuldu!");
      setEventData({ title: "", description: "", date: "", location: "" });
    } catch (error) {
      alert("Etkinlik oluşturulurken hata oluştu.");
    }
  };

  // Duyuru Oluşturma İşlemi
  const handleCreateAnnouncement = async (e) => {
    e.preventDefault();
    try {
      await createAnnouncement(announcementData);
      alert("Duyuru başarıyla paylaşıldı!");
      setAnnouncementData({ title: "", content: "" });
    } catch (error) {
      alert("Duyuru paylaşılırken hata oluştu.");
    }
  };

  return (
    <BackgroundWrapper image="ytu.jpg">
      <div style={containerStyle}>
        <div style={contentBoxStyle}>
          <h1>🏛️ Kulüp Yönetim Paneli</h1>
          
          <div style={buttonGroupStyle}>
            <ButtonLarge text="Profilim" onClick={() => navigate("/profile")} />
            <ButtonLarge text="Çıkış Yap" onClick={onLogout} />
          </div>

          {/* Formlar Alanı */}
          <div style={formsContainerStyle}>
            {/* Etkinlik Formu */}
            <div style={formCardStyle}>
              <h3>📅 Yeni Etkinlik</h3>
              <form onSubmit={handleCreateEvent} style={formStyle}>
                <input style={inputStyle} type="text" placeholder="Başlık" value={eventData.title} onChange={e => setEventData({...eventData, title: e.target.value})} required />
                <textarea style={inputStyle} placeholder="Açıklama" value={eventData.description} onChange={e => setEventData({...eventData, description: e.target.value})} required />
                <input style={inputStyle} type="datetime-local" value={eventData.date} onChange={e => setEventData({...eventData, date: e.target.value})} required />
                <input style={inputStyle} type="text" placeholder="Mekan" value={eventData.location} onChange={e => setEventData({...eventData, location: e.target.value})} />
                <button type="submit" style={submitButtonStyle}>Etkinlik Oluştur</button>
              </form>
            </div>

            {/* Duyuru Formu */}
            <div style={formCardStyle}>
              <h3>📢 Yeni Duyuru</h3>
              <form onSubmit={handleCreateAnnouncement} style={formStyle}>
                <input style={inputStyle} type="text" placeholder="Duyuru Başlığı" value={announcementData.title} onChange={e => setAnnouncementData({...announcementData, title: e.target.value})} required />
                <textarea style={{ ...inputStyle, height: "100px" }} placeholder="Duyuru İçeriği" value={announcementData.content} onChange={e => setAnnouncementData({...announcementData, content: e.target.value})} required />
                <button type="submit" style={{ ...submitButtonStyle, backgroundColor: "#007bff" }}>Duyuru Paylaş</button>
              </form>
            </div>
          </div>

          <hr style={{ margin: "40px 0", border: "0.5px solid rgba(255,255,255,0.2)" }} />

          <h2>📋 Kayıtlı Üyeler Listesi</h2>
          
          {loading ? <p>Yükleniyor...</p> : (
            <div style={{ overflowX: "auto" }}>
              <table style={tableStyle}>
                <thead>
                  <tr style={{ backgroundColor: "rgba(255,255,255,0.2)" }}>
                    <th style={thStyle}>İsim</th>
                    <th style={thStyle}>Rumuz</th>
                    <th style={thStyle}>Öğrenci No</th>
                    <th style={thStyle}>Bölüm</th>
                    <th style={thStyle}>Sınıf</th>
                    <th style={thStyle}>Email</th>
                  </tr>
                </thead>
                <tbody>
                  {members.map((member, index) => (
                    <tr key={index} style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                      <td style={tdStyle}>{member.name}</td>
                      <td style={tdStyle}>{member.nick_name}</td>
                      <td style={tdStyle}>{member.number}</td>
                      <td style={tdStyle}>{member.department}</td>
                      <td style={tdStyle}>{member.term}</td>
                      <td style={tdStyle}>{member.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {members.length === 0 && <p style={{ marginTop: "20px" }}>Henüz kulübünüze kayıtlı üye yok.</p>}
            </div>
          )}
        </div>
      </div>
    </BackgroundWrapper>
  );
};

// --- STİLLER ---
const containerStyle = { minHeight: "100vh", width: "100%", display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "40px", color: "white" };
const contentBoxStyle = { backgroundColor: "rgba(0,0,0,0.7)", padding: "30px", borderRadius: "12px", width: "90%", maxWidth: "1000px", textAlign: "center" };
const buttonGroupStyle = { display: "flex", justifyContent: "center", gap: "10px", marginBottom: "30px" };
const formsContainerStyle = { display: "flex", gap: "20px", flexWrap: "wrap", justifyContent: "center" };
const formCardStyle = { backgroundColor: "rgba(255,255,255,0.1)", padding: "20px", borderRadius: "8px", flex: "1", minWidth: "300px", textAlign: "left" };
const formStyle = { display: "flex", flexDirection: "column", gap: "10px" };
const inputStyle = { padding: "8px", borderRadius: "4px", border: "none" };
const submitButtonStyle = { padding: "10px", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" };
const tableStyle = { width: "100%", borderCollapse: "collapse", marginTop: "10px", color: "white" };
const thStyle = { padding: "12px", textAlign: "left", borderBottom: "2px solid #ddd" };
const tdStyle = { padding: "10px", textAlign: "left" };

export default ClubDashboard;