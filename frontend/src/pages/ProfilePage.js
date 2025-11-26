// frontend/src/pages/ProfilePage.js

import React, { useState, useEffect } from "react";
import BackgroundWrapper from "../components/BackgroundWrapper";
import { fetchUserProfile } from "../api/auth";

const ProfilePage = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getProfile() {
      try {
        const data = await fetchUserProfile();
        setProfileData(data);
      } catch (err) {
        setError(err.message || "Profil yüklenirken bir hata oluştu.");
      } finally {
        setLoading(false);
      }
    }
    getProfile();
  }, []);

  const renderProfile = () => {
    if (!profileData) return null;

    // Backend'den gelen veriyi parçalama
    const { email, type, student_profile, club_profile } = profileData;

    let details = {};
    if (type === 'student' && student_profile) {
      details = student_profile;
    } else if (type === 'club' && club_profile) {
      details = club_profile;
    }

    return (
      <div style={{ padding: "20px", border: "1px solid #ccc", borderRadius: "8px", backgroundColor: "white", color: "#333", maxWidth: "400px", margin: "auto" }}>
        <h2>👤 Profil Bilgileri ({type === 'student' ? 'Öğrenci' : 'Kulüp'})</h2>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Kullanıcı Tipi:</strong> {type}</p>
        
        {type === 'student' && (
          <div>
            <h3>Öğrenci Detayları</h3>
            <p><strong>İsim:</strong> {details.name}</p>
            <p><strong>Rumuz:</strong> {details.nick_name}</p>
            <p><strong>Numara:</strong> {details.number}</p>
            <p><strong>Bölüm:</strong> {details.department}</p>
            <p><strong>Sınıf:</strong> {details.term}</p>
          </div>
        )}

        {type === 'club' && (
          <div>
            <h3>Kulüp Detayları</h3>
            <p><strong>Adı:</strong> {details.name}</p>
            <p><strong>Açıklama:</strong> {details.description || "Açıklama yok"}</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <BackgroundWrapper image="ytu.jpg">
        <div style={{ 
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          width: "90%",
          maxWidth: "600px",
          backgroundColor: "rgba(0,0,0,0.6)",
          padding: "30px",
          borderRadius: "12px",
          minHeight: "400px",
        }}>
            <h1>Kişisel Bilgilerim</h1>
            {loading && <p>Yükleniyor...</p>}
            {error && <p style={{ color: 'red' }}>Hata: {error}</p>}
            {!loading && !error && renderProfile()}

            <button 
                onClick={() => window.history.back()}
                style={{ marginTop: '20px', padding: '10px 20px', borderRadius: '5px', border: 'none', backgroundColor: '#007bff', color: 'white', cursor: 'pointer' }}
            >
                Geri Dön
            </button>
        </div>
    </BackgroundWrapper>
  );
};

export default ProfilePage;