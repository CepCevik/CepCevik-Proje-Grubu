/*
import React, { useEffect, useState } from "react";
import BackgroundWrapper from "../components/BackgroundWrapper";
import ButtonLarge from "../components/ButtonLarge";
import { useNavigate } from "react-router-dom";
import postService from "../api/postService"; // Kendi yazdığımız servis

const ClubDashboard = ({ onLogout }) => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [showModal, setShowModal] = useState(null); // 'announcement', 'event', 'poll', 'giveaway'
  
  // Tek bir state içinde tüm form verilerini nizamlı tutuyoruz
  const [formData, setFormData] = useState({ text: "", expire_date: "", location: "", deadline: "", winner_count: 1, options: "" });

  useEffect(() => {
    loadFeed();
  }, []);

  const loadFeed = async () => {
    try {
      const res = await postService.getClubFeed(); // Token'dan otomatik çeker
      setPosts(res.data);
    } catch (err) { console.error(err); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await postService.createPost({ ...formData, post_type: showModal });
      alert("Başarıyla paylaşıldı!");
      setShowModal(null);
      setFormData({ text: "", expire_date: "", location: "", deadline: "", winner_count: 1, options: "" });
      loadFeed();
    } catch (err) { alert("Hata oluştu."); }
  };

  return (
    <div className="dashboard-page-wrapper">
    <BackgroundWrapper image="ytu.jpg">
      <div style={containerStyle}>
        <div style={contentBoxStyle}>
          <h1>🏛️ Kulüp Yönetim Paneli</h1>
          
          {}
          <div style={buttonGroupStyle}>
            <ButtonLarge text="📢 Duyuru Yap" onClick={() => setShowModal('announcement')} />
            <ButtonLarge text="📅 Etkinlik Oluştur" onClick={() => setShowModal('event')} />
            <ButtonLarge text="🎁 Çekiliş Başlat" onClick={() => setShowModal('giveaway')} />
            <ButtonLarge text="📊 Anket Yap" onClick={() => setShowModal('poll')} />
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '20px' }}>
            <button onClick={() => navigate("/profile")} style={smallBtnStyle}>Profilim</button>
            <button onClick={onLogout} style={{ ...smallBtnStyle, backgroundColor: '#dc3545' }}>Çıkış Yap</button>
          </div>

          <hr style={{ margin: "40px 0", border: "0.5px solid rgba(255,255,255,0.2)" }} />
          <h2>📱 Yayınlanan Gönderiler</h2>
          {}
        </div>
      </div>

      {}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 style={{ color: 'white', marginBottom: '20px' }}>{showModal.toUpperCase()} OLUŞTUR</h2>
            <form onSubmit={handleSubmit} className="modal-form">
              
              <textarea placeholder="Metin / Açıklama" value={formData.text} onChange={e => setFormData({...formData, text: e.target.value})} required />

              {showModal === 'event' && (
                <>
                  <input type="datetime-local" onChange={e => setFormData({...formData, expire_date: e.target.value})} required />
                  <input type="text" placeholder="Mekan / Konum" onChange={e => setFormData({...formData, location: e.target.value})} required />
                </>
              )}

              {showModal === 'giveaway' && (
                <>
                  <input type="datetime-local" onChange={e => setFormData({...formData, deadline: e.target.value})} required />
                  <input type="number" placeholder="Kazanan Sayısı" onChange={e => setFormData({...formData, winner_count: e.target.value})} required />
                </>
              )}

              {showModal === 'poll' && (
                <input type="text" placeholder="Şıkları virgülle ayırın (Örn: Elma,Armut)" onChange={e => setFormData({...formData, options: e.target.value})} required />
              )}

              <button type="submit">Yayınla</button>
              <button type="button" onClick={() => setShowModal(null)} style={{ backgroundColor: '#666' }}>İptal</button>
            </form>
          </div>
        </div>
      )}
    </BackgroundWrapper>
    </div>
  );
};

// --- STİLLER ---
const containerStyle = { minHeight: "100vh", width: "100%", display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "40px", color: "white" };
const contentBoxStyle = { backgroundColor: "rgba(0,0,0,0.75)", padding: "40px", borderRadius: "15px", width: "90%", maxWidth: "800px", backdropFilter: "blur(10px)" };
const buttonGroupStyle = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginTop: "30px" };
const smallBtnStyle = { padding: "8px 15px", borderRadius: "5px", border: "none", color: "white", backgroundColor: "#007bff", cursor: "pointer" };

export default ClubDashboard;

*/

