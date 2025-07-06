import React, { useEffect, useRef, useState } from 'react';
import SaleEventCard from '../../components/SaleEventCard';
import '../../components/GiftListCard/GiftListCard.css'; // для скролла и базовых стилей
import './StreamingPage.css';

const WS_URL = 'wss://giftasset.pro/api/v1/gifts/ws/sales_updates?api_key=test';

interface GiftData {
  gift: {
    gift_id: number;
    gift_id_str: string;
    media: {
      lottie_anim: string;
      pics: {
        large: string;
        medium: string;
        small: string;
      };
    };
    model: string;
    name: string;
    number: number;
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

function getTimeAgo(timestamp: number): string {
  const now = Date.now();
  const diff = Math.floor((now - timestamp * 1000) / 1000);
  if (diff < 60) return `${diff} секунд назад`;
  if (diff < 3600) return `${Math.floor(diff / 60)} минут назад`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} часов назад`;
  return `${Math.floor(diff / 86400)} дней назад`;
}

interface SaleEventWithTimeAgo extends SaleEvent {
  timeAgo: string;
}

const StreamingPage: React.FC = () => {
  const [events, setEvents] = useState<SaleEventWithTimeAgo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [expandedIdx, setExpandedIdx] = useState<number>(0);
  const wsRef = useRef<WebSocket | null>(null);
  const pingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setError(null);
    const ws = new WebSocket(WS_URL);
    wsRef.current = ws;
    ws.onopen = () => {
      setError(null);
      if (pingIntervalRef.current) clearInterval(pingIntervalRef.current);
      pingIntervalRef.current = setInterval(() => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send('ping');
        }
      }, 30000);
    };
    ws.onmessage = (event) => {
      try {
        if (event.data === 'pong') return;

        const data = JSON.parse(event.data);
        if (data.event === 'new_sale') {
          setEvents(prev => {
            const next = [data, ...prev];
            const withTimeAgo = next.slice(0, 10).map(ev => ({ ...ev, timeAgo: getTimeAgo(ev.data.timestamp) }));
            return withTimeAgo;
          });
          setExpandedIdx(0);
        }
      } catch (e: any) {
        setError('Ошибка парсинга данных');
      }
    };
    ws.onerror = () => setError('Ошибка WebSocket соединения');
    ws.onclose = () => {
      setError('WebSocket соединение закрыто');
      if (pingIntervalRef.current) {
        clearInterval(pingIntervalRef.current);
        pingIntervalRef.current = null;
      }
    };
    return () => {
      ws.close();
      if (pingIntervalRef.current) {
        clearInterval(pingIntervalRef.current);
        pingIntervalRef.current = null;
      }
    };
  }, []);

  return (
    <div className="streaming-page-root">
      <div className="streaming-page-header">
        <h2 className="streaming-page-header-title">Стриминг продаж подарков</h2>
      </div>
      <div className="streaming-page-content">
        {error && <div className="streaming-page-error">{error}</div>}
        {events.length === 0 && <p>Ожидание новых продаж...</p>}
        {events.map((ev, idx) => (
          <SaleEventCard
            key={ev.data.gift.gift_id_str + ev.data.timestamp}
            saleEvent={ev}
            collapsed={idx !== expandedIdx}
            onClick={() => setExpandedIdx(idx)}
            timeAgo={ev.timeAgo}
          />
        ))}
      </div>
    </div>
  );
};

export default StreamingPage; 