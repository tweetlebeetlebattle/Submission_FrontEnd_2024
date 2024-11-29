import React, { useContext, useEffect, useState } from 'react';
import FeedbackManager from '../../components/FeedbackManager';
import { AuthContext } from '../../store/authContext';
import apiTerminal from '../../client/apiTerminal';

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

const AdminFeedbackManager: React.FC = () => {
  const authInfo = useContext(AuthContext);
  const [feedbacks, setFeedbacks] = useState<FeedbackData[]>([]);
  const [refresh, setRefresh] = useState(false);

  const fetchFeedbackData = async () => {
    try {
      const response = await apiTerminal.fetchAllFeedback(
        authInfo.authInfo.token
      );
      const transformedFeedbacks: FeedbackData[] = response.feedbacks.map(
        (feedback: any) => ({
          id: feedback.id,
          username: feedback.username,
          location: feedback.locationName,
          waveRead: feedback.waveRead,
          waveUnit: feedback.waveUnitName,
          tempRead: feedback.tempRead,
          tempUnit: feedback.tempUnitName,
          windRead: feedback.windSpeedRead,
          windUnit: feedback.windSpeedUnitName,
          timestamp: feedback.date,
          text: feedback.textUrl,
          pictureUrl: feedback.imageUrl,
        })
      );

      setFeedbacks(transformedFeedbacks);
    } catch (error) {
      console.error('Error fetching feedback data:', error);
    }
  };

  useEffect(() => {
    fetchFeedbackData();
  }, [refresh]);

  const handleFeedbackDeleted = () => {
    setRefresh(prev => !prev);
  };

  return (
    <div>
      {feedbacks.map(feedback => (
        <FeedbackManager
          key={feedback.id}
          feedback={feedback}
          onDelete={handleFeedbackDeleted}
        />
      ))}
    </div>
  );
};

export default AdminFeedbackManager;