/*
import React, { useEffect, useState } from "react";
import BackgroundWrapper from "../components/BackgroundWrapper";
import ButtonLarge from "../components/ButtonLarge";
import { useNavigate } from "react-router-dom";
import postService from "../api/postService";
import { fetchMyClubMembers } from "../api/clubService";

const ClubDashboard = ({ onLogout }) => {
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [showModal, setShowModal] = useState(null); // 'announcement', 'event', 'poll', 'giveaway'
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({ text: "", expire_date: "", location: "", deadline: "", winner_count: 1, options: "" });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [postRes, memberData] = await Promise.all([
        postService.getClubFeed(),
        fetchMyClubMembers()
      ]);
      setPosts(postRes.data);
      setMembers(memberData);
    } catch (err) { console.error("Veri yüklenemedi."); }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("post_type", showModal);
    data.append("text", formData.text);
    if (selectedFile) data.append("image", selectedFile);
    
    // Spesifik alanları ekleme (400 Hatasını önlemek için)
    if (showModal === 'event') {
        data.append("expire_date", formData.expire_date);
        data.append("location", formData.location);
    } else if (showModal === 'giveaway') {
        data.append("deadline", formData.deadline);
        data.append("winner_count", parseInt(formData.winner_count));
    } else if (showModal === 'poll') {
        data.append("options", formData.options);
    }

    try {
      await postService.createPost(data);
      alert("Başarıyla paylaşıldı!");
      setShowModal(null);
      setSelectedFile(null);
      loadData();
    } catch (err) { alert("Hata! Tüm zorunlu (*) alanları doldurun."); }
  };

  return (
    <div className="dashboard-page-wrapper">
    <BackgroundWrapper image="ytu.jpg">
      <div style={containerStyle}>
        <div style={contentBoxStyle}>
          <h1 style={{ marginBottom: "20px" }}>🏛️ Kulüp Yönetim Paneli</h1>
          
          {}
          <div style={buttonGroupStyle}>
            <ButtonLarge text="📢 Duyuru Yap" onClick={() => setShowModal('announcement')} />
            <ButtonLarge text="📅 Etkinlik Oluştur" onClick={() => setShowModal('event')} />
            <ButtonLarge text="🎁 Çekiliş Başlat" onClick={() => setShowModal('giveaway')} />
            <ButtonLarge text="📊 Anket Yap" onClick={() => setShowModal('poll')} />
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '20px' }}>
            <button onClick={() => navigate("/profile")} style={smallBtnStyle}>Profilim</button>
            <button onClick={onLogout} style={{ ...smallBtnStyle, backgroundColor: '#dc3545' }}>Çıkış Yap</button>
          </div>

          <hr style={{ margin: "40px 0", border: "0.5px solid rgba(255,255,255,0.2)" }} />

          {}
          <h2>👥 Kayıtlı Üyeler</h2>
          <table style={tableStyle}>
            <thead>
              <tr style={{ borderBottom: "2px solid white" }}>
                <th>İsim</th><th>Bölüm</th><th>Email</th>
              </tr>
            </thead>
            <tbody>
              {members.map((m, i) => (
                <tr key={i}><td>{m.name}</td><td>{m.department}</td><td>{m.email}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 style={{ textAlign: "center", marginBottom: "20px" }}>{showModal.toUpperCase()}</h2>
            <form onSubmit={handleCreate} className="modal-form">
              
              <textarea placeholder="Açıklama / Metin *" onChange={e => setFormData({...formData, text: e.target.value})} required />
              
              <div style={{ textAlign: "left" }}>
                <label style={{ fontSize: "12px", color: "#aaa" }}>Görsel Seç (İsteğe bağlı):</label>
                <input type="file" onChange={e => setSelectedFile(e.target.files[0])} style={{ background: "none", border: "none" }} />
              </div>

              {showModal === 'event' && (
                <>
                  <input type="datetime-local" onChange={e => setFormData({...formData, expire_date: e.target.value})} required title="Tarih Zorunlu *" />
                  <input type="text" placeholder="Mekan / Konum *" onChange={e => setFormData({...formData, location: e.target.value})} required />
                </>
              )}

              {showModal === 'giveaway' && (
                <>
                  <input type="datetime-local" onChange={e => setFormData({...formData, deadline: e.target.value})} required title="Deadline Zorunlu *" />
                  <input type="number" placeholder="Kazanan Sayısı *" onChange={e => setFormData({...formData, winner_count: e.target.value})} required />
                </>
              )}

              {showModal === 'poll' && (
                <input type="text" placeholder="Seçenekler (virgülle ayırın) *" onChange={e => setFormData({...formData, options: e.target.value})} required />
              )}

              <button type="submit" className="btn-submit">Hemen Yayınla</button>
              <button type="button" onClick={() => setShowModal(null)} style={{ background: "none", color: "white", border: "none" }}>Vazgeç</button>
            </form>
          </div>
        </div>
      )}
    </BackgroundWrapper>
    </div>
  );
};

// --- STİLLER ---
const containerStyle = { minHeight: "100vh", width: "100%", display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "40px", color: "white" };
const contentBoxStyle = { backgroundColor: "rgba(0,0,0,0.8)", padding: "40px", borderRadius: "20px", width: "90%", maxWidth: "900px", backdropFilter: "blur(10px)" };
const buttonGroupStyle = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginTop: "20px" };
const smallBtnStyle = { padding: "10px 20px", borderRadius: "8px", border: "none", color: "white", backgroundColor: "#007bff", cursor: "pointer", fontWeight: "bold" };
const tableStyle = { width: "100%", marginTop: "20px", textAlign: "left", borderCollapse: "collapse" };

export default ClubDashboard;



*/



