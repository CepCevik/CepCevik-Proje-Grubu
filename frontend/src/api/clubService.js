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
