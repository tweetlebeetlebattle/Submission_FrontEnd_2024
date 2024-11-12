import React, { useState } from 'react';
import BasicModal from '../modal/BasicModal';

interface NewConditionFormProps {
  onFormSubmit: () => void;
}

const NewConditionForm: React.FC<NewConditionFormProps> = ({
  onFormSubmit,
}) => {
  const [newConditionTitle, setNewConditionTitle] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Handle form submission to open the modal
  const handleCreateCondition = () => {
    if (newConditionTitle.trim() === '') {
      alert('Title cannot be empty');
      return;
    }
    setIsModalOpen(true);
  };

  // Handle the actual submission after confirmation in the modal
  const handleConfirmSubmit = () => {
    alert(`Condition "${newConditionTitle}" created!`);
    setNewConditionTitle('');
    setIsModalOpen(false);
    onFormSubmit(); // Update the parent component state
  };

  return (
    <div style={formStyle}>
      <h3>Create a New Condition</h3>
      <input
        type='text'
        value={newConditionTitle}
        onChange={e => setNewConditionTitle(e.target.value)}
        placeholder='Enter Condition Title'
        style={{ marginRight: '10px' }}
      />
      <button onClick={handleCreateCondition}>Add Condition</button>

      {/* Modal */}
      <BasicModal
        title='Confirm New Condition'
        buttonLabel='Confirm'
        onSubmit={handleConfirmSubmit}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

// Styles for the form
const formStyle: React.CSSProperties = {
  marginBottom: '20px',
  display: 'flex',
  alignItems: 'center',
};

export default NewConditionForm;
