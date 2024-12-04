import { useState } from 'react';
import ValueBar from '../../components/ValueBar';
import PageSegmentor from '../../components/PageSegmentor';
import conditionsShabla from '../../media/images/diver/conditionsShabla.jpg';
import conditionsKaliakra from '../../media/images/diver/conditionsKaliakra.jpg';
import conditionsVarna from '../../media/images/diver/conditionsVarna.jpg';
import conditionsEmine from '../../media/images/diver/conditionsEmine.jpg';
import conditionsBurgas from '../../media/images/diver/conditionsBurgas.jpg';
import conditionsAhtopol from '../../media/images/diver/conditionsAhtopol.jpg';
import { DiverConditionsInfo } from '../../types/types';

const DiverCurrentConditions = () => {
  const [conditionsInfo, setConditionsInfo] = useState<
    DiverConditionsInfo[] | null
  >(null);
  const [selectedValue, setSelectedValue] = useState('Option 1');
  const options = ['1 ден', '2 дена', '3 дена', '4 дена', '5 дена'];

  const handleSubmit = () => {
    alert(`You have selected: ${selectedValue}`);
  };

  const sections = [
    {
      title: 'Шабла',
      description: '',
      backgroundImage: conditionsShabla,
    },
    {
      title: 'Калиакра',
      description: '',
      backgroundImage: conditionsKaliakra,
    },
    {
      title: 'Варна',
      description: '',
      backgroundImage: conditionsVarna,
    },
    {
      title: 'Емине',
      description: '',
      backgroundImage: conditionsEmine,
    },
    {
      title: 'Бургас',
      description: '',
      backgroundImage: conditionsBurgas,
    },
    {
      title: 'Ахтопол',
      description: '',
      backgroundImage: conditionsAhtopol,
    },
  ];

  return (
    <>
      <div>
        <ValueBar
          options={options}
          selectedValue={selectedValue}
          setSelectedValue={setSelectedValue}
        />
      </div>
      <div>
        <PageSegmentor sections={sections} />
      </div>
    </>
  );
};

export default DiverCurrentConditions;
