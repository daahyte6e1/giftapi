import React from 'react';
import EndpointCard from './components/EndpointCard';
import { Endpoint } from './types';
import './App.css';

function App() {
  // Пример данных эндпоинтов
  const endpoints: Endpoint[] = [
    {
      id: '1',
      name: 'Подарок по имени',
      url: 'https://giftasset.pro/api/v1/gifts/get_gift_by_name',
      description: 'GET запрос для получения подарка по имени с API ключом',
      method: 'GET',
      apiKey: 'test'
    },
    {
      id: '2',
      name: 'Подарки пользователя',
      url: 'https://giftasset.pro/api/v1/gifts/get_gift_by_user',
      description: 'GET запрос для получения списка подарков пользователя с параметрами username, limit, offset',
      method: 'GET',
      apiKey: 'test',
      parameters: [
        {
          name: 'username',
          type: 'string',
          required: true,
          description: 'Имя пользователя',
          defaultValue: 'xsrub'
        },
        {
          name: 'limit',
          type: 'number',
          required: false,
          description: 'Количество подарков (1-100)',
          defaultValue: 5
        },
        {
          name: 'offset',
          type: 'number',
          required: false,
          description: 'Смещение от начала списка',
          defaultValue: 0
        }
      ]
    }
  ];

  return (
    <div className="App">
      <header className="App-header">
        <h1>Gift api</h1>
        <p>Все о подарках тут</p>
      </header>
      
      <main className="App-main">
        <div className="endpoints-list">
          {endpoints.map(endpoint => (
            <EndpointCard key={endpoint.id} endpoint={endpoint} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
