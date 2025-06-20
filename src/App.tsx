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
        <h1>API Тестер</h1>
        <p>Тестируйте эндпоинты прямо с мобильного устройства</p>
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
