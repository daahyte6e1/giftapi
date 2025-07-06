import React, { useState } from 'react';
import { Endpoint, Collectible } from '../../types';
import GiftListCard from '../GiftListCard';
import JsonResponseCard from '../JsonResponseCard';

interface GetGiftByUserCardProps {
  endpoint: Endpoint;
}

const GetGiftByUserCard: React.FC<GetGiftByUserCardProps> = ({ endpoint }) => {
  const [username, setUsername] = useState('');
  const [limit, setLimit] = useState(5);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [userGiftList, setUserGiftList] = useState<Collectible[]>([]);
  const [error, setError] = useState<string>('');

  const handleSubmit = async () => {
    if (!username.trim()) {
      setError('Пожалуйста, введите имя пользователя');
      return;
    }
    if (limit < 1 || limit > 100) {
      setError('Лимит должен быть от 1 до 100');
      return;
    }
    if (offset < 0) {
      setError('Смещение должно быть неотрицательным');
      return;
    }
    setLoading(true);
    setError('');
    setUserGiftList([]);
    try {
      const params = new URLSearchParams();
      params.append('username', username);
      params.append('limit', limit.toString());
      params.append('offset', offset.toString());
      const url = `${endpoint.url}?${params.toString()}`;
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
      setUserGiftList(Array.isArray(data) ? data.filter((item: Collectible) => item.id) : []);
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
          <label htmlFor={`username-${endpoint.id}`}>Имя пользователя:</label>
          <input
            id={`username-${endpoint.id}`}
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Введите имя пользователя."
            disabled={loading}
          />
        </div>
        <div className="input-group">
          <label htmlFor={`limit-${endpoint.id}`}>Лимит:</label>
          <input
            id={`limit-${endpoint.id}`}
            type="number"
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
            min="1"
            max="100"
            disabled={loading}
          />
        </div>
        <div className="input-group">
          <label htmlFor={`offset-${endpoint.id}`}>Смещение:</label>
          <input
            id={`offset-${endpoint.id}`}
            type="number"
            value={offset}
            onChange={(e) => setOffset(Number(e.target.value))}
            min="0"
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
      {userGiftList.length > 0 && (
        <>
          <JsonResponseCard data={userGiftList} />
          <GiftListCard giftList={userGiftList} />
        </>
      )}
    </div>
  );
};

export default GetGiftByUserCard; 