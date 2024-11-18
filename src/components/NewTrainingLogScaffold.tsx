import React, { useState, useEffect, FC } from 'react';

interface NewTrainingLogProps {
  isRunningRefreshPage: (success: boolean) => void;
}

interface SetObject {
  doneSetCount: number;
  doneRepCount: number;
  picture: File | null;
  comments: string;
}

const NewTrainingLog: FC<NewTrainingLogProps> = ({ isRunningRefreshPage }) => {
  const userId = '0000';

  // State for form inputs
  const [titles, setTitles] = useState<string[]>([]);
  const [units, setUnits] = useState<string[]>([]);
  const [title, setTitle] = useState<string>('');
  const [newTitle, setNewTitle] = useState<string>('');
  const [targetWeight, setTargetWeight] = useState<string>('');
  const [unit, setUnit] = useState<string>('');
  const [newUnit, setNewUnit] = useState<string>('');
  const [targetSets, setTargetSets] = useState<string>('');
  const [targetReps, setTargetReps] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [setObjects, setSetObjects] = useState<SetObject[]>([]);

  useEffect(() => {
    const titlesData = ['Squat', 'Deadlift', 'Bench Press', 'Overhead Press'];
    const unitsData = [
      'kg',
      'lbs',
      'g',
      'mg',
      'oz',
      'cm',
      'm',
      'mm',
      'inch',
      'ft',
      'yd',
      'mi',
    ];
    setTitles(titlesData);
    setUnits(unitsData);
  }, []);

  useEffect(() => {
    if (targetSets && parseInt(targetSets) > 0) {
      handleAddSets();
    }
  }, [targetSets]);

  const handleSetChange = (index: number, key: keyof SetObject, value: any) => {
    const updatedSets = [...setObjects];
    updatedSets[index] = { ...updatedSets[index], [key]: value };
    setSetObjects(updatedSets);
  };

  const handleAddSets = () => {
    const setsCount = parseInt(targetSets);
    if (isNaN(setsCount) || setsCount <= 0) return;

    const newSets: SetObject[] = Array(setsCount)
      .fill(0)
      .map((_, i) => ({
        doneSetCount: i + 1,
        doneRepCount: 0,
        picture: null,
        comments: '',
      }));
    setSetObjects(newSets);
  };

  const handleSubmit = async () => {
    const logData = {
      userId,
      title: title === 'new' ? newTitle : title,
      targetWeight,
      unit: unit === 'new' ? newUnit : unit,
      targetSets,
      targetReps,
      date,
      setObjects,
    };

    console.log('Submitting:', logData);
    setTitle('');
    setNewTitle('');
    setTargetWeight('');
    setUnit('');
    setNewUnit('');
    setTargetSets('');
    setTargetReps('');
    setDate('');
    setSetObjects([]);

    isRunningRefreshPage(true);
  };

  return (
    <div style={styles.borderContainer}>
      <div style={styles.formContainer}>
        <form
          onSubmit={e => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          {/* Title Input */}
          <div style={styles.fieldContainer}>
            <label style={styles.label}>Title:</label>
            <select
              style={styles.select}
              value={title}
              onChange={e => setTitle(e.target.value)}
            >
              {titles.map(t => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
              <option value='new'>Create new...</option>
            </select>
            {title === 'new' && (
              <input
                type='text'
                placeholder='Enter new title'
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                style={styles.input}
              />
            )}
          </div>

          {/* Date Input */}
          <div style={styles.fieldContainer}>
            <label style={styles.label}>Date:</label>
            <input
              type='date'
              value={date}
              onChange={e => setDate(e.target.value)}
              style={styles.input}
            />
          </div>

          {/* Target Weight Input */}
          <div style={styles.fieldContainer}>
            <label style={styles.label}>Target Weight:</label>
            <input
              type='number'
              value={targetWeight}
              onChange={e => setTargetWeight(e.target.value)}
              style={styles.input}
            />
          </div>

          {/* Unit Input */}
          <div style={styles.fieldContainer}>
            <label style={styles.label}>Unit:</label>
            <select
              style={styles.select}
              value={unit}
              onChange={e => setUnit(e.target.value)}
            >
              {units.map(u => (
                <option key={u} value={u}>
                  {u}
                </option>
              ))}
              <option value='new'>Create new...</option>
            </select>
            {unit === 'new' && (
              <input
                type='text'
                placeholder='Enter new unit'
                value={newUnit}
                onChange={e => setNewUnit(e.target.value)}
                style={styles.input}
              />
            )}
          </div>

          {/* Target Sets and Reps */}
          <div style={styles.fieldContainer}>
            <label style={styles.label}>Target Sets:</label>
            <input
              type='number'
              value={targetSets}
              onChange={e => setTargetSets(e.target.value)}
              style={styles.inputShort}
            />
          </div>
          <div style={styles.fieldContainer}>
            <label style={styles.label}>Target Reps:</label>
            <input
              type='number'
              value={targetReps}
              onChange={e => setTargetReps(e.target.value)}
              style={styles.inputShort}
            />
          </div>

          {/* Dynamic Set Inputs */}
          {setObjects.map((set, index) => (
            <div key={index} style={styles.setContainer}>
              <h4>Set {set.doneSetCount}</h4>
              <input
                type='number'
                placeholder='Done Rep Count'
                value={set.doneRepCount}
                onChange={e =>
                  handleSetChange(index, 'doneRepCount', e.target.value)
                }
                style={styles.inputShort}
              />
              <textarea
                placeholder='Comments'
                value={set.comments}
                onChange={e =>
                  handleSetChange(index, 'comments', e.target.value)
                }
                style={styles.textarea}
              />
            </div>
          ))}

          <button type='submit' style={styles.button}>
            Submit Log
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  borderContainer: {
    border: '2px solid #007BFF',
    borderRadius: '12px',
    padding: '20px',
    margin: '20px auto',
    maxWidth: '700px',
  },
  formContainer: { padding: '10px' },
  fieldContainer: { marginBottom: '15px' },
  label: { display: 'block', marginBottom: '5px' },
  select: { width: '100%', padding: '8px' },
  input: { width: '100%', padding: '8px' },
  inputShort: { width: '100px', padding: '8px' },
  button: {
    padding: '10px',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
  },
  setContainer: {
    marginTop: '20px',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '8px',
  },
  textarea: { width: '100%', height: '60px', padding: '8px' },
};

export default NewTrainingLog;
