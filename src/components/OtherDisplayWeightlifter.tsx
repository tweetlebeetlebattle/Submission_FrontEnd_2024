import React, { useState, useEffect } from 'react';
import OtherDisplayConditions from './OtherDisplayConditions';
import OtherDisplayTraining from './OtherDisplayTraining';
import GraphManager from './Graph';
import apiTerminal from '../client/apiTerminal';
import { useNavigate } from 'react-router-dom';

interface Measurement {
  measurement: string;
  unitName: string;
  date: string;
  isSuccessTraining: boolean | null;
}

interface RenderData {
  title: string;
  isPublic: boolean;
  data: Measurement[];
}

interface PackagedReading {
  name: string;
  isPublic: boolean;
  isTraining: boolean;
  universalReadingsTrainings: {
    measurment: string;
    unitName: string;
    date: string;
    isSucessTraining: boolean | null;
  }[];
}

interface ApiResponse {
  result: {
    packagedReadings: PackagedReading[];
  };
}

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
  const [needsRefresh, setNeedsRefresh] = useState<boolean>(true);

  const fetchAllUserData = async (): Promise<void> => {
    try {
      const response: ApiResponse = await apiTerminal.fetchPublicUserData(
        username,
        navigate
      );
      const { packagedReadings } = response.result;

      const conditionData: RenderData[] = packagedReadings
        .filter((item: PackagedReading) => !item.isTraining)
        .map((item: PackagedReading) => ({
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
        .filter((item: PackagedReading) => item.isTraining)
        .map((item: PackagedReading) => ({
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

  useEffect(() => {
    if (needsRefresh) {
      fetchAllUserData().then(() => setNeedsRefresh(false));
    }
  }, [needsRefresh]);

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
    <div style={containerStyle}>
      <div style={leftColumnStyle}>
        <h3>Condition Manager</h3>
        <div style={conditionsContainerStyle}>
          {conditions.map((condition, index) => (
            <OtherDisplayConditions
              key={index}
              title={condition.title}
              isVisible={visibleGraphs.some(
                item => item.title === condition.title
              )}
              onToggleVisible={value =>
                toggleVisibility(condition.title, value, 'condition')
              }
            />
          ))}
        </div>
      </div>

      <div style={GraphManagerContainerStyle}>
        <GraphManager datasets={visibleGraphs} />
      </div>

      <div style={leftColumnStyle}>
        <h3>Training Log Manager</h3>
        <div style={conditionsContainerStyle}>
          {trainingLogs.map((log, index) => (
            <OtherDisplayTraining
              key={index}
              title={log.title}
              isVisible={visibleGraphs.some(item => item.title === log.title)}
              onToggleVisible={value =>
                toggleVisibility(log.title, value, 'training')
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Styles
const containerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
  margin: '20px',
  padding: '10px',
  gap: '20px',
};

const leftColumnStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  width: '300px',
  gap: '20px',
};

const conditionsContainerStyle: React.CSSProperties = {
  maxHeight: '400px',
  overflowY: 'auto',
  padding: '10px',
  border: '1px solid #ccc',
  borderRadius: '8px',
  backgroundColor: '#f5f5f5',
};

const GraphManagerContainerStyle: React.CSSProperties = {
  flex: 1,
  padding: '10px',
  border: '1px solid #ccc',
  borderRadius: '8px',
  backgroundColor: '#f9f9f9',
  height: '500px',
};

export default OtherDisplayWeightlifter;
