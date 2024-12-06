import React from 'react';

interface TrainingLogManagerProps {
  title: string;
  isVisible: boolean;
  onToggleVisible: (value: boolean) => void;
}

const OtherDisplayTraining: React.FC<TrainingLogManagerProps> = ({
  title,
  isVisible,
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

      <label style={{ marginBottom: '10px' }}>
        Is Visible:
        <input
          type='checkbox'
          checked={isVisible}
          onChange={e => onToggleVisible(e.target.checked)}
          style={{ marginLeft: '10px' }}
        />
      </label>
    </div>
  );
};

export default OtherDisplayTraining;
