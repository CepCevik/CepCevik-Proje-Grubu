const BASE_URL = "http://127.0.0.1:8000/accounts/";

// Yardımcı fonksiyon: Header'a Token ekler
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
  };
};

// 1. Tüm Kulüpleri Getir (Öğrenci için)
export async function fetchClubs() {
  const res = await fetch(`${BASE_URL}clubs/`, {
    method: "GET",
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Kulüpler yüklenemedi.");
  return await res.json();
}

// 2. Kulübe Katıl / Ayrıl (Öğrenci için)
export async function joinClub(clubId) {
  const res = await fetch(`${BASE_URL}clubs/${clubId}/join/`, {
    method: "POST",
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("İşlem başarısız oldu.");
  return await res.json();
}

// 3. Kulüp Üyelerini Getir (Kulüp Yöneticisi için)
export async function fetchMyClubMembers() {
  const res = await fetch(`${BASE_URL}my-club/members/`, {
    method: "GET",
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Üyeler yüklenemedi.");
  return await res.json();
}

// 4. Yeni Etkinlik Oluştur (Kulüp Yöneticisi için) - YENİ EKLENDİ
export async function createEvent(eventData) {
  const res = await fetch(`${BASE_URL}events/`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(eventData),
  });
  
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Etkinlik oluşturulamadı.");
  }
  
  return await res.json();
}


// 5. Tüm Etkinlikleri Getir (Öğrenci/Anasayfa için)
export async function fetchEvents() {
  const res = await fetch(`${BASE_URL}events/`, {
    method: "GET",
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Etkinlikler yüklenemedi.");
  return await res.json();
}

export async function createAnnouncement(data) {
  const res = await fetch(`${BASE_URL}announcements/`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Duyuru paylaşılamadı.");
  return await res.json();
}

export async function fetchAnnouncements() {
  const res = await fetch(`${BASE_URL}announcements/`, {
    method: "GET",
    headers: getAuthHeaders(),
  });
  return await res.json();
}