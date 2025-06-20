import React, { useState } from 'react';
import axios from 'axios';
import { Endpoint, EndpointRequest } from '../types';
import './EndpointCard.css';

interface EndpointCardProps {
  endpoint: Endpoint;
}

const EndpointCard: React.FC<EndpointCardProps> = ({ endpoint }) => {
  const [name, setName] = useState('EasterEgg-1');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSubmit = async () => {
    if (!name.trim()) {
      setError('Пожалуйста, введите имя');
      return;
    }

    setLoading(true);
    setError('');
    setResponse('');

    try {
      const method = endpoint.method || 'GET';
      const config: any = {
        headers: {
          'accept': '*/*',
          'Content-Type': 'application/json'
        }
      };

      // Добавляем API ключ если он есть
      if (endpoint.apiKey) {
        config.headers['X-API-Key'] = endpoint.apiKey;
      } else {
        // Используем тестовый ключ по умолчанию
        config.headers['X-API-Key'] = 'test';
      }

      let result;
      
      if (method === 'GET') {
        // Для GET запроса добавляем параметры в URL
        const url = `${endpoint.url}?name=${encodeURIComponent(name)}`;
        result = await axios.get(url, config);
      } else {
        // Для POST запроса отправляем данные в теле
        const requestData: EndpointRequest = { name };
        result = await axios.post(endpoint.url, requestData, config);
      }
      
      setResponse(JSON.stringify(result.data, null, 2));
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(`Ошибка: ${err.response?.data?.message || err.message}`);
      } else {
        setError('Произошла неизвестная ошибка');
      }
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
            placeholder="Введите имя"
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

      {response && (
        <div className="response-section">
          <h4>Ответ:</h4>
          <pre className="response-data">{response}</pre>
        </div>
      )}
    </div>
  );
};

export default EndpointCard; 