import React from 'react';
import EndpointCard from './EndpointCard';
import { Endpoint } from '../types';

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
        defaultValue: ''
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
  },
  {
    id: '3',
    name: 'Цены на подарки (floors/models)',
    url: 'https://giftasset.pro/api/v1/gifts/get_gifts_price_list',
    description: 'GET запрос для получения информации по ценам подарков. Query параметр models (true/false) — если true, то вложенные модели, если false — только floors.',
    method: 'GET',
    apiKey: 'test',
    parameters: [
      {
        name: 'models',
        type: 'string',
        required: true,
        description: 'Включить вложенные модели (true/false)',
        defaultValue: 'false'
      }
    ]
  }
];

const MainPage: React.FC = () => (
  <div className="endpoints-list">
    {endpoints.map(endpoint => (
      <EndpointCard key={endpoint.id} endpoint={endpoint} />
    ))}
  </div>
);

export default MainPage; 