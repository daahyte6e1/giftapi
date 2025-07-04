import React, { useState } from 'react';
import { Endpoint } from '../types';
import SingleGiftCard from './SingleGiftCard';
import JsonResponseCard from './JsonResponseCard';

interface GetGiftByNameCardProps {
  endpoint: Endpoint;
}

const GetGiftByNameCard: React.FC<GetGiftByNameCardProps> = ({ endpoint }) => {
  const [name, setName] = useState('EasterEgg-1');
  const [loading, setLoading] = useState(false);
  const [singleGift, setSingleGift] = useState<any>({});
  const [error, setError] = useState<string>('');

  const handleSubmit = async () => {
    if (!name.trim()) {
      setError('Пожалуйста, введите имя');
      return;
    }
    setLoading(true);
    setError('');
    setSingleGift({});
    try {
      const url = `${endpoint.url}?name=${encodeURIComponent(name)}`;
      const result = await fetch(url, {
        signal: AbortSignal.timeout(20000),
        headers: {
          'accept': '*/*',
          'Content-Type': 'application/json',
          'X-API-Key': 'test'
        }
      });
      if (!result.ok) {
        throw new Error(`HTTP error! status: ${result.status}`);
      }
      const data = await result.json();
      setSingleGift(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(`Ошибка: ${err.message}`);
      } else {
        setError('Произошла неизвестная ошибка');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="endpoint-content">
      <div className="endpoint-info">
        <h3 className="endpoint-name">{endpoint.name}</h3>
        <p className="endpoint-description">{endpoint.description}</p>
        <div className="endpoint-meta">
          <span className="endpoint-method">{endpoint.method}</span>
          <span className="endpoint-url">{endpoint.url}</span>
        </div>
      </div>
      <div className="endpoint-form">
        <div className="input-group">
          <label htmlFor={`name-${endpoint.id}`}>Имя подарка:</label>
          <input
            id={`name-${endpoint.id}`}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Введите имя подарка. Например: EasterEgg-1"
            disabled={loading}
          />
        </div>
      </div>
      <div className="endpoint-actions">
        <button 
          className="submit-button"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? 'Загрузка...' : 'Отправить запрос'}
        </button>
      </div>
      {error && (
        <div className="error-message">{error}</div>
      )}
      {Object.keys(singleGift).length > 0 && (
        <>
          <JsonResponseCard data={singleGift} />
          <SingleGiftCard collectible={singleGift} />
        </>
      )}
    </div>
  );
};

export default GetGiftByNameCard; 