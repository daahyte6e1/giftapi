import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Lottie from 'lottie-react';
import { Collectible } from '../types';
import './GiftModal.css';

interface GiftModalProps {
  gift: Collectible | null;
  isOpen: boolean;
  onClose: () => void;
}

const formatNumber = (num: number) => {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
};

const GiftModal: React.FC<GiftModalProps> = ({ gift, isOpen, onClose }) => {
  const [lottieData, setLottieData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (gift && gift.media?.lottie_anim && isOpen) {
      setIsLoading(true);
      fetch(gift.media.lottie_anim)
        .then(response => response.json())
        .then(data => {
          setLottieData(data);
          setIsLoading(false);
        })
        .catch(error => {
          console.error('Ошибка загрузки Lottie анимации:', error);
          setIsLoading(false);
        });
    }
  }, [gift, isOpen]);

  if (!gift) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="gift-modal"
      overlayClassName="gift-modal-overlay"
      contentLabel="Подробная информация о подарке"
    >
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
        
        <div className="modal-header">
          <h2>{gift.telegram_gift_name || gift.telegram_gift_title}</h2>
        </div>

        <div className="modal-body">
          <div className="gift-preview">            
            {gift.media?.lottie_anim && (
              <div className="lottie-container">
                {isLoading ? (
                  <div className="lottie-loading">Загрузка анимации...</div>
                ) : lottieData ? (
                  <Lottie 
                    animationData={lottieData} 
                    loop={true}
                    autoplay={true}
                    className="lottie-animation"
                  />
                ) : (
                  <div className="lottie-error">Ошибка загрузки анимации</div>
                )}
              </div>
            )}
          </div>

          <div className="gift-details">
            <div className="detail-section">
              <h3>Основная информация</h3>
              <div className="detail-item">
                <span className="detail-label">ID:</span>
                <span className="detail-value">{gift.id}</span>
              </div>
              
              {gift.rarity_index && (
                <div className="detail-item">
                  <span className="detail-label">Редкость:</span>
                  <span className="detail-value rarity">
                    {(gift.rarity_index * 100).toFixed(4)}%
                  </span>
                </div>
              )}
              
              {gift.total_amount && (
                <div className="detail-item">
                  <span className="detail-label">Всего выпущено:</span>
                  <span className="detail-value">{formatNumber(gift.total_amount)}</span>
                </div>
              )}
            </div>

            {gift.attributes && Object.keys(gift.attributes).length > 0 && (
              <div className="detail-section">
                <h3>Атрибуты</h3>
                {Object.entries(gift.attributes).map(([key, attr]) => (
                  <div key={key} className="detail-item">
                    <span className="detail-label">{attr.name}:</span>
                    <span className="detail-value">
                      {attr.readable_rarity}% (редкость: {attr.rarity})
                    </span>
                  </div>
                ))}
              </div>
            )}

            {gift.providers && Object.keys(gift.providers).length > 0 && (
              <div className="detail-section">
                <h3>Цены на маркетплейсах</h3>
                {Object.entries(gift.providers).map(([provider, data]) => (
                  <div key={provider} className="detail-item">
                    <span className="detail-label">{provider}:</span>
                    <span className="detail-value">
                      Floor: {data.collection_floor} TON
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default GiftModal; 