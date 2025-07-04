import React, { useEffect, useRef, useState } from 'react';

const WS_URL = 'wss://giftasset.pro/api/v1/gifts/ws/sales_updates?api_key=test';

interface GiftData {
  gift: {
    gift_id: number;
    model: string;
    name: string;
    rarity: number;
  };
  prices: {
    collection_floor_price: number;
    model_floor_price: number;
    sale_model_price: number;
  };
  provider: string;
  timestamp: number;
  upgrade: {
    total_amount: number;
    upgraded_amount: number;
  };
}

interface SaleEvent {
  data: GiftData;
  event: string;
}

const StreamingPage: React.FC = () => {
  const [lastEvent, setLastEvent] = useState<SaleEvent | null>(null);
  const [error, setError] = useState<string | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setError(null);
    const ws = new WebSocket(WS_URL);
    wsRef.current = ws;

    ws.onopen = () => {
      setError(null);
    };
    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.event === 'new_sale') {
          setLastEvent(data);
        }
      } catch (e) {
        setError('Ошибка парсинга данных');
      }
    };
    ws.onerror = () => {
      setError('Ошибка WebSocket соединения');
    };
    ws.onclose = () => {
      setError('WebSocket соединение закрыто');
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div style={{ padding: 16 }}>
      <h2>Стриминг продаж подарков</h2>
      <div id="streaming-content">
        {error && <div style={{ color: 'red', marginBottom: 12 }}>{error}</div>}
        {lastEvent ? (
          <div className="streaming-card">
            <div className="streaming-provider">{lastEvent.data.provider}</div>
            <div className="streaming-title">Новая продажа</div>
            <div><span className="streaming-label">Модель:</span> {lastEvent.data.gift.model}</div>
            <div><span className="streaming-label">Название:</span> {lastEvent.data.gift.name}</div>
            <div><span className="streaming-label">Редкость:</span> {lastEvent.data.gift.rarity}</div>
            <div className="streaming-label" style={{marginTop: 8}}>Цены:</div>
            <ul>
              <li>Collection floor: {lastEvent.data.prices.collection_floor_price} TON</li>
              <li>Model floor: {lastEvent.data.prices.model_floor_price} TON</li>
              <li>Sale model: {lastEvent.data.prices.sale_model_price} TON</li>
            </ul>
            <div><span className="streaming-label">Upgrade:</span> {lastEvent.data.upgrade.upgraded_amount} / {lastEvent.data.upgrade.total_amount}</div>
            <div className="streaming-time">
              Время: {new Date(lastEvent.data.timestamp * 1000).toLocaleString()}
            </div>
          </div>
        ) : (
          <p>Ожидание новых продаж...</p>
        )}
      </div>
    </div>
  );
};

export default StreamingPage; 