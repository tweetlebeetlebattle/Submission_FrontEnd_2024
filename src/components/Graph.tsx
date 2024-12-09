import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { ChartOptions } from 'chart.js';

interface Measurement {
  measurement: string;
  unitName: string;
  date: string;
}

interface GraphManagerProps {
  datasets: {
    title: string;
    data: Measurement[];
    isPublic: boolean;
  }[];
}

const GraphManager: React.FC<GraphManagerProps> = ({ datasets }) => {
  const colors = datasets.map(
    () => '#' + Math.floor(Math.random() * 16777215).toString(16)
  );

  const chartData = {
    datasets: datasets.map((dataset, index) => ({
      label: dataset.title,
      data: dataset.data.map(item => ({
        x: item.date,
        y: parseFloat(item.measurement),
      })),
      borderColor: colors[index],
      backgroundColor: colors[index],
      fill: false,
      tension: 0.1,
    })),
  };

  const options: ChartOptions<'line'> = {
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day',
          tooltipFormat: 'MMM d, yyyy',
        },
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Measurement',
        },
      },
    },
    plugins: {
      legend: {
        display: true,
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div style={containerStyle}>
      <Line data={chartData} options={options} height={400} />

      <div style={legendContainerStyle}>
        {datasets.map((dataset, index) => (
          <div key={index} style={legendItemStyle}>
            <span
              style={{
                backgroundColor: colors[index],
                width: '20px',
                height: '20px',
                display: 'inline-block',
                marginRight: '10px',
                borderRadius: '3px',
              }}
            ></span>
            <span>
              {dataset.title} ({dataset.data[0]?.unitName || ''})
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const containerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  margin: '20px',
  padding: '10px',
  border: '1px solid #ccc',
  borderRadius: '8px',
  height: '500px',
};

const legendContainerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexWrap: 'wrap',
  marginTop: '20px',
};

const legendItemStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  marginRight: '20px',
  marginBottom: '10px',
};

export default GraphManager;
