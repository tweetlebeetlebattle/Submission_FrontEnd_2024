import React from 'react';

interface FeedbackData {
  username: string;
  location: string;
  waveRead?: number;
  waveUnit?: string;
  tempRead?: number;
  tempUnit?: string;
  windRead?: number;
  windUnit?: string;
  timestamp: string;
  text?: string;
  pictureUrl?: string;
}

interface FeedbackManagerProps {
  feedback: FeedbackData;
}

const FeedbackManager: React.FC<FeedbackManagerProps> = ({ feedback }) => {
  const handleDelete = () => {
    console.log('Deleting item with timestamp:', feedback.timestamp);
  };

  return (
    <div
      className='feedback-item'
      style={{
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '10px',
        margin: '10px 0',
      }}
    >
      <p>
        <strong>Username:</strong> {feedback.username}
      </p>
      <p>
        <strong>Location:</strong> {feedback.location}
      </p>
      {feedback.waveRead && (
        <p>
          <strong>Wave Read:</strong> {feedback.waveRead} {feedback.waveUnit}
        </p>
      )}
      {feedback.tempRead && (
        <p>
          <strong>Temperature:</strong> {feedback.tempRead} {feedback.tempUnit}
        </p>
      )}
      {feedback.windRead && (
        <p>
          <strong>Wind Speed:</strong> {feedback.windRead} {feedback.windUnit}
        </p>
      )}
      <p>
        <strong>Timestamp:</strong> {feedback.timestamp}
      </p>
      {feedback.text && (
        <p>
          <strong>Comment:</strong> {feedback.text}
        </p>
      )}
      {feedback.pictureUrl && (
        <div>
          <strong>Picture:</strong>
          <img src={feedback.pictureUrl} alt='Feedback' />
        </div>
      )}
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default FeedbackManager;
