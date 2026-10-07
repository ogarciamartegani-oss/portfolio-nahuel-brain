import React from 'react';
import { X, Calendar, ArrowRight } from 'lucide-react';

const NodeDetails = ({ node, onClose }) => {
  if (!node) return null;

  return (
    <div className={`node-details glass-panel ${node ? 'visible' : ''}`}>
      <button className="close-btn" onClick={onClose}>
        <X size={20} />
      </button>

      <div>
        <span className="node-tag" style={{ color: node.color, border: `1px solid ${node.color}` }}>
          {node.group}
        </span>
        <h2 style={{ marginTop: '12px', borderColor: 'rgba(255,255,255,0.1)' }}>{node.label}</h2>
      </div>

      {node.date && (
        <div className="node-date">
          <Calendar size={16} />
          <span>{node.date}</span>
        </div>
      )}

      {node.description && (
        <p className="node-desc">
          {node.description}
        </p>
      )}

      {node.group === 'proyecto' && (
        <div style={{ marginTop: 'auto', paddingTop: '20px' }}>
          <button style={{ 
            background: `linear-gradient(135deg, ${node.color}, #38bdf8)`,
            color: 'white',
            border: 'none',
            padding: '10px 16px',
            borderRadius: '8px',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            width: '100%',
            justifyContent: 'center',
            boxShadow: `0 4px 15px ${node.color}40`
          }}>
            Ver Detalles <ArrowRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default NodeDetails;
