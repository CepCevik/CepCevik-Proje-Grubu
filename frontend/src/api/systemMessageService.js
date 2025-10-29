// Backend API'den sistem mesajını çeken servis
export async function fetchSystemMessage() {
  try {
    const response = await fetch('http://localhost:8000/api/system-message/');
    if (!response.ok) throw new Error('Sunucu hatası');
    const data = await response.json();
    return data.message; 
  } catch (error) {
    console.error('API hatası:', error);
    throw error;
  }
}
