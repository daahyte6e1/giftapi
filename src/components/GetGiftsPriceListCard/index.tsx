import React, { useState } from 'react';
import { Endpoint } from '../../types';
import GiftPriceListCard from '../GiftPriceListCard';
import JsonResponseCard from '../JsonResponseCard';

interface GetGiftsPriceListCardProps {
  endpoint: Endpoint;
}

const GetGiftsPriceListCard: React.FC<GetGiftsPriceListCardProps> = ({ endpoint }) => {
  const [models, setModels] = useState('false');
  const [loading, setLoading] = useState(false);
  const [singleGift, setSingleGift] = useState<any>({});
  const [error, setError] = useState<string>('');

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    setSingleGift({});
    try {
      const params = new URLSearchParams();
      params.append('models', models);
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
        <div className="input-group" style={{display: 'flex'}}>
          <label style={{width: '70%'}} htmlFor={`models-${endpoint.id}`}>Включить вложенные модели:</label>
          <input
            id={`models-${endpoint.id}`}
            type="checkbox"
            checked={models === 'true'}
            onChange={e => setModels(e.target.checked ? 'true' : 'false')}
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
          <GiftPriceListCard data={singleGift} />
        </>
      )}
    </div>
  );
};

export default GetGiftsPriceListCard; 