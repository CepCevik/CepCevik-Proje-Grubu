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