/* en son bundaydım
import React, { useEffect, useState } from "react";
import ButtonLarge from "../components/ButtonLarge";
import { useNavigate } from "react-router-dom";
import postService from "../api/postService";
import { fetchMyClubMembers } from "../api/clubService";

const ClubDashboard = ({ onLogout }) => {
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);
  const [showModal, setShowModal] = useState(null); 
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({ text: "", expire_date: "", location: "", deadline: "", winner_count: 1, options: "" });

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    try {
      const memberData = await fetchMyClubMembers();
      setMembers(memberData);
    } catch (err) { console.error("Veri yüklenemedi."); }
  };

const handleCreate = async (e) => {
    e.preventDefault();
    console.log("Gönderilen Tip:", showModal); // Burası 'announcement', 'event' vb. gelmeli
    const data = new FormData();
    
    // Her zaman zorunlu olanlar
    data.append("post_type", showModal);
    data.append("text", formData.text);
    if (selectedFile) data.append("image", selectedFile);
    
    // Sadece Post tipine göre alanları ekle
    if (showModal === 'event') {
        if (formData.expire_date) data.append("expire_date", formData.expire_date);
        if (formData.location) data.append("location", formData.location);
    } 
    else if (showModal === 'giveaway') {
        if (formData.deadline) data.append("deadline", formData.deadline);
        data.append("winner_count", parseInt(formData.winner_count) || 1);
    } 
    else if (showModal === 'poll') {
        if (formData.options) data.append("options", formData.options);
    }

    try {
        const response = await postService.createPost(data);
        alert(response.data.message || "Başarıyla paylaşıldı!");
        setShowModal(null);
        setSelectedFile(null);
        setFormData({ text: "", expire_date: "", location: "", deadline: "", winner_count: 1, options: "" });
        loadData(); // Listeyi yenile
    } catch (err) {
        // Hata detayını konsolda gör ki neyin eksik olduğunu anlayalım
        console.error("Backend Hata Detayı:", err.response?.data);
        alert("Paylaşım yapılamadı. Lütfen zorunlu alanları kontrol edin.");
    }
};

  return (
    <div className="dashboard-page-wrapper">
      <div style={contentBoxStyle}>
          <h1 style={{ marginBottom: "30px", textAlign: "center" }}>🏛️ Kulüp Yönetim Paneli</h1>
          
          <div style={buttonGroupStyle}>
            <ButtonLarge text="📢 Duyuru Yap" onClick={() => setShowModal('announcement')} />
            <ButtonLarge text="📅 Etkinlik Oluştur" onClick={() => setShowModal('event')} />
            <ButtonLarge text="🎁 Çekiliş Başlat" onClick={() => setShowModal('giveaway')} />
            <ButtonLarge text="📊 Anket Yap" onClick={() => setShowModal('poll')} />
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '30px' }}>
            <button onClick={() => navigate("/profile")} style={smallBtnStyle}>Profilim</button>
            <button onClick={onLogout} style={{ ...smallBtnStyle, backgroundColor: '#dc3545' }}>Çıkış Yap</button>
          </div>

          <hr style={{ margin: "40px 0", border: "0.5px solid rgba(255,255,255,0.1)" }} />

          <h2>👥 Kayıtlı Üyeler</h2>
          <div style={{ maxHeight: "250px", overflowY: "auto", marginTop: "20px" }}>
            <table style={tableStyle}>
                <thead>
                <tr style={{ borderBottom: "2px solid rgba(255,255,255,0.2)" }}>
                    <th>İsim</th><th>Bölüm</th><th>Email</th>
                </tr>
                </thead>
                <tbody>
                {members.map((m, i) => (
                    <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                    <td>{m.name}</td><td>{m.department}</td><td>{m.email}</td>
                    </tr>
                ))}
                </tbody>
            </table>
          </div>
      </div>

      {}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 style={{ textAlign: "center", marginBottom: "25px", color: "white" }}>
                {showModal.toUpperCase()} OLUŞTUR
            </h2>
            <form onSubmit={handleCreate} className="modal-form">
              <textarea placeholder="Mesajınız / Açıklama *" onChange={e => setFormData({...formData, text: e.target.value})} required />
              
              <div style={{ textAlign: "left" }}>
                <label style={{ fontSize: "12px", color: "#aaa" }}>🖼️ Görsel Seç (Opsiyonel):</label>
                <input type="file" onChange={e => setSelectedFile(e.target.files[0])} style={{ background: "none", border: "none", padding: "5px 0" }} />
              </div>

              {showModal === 'event' && (
                <>
                  <input type="datetime-local" onChange={e => setFormData({...formData, expire_date: e.target.value})} required />
                  <input type="text" placeholder="Mekan / Konum *" onChange={e => setFormData({...formData, location: e.target.value})} required />
                </>
              )}

              {showModal === 'giveaway' && (
                <>
                  <input type="datetime-local" onChange={e => setFormData({...formData, deadline: e.target.value})} required />
                  <input type="number" placeholder="Kazanan Sayısı *" onChange={e => setFormData({...formData, winner_count: e.target.value})} required />
                </>
              )}

              {showModal === 'poll' && (
                <input type="text" placeholder="Seçenekler (virgülle ayırın) *" onChange={e => setFormData({...formData, options: e.target.value})} required />
              )}

              <button type="submit" className="btn-submit">Şimdi Yayınla</button>
              <button type="button" onClick={() => setShowModal(null)} style={{ background: "none", color: "white", border: "none", cursor: "pointer", marginTop: "10px" }}>İptal Et</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// --- STİLLER ---
const contentBoxStyle = { backgroundColor: "rgba(0,0,0,0.85)", padding: "40px", borderRadius: "25px", width: "90%", maxWidth: "900px", backdropFilter: "blur(15px)", border: "1px solid rgba(255,255,255,0.1)" };
const buttonGroupStyle = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" };
const smallBtnStyle = { padding: "10px 25px", borderRadius: "8px", border: "none", color: "white", backgroundColor: "#007bff", cursor: "pointer", fontWeight: "bold" };
const tableStyle = { width: "100%", textAlign: "left", borderCollapse: "collapse", color: "white" };

export default ClubDashboard;

*/

