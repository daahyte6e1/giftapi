import React from 'react';
import { Endpoint } from '../types';

interface EndpointFormProps {
  endpoint: Endpoint;
  name: string;
  setName: (name: string) => void;
  username: string;
  setUsername: (username: string) => void;
  limit: number;
  setLimit: (limit: number) => void;
  offset: number;
  setOffset: (offset: number) => void;
  loading: boolean;
}

const EndpointForm: React.FC<EndpointFormProps> = ({
  endpoint,
  name,
  setName,
  username,
  setUsername,
  limit,
  setLimit,
  offset,
  setOffset,
  loading
}) => {
  if (endpoint.url.includes('get_gift_by_user')) {
    return (
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
    );
  } else {
    return (
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
    );
  }
};

export default EndpointForm; 