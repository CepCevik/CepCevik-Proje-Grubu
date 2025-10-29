import React, { useState, useEffect } from 'react';

function App() {
  const [message, setMessage] = useState(''); // Mesajı burada tutacağız

  useEffect(() => {
    // Django API çağrısı
    fetch('http://localhost:8000/api/system-message/')
      .then(response => response.json())
      .then(data => setMessage(data.message))
      .catch(error => console.error('API hatası:', error));
  }, []); // Boş array = component mount olduğunda sadece bir kez çalışır

  return (
    <div style={{ padding: '20px' }}>
      <h1>Sistem Mesajı:</h1>
      <p>{message}</p>
    </div>
  );
}

export default App;
