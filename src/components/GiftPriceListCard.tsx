import React, { useState } from 'react';
import { GiftPriceListResponse, CollectionFloors, ModelsPrices } from '../types';

interface GiftPriceListCardProps {
  data: GiftPriceListResponse;
}

const GiftPriceListCard: React.FC<GiftPriceListCardProps> = ({ data }) => {
  const [expandedCollections, setExpandedCollections] = useState<{ [key: string]: boolean }>({});
  const [expandedModels, setExpandedModels] = useState<{ [key: string]: boolean }>({});

  const toggleCollection = (name: string) => {
    setExpandedCollections(prev => ({ ...prev, [name]: !prev[name] }));
  };
  const toggleModel = (key: string) => {
    setExpandedModels(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Floors (collection_floors)
  const renderFloors = (floors: CollectionFloors) => (
    <div style={{ marginBottom: 24 }}>
      <h3 style={{ margin: '12px 0 8px 0' }}>Минимальные цены по коллекциям</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 8, overflow: 'hidden', fontSize: 14 }}>
        <thead style={{ background: '#f5f5f5' }}>
          <tr>
            <th style={{ padding: 8, border: '1px solid #eee' }}>Коллекция</th>
            <th style={{ padding: 8, border: '1px solid #eee' }}>Fragment</th>
            <th style={{ padding: 8, border: '1px solid #eee' }}>Mrkt</th>
            <th style={{ padding: 8, border: '1px solid #eee' }}>Portals</th>
            <th style={{ padding: 8, border: '1px solid #eee' }}>Tonnel</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(floors).map(([name, info]) => (
            <tr key={name}>
              <td style={{ padding: 8, border: '1px solid #eee', fontWeight: 600 }}>{name}</td>
              <td style={{ padding: 8, border: '1px solid #eee' }}>{info.fragment}</td>
              <td style={{ padding: 8, border: '1px solid #eee' }}>{info.mrkt}</td>
              <td style={{ padding: 8, border: '1px solid #eee' }}>{info.portals}</td>
              <td style={{ padding: 8, border: '1px solid #eee' }}>{info.tonnel}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  // Models_prices (вложенные аккордеоны)
  const renderModelsPrices = (models: ModelsPrices) => (
    <div>
      <h3 style={{ margin: '12px 0 8px 0' }}>Цены по моделям</h3>
      {Object.entries(models).map(([collection, modelsObj]) => (
        <div key={collection} style={{ marginBottom: 12, border: '1px solid #eee', borderRadius: 8, background: '#fafbfc' }}>
          <div
            style={{ cursor: 'pointer', fontWeight: 600, padding: 10, background: '#f0f4fa', borderRadius: 8 }}
            onClick={() => toggleCollection(collection)}
          >
            {expandedCollections[collection] ? '▼' : '▶'} {collection}
          </div>
          {expandedCollections[collection] && (
            <div style={{ padding: 10 }}>
              {Object.entries(modelsObj).map(([model, markets]) => {
                const modelKey = `${collection}__${model}`;
                return (
                  <div key={model} style={{ marginBottom: 8, border: '1px solid #e0e0e0', borderRadius: 6, background: '#fff' }}>
                    <div
                      style={{ cursor: 'pointer', fontWeight: 500, padding: 8, background: '#f7f7fa', borderRadius: 6 }}
                      onClick={() => toggleModel(modelKey)}
                    >
                      {expandedModels[modelKey] ? '▼' : '▶'} {model}
                    </div>
                    {expandedModels[modelKey] && (
                      <div style={{ padding: 8 }}>
                        {Object.entries(markets).map(([market, periods]) => (
                          <div key={market} style={{ marginBottom: 6 }}>
                            <div style={{ fontWeight: 400, color: '#667eea', marginBottom: 2 }}>{market}</div>
                            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, background: '#f9f9fb', borderRadius: 4 }}>
                              <thead>
                                <tr>
                                  <th style={{ padding: 4, border: '1px solid #eee' }}>Период</th>
                                  <th style={{ padding: 4, border: '1px solid #eee' }}>Цена</th>
                                </tr>
                              </thead>
                              <tbody>
                                {Object.entries(periods).map(([period, times]) => (
                                  Object.entries(times).map(([timestamp, price]) => (
                                    <tr key={period + timestamp}>
                                      <td style={{ padding: 4, border: '1px solid #eee' }}>{period}</td>
                                      <td style={{ padding: 4, border: '1px solid #eee' }}>{price === null ? '-' : price}</td>
                                    </tr>
                                  ))
                                ))}
                              </tbody>
                            </table>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div style={{ margin: '16px 0' }}>
      {data.collection_floors && renderFloors(data.collection_floors)}
      {data.models_prices && renderModelsPrices(data.models_prices)}
    </div>
  );
};

export default GiftPriceListCard; 