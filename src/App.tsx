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
