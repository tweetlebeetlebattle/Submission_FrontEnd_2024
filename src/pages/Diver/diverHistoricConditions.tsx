import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { ChartOptions, ChartData } from 'chart.js';
import 'chartjs-adapter-date-fns';
import ValueBar from '../../components/ValueBar';
import HistoricDataManager from '../../components/HistoricDataManager';
import apiTerminal from '../../client/apiTerminal';
import { useNavigate } from 'react-router-dom';
import { valueBarLocation, valueBarDataSource } from '../../media/text/text';

interface Reading {
  waveData?: { waveAvg: number; waveUnit: string };
  tempData?: { tempAvg: number; tempUnit: string };
  windData?: { windAvg: number; windUnit: string };
  dateTime?: string;
}

interface BackendResponse {
  message: string;
  data: {
    location: string;
    readings: Reading[];
  };
}

const DiverHistoricConditions = () => {
  const [selectedLocation, setSelectedLocation] = useState('Ахтопол');
  const [selectedDataSource, setSelectedDataSource] = useState('HTML');
  const [backendData, setBackendData] = useState<Reading[]>([]);
  const [visibleData, setVisibleData] = useState<string[]>([]);
  const navigate = useNavigate();

  const locationOptions = [
    'Шабла',
    'Калиакра',
    'Варна',
    'Емине',
    'Бургас',
    'Ахтопол',
  ];

  const dataSourceOptions = ['HTML', 'Gif', 'API'];
  const dataTypes = ['Wave', 'Temp', 'Wind'];

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response: BackendResponse;
        switch (selectedDataSource) {
          case 'HTML':
            response = await apiTerminal.FetchHistoricSeaDataByLocationHTML(
              selectedLocation,
              navigate
            );
            break;
          case 'Gif':
            response = await apiTerminal.FetchHistoricSeaDataByLocationGif(
              selectedLocation,
              navigate
            );
            break;
          case 'API':
            response = await apiTerminal.FetchHistoricSeaDataByLocationStorm(
              selectedLocation,
              navigate
            );
            break;
          default:
            throw new Error('Invalid data source selected');
        }

        setBackendData(response.data.readings);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [selectedLocation, selectedDataSource]);

  const toggleVisibleData = (dataType: string) => {
    setVisibleData(prevVisibleData =>
      prevVisibleData.includes(dataType)
        ? prevVisibleData.filter(item => item !== dataType)
        : [...prevVisibleData, dataType]
    );
  };

  const chartData: ChartData<'line', number[], string> = {
    labels: backendData.map(reading => reading.dateTime || ''),
    datasets: visibleData.flatMap(dataType => {
      const dataMap: { [key: string]: keyof Reading } = {
        Wave: 'waveData',
        Temp: 'tempData',
        Wind: 'windData',
      };
      const key = dataMap[dataType];

      return [
        {
          label: `${dataType} Avg`,
          data: backendData.map(reading => {
            const dataItem = reading[key];
            return dataItem
              ? ((dataItem as any)[`${dataType.toLowerCase()}Avg`] ?? null)
              : null;
          }),
          borderColor:
            dataType === 'Wave'
              ? 'blue'
              : dataType === 'Temp'
                ? 'red'
                : 'green',
          borderDash: [],
          fill: false,
          tension: 0.1,
        },
        {
          label: `${dataType} Max`,
          data: backendData.map(reading => {
            const dataItem = reading[key];
            return dataItem
              ? ((dataItem as any)[`${dataType.toLowerCase()}Max`] ?? null)
              : null;
          }),
          borderColor:
            dataType === 'Wave'
              ? 'blue'
              : dataType === 'Temp'
                ? 'red'
                : 'green',
          borderDash: [5, 5],
          fill: false,
          tension: 0.1,
        },
        {
          label: `${dataType} Min`,
          data: backendData.map(reading => {
            const dataItem = reading[key];
            return dataItem
              ? ((dataItem as any)[`${dataType.toLowerCase()}Min`] ?? null)
              : null;
          }),
          borderColor:
            dataType === 'Wave'
              ? 'blue'
              : dataType === 'Temp'
                ? 'red'
                : 'green',
          borderDash: [10, 5],
          fill: false,
          tension: 0.1,
        },
      ];
    }),
  };

  const options: ChartOptions<'line'> = {
    scales: {
      x: {
        type: 'time',
        time: { unit: 'day' },
        title: { display: true, text: 'Date' },
      },
      y: { title: { display: true, text: 'Value' } },
    },
    plugins: { legend: { display: true, position: 'top' } },
    maintainAspectRatio: true,
  };

  return (
    <>
      <div style={{ display: 'flex', gap: '20px', marginBottom: '10px' }}>
        <ValueBar
          options={locationOptions}
          selectedValue={selectedLocation}
          setSelectedValue={setSelectedLocation}
          text={valueBarLocation}
        />
        <ValueBar
          options={dataSourceOptions}
          selectedValue={selectedDataSource}
          setSelectedValue={setSelectedDataSource}
          text={valueBarDataSource}
        />
      </div>
      <HistoricDataManager
        options={dataTypes}
        visibleData={visibleData}
        toggleVisibleData={toggleVisibleData}
      />
      <div style={{ position: 'relative', height: '40vh', width: '80vw' }}>
        <Line data={chartData} options={options} />
      </div>
    </>
  );
};

export default DiverHistoricConditions;
