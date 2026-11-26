import React from 'react';

function TaskCard(props) {
  const cardStyle = {
    backgroundColor: 'white',
    padding: '15px',
    borderRadius: '6px',
    marginBottom: '10px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    position: 'relative'
  };

  const deleteBtnStyle = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: 'none',
    border: 'none',
    color: '#e74c3c',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '14px'
  };

  // Dynamic colors for priority badges
  const getBadgeColor = (p) => {
    if (p === 'HIGH') return '#e74c3c'; // Red
    if (p === 'MEDIUM') return '#f39c12'; // Yellow/Orange
    return '#27ae60'; // Green for Low
  };

  const badgeStyle = {
    display: 'inline-block',
    padding: '2px 6px',
    fontSize: '10px',
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: getBadgeColor(props.priority),
    borderRadius: '4px',
    marginBottom: '8px'
  };

  const actionBtnStyle = {
    marginTop: '10px',
    padding: '4px 8px',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '12px'
  };

  return (
    <div style={cardStyle}>
      <button style={deleteBtnStyle} onClick={() => props.onDelete(props.id)}>
        ✕
      </button>

      {/* Priority Badge */}
      <div>
        <span style={badgeStyle}>{props.priority || 'MEDIUM'}</span>
      </div>
      
      <h4 style={{ margin: '0 0 8px 0', color: '#333' }}>{props.title}</h4>
      <p style={{ margin: '0 0 10px 0', color: '#666', fontSize: '14px' }}>{props.description}</p>

      {/* Action buttons */}
      {props.status === 'TODO' && (
        <button style={actionBtnStyle} onClick={() => props.onMove(props.id, 'IN_PROGRESS')}>
          Start ➔
        </button>
      )}

      {props.status === 'IN_PROGRESS' && (
        <button style={{ ...actionBtnStyle, backgroundColor: '#2ecc71' }} onClick={() => props.onMove(props.id, 'DONE')}>
          Complete ✓
        </button>
      )}
    </div>
  );
}

export default TaskCard;