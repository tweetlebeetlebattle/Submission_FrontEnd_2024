import React, { useState, useEffect } from 'react';
import ConditionManager from '../../components/ConditionManager';
import Graph from '../../components/Graph';
import NewConditionForm from '../../components/NewConditionForm';

interface Condition {
  title: string;
  isPublic: boolean;
}

const testData1 = [
  {
    title: 'Temperature',
    unit: '°C',
    data: [
      { x: '2023-01-01', y: 22 },
      { x: '2023-01-02', y: 19 },
      { x: '2023-01-03', y: 21 },
      { x: '2023-01-04', y: 24 },
      { x: '2023-01-05', y: 28 },
      { x: '2023-01-06', y: 25 },
      { x: '2023-01-07', y: 23 },
    ],
  },
  {
    title: 'Rainfall',
    unit: 'mm',
    data: [
      { x: '2023-01-01', y: 5 },
      { x: '2023-01-02', y: 12 },
      { x: '2023-01-03', y: 8 },
      { x: '2023-01-04', y: 0 },
      { x: '2023-01-05', y: 20 },
      { x: '2023-01-06', y: 15 },
      { x: '2023-01-07', y: 2 },
    ],
  },
];

const WeightlifterConditions = () => {
  const [conditions, setConditions] = useState<Condition[]>([]);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  // Fetch existing conditions (simulated)
  useEffect(() => {
    const fetchConditions = async () => {
      const data: Condition[] = [
        { title: 'Condition 1', isPublic: true },
        { title: 'Condition 2', isPublic: false },
      ];
      setConditions(data);
    };

    fetchConditions();
  }, []);

  // Effect that triggers when formSubmitted changes and on initial load
  useEffect(() => {
    console.log('Form submitted state changed:', formSubmitted);
    if (formSubmitted) {
      console.log('New condition was added!');
    }
  }, [formSubmitted]);

  return (
    <div style={containerStyle}>
      {/* Column with New Condition Form and Condition Managers */}
      <div style={leftColumnStyle}>
        {/* New Condition Form */}
        <NewConditionForm
          onFormSubmit={() => setFormSubmitted(prev => !prev)}
        />

        {/* Scrollable Conditions Container */}
        <div style={conditionsContainerStyle}>
          {conditions.map((condition, index) => (
            <ConditionManager
              key={index}
              title={condition.title}
              isMakePublic={condition.isPublic}
              isVisible={true}
              onToggleMakePublic={value => {
                const updatedConditions = [...conditions];
                updatedConditions[index].isPublic = value;
                setConditions(updatedConditions);
              }}
              onToggleVisible={value => {
                console.log(`Toggle Visible for ${condition.title}:`, value);
              }}
            />
          ))}
        </div>
      </div>

      {/* Graph Container */}
      <div style={graphContainerStyle}>
        <Graph datasets={testData1} />
      </div>
    </div>
  );
};

// Updated Styles
const containerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row', // Main container is a row
  alignItems: 'flex-start',
  margin: '20px',
  padding: '10px',
  gap: '20px',
};

const leftColumnStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column', // Left column is a column
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

const graphContainerStyle: React.CSSProperties = {
  flex: 1,
  padding: '10px',
  border: '1px solid #ccc',
  borderRadius: '8px',
  backgroundColor: '#f9f9f9',
  height: '500px',
};

export default WeightlifterConditions;
