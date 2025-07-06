import React from 'react';
import './SaleEventCard.css';
import TonIcon from '../TonIcon';

interface SaleEventCardProps {
  saleEvent: any;
  collapsed: boolean;
  onClick: () => void;
  timeAgo: string;
}

const SaleEventCard: React.FC<SaleEventCardProps> = ({ saleEvent, collapsed, onClick, timeAgo }) => {
  const { gift, prices, provider, upgrade } = saleEvent.data;
  return (
    <div className={collapsed ? 'sale-card-collapsed' : 'sale-card-expanded'} onClick={onClick} style={{cursor: 'pointer', marginBottom: 12}}>
      <div style={{display: 'flex', alignItems: 'center'}}>
        <img src={gift.media.pics.small} alt={gift.name} style={{width: 48, height: 48, borderRadius: 12, marginRight: 12, background: '#f2f6fa'}} />
        <div style={{flex: 1}}>
          <div style={{fontWeight: 600, fontSize: 18, color: '#222'}}>{gift.name} #{gift.number}</div>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <div style={{color: '#6a7a8c', fontSize: 14}}>{provider}</div>
            <div style={{marginLeft: 8, display: 'flex', alignItems: 'center', background: '#0098EA', color: 'white', borderRadius: 20, padding: '4px 10px', fontWeight: 600, fontSize: 18, marginRight: 8}}>
            {prices.sale_model_price}<TonIcon />
            </div>
          </div>
        </div>
      </div>
      <div style={{color: '#8a99a8', fontSize: 13, marginTop: 4}}>{timeAgo}</div>
      {!collapsed && (
        <div style={{marginTop: 12}}>
          <div><b>Модель:</b> {gift.model}</div>
          <div><b>Collection floor:</b> {prices.collection_floor_price} TON</div>
          <div><b>Model floor:</b> {prices.model_floor_price} TON</div>
        </div>
      )}
    </div>
  );
};

export default SaleEventCard; 