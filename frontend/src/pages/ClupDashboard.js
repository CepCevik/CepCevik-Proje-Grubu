import React, { useEffect, useState } from "react";
import BackgroundWrapper from "../components/BackgroundWrapper";
import ButtonLarge from "../components/ButtonLarge";
import { useNavigate } from "react-router-dom";
import { fetchMyClubMembers } from "../api/clubService"; // Yeni servisi import et

const ClubDashboard = ({ onLogout }) => {
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <BackgroundWrapper image="ytu.jpg">
      <div style={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "40px",
        color: "white",
      }}>
        <div style={{
          backgroundColor: "rgba(0,0,0,0.7)",
          padding: "30px",
          borderRadius: "12px",
          width: "90%",
          maxWidth: "900px",
          textAlign: "center"
        }}>
          <h1>🏛️ Kulüp Yönetim Paneli</h1>
          
          <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginBottom: "30px" }}>
            <ButtonLarge text="Profilim" onClick={() => navigate("/profile")} />
            <ButtonLarge text="Çıkış Yap" onClick={onLogout} />
          </div>

          <h2>📋 Kayıtlı Üyeler Listesi</h2>
          
          {loading ? <p>Yükleniyor...</p> : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px", color: "white" }}>
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

// Basit tablo stilleri
const thStyle = { padding: "12px", textAlign: "left", borderBottom: "2px solid #ddd" };
const tdStyle = { padding: "10px", textAlign: "left" };

export default ClubDashboard;
