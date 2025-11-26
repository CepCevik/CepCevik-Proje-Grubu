const BASE_URL = "http://127.0.0.1:8000/accounts/";

export async function signupStudent(data) {
  const res = await fetch(`${BASE_URL}signup/student/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Student signup failed");
  return await res.json();
}

export async function signupClub(data) {
  const res = await fetch(`${BASE_URL}signup/club/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Club signup failed");
  return await res.json();
}

export async function loginUser(data) {
  const res = await fetch(`${BASE_URL}login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Login failed");
  return await res.json();
}


export async function fetchUserProfile() {
  const token = localStorage.getItem("token");
  // Kullanıcının login sırasında localStorage'a kaydettiği token'ı kullanır
  if (!token) throw new Error("Token bulunamadı. Giriş yapınız.");

  const res = await fetch(`${BASE_URL}profile/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // JWT'yi Authorization başlığında gönderir
      "Authorization": `Bearer ${token}` 
    },
  });

  if (!res.ok) throw new Error("Profil bilgileri çekilemedi.");
  return await res.json();
}