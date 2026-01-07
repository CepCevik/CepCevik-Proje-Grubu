// frontend/src/api/postService.js

import axios from 'axios';

const API_URL = 'http://localhost:8000/api/posts/';

const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return { Authorization: `Bearer ${token}` };
};

const postService = {
    // Kulüp sahibinin kendi akışı (Bozulmadı)
    getClubFeed: () => axios.get(`${API_URL}my-feed/`, { headers: getAuthHeader() }),

    // 🟢 YENİ: Öğrencinin bir kulübün sayfasına girdiğinde çağırdığı fonksiyon
    getClubFeedById: (clubId) => axios.get(`${API_URL}club/${clubId}/`, { headers: getAuthHeader() }),

    createPost: (formData) => {
        return axios.post(`${API_URL}create/`, formData, {
            headers: {
                ...getAuthHeader(),
                'Content-Type': 'multipart/form-data'
            }
        });
    },
    
    finishGiveaway: (id) => axios.post(`${API_URL}giveaway/${id}/finish/`, {}, { headers: getAuthHeader() }),
    // Öğrencinin çekilişe katılması için:
    joinGiveaway: (id) => axios.post(`${API_URL}giveaway/${id}/join/`, {}, { headers: getAuthHeader() }),
    
    // Öğrencinin çekilişten ayrılması için:
    leaveGiveaway: (id) => axios.post(`${API_URL}giveaway/${id}/leave/`, {}, { headers: getAuthHeader() }),

    // (Eski fonksiyonu da silme, başka yerde kullanıyor olabilirsin)
    handleGiveawayAction: (id, action) => axios.post(`${API_URL}giveaway/${id}/${action}/`, {}, { headers: getAuthHeader() }),
    
    
    toggleLike: (postId) => axios.post(`${API_URL}${postId}/like/`, {}, { headers: getAuthHeader() }),
    votePoll: (pollId, option) => axios.post(`${API_URL}${pollId}/vote/`, { option }, { headers: getAuthHeader() }),
    addComment: (postId, text) => axios.post(`${API_URL}${postId}/comment/`, { text }, { headers: getAuthHeader() })
};

export default postService;