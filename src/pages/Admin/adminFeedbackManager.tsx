import React from 'react';
import FeedbackManager from '../../components/FeedbackManager';

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

const AdminFeedbackManager: React.FC = () => {
  // Test data array
  const feedbacks: FeedbackData[] = [
    {
      username: 'JohnDoe',
      location: 'California',
      waveRead: 5,
      waveUnit: 'ft',
      tempRead: 75,
      tempUnit: 'F',
      windRead: 10,
      windUnit: 'mph',
      timestamp: '2023-11-01T12:00:00Z',
      text: 'Great conditions today!',
      pictureUrl: 'https://example.com/photo1.jpg',
    },
    {
      username: 'JaneDoe',
      location: 'Florida',
      timestamp: '2023-11-02T15:30:00Z',
      text: 'Too windy for my taste.',
      pictureUrl: 'https://example.com/photo2.jpg',
    },
    // Add more feedbacks as needed
  ];

  // Function to simulate deletion (you might replace this with real API calls)
  const handleDelete = (timestamp: string) => {
    console.log('Deleted feedback with timestamp:', timestamp);
    // Logic to delete feedback from the state or backend
  };

  return (
    <div>
      {feedbacks.map(feedback => (
        <FeedbackManager key={feedback.timestamp} feedback={feedback} />
      ))}
    </div>
  );
};

export default AdminFeedbackManager;
