import React, { useState } from 'react';
import { Endpoint } from '../../types';
import './EndpointCard.css';
import GetGiftByNameCard from '../GetGiftByNameCard';
import GetGiftByUserCard from '../GetGiftByUserCard';
import GetGiftsPriceListCard from '../GetGiftsPriceListCard';

interface EndpointCardProps {
  endpoint: Endpoint;
}

const EndpointCard: React.FC<EndpointCardProps> = ({ endpoint }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const renderEndpointComponent = () => {
    if (endpoint.url.includes('get_gift_by_user')) {
      return <GetGiftByUserCard endpoint={endpoint} />;
    } else if (endpoint.url.includes('get_gifts_price_list')) {
      return <GetGiftsPriceListCard endpoint={endpoint} />;
    } else {
      return <GetGiftByNameCard endpoint={endpoint} />;
    }
  };

  return (
    <div className="endpoint-card">
      <div className="endpoint-header" onClick={toggleExpanded}>
        <div className="endpoint-info">
          <h3 className="endpoint-name">{endpoint.name}</h3>
        </div>
        <div className="endpoint-toggle">
          <span className={`toggle-icon ${isExpanded ? 'expanded' : ''}`}>▼</span>
        </div>
      </div>
      {isExpanded && renderEndpointComponent()}
    </div>
  );
};

export default EndpointCard; 