/*
import React, { useEffect, useState } from "react";
import ButtonLarge from "../components/ButtonLarge";
import postService from "../api/postService";
import { fetchMyClubMembers } from "../api/clubService";

const ClubDashboard = ({ onLogout }) => {
  const [members, setMembers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [showModal, setShowModal] = useState(null);
  const [formData, setFormData] = useState({ text: "", expire_date: "", location: "", deadline: "", winner_count: 1, options: "" });
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    try {
      const [memberData, postRes] = await Promise.all([
        fetchMyClubMembers(),
        postService.getClubFeed()
      ]);
      setMembers(memberData);
      setPosts(postRes.data);
    } catch (err) { console.error("Veriler çekilemedi."); }
  };

  // ... handleCreate fonksiyonun aynı kalıyor ...

  return (
    <div className="dashboard-page-wrapper">
      
      {}
      <div style={headerCardStyle}>
        <h1 style={{ textAlign: "center", marginBottom: "30px" }}>🏛️ Kulüp Yönetim Paneli</h1>
        <div style={buttonGridStyle}>
          <ButtonLarge text="📢 Duyuru Yap" onClick={() => setShowModal('announcement')} />
          <ButtonLarge text="📅 Etkinlik Oluştur" onClick={() => setShowModal('event')} />
          <ButtonLarge text="🎁 Çekiliş Başlat" onClick={() => setShowModal('giveaway')} />
          <ButtonLarge text="📊 Anket Yap" onClick={() => setShowModal('poll')} />
        </div>
        <button onClick={onLogout} style={logoutButtonStyle}>Güvenli Çıkış</button>
      </div>

      {}
      <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
        {posts.length > 0 ? posts.map((post) => (
          <div key={post.id} className="post-card">
            <div className="post-header">
              <span className="post-badge">{post.post_type.toUpperCase()}</span>
              <span style={{ fontSize: "12px", color: "#aaa" }}>
                {new Date(post.posted_date).toLocaleString('tr-TR')}
              </span>
            </div>
            
            <p style={{ fontSize: "18px", marginBottom: "15px" }}>{post.text}</p>
            
            {post.image && (
              <img src={post.image} alt="post" style={{ width: "100%", borderRadius: "10px", marginBottom: "15px" }} />
            )}

            {}
            {post.details && (
              <div style={detailBoxStyle}>
                {post.post_type === 'event' && <span>📍 Konum: {post.details.location}</span>}
                {post.post_type === 'giveaway' && <span>🏆 Kazanan: {post.details.winner_count} Kişi</span>}
              </div>
            )}
          </div>
        )) : <p style={{ color: "white", marginTop: "20px" }}>Henüz gönderi yok.</p>}
      </div>

      {}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 style={{ color: "white", textAlign: "center", marginBottom: "25px" }}>{showModal.toUpperCase()}</h2>
            <form onSubmit={handleCreate} className="modal-form">
              <textarea placeholder="Metin / Açıklama *" rows="4" onChange={e => setFormData({...formData, text: e.target.value})} required />
              
              <div style={{ textAlign: "left" }}>
                <label style={{ color: "#aaa", fontSize: "12px" }}>📸 Görsel Yükle:</label>
                <input type="file" onChange={e => setSelectedFile(e.target.files[0])} style={{ color: "white", marginTop: "5px" }} />
              </div>

              {}
              {showModal === 'event' && (
                <>
                  <input type="datetime-local" onChange={e => setFormData({...formData, expire_date: e.target.value})} required />
                  <input type="text" placeholder="📍 Mekan *" onChange={e => setFormData({...formData, location: e.target.value})} required />
                </>
              )}
              {}

              <button type="submit" style={submitButtonStyle}>Yayınla</button>
              <button type="button" onClick={() => setShowModal(null)} style={{ color: "white", background: "none", border: "none", cursor: "pointer" }}>Vazgeç</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// --- STİLLER ---
const headerCardStyle = { background: "rgba(0,0,0,0.85)", padding: "40px", borderRadius: "25px", width: "90%", maxWidth: "800px", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.1)" };
const buttonGridStyle = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" };
const logoutButtonStyle = { marginTop: "20px", background: "#dc3545", color: "white", border: "none", padding: "12px 25px", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" };
const submitButtonStyle = { padding: "15px", background: "#28a745", border: "none", color: "white", borderRadius: "10px", fontWeight: "bold", fontSize: "16px", cursor: "pointer" };
const detailBoxStyle = { background: "rgba(255,255,255,0.1)", padding: "10px", borderRadius: "8px", fontSize: "14px", color: "#61dafb" };

export default ClubDashboard;

*/

