import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import postService from "../api/postService";
import PostCard from "../components/posts/PostCard";

const ClubPage = () => {
  const { clubId } = useParams(); // URL'deki ID'yi al
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadClubPosts();
  }, [clubId]);

  const loadClubPosts = async () => {
    try {
      // Backend'de belirli bir kulübün postlarını çeken API olmalı
      // Eğer yoksa mevcut getClubFeed(clubId) kullanabilirsin
      const res = await postService.getClubFeedById(clubId); 
      setPosts(res.data);
    } catch (e) {
      console.error("Postlar yüklenemedi", e);
    } finally {
      setLoading(false);
    }
  };

  // Etkileşim Fonksiyonları (Öğrenci için)
  const handleLike = async (id) => { await postService.toggleLike(id); loadClubPosts(); };
  const handleVote = async (id, opt) => { 
    await postService.votePoll(id, opt); // Sadece string olarak gönder
    loadClubPosts(); 
    };


  const handleComment = async (id, text) => { await postService.addComment(id, text); loadClubPosts(); };
  // ClubPage.js (Öğrenci Paneli içindeki sayfa)
  const handleRefresh = async (postId, action) => {
    if (action === 'join') await postService.joinGiveaway(postId);
    else if (action === 'leave') await postService.leaveGiveaway(postId);
    loadClubPosts();
    };
/*
const handleRefresh = async (postId, action) => {
    try {
        // action 'join' veya 'leave' olabilir
        await postService.handleGiveawayAction(postId, action);
        
        if (action === 'join') await postService.joinGiveaway(postId);
        else if (action === 'leave') await postService.leaveGiveaway(postId);
        alert("Çekilişten ayrıldınız. 🖐️");
        
        loadClubPosts(); // Veriyi tazele
    } catch (err) {
        alert(err.response?.data?.error || "Bir hata oluştu.");
    }
};
*/


  return (
    <div style={{  minHeight: "100vh", padding: "20px" }}>
      <button onClick={() => navigate(-1)} style={{ marginBottom: "20px", cursor: "pointer" }}>⬅️ Geri Dön</button>
      
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <h2 style={{ marginBottom: "30px", color: "#333" }}>Kulüp Akışı</h2>
        
        {loading ? <p>Yükleniyor...</p> : (
          posts.map(post => (
            <PostCard 
              key={post.id} 
              post={post} 
              isClubOwner={false} // 🟢 KRİTİK: Öğrenci olduğu için false!
              onLike={handleLike}
              onVote={handleVote}
              onCommentSubmit={handleComment}
              onRefresh={handleRefresh}
               // Öğrenci yenileme yapamaz, boş bırakıyoruz
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ClubPage;