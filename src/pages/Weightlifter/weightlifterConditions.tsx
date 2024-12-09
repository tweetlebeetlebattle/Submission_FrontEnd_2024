import React, { useState, useEffect, useContext } from 'react';
import ConditionManager from '../../components/ConditionManager';
import GraphManager from '../../components/Graph';
import NewConditionForm from '../../components/NewConditionForm';
import NewTrainingLog from '../../components/NewTrainingLog';
import TrainingLogManager from '../../components/TrainingLogManager';
import { AuthContext } from '../../store/authContext';
import apiTerminal from '../../client/apiTerminal';
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

interface ApiResponse {
  data: {
    packagedReadings: {
      name: string;
      isPublic: boolean;
      isTraining: boolean;
      universalReadingsTrainings: {
        measurment: string;
        unitName: string;
        date: string;
        isSucessTraining: boolean | null;
      }[];
    }[];
  };
}

const WeightlifterConditions: React.FC = () => {
  const [conditions, setConditions] = useState<RenderData[]>([]);
  const [trainingLogs, setTrainingLogs] = useState<RenderData[]>([]);
  const [visibleGraphs, setVisibleGraphs] = useState<RenderData[]>([]);
  const [needsRefresh, setNeedsRefresh] = useState<boolean>(true);
  const authInfo = useContext(AuthContext);
  const navigate = useNavigate();

  const fetchAllUserData = async (): Promise<void> => {
    if (authInfo.authInfo.username === '') {
      navigate('/');
    }
    try {
      const response: ApiResponse =
        await apiTerminal.fetchAllUserTrainingAndUniversalLogs(
          authInfo.authInfo.token,
          navigate
        );
      const { packagedReadings } = response.data;

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

  useEffect(() => {
    if (needsRefresh) {
      fetchAllUserData().then(() => setNeedsRefresh(false));
    }
  }, [needsRefresh]);

  const UpdateUniversalReadingPublicity = async (
    value: boolean,
    title: string
  ): Promise<void> => {
    console.log(`IsPublic for ${title} changed to:`, value);
    const resposne = await apiTerminal.UpdateUniversalReadingPublicity(
      title,
      value,
      authInfo.authInfo.token,
      navigate
    );
  };
  const UpdateTrainingPublicity = async (
    value: boolean,
    title: string
  ): Promise<void> => {
    console.log(`IsPublic for ${title} changed to:`, value);
    const resposne = await apiTerminal.UpdateTrainingLogPublicity(
      title,
      value,
      authInfo.authInfo.token,
      navigate
    );
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
    <div style={containerStyle}>
      <div style={leftColumnStyle}>
        <NewConditionForm onFormSubmit={() => setNeedsRefresh(true)} />

        <div style={conditionsContainerStyle}>
          {conditions.map((condition, index) => (
            <ConditionManager
              key={index}
              title={condition.title}
              isMakePublic={condition.isPublic}
              isVisible={visibleGraphs.some(
                item => item.title === condition.title
              )}
              onToggleMakePublic={value => {
                const updatedConditions = [...conditions];
                updatedConditions[index].isPublic = value;
                setConditions(updatedConditions);

                UpdateUniversalReadingPublicity(value, condition.title);
              }}
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
        <NewTrainingLog isRunningRefreshPage={setNeedsRefresh} />
        <div style={conditionsContainerStyle}>
          {trainingLogs.map((log, index) => (
            <TrainingLogManager
              key={index}
              title={log.title}
              isMakePublic={log.isPublic}
              isVisible={visibleGraphs.some(item => item.title === log.title)}
              onToggleMakePublic={value => {
                const updatedLogs = [...trainingLogs];
                updatedLogs[index].isPublic = value;
                setTrainingLogs(updatedLogs);

                UpdateTrainingPublicity(value, log.title);
              }}
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

export default WeightlifterConditions;
