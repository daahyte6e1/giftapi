import React, { useState } from 'react';
import { Endpoint, EndpointRequest } from '../types';
import './EndpointCard.css';
import CollectibleCard from './CollectibleCard';

interface EndpointCardProps {
  endpoint: Endpoint;
}

const EndpointCard: React.FC<EndpointCardProps> = ({ endpoint }) => {
  const [name, setName] = useState('EasterEgg-1');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<any>({});
  const [error, setError] = useState<string>('');

  const handleSubmit = async () => {
    if (!name.trim()) {
      setError('Пожалуйста, введите имя');
      return;
    }

    setLoading(true);
    setError('');
    setResponse({});

    try {
      const url = `${endpoint.url}?name=${encodeURIComponent(name)}`;
      const result = await fetch(url, {
        signal: AbortSignal.timeout(5000),
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
      setResponse(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(`Ошибка: ${err.message}`);
      } else {
        setError('Произошла неизвестная ошибка');
      }
      setResponse({
        "attributes": {
          "BACKDROP": {
            "name": "Hunter Green",
            "rarity": 12,
            "readable_rarity": 1.2
          },
          "MODEL": {
            "name": "Red Whelp",
            "rarity": 5,
            "readable_rarity": 0.5
          },
          "SYMBOL": {
            "name": "Moose Head",
            "rarity": 5,
            "readable_rarity": 0.5
          }
        },
        "collectible_id": 1,
        "id": 1707,
        "last_updated_at": "2025-06-20T14:46:15Z",
        "market_floor": {
          "avg": 4.673,
          "max": 6,
          "min": 3.8
        },
        "media": {
          "lottie_anim": "https://nft.fragment.com/gift/easteregg-1.lottie.json",
          "pics": {
            "large": "https://nft.fragment.com/gift/easteregg-1.large.jpg",
            "medium": "https://nft.fragment.com/gift/easteregg-1.medium.jpg",
            "small": "https://nft.fragment.com/gift/easteregg-1.small.jpg"
          }
        },
        "media_preview": "https://nft.fragment.com/gift/easteregg-1.medium.jpg",
        "providers": {
          "fragment": {
            "collection_floor": 6
          },
          "mrkt": {
            "collection_floor": 4.59
          },
          "portals": {
            "collection_floor": 4.3
          },
          "tonnel": {
            "collection_floor": 3.8
          }
        },
        "rarity_index": 3e-05,
        "telegram_gift_id": 5774079931671642755,
        "telegram_gift_name": "EasterEgg-1",
        "telegram_gift_number": 150212,
        "telegram_gift_title": "Easter Egg",
        "telegram_nft_url": "https://t.me/nft/EasterEgg-1",
        "total_amount": 173176
      })
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="endpoint-card">
      <div className="endpoint-header">
        <h3 className="endpoint-name">{endpoint.name}</h3>
        <p className="endpoint-url">{endpoint.url}</p>
        <p className="endpoint-description">{endpoint.description}</p>
        <p className="endpoint-method">Метод: {endpoint.method || 'GET'}</p>
      </div>
      
      <div className="endpoint-form">
        <div className="input-group">
          <label htmlFor={`name-${endpoint.id}`}>Имя:</label>
          <input
            id={`name-${endpoint.id}`}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Введите имя подарка. Например: EasterEgg-1"
            disabled={loading}
          />
        </div>
        
        <button 
          onClick={handleSubmit}
          disabled={loading || !name.trim()}
          className="submit-button"
        >
          {loading ? 'Отправка...' : 'Отправить запрос'}
        </button>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {response && Object.keys(response).length > 0 && (
        <CollectibleCard collectible={response} />
      )}
    </div>
  );
};

export default EndpointCard; 