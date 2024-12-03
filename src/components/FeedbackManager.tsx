import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../store/authContext';
import apiTerminal from '../client/apiTerminal';
import { useNavigate } from 'react-router-dom';

interface FeedbackData {
  id: string;
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
  onDelete: () => void;
}

const FeedbackManager: React.FC<FeedbackManagerProps> = ({
  feedback,
  onDelete,
}) => {
  const authInfo = useContext(AuthContext);
  const [textContent, setTextContent] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTextContent = async () => {
      if (feedback.text) {
        try {
          const response = await fetch(feedback.text);
          const text = await response.text();
          setTextContent(text);
        } catch (error) {
          console.error('Error fetching text content:', error);
          setTextContent('Unable to fetch the text content.');
        }
      }
    };

    fetchTextContent();
  }, [feedback.text]);

  const handleDelete = async (id: string) => {
    try {
      await apiTerminal.deleteFeedback(id, authInfo.authInfo.token, navigate);
      console.log('Deleted feedback with ID:', id);
      onDelete(); // Notify parent about the deletion
    } catch (error) {
      console.error('Error deleting feedback:', error);
    }
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
        <strong>Timestamp:</strong>{' '}
        {new Date(feedback.timestamp).toLocaleString()}
      </p>
      {textContent && (
        <div>
          <strong>Comment:</strong>
          <pre
            style={{
              backgroundColor: '#f8f8f8',
              padding: '10px',
              borderRadius: '5px',
              overflowX: 'auto',
              whiteSpace: 'pre-wrap',
            }}
          >
            {textContent}
          </pre>
        </div>
      )}
      {feedback.pictureUrl && (
        <div>
          <strong>Picture:</strong>
          <img
            src={feedback.pictureUrl}
            alt='Feedback'
            style={{ maxWidth: '100%', height: 'auto', marginTop: '10px' }}
          />
        </div>
      )}
      <button onClick={() => handleDelete(feedback.id)}>Delete</button>
    </div>
  );
};

export default FeedbackManager;
