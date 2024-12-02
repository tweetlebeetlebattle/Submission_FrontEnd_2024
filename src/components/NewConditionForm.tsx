import React, { useContext, useState } from 'react';
import BasicModal from '../modal/BasicModal';
import { AuthContext } from '../store/authContext';
import apiTerminal from '../client/apiTerminal';

interface NewConditionFormProps {
  onFormSubmit: () => void;
}

const NewConditionForm: React.FC<NewConditionFormProps> = ({
  onFormSubmit,
}) => {
  const [newConditionTitle, setNewConditionTitle] = useState<string>('');
  const [dateTime, setDateTime] = useState<string>(
    new Date().toISOString().slice(0, 16)
  );
  const [measurementUnit, setMeasurementUnit] = useState<string>('');
  const [measurement, setMeasurement] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const authInfo = useContext(AuthContext);

  const handleCreateCondition = () => {
    if (
      newConditionTitle.trim() === '' ||
      measurementUnit.trim() === '' ||
      measurement <= 0
    ) {
      alert('All fields must be filled and measurement must be greater than 0');
      return;
    }
    setIsModalOpen(true);
  };

  const handleConfirmSubmit = async () => {
    const reponse = await apiTerminal.CreateNewUniversalReading(
      newConditionTitle,
      dateTime,
      measurement,
      measurementUnit,
      authInfo.authInfo.token
    );
    setNewConditionTitle('');
    setDateTime(new Date().toISOString().slice(0, 16));
    setMeasurementUnit('');
    setMeasurement(0);
    setIsModalOpen(false);
    onFormSubmit();
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '10px',
        padding: '10px',
        border: '1px solid black',
        width: 'fit-content',
      }}
    >
      <h3>Create a New Condition</h3>

      {/* Title Input */}
      <div style={{ marginBottom: '10px', width: '100%' }}>
        <label>
          Condition Title:
          <input
            type='text'
            value={newConditionTitle}
            onChange={e => setNewConditionTitle(e.target.value)}
            style={{ marginLeft: '10px', width: '100%' }}
          />
        </label>
      </div>

      {/* DateTime Input */}
      <div style={{ marginBottom: '10px', width: '100%' }}>
        <label>
          Select Date & Time:
          <input
            type='datetime-local'
            value={dateTime}
            onChange={e => setDateTime(e.target.value)}
            style={{ marginLeft: '10px', width: '100%' }}
          />
        </label>
      </div>

      {/* Measurement Unit Input */}
      <div style={{ marginBottom: '10px', width: '100%' }}>
        <label>
          Measurement Unit:
          <input
            type='text'
            value={measurementUnit}
            onChange={e => setMeasurementUnit(e.target.value)}
            placeholder='e.g., kg, cm'
            style={{ marginLeft: '10px', width: '100%' }}
          />
        </label>
      </div>

      {/* Measurement Input */}
      <div style={{ marginBottom: '10px', width: '100%' }}>
        <label>
          Measurement:
          <input
            type='number'
            value={measurement}
            onChange={e => setMeasurement(Number(e.target.value))}
            placeholder='e.g., 25'
            style={{ marginLeft: '10px', width: '100%' }}
          />
        </label>
      </div>

      {/* Submit Button */}
      <button onClick={handleCreateCondition} style={{ marginTop: '10px' }}>
        Add Condition
      </button>

      {/* Confirmation Modal */}
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

export default NewConditionForm;
