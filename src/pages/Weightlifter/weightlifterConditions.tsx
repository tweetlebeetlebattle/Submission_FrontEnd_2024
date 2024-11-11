import React, { useState, useEffect } from 'react';
import ConditionManager from '../../components/ConditionManager';

interface Condition {
  title: string;
  isPublic: boolean;
}

const WeightlifterConditions = () => {
  const [conditions, setConditions] = useState<Condition[]>([]);

  useEffect(() => {
    const fetchConditions = async () => {
      try {
        const response = await fetch('/api/conditions');
        const data: Condition[] = await response.json();
        setConditions(data);
      } catch (error) {
        console.error('Failed to fetch conditions', error);
      }
    };

    fetchConditions();
  }, []);

  return (
    <div style={containerStyle}>
      {conditions.map((condition, index) => (
        <ConditionManager
          key={index}
          title={condition.title}
          isMakePublic={condition.isPublic}
          isVisible={true}
          onToggleMakePublic={value =>
            console.log(`Toggle Make Public for ${condition.title}:`, value)
          }
          onToggleVisible={value =>
            console.log(`Toggle Visible for ${condition.title}:`, value)
          }
        />
      ))}
    </div>
  );
};

const containerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'wrap',
  margin: '20px',
  padding: '10px',
  border: '1px solid #ccc', // Light grey border
  borderRadius: '8px', // Rounded corners
};

export default WeightlifterConditions;
