import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
// import './GiftDemo.css'; // Для базовых стилей, если нужно

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <header className="App-header" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
        <h1 style={{ marginRight: 16 }}>Gift api</h1>
        {location.pathname !== '/streaming' && (
          <button
            className="streaming-btn"
            onClick={() => navigate('/streaming')}
          >
            Перейти на стриминг
          </button>
        )}
      </div>
      <p style={{ marginTop: 8 }}>Все о подарках тут</p>
    </header>
  );
};

export default Header; 