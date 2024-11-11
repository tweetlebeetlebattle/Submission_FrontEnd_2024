import React from 'react';

interface ConditionManagerProps {
  title: string;
  isMakePublic: boolean;
  isVisible: boolean;
  onToggleMakePublic: (value: boolean) => void;
  onToggleVisible: (value: boolean) => void;
}

const ConditionManager: React.FC<ConditionManagerProps> = ({
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
      }}
    >
      <span style={{ marginRight: '10px' }}>{title}</span>
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
  );
};

export default ConditionManager;
