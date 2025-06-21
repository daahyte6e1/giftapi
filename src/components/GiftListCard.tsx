import React from 'react';
import './GiftListCard.css';

interface Collectible {
    id?: number;
    telegram_gift_name?: string;
    telegram_gift_title?: string;
    media_preview?: string;
    media?: {
        pics: {
            medium: string;
        };
    };
    rarity_index?: number;
    total_amount?: number;
}

interface GiftListResponse {
    gifts: Collectible[];
    total: number;
    limit: number;
    offset: number;
}

interface GiftListCardProps {
  giftList: GiftListResponse;
}

const formatNumber = (num: number) => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')
}

const GiftListCard: React.FC<GiftListCardProps> = ({ giftList }) => {
    return (
        <div className="gift-list-container">
            <div className="gift-list-header">
                <h3>Список подарков пользователя</h3>
            </div>
            <div className="gifts-grid">
                {giftList.gifts.map((gift, index) => (
                    <div key={gift.id || index} className="gift-item">
                        <div className="gift-image">
                            <img 
                                src={gift.media_preview || gift.media?.pics?.medium} 
                                alt={gift.telegram_gift_name || gift.telegram_gift_title}
                            />
                        </div>
                        <div className="gift-info">
                            <h4>{gift.telegram_gift_name || gift.telegram_gift_title}</h4>
                            <p>ID: {gift.id}</p>
                            {gift.rarity_index && (
                                <p>Редкость: {(gift.rarity_index * 100).toFixed(4)}%</p>
                            )}
                            {gift.total_amount && (
                                <p>Всего выпущено: {formatNumber(gift.total_amount)}</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GiftListCard; 