// try/ClupDashboard.js
// try/ClupDashboard.js
// try/ClupDashboard.js
// 
import React, { useEffect, useState } from "react";
import postService from "../api/postService";
import { fetchMyClubMembers } from "../api/clubService";
import { useNavigate } from "react-router-dom";
import PostCard from "../components/posts/PostCard";

const ClubDashboard = ({ onLogout }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("feed");
  const [posts, setPosts] = useState([]);
  const [members, setMembers] = useState([]);
  
  const [formData, setFormData] = useState({ text: "", expire_date: "", location: "", deadline: "", winner_count: 1 });
  const [pollOptions, setPollOptions] = useState(["", ""]);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    try {
      const [pRes, mRes] = await Promise.all([postService.getClubFeed(), fetchMyClubMembers()]);
      setPosts(pRes.data);
      setMembers(mRes);
    } catch (e) { console.error("Veri yüklenemedi", e); }
  };

  const handleComment = async (postId, text) => {
    try {
        // Backend servisindeki yorum yapma API'sini çağırıyoruz
        await postService.addComment(postId, text); 
        
        // Yorum yaptıktan sonra sayfayı yenile ki yeni yorumu görelim
        loadData(); 
    } catch (err) {
        console.error("Yorum gönderilemedi:", err);
        alert("Yorum gönderilirken bir hata oluştu.");
    }
    };

    // ClubDashboard.js

