import React from 'react';

interface HistoricDataManagerProps {
  options: string[];
  visibleData: string[];
  toggleVisibleData: (dataType: string) => void;
}

const HistoricDataManager: React.FC<HistoricDataManagerProps> = ({
  options,
  visibleData,
  toggleVisibleData,
}) => {
  return (
    <div style={{ display: 'flex', gap: '10px' }}>
      {options.map(option => (
        <div
          key={option}
          style={{
            border: '1px solid #ccc',
            padding: '10px',
            borderRadius: '5px',
            textAlign: 'center',
          }}
        >
          <label>
            <input
              type='checkbox'
              checked={visibleData.includes(option)}
              onChange={() => toggleVisibleData(option)}
            />
            {option}
          </label>
        </div>
      ))}
    </div>
  );
};

export default HistoricDataManager;
