import React, { useState } from 'react';
import { Collectible } from '../../types';
import GiftModal from '../GiftModal';
import './GiftListCard.css';

interface GiftListResponse {
    gifts: Collectible[];
    total: number;
    limit: number;
    offset: number;
}

interface GiftListCardProps {
  giftList: Collectible[];
}

const formatNumber = (num: number) => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')
}

const GiftListCard: React.FC<GiftListCardProps> = ({ giftList }) => {
    const [selectedGift, setSelectedGift] = useState<Collectible | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleGiftClick = (gift: Collectible) => {
        setSelectedGift(gift);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedGift(null);
    };

    return (
        <div className="gift-list-container">
            <div className="gift-list-header">
                <h3>Список подарков пользователя</h3>
            </div>
            
            <div className="gifts-grid">
                {giftList.map((gift, index) => (
                    <div 
                        key={gift.id || index} 
                        className="gift-item"
                        onClick={() => handleGiftClick(gift)}
                    >
                        <div className="gift-image">
                            <img 
                                src={gift.media_preview || gift.media?.pics?.medium || gift.media?.pics?.small || ''} 
                                alt={gift.telegram_gift_name || gift.telegram_gift_title || 'Gift'}
                            />
                            <div className="gift-overlay">
                                <span className="view-details">Нажмите для просмотра</span>
                            </div>
                        </div>
                        <div className="gift-info">
                            <h4>{gift.telegram_gift_name || gift.telegram_gift_title}</h4>
                        </div>
                    </div>
                ))}
            </div>

            <GiftModal 
                gift={selectedGift}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            />
        </div>
    );
};

export default GiftListCard; 