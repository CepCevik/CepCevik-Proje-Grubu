import React, { useEffect, useState } from 'react';
import { fetchSystemMessage } from '../api/systemMessageService';

function SystemAnnouncementBanner() {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSystemMessage()
      .then(msg => setMessage(msg))
      .catch(() => setError('Sistem duyurusu yüklenemedi.'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Yükleniyor...</p>;
  if (error) return <p>{error}</p>;
  if (!message) return null;

  return (
    <div style={{ backgroundColor: '#f5f5f5', padding: '10px', textAlign: 'center' }}>
      <strong>{message}</strong>
    </div>
  );
}

export default SystemAnnouncementBanner;
