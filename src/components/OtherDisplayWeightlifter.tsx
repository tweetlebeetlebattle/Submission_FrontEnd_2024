import React, { useState } from 'react';
import OtherDisplayConditions from './OtherDisplayConditions';
import OtherDisplayTraining from './OtherDisplayTraining';
import apiTerminal from '../client/apiTerminal';
import { useNavigate } from 'react-router-dom';
import GraphManager from './Graph';

interface OtherDisplayWeightlifterProps {
  username: string;
}

const OtherDisplayWeightlifter: React.FC<OtherDisplayWeightlifterProps> = ({
  username,
}) => {
  const navigate = useNavigate();
  const [conditions, setConditions] = useState<RenderData[]>([]);
  const [trainingLogs, setTrainingLogs] = useState<RenderData[]>([]);
  const [visibleGraphs, setVisibleGraphs] = useState<RenderData[]>([]);

  const fetchAllUserData = async (): Promise<void> => {
    try {
      const response = await apiTerminal.fetchPublicUserData(
        username,
        navigate
      );
      const { packagedReadings } = response.result;

      const conditionData: RenderData[] = packagedReadings
        .filter(item => !item.isTraining)
        .map(item => ({
          title: item.name,
          isPublic: item.isPublic,
          data: item.universalReadingsTrainings.map(reading => ({
            measurement: reading.measurment,
            unitName: reading.unitName,
            date: reading.date,
            isSuccessTraining: reading.isSucessTraining,
          })),
        }));

      const trainingData: RenderData[] = packagedReadings
        .filter(item => item.isTraining)
        .map(item => ({
          title: item.name,
          isPublic: item.isPublic,
          data: item.universalReadingsTrainings.map(reading => ({
            measurement: reading.measurment,
            unitName: reading.unitName,
            date: reading.date,
            isSuccessTraining: reading.isSucessTraining,
          })),
        }));

      setConditions(conditionData);
      setTrainingLogs(trainingData);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  const toggleVisibility = (
    title: string,
    isVisible: boolean,
    type: 'condition' | 'training'
  ): void => {
    const targetArray = type === 'condition' ? conditions : trainingLogs;
    const targetItem = targetArray.find(item => item.title === title);
    if (!targetItem) return;

    if (isVisible) {
      setVisibleGraphs(prev => [...prev, targetItem]);
    } else {
      setVisibleGraphs(prev => prev.filter(item => item.title !== title));
    }
  };
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
      }}
    >
      <h2>Weightlifter Profile Overview</h2>
      <OtherDisplayConditions
        title='Condition Manager'
        isVisible={isVisibleConditions}
        onToggleVisible={setIsVisibleConditions}
      />
      `
      <GraphManager datasets={visibleGraphs} />
      `
      <OtherDisplayTraining
        title='Training Log Manager'
        isVisible={isVisibleTraining}
        onToggleVisible={setIsVisibleTraining}
      />
    </div>
  );
};

export default OtherDisplayWeightlifter;
