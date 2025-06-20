import React, { useState, useEffect } from 'react';
import Lottie from 'lottie-react';
import './CollectibleCard.css';

// Based on the provided JSON
interface Collectible {
    attributes: {
        [key: string]: {
            name: string;
            rarity: number;
            readable_rarity: number;
        }
    };
    telegram_gift_title: string;
    telegram_gift_number: number;
    total_amount: number;
    media: {
        lottie_anim: string;
        pics: {
            large: string;
            medium: string;
            small: string;
        };
    };
    providers?: {
        [key: string]: {
            collection_floor: number;
        };
    };
}

interface CollectibleCardProps {
  collectible: Collectible;
}

const formatNumber = (num: number) => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
}

const CollectibleCard: React.FC<CollectibleCardProps> = ({ collectible }) => {
    const [lottieAnimation, setLottieAnimation] = useState(null);
    const [isLottieLoaded, setIsLottieLoaded] = useState(false);

    useEffect(() => {
        fetch(collectible.media.lottie_anim)
            .then(response => response.json())
            .then(data => {
                setLottieAnimation(data);
            })
            .catch(error => console.error('Error fetching lottie animation:', error));
    }, [collectible.media.lottie_anim]);

    const handleLottieLoad = () => {
        setIsLottieLoaded(true);
    };

    const attributesOrder = ['MODEL', 'BACKDROP', 'SYMBOL'];

    return (
        <div className="collectible-card">
            {/* Блок с ценами маркетплейсов */}
            {collectible.providers && (
                <div className="providers-container">
                    <h3 className="providers-title">Цены на маркетплейсах</h3>
                    <div className="providers-grid">
                        {Object.entries(collectible.providers).map(([provider, data]) => (
                            <div key={provider} className="provider-item">
                                <span className="provider-name">{provider.toUpperCase()}</span>
                                <span className="provider-price">{data.collection_floor} TON</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="media-section">
                <div className="media-container" style={{backgroundColor: '#e6c381'}}>
                    <img 
                        src={collectible.media.pics.large} 
                        alt={collectible.telegram_gift_title}
                        className="collectible-image"
                    />
                    {lottieAnimation && (
                        <div className={`lottie-player ${isLottieLoaded ? 'loaded' : ''}`}>
                             <Lottie
                                animationData={lottieAnimation}
                                onDOMLoaded={handleLottieLoad}
                                loop={true}
                             />
                        </div>
                    )}
                </div>
                
                {/* Блок с тремя изображениями справа */}
                <div className="images-sidebar">
                    <div className="image-item">
                        <img 
                            src={collectible.media.pics.large} 
                            alt="Large"
                            className="sidebar-image"
                        />
                        <span className="image-label">Large</span>
                    </div>
                    <div className="image-item">
                        <img 
                            src={collectible.media.pics.medium} 
                            alt="Medium"
                            className="sidebar-image"
                        />
                        <span className="image-label">Medium</span>
                    </div>
                    <div className="image-item">
                        <img 
                            src={collectible.media.pics.small} 
                            alt="Small"
                            className="sidebar-image"
                        />
                        <span className="image-label">Small</span>
                    </div>
                </div>
            </div>

            <div className='info-container'>
                <h2 className="title">{collectible.telegram_gift_title}</h2>
                <p className="collectible-id">Collectible #{collectible.telegram_gift_number}</p>

                <table className="attributes-table">
                    <tbody>
                        {attributesOrder.map(attrKey => {
                            const attribute = collectible.attributes[attrKey];
                            if (!attribute) return null;
                            return (
                                <tr className="attribute-row" key={attrKey}>
                                    <td className="attribute-name">{attrKey.charAt(0) + attrKey.slice(1).toLowerCase()}</td>
                                    <td className="attribute-value">
                                        {attribute.name}
                                        <span className="rarity">{attribute.readable_rarity}%</span>
                                    </td>
                                </tr>
                            )
                        })}
                        <tr className="attribute-row">
                            <td className="attribute-name">Quantity</td>
                            <td className="attribute-value">{formatNumber(collectible.telegram_gift_number)}/{formatNumber(collectible.total_amount)} issued</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CollectibleCard; 