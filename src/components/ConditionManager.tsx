import React, { useState } from 'react';
import BasicModal from '../modal/BasicModal';

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
  const [dateTime, setDateTime] = useState<string>(
    new Date().toISOString().slice(0, 16)
  );
  const [inputValue, setInputValue] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleSubmit = () => {
    if (inputValue.trim() === '') {
      alert('Input value cannot be empty');
      return;
    }
    setIsModalOpen(true);
  };

  const handleConfirmSubmit = () => {
    console.log('DateTime:', dateTime);
    console.log('Input Value:', inputValue);
    alert(`Submitted!\nDateTime: ${dateTime}\nInput Value: ${inputValue}`);
    setIsModalOpen(false);
  };

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

      <div style={{ marginBottom: '10px' }}>
        <label>
          Select Date & Time:
          <input
            type='datetime-local'
            value={dateTime}
            onChange={e => setDateTime(e.target.value)}
            style={{ marginLeft: '10px' }}
          />
        </label>
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label>
          Enter Value:
          <input
            type='text'
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            style={{ marginLeft: '10px' }}
          />
        </label>
      </div>

      <button onClick={handleSubmit}>Submit</button>

      <BasicModal
        title='Confirm Submission'
        buttonLabel='Confirm'
        onSubmit={handleConfirmSubmit}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default ConditionManager;
