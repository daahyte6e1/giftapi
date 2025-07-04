import React, { useState } from 'react';

interface JsonResponseCardProps {
  data: any;
}

const getPreview = (data: any, maxKeys = 3) => {
  if (Array.isArray(data)) {
    return data.slice(0, maxKeys);
  } else if (typeof data === 'object' && data !== null) {
    const keys = Object.keys(data).slice(0, maxKeys);
    const preview: Record<string, any> = {};
    keys.forEach(key => {
      preview[key] = data[key];
    });
    return preview;
  }
  return data;
};

const formatJson = (data: any) => {
  return JSON.stringify(data, null, 2);
};

const JsonResponseCard: React.FC<JsonResponseCardProps> = ({ data }) => {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!data || (Array.isArray(data) && data.length === 0) || (typeof data === 'object' && Object.keys(data).length === 0)) {
    return null;
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(formatJson(data));
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div style={{
      background: '#f8f9fa',
      borderRadius: 10,
      padding: 16,
      margin: '16px 0',
      boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
      fontFamily: 'monospace',
      position: 'relative',
      wordBreak: 'break-all',
    }}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <span style={{fontWeight: 600, fontSize: 16}}>JSON-ответ</span>
        <button onClick={handleCopy} style={{
          background: copied ? '#4caf50' : '#e0e0e0',
          color: copied ? 'white' : '#333',
          border: 'none',
          borderRadius: 6,
          padding: '6px 12px',
          cursor: 'pointer',
          fontWeight: 500,
          marginLeft: 8,
          transition: 'background 0.2s',
        }}>{copied ? 'Скопировано!' : 'Скопировать'}</button>
      </div>
      <pre style={{
        maxHeight: expanded ? 400 : 80,
        overflow: 'auto',
        margin: '12px 0 0 0',
        background: '#272822',
        color: '#f8f8f2',
        borderRadius: 6,
        padding: 12,
        fontSize: 14,
        cursor: 'pointer',
        transition: 'max-height 0.3s',
      }}
        title={expanded ? 'Скрыть' : 'Показать полностью'}
        onClick={() => setExpanded(e => !e)}
      >
        {expanded ? formatJson(data) : formatJson(getPreview(data)) + (Array.isArray(data) && data.length > 3 ? '\n...\n' : Object.keys(data).length > 3 ? '\n...\n' : '')}
      </pre>
      <div style={{fontSize: 12, color: '#888', marginTop: 4}}>
        {expanded ? 'Кликните, чтобы свернуть' : 'Кликните, чтобы раскрыть полностью'}
      </div>
    </div>
  );
};

export default JsonResponseCard; 