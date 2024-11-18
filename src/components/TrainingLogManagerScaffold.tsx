import React, { useState } from 'react';

interface TrainingLogManagerProps {
  title: string;
  isMakePublic: boolean;
  isVisible: boolean;
  onToggleMakePublic: (value: boolean) => void;
  onToggleVisible: (value: boolean) => void;
}

const TrainingLogManagerSc: React.FC<TrainingLogManagerProps> = ({
  title,
  isMakePublic,
  isVisible,
  onToggleMakePublic,
  onToggleVisible,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        margin: '10px',
        padding: '10px',
        border: '1px solid black',
        width: 'fit-content',
        flexDirection: 'column',
      }}
    >
      <h3>{title}</h3>

      {/* Toggle Switches */}
      <div
        style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}
      >
        <label style={{ marginRight: '10px' }}>
          Make Public:
          <input
            type='checkbox'
            checked={isMakePublic}
            onChange={e => onToggleMakePublic(e.target.checked)}
          />
        </label>
        <label>
          Is Visible:
          <input
            type='checkbox'
            checked={isVisible}
            onChange={e => onToggleVisible(e.target.checked)}
          />
        </label>
      </div>
    </div>
  );
};

export default TrainingLogManagerSc;
