import React, { useState } from 'react';
import { Collectible, Endpoint } from '../types/index';
import './EndpointCard.css';
import SingleGiftCard from './SingleGiftCard';
import GiftListCard from './GiftListCard';
import EndpointForm from './EndpointForm';
import JsonResponseCard from './JsonResponseCard';
import GiftPriceListCard from './GiftPriceListCard';

interface EndpointCardProps {
  endpoint: Endpoint;
}

const EndpointCard: React.FC<EndpointCardProps> = ({ endpoint }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [name, setName] = useState('EasterEgg-1');
  const [username, setUsername] = useState('');
  const [limit, setLimit] = useState(5);
  const [offset, setOffset] = useState(0);
  const [models, setModels] = useState('false');
  const [loading, setLoading] = useState(false);
  const [singleGift, setSingleGift] = useState<any>({});
  const [userGiftList, setUserGiftList] = useState<Collectible[]>([]);
  const [error, setError] = useState<string>('');

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const buildUrl = () => {
    let url = endpoint.url;
    if (endpoint.url.includes('get_gift_by_user')) {
      const params = new URLSearchParams();
      params.append('username', username);
      params.append('limit', limit.toString());
      params.append('offset', offset.toString());
      url = `${url}?${params.toString()}`;
    } else if (endpoint.url.includes('get_gifts_price_list')) {
      const params = new URLSearchParams();
      params.append('models', models);
      url = `${url}?${params.toString()}`;
    } else {
      url = `${endpoint.url}?name=${encodeURIComponent(name)}`;
    }
    return url;
  };

  const handleSubmit = async () => {
    if (endpoint.url.includes('get_gift_by_user')) {
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
    } else if (endpoint.url.includes('get_gifts_price_list')) {
      // Нет обязательных полей, models всегда есть
    } else {
      if (!name.trim()) {
        setError('Пожалуйста, введите имя');
        return;
      }
    }

    setLoading(true);
    setError('');
    setSingleGift({});
    setUserGiftList([]);

    try {
      const url = buildUrl();
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
      if (endpoint.url.includes('get_gifts_price_list')) {
        setSingleGift(data); // всегда объект
      } else if (Array.isArray(data)) {
        setUserGiftList(data.filter((item: Collectible) => item.id));
      } else {
        setSingleGift(data);
      }
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

  const renderResponse = () => {
    if (Object.keys(singleGift).length === 0 && userGiftList.length === 0) {
      return null;
    }
    if (endpoint.url.includes('get_gift_by_user')) {
      return <GiftListCard giftList={userGiftList} />;
    } else if (endpoint.url.includes('get_gifts_price_list')) {
      return <GiftPriceListCard data={singleGift} />;
    } else {
      return <SingleGiftCard collectible={singleGift} />;
    }
  };

  return (
    <div className="endpoint-card">
      <div className="endpoint-header" onClick={toggleExpanded}>
        <div className="endpoint-info">
          <h3 className="endpoint-name">{endpoint.name}</h3>
        </div>
        <div className="endpoint-toggle">
          <span className={`toggle-icon ${isExpanded ? 'expanded' : ''}`}>▼</span>
        </div>
      </div>
      {isExpanded && (
        <div className="endpoint-content">
          <div className="endpoint-info">
            <h3 className="endpoint-name">{endpoint.name}</h3>
            <p className="endpoint-description">{endpoint.description}</p>
            <div className="endpoint-meta">
              <span className="endpoint-method">{endpoint.method}</span>
              <span className="endpoint-url">{endpoint.url}</span>
            </div>
          </div>
          <EndpointForm
            endpoint={endpoint}
            name={name}
            setName={setName}
            username={username}
            setUsername={setUsername}
            limit={limit}
            setLimit={setLimit}
            offset={offset}
            setOffset={setOffset}
            loading={loading}
            models={models}
            setModels={setModels}
          />
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
          {renderResponse()}
        </div>
      )}
    </div>
  );
};

export default EndpointCard; 