// 1. Beğeni İşlemi
const handleLike = async (postId) => {
    try {
        await postService.toggleLike(postId);
        loadData(); // Beğeni sayısını güncellemek için veriyi tazele
    } catch (err) {
        console.error("Beğeni hatası:", err);
    }
};

// 2. Anket Oy Verme İşlemi
const handleVote = async (postId, option) => {
    try {
        await postService.votePoll(postId, option);
        alert("Oyunuz kaydedildi!");
        loadData(); // Sonuçları görmek için tazele
    } catch (err) {
        console.error("Oylama hatası:", err);
        alert("Oy verilirken bir sorun oluştu.");
    }
};



// 3. Çekiliş Sonuçlandırma İşlemi
const handleRefresh = async (postId, action) => {
    if (action === 'finish') {
        try {
            await postService.finishGiveaway(postId);
            alert("Çekiliş başarıyla sonuçlandırıldı!");
            loadData();
        } catch (err) {
            console.error("Çekiliş bitirme hatası:", err);
            alert("Çekiliş bitirilemedi.");
        }
    }
};

































  const handleCreate = async (e) => {

        // handleCreate fonksiyonunda şu kısmı kontrol et:






    e.preventDefault();
    const data = new FormData();
    data.append("post_type", activeTab);
    data.append("text", formData.text);
    if (selectedFile) data.append("image", selectedFile);
    

    if (activeTab === 'poll') {
        const optionsString = pollOptions.filter(o => o.trim() !== "").join(",");
        data.append("options", optionsString); // 'options' anahtarı Backend ile aynı mı?
        console.log("Gönderilen Seçenekler:", optionsString); // Konsolda bunu gör
    }

    if (activeTab === 'event') {
        data.append("expire_date", formData.expire_date);
        data.append("location", formData.location);
    }
    // Giveaway verilerini de ekleyelim (Hata almamak için)
    if (activeTab === 'giveaway') {
        data.append("deadline", formData.deadline);
        data.append("winner_count", formData.winner_count);
    }

    try {
      await postService.createPost(data);
      alert("Başarıyla yayınlandı!");
      setActiveTab("feed");
      loadData();
    } catch (err) { 
      console.error("400 Hata Detayı:", err.response?.data);
      alert("Yayınlama hatası! Eksik alanları kontrol edin."); 
    }
  };

  return (
    <div className="main-page-container">
      {/* ÜST YATAY NAVBAR (SABİT) */}
      <nav className="navbar">
        <div className="nav-menu">
          <button className={`nav-btn ${activeTab === "feed" ? "active" : ""}`} onClick={() => setActiveTab("feed")}>📱 Akış</button>
          <button className={`nav-btn ${activeTab === "announcement" ? "active" : ""}`} onClick={() => setActiveTab("announcement")}>📢 Duyuru</button>
          <button className={`nav-btn ${activeTab === "event" ? "active" : ""}`} onClick={() => setActiveTab("event")}>📅 Etkinlik</button>
          <button className={`nav-btn ${activeTab === "poll" ? "active" : ""}`} onClick={() => setActiveTab("poll")}>📊 Anket</button>
          <button className={`nav-btn ${activeTab === "giveaway" ? "active" : ""}`} onClick={() => setActiveTab("giveaway")}>🎁 Çekiliş</button>
          <button className={`nav-btn ${activeTab === "members" ? "active" : ""}`} onClick={() => setActiveTab("members")}>👥 Üyeler</button>
          <button className="nav-btn" onClick={() => navigate("/profile")}>👤 Profil</button>
          <button className="nav-btn logout-nav" onClick={onLogout}>🚪 Çıkış</button>
        </div>
      </nav>

      {/* İÇERİK SAHNESİ */}
      <main className="main-stage">
        {/* 1. DURUM: AKIŞ (FEED) - Sadece feed aktifse göster */}
        {activeTab === "feed" && (
          <div className="feed-layout" style={{ 
              display: "flex", 
              flexDirection: "column", 
              alignItems: "center", 
              width: "100%" 
          }}>
              {posts.map(post => (
                  <PostCard 
                      key={post.id} 
                      post={post} 
                      isClubOwner={true}
                      onLike={handleLike}
                      onVote={handleVote}
                      onRefresh={handleRefresh}
                      onCommentSubmit={handleComment} 
                  />
              ))}
              {posts.length === 0 && <p style={{color: 'white'}}>Henüz gönderi yok.</p>}
          </div>
      )}

        {/* 2. DURUM: ÜYELER LİSTESİ - Senin eski kodundaki çalışan tablo yapısı */}
        {/* 2. DURUM: ÜYELER LİSTESİ */}
        {activeTab === "members" && (
            <div className="centered-glass-box" style={{ 
                maxWidth: '900px', 
                backgroundColor: 'rgba(0, 0, 0, 0.75)', // Koyu ve şeffaf arka plan
                border: '1px solid rgba(255, 255, 255, 0.2)', // Hafif parlayan çerçeve
                backdropFilter: 'blur(10px)' // Arkadaki resmi hafif bulandırarak yazıyı öne çıkarır
            }}>
                <h2 style={{ marginBottom: "20px", color: "white", textAlign: "center" }}>👥 Kayıtlı Üyeler</h2>
                
                <div style={{ maxHeight: "400px", overflowY: "auto" }}>
                    <table style={{ width: "100%", textAlign: "left", borderCollapse: "collapse", color: "white" }}>
                        <thead>
                            <tr style={{ borderBottom: "2px solid #007bff", color: "#007bff" }}>
                                <th style={{ padding: "12px", color: "#007bff" }}>İsim</th>
                                <th style={{ padding: "12px", color: "#007bff" }}>Bölüm</th>
                                <th style={{ padding: "12px", color: "#007bff" }}>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {members.map((m, i) => (
                                <tr key={i} style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.1)" }}>
                                    <td style={{ padding: "12px", color: "white" }}>{m.name}</td>
                                    <td style={{ padding: "12px", color: "white" }}>{m.department}</td>
                                    <td style={{ padding: "12px", color: "white" }}>{m.email}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    
                    {members.length === 0 && (
                        <p style={{ textAlign: "center", color: "#ccc", marginTop: "20px" }}>
                            Henüz kayıtlı üye bulunmuyor.
                        </p>
                    )}
                </div>
            </div>
        )}
        {/* 3. DURUM: OLUŞTURMA FORMLARI - Sadece içerik tipleri seçiliyse göster */}
        {["announcement", "event", "poll", "giveaway"].includes(activeTab) && (
            <div className="centered-glass-box">
            <h2 style={{ marginBottom: '30px', color: 'white' }}>{activeTab.toUpperCase()} OLUŞTUR</h2>
            <form onSubmit={handleCreate}>
                <textarea 
                className="fixed-input" 
                style={{ height: '100px', resize: 'none' }} 
                placeholder="İçerik açıklaması... *" 
                onChange={e => setFormData({...formData, text: e.target.value})} 
                required 
                />
                
                {/* Alt kısımdaki anket, event ve giveaway inputlarını buraya taşı */}
                {activeTab === 'poll' && (
                <div style={{ marginBottom: '15px' }}>
                    {pollOptions.map((opt, i) => (
                    <input key={i} className="fixed-input" placeholder={`Seçenek ${i+1}`} value={opt} onChange={e => {
                        const n = [...pollOptions]; n[i] = e.target.value; setPollOptions(n);
                    }} required />
                    ))}
                    <button type="button" onClick={() => setPollOptions([...pollOptions, ""])} >+ Ekle</button>
                </div>
                )}

                {activeTab === 'event' && (
                <>
                    <input type="datetime-local" className="fixed-input" onChange={e => setFormData({...formData, expire_date: e.target.value})} required />
                    <input className="fixed-input" placeholder="📍 Mekan *" onChange={e => setFormData({...formData, location: e.target.value})} required />
                </>
                )}

                {activeTab === 'giveaway' && (
                <>
                    <input type="datetime-local" className="fixed-input" onChange={e => setFormData({...formData, deadline: e.target.value})} required />
                    <input type="number" className="fixed-input" placeholder="🏆 Kazanan Sayısı *" onChange={e => setFormData({...formData, winner_count: e.target.value})} required />
                </>
                )}

                <input type="file" className="fixed-input" onChange={e => setSelectedFile(e.target.files[0])} />
                <button type="submit" className="form-submit-btn">Şimdi Yayınla</button>
            </form>
            </div>
        )}
        </main>
    </div>
  );
};

export default ClubDashboard;