import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { ChartOptions } from 'chart.js';

interface DataItem {
  x: string;
  y: number;
}

interface GraphManagerProps {
  datasets: {
    title: string;
    data: DataItem[];
    unit: string;
  }[];
}

const GraphManager: React.FC<GraphManagerProps> = ({ datasets }) => {
  // Generate random colors for each dataset
  const colors = datasets.map(
    () => '#' + Math.floor(Math.random() * 16777215).toString(16)
  );

  // Prepare chart data
  const chartData = {
    datasets: datasets.map((dataset, index) => ({
      label: dataset.title,
      data: dataset.data,
      borderColor: colors[index],
      backgroundColor: colors[index],
      fill: false,
      tension: 0.1,
    })),
  };

  // Chart options
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
    },
    plugins: {
      legend: {
        display: false, // Disable default legend
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div style={containerStyle}>
      {/* Line Chart */}
      <Line data={chartData} options={options} height={400} />

      {/* Legend below the chart */}
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
              {dataset.title} ({dataset.unit})
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Styles
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
