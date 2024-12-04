import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { ChartOptions, ChartData, ChartDataset } from 'chart.js';
import 'chartjs-adapter-date-fns';
import ValueBar from '../../components/ValueBar';

interface ChartPoint {
  date: string;
  value: number;
  unit: string;
}

const DiverHistoricConditions = () => {
  const [selectedValue, setSelectedValue] = useState('Option 1');
  const optionsValue = [
    'Шабла',
    'Калиакра',
    'Варна',
    'Емине',
    'Бургас',
    'Ахтопол',
  ];

  const handleSubmit = () => {
    alert(`You have selected: ${selectedValue}`);
  };
  const chartData: ChartPoint[] = [
    { date: '2023-01-01', value: 10, unit: 'm/s' },
    { date: '2023-01-02', value: 20, unit: 'm/s' },
    { date: '2023-01-03', value: 15, unit: 'm/s' },
    { date: '2023-01-04', value: 25, unit: 'm/s' },
  ];

  const data: ChartData<'line', number[], string> = {
    labels: chartData.map(data => data.date),
    datasets: [
      {
        label: 'Value',
        data: chartData.map(data => data.value),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
        additionalData: chartData.map(data => data.unit), // Include custom data directly
      } as ChartDataset<'line', number[]> & { additionalData: string[] },
    ],
  };

  const options: ChartOptions<'line'> = {
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day',
        },
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Value',
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            const dataset = context.dataset as ChartDataset<
              'line',
              number[]
            > & { additionalData: string[] };
            const unit = dataset.additionalData[context.dataIndex];
            return `${context.dataset.label}: ${context.parsed.y} ${unit}`;
          },
        },
      },
      legend: {
        display: true,
        position: 'top' as const,
      },
    },
    maintainAspectRatio: true,
  };

  return (
    <>
      <div>
        <ValueBar
          options={optionsValue}
          selectedValue={selectedValue}
          setSelectedValue={setSelectedValue}
        />
      </div>
      <div style={{ position: 'relative', height: '40vh', width: '80vw' }}>
        <Line data={data} options={options} />
      </div>
    </>
  );
};

export default DiverHistoricConditions;
