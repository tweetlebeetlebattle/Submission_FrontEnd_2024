import { useState, useEffect } from 'react';
import ValueBar from '../../components/ValueBar';
import PageSegmentor from '../../components/PageSegmentor';
import conditionsShabla from '../../media/images/diver/conditionsShabla.jpg';
import conditionsKaliakra from '../../media/images/diver/conditionsKaliakra.jpg';
import conditionsVarna from '../../media/images/diver/conditionsVarna.jpg';
import conditionsEmine from '../../media/images/diver/conditionsEmine.jpg';
import conditionsBurgas from '../../media/images/diver/conditionsBurgas.jpg';
import conditionsAhtopol from '../../media/images/diver/conditionsAhtopol.jpg';
import { DiverConditionsInfo } from '../../types/types';
import apiTerminal from '../../client/apiTerminal';
import { useNavigate } from 'react-router-dom';
import {
  valueBarTimeframe,
  currentConditionsExplanation,
} from '../../media/text/text';

const DiverCurrentConditions = () => {
  const [conditionsInfo, setConditionsInfo] = useState<
    DiverConditionsInfo[] | null
  >(null);
  const [selectedValue, setSelectedValue] = useState('1 ден');
  const options = ['1 ден', '2 дена', '3 дена', '4 дена', '5 дена'];
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const period = parseInt(selectedValue.split(' ')[0], 10);
        const response = await apiTerminal.FetchIndexSeaDataByPeriod(
          period,
          navigate
        );
        setConditionsInfo(response.data.dataIndices);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [selectedValue, navigate]);

  const sections = [
    {
      title: 'Шабла',
      description: String(
        conditionsInfo?.find(item => item.location === 'Шабла')?.index ||
          'Loading...'
      ),
      backgroundImage: conditionsShabla,
    },
    {
      title: 'Калиакра',
      description: String(
        conditionsInfo?.find(item => item.location === 'Калиакра')?.index ||
          'Loading...'
      ),
      backgroundImage: conditionsKaliakra,
    },
    {
      title: 'Варна',
      description: String(
        conditionsInfo?.find(item => item.location === 'Варна')?.index ||
          'Loading...'
      ),
      backgroundImage: conditionsVarna,
    },
    {
      title: 'Емине',
      description: String(
        conditionsInfo?.find(item => item.location === 'Емине')?.index ||
          'Loading...'
      ),
      backgroundImage: conditionsEmine,
    },
    {
      title: 'Бургас',
      description: String(
        conditionsInfo?.find(item => item.location === 'Бургас')?.index ||
          'Loading...'
      ),
      backgroundImage: conditionsBurgas,
    },
    {
      title: 'Ахтопол',
      description: String(
        conditionsInfo?.find(item => item.location === 'Ахтопол')?.index ||
          'Loading...'
      ),
      backgroundImage: conditionsAhtopol,
    },
  ];

  return (
    <>
      <div style={{ marginBottom: '20px' }}>
        <ValueBar
          options={options}
          selectedValue={selectedValue}
          setSelectedValue={setSelectedValue}
          text={valueBarTimeframe}
        />
      </div>
      <div
        style={{
          textAlign: 'center',
          margin: '20px 0',
          fontSize: '18px',
          fontWeight: 'bold',
          color: '#333',
        }}
      >
        <p>{currentConditionsExplanation}</p>
      </div>
      <div>
        <PageSegmentor sections={sections} />
      </div>
    </>
  );
};

export default DiverCurrentConditions;
