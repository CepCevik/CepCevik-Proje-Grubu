import React, { useState } from 'react';


const API_URL = "http://localhost:8000"; 

const PostCard = ({ post, isClubOwner, onRefresh, onLike, onVote, onCommentSubmit }) => {
    const [showResults, setShowResults] = useState(false); 
    const [showComments, setShowComments] = useState(false);
    const [showLikes, setShowLikes] = useState(false);
    const [commentText, setCommentText] = useState("");
    const [showWinners, setShowWinners] = useState(false);


    const configMap = {
        announcement: { color: '#3498db', bg: 'rgba(52, 152, 219, 0.08)', icon: '📢', label: 'Duyuru' },
        event: { color: '#2ecc71', bg: 'rgba(46, 204, 113, 0.08)', icon: '📅', label: 'Etkinlik' },
        giveaway: { color: '#e74c3c', bg: 'rgba(231, 76, 60, 0.08)', icon: '🎁', label: 'Çekiliş' },
        poll: { color: '#9b59b6', bg: 'rgba(155, 89, 182, 0.08)', icon: '📊', label: 'Anket' }
    };



    const config = configMap[post.post_type] || { color: '#888', bg: '#f9f9f9', icon: '📝', label: 'Gönderi' };

    return (
        <div className="full-highlight-card" style={{ 
            border: `2px solid ${config.color}`, 
            backgroundColor: "rgba(255, 255, 255, 0.8)",  //config.bg,
            borderRadius: '16px', padding: '25px', marginBottom: '30px',
            width: '100%', maxWidth: '650px', color: '#333',
            boxShadow: `0 8px 20px ${config.bg}`
        }}>
            {/* 1. ÜST BİLGİ */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', alignItems: 'center' }}>
                <span style={{ backgroundColor: config.color, color: 'white', padding: '6px 15px', borderRadius: '20px', fontWeight: 'bold', fontSize: '14px' }}>
                    {config.icon} {config.label}
                </span>
                <span style={{ fontSize: '13px', color: '#666' }}>
                    {new Date(post.posted_date).toLocaleDateString('tr-TR')}
                </span>
            </div>

            {/* 2. İÇERİK ALANI */}
            <div className="card-content">
                <p style={{ fontSize: '17px', marginBottom: '15px', fontWeight: '500', textAlign: 'left' }}>{post.text}</p>
                
                {post.image && (
                    <img 
                        src={post.image.startsWith('http') ? post.image : `${API_URL}${post.image}`} 
                        alt="post" 
                        style={{ width: '100%', borderRadius: '12px', marginBottom: '15px' }}
                    />
                )}

                {/* DETAYLAR KUTUSU */}
                <div style={{ background: 'rgba(255,255,255,0.7)', padding: '15px', borderRadius: '12px', border: `1px dashed ${config.color}`, textAlign: 'left' }}>
                    
                    {/* ETKİNLİK */}
                    {post.post_type === 'event' && post.details && (
                        <div style={{ fontSize: '15px' }}>
                            <b>📍 Mekan:</b> {post.details.location} <br/>
                            <b>⏰ Zaman:</b> {new Date(post.details.expire_date).toLocaleString('tr-TR')}
                        </div>
                    )}

                    {/* ANKET */}
                    {post.post_type === 'poll' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {post.details?.options?.split(',').map((opt, i) => {
                                const voteCount = post.details.results?.[opt] || 0;
                                return (
                                    <button key={i} onClick={() => onVote(post.id, opt)} className="poll-btn-modern" style={{ width: '100%', padding: '12px', textAlign: 'left', background: 'white', border: '1px solid #ddd', borderRadius: '8px', cursor: 'pointer' }}>
                                        {opt}
                                        {showResults && <span style={{ float: 'right', fontWeight: 'bold', color: '#007bff' }}>👤 {voteCount}</span>}
                                    </button>
                                );
                            })}
                            <button onClick={() => setShowResults(!showResults)} style={{ marginTop: '5px', background: 'none', border: 'none', color: '#007bff', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px' }}>
                                {showResults ? "❌ Sonuçları Gizle" : "📊 Sonuçları Göster"}
                            </button>
                        </div>
                    )}

                    {/* ÇEKİLİŞ */}
                    {/* 🎁 ÇEKİLİŞ BÖLÜMÜ */}
                    {/* 🎁 ÇEKİLİŞ BÖLÜMÜ */}
                    {post.post_type === 'giveaway' && post.details && (
                        <div style={{ fontSize: '15px', textAlign: 'left' }}>
                            <p><b>👥 Katılımcı Sayısı:</b> {post.details.participant_count || 0}</p>
                            
                            {post.details.is_finished ? (
                                /* 🏆 ÇEKİLİŞ BİTTİĞİNDE: Herkes bu butonu görür */
                                <div style={{ marginTop: '10px' }}>
                                    <button 
                                        onClick={() => setShowWinners(!showWinners)}
                                        style={{ 
                                            backgroundColor: '#007bff', 
                                            color: 'white', 
                                            padding: '10px 20px', 
                                            borderRadius: '8px', 
                                            border: 'none', 
                                            cursor: 'pointer',
                                            fontWeight: 'bold',
                                            width: '100%'
                                        }}
                                    >
                                        {showWinners ? "⬆️ Sonuçları Gizle" : "🏆 Sonuçları Görüntüle"}
                                    </button>

                                    {showWinners && (
                                        <div style={{ 
                                            marginTop: '10px', 
                                            padding: '15px', 
                                            background: '#fff3cd', 
                                            borderRadius: '8px', 
                                            border: '1px solid #ffeeba',
                                            color: '#856404',
                                            animation: 'fadeIn 0.3s ease'
                                        }}>
                                            <p style={{ margin: '0 0 5px 0', fontWeight: 'bold' }}>🎉 Şanslı Kazananlar:</p>
                                            <ul style={{ margin: 0, paddingLeft: '20px' }}>
                                                {post.details.winners?.map((w, idx) => (
                                                    <li key={idx} style={{ fontWeight: 'bold' }}>{w}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                /* 🕒 ÇEKİLİŞ DEVAM EDERKEN */
                                <div style={{ marginTop: '10px' }}>
                                    {isClubOwner ? (
                                        <button 
                                            onClick={() => onRefresh(post.id, 'finish')} 
                                            style={{ backgroundColor: '#333', color: 'white', padding: '10px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 'bold', width: '100%' }}
                                        >
                                            🏁 Çekilişi Sonuçlandır
                                        </button>
                                    ) : (
                                        <button 
                                            onClick={() => onRefresh(post.id, post.details.is_joined ? 'leave' : 'join')} 
                                            style={{ 
                                                backgroundColor: post.details.is_joined ? '#dc3545' : '#28a745', 
                                                color: 'white', padding: '10px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 'bold', width: '100%' 
                                            }}
                                        >
                                            {post.details.is_joined ? "❌ Çekilişten Ayrıl" : "🎁 Çekilişe Katıl"}
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                    
                </div>
            </div>

            {/* 3. ETKİLEŞİM BARI (ALTTA) */}
            <div style={{ display: 'flex', gap: '20px', marginTop: '20px', borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '15px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <button onClick={() => onLike(post.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px' }}>
                        {post.is_liked ? '❤️' : '🤍'}
                    </button>
                    <span onClick={() => setShowLikes(!showLikes)} style={{ cursor: 'pointer', fontWeight: 'bold', fontSize: '14px', textDecoration: 'underline' }}>
                        {post.liked_by?.length || 0} Beğeni
                    </span>
                </div>

                <button onClick={() => setShowComments(!showComments)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '15px', fontWeight: 'bold' }}>
                    💬 {post.comments?.length || 0} Yorum
                </button>
            </div>

            {/* 4. BEĞENENLER PANELİ */}
            {showLikes && (
                <div style={{ marginTop: '10px', padding: '12px', background: 'rgba(255,255,255,0.5)', borderRadius: '8px', fontSize: '13px', textAlign: 'left', border: '1px solid #eee' }}>
                    <b>Beğenenler:</b> {post.liked_by?.map(u => u.username).join(', ') || "Henüz beğeni yok."}
                </div>
            )}

            {/* 5. YORUMLAR PANELİ */}
            {showComments && (
                <div style={{ marginTop: '15px', borderTop: '1px solid #eee', paddingTop: '15px', textAlign: 'left' }}>
                    <div style={{ maxHeight: '200px', overflowY: 'auto', marginBottom: '15px' }}>
                        {post.comments && post.comments.length > 0 ? (
                            post.comments.map(c => (
                                <div key={c.id} style={{ marginBottom: '10px', background: 'white', padding: '10px', borderRadius: '8px', fontSize: '14px', boxShadow: '0 2px 5px rgba(0,0,0,0.02)' }}>
                                    <strong style={{ color: '#007bff' }}>{c.username || 'Anonim'}:</strong> {c.text}
                                </div>
                            ))
                        ) : (
                            <p style={{ fontSize: '12px', color: '#888', textAlign: 'center' }}>Henüz yorum yapılmamış.</p>
                        )}
                    </div>

                    <div style={{ display: 'flex', gap: '10px' }}>
                        <input 
                            type="text" 
                            className="fixed-input" 
                            style={{ marginBottom: '0', padding: '10px', fontSize: '14px', flex: 1, border: '1px solid #ddd', borderRadius: '8px' }}
                            placeholder="Bir yorum yaz..."
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                        />
                        <button 
                            onClick={() => { if(commentText.trim()) { onCommentSubmit(post.id, commentText); setCommentText(""); } }}
                            style={{ padding: '0 20px', background: '#333', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
                        >
                            Gönder
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PostCard;