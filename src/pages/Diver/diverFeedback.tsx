import React, { useState, useEffect, ChangeEvent, useContext } from 'react';
import apiTerminal from '../../client/apiTerminal';
import ValueBar from '../../components/ValueBar';
import { AuthContext } from '../../store/authContext';

interface LocationState {
  latitude: number | null;
  longitude: number | null;
}

const DiverFeedback = () => {
  const [text, setText] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [location, setLocation] = useState<LocationState>({
    latitude: null,
    longitude: null,
  });
  const [waveHeight, setWaveHeight] = useState<number | null>(null);
  const [waveUnit, setWaveUnit] = useState<string | null>(null);
  const [temp, setTemp] = useState<number | null>(null);
  const [tempUnit, setTempUnit] = useState<string | null>(null);
  const [windSpeed, setWindSpeed] = useState<number | null>(null);
  const [windUnit, setWindUnit] = useState<string | null>(null);
  const [locationOptions, setLocationOptions] = useState<string[]>([]);
  const [unitOptions, setUnitOptions] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const authInfo = useContext(AuthContext);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const locations = await apiTerminal.fetchAllLocations();
        setLocationOptions(locations);
        const units = await apiTerminal.fetchAllUnits();
        setUnitOptions(units);
      } catch (error) {
        console.error('Error fetching options:', error);
      }
    };

    fetchOptions();
  }, []);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleLocationFetch = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        () => {
          alert('Unable to retrieve your location');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  const handleSubmit = async () => {
    try {
      const coordinates =
        location.latitude && location.longitude
          ? `${location.latitude},${location.longitude}`
          : null;

      await apiTerminal.createFeedback(
        selectedLocation,
        coordinates ?? '',
        waveHeight ?? null,
        waveUnit ?? null,
        temp ?? null,
        tempUnit ?? null,
        windSpeed ?? null,
        windUnit ?? null,
        file ?? null,
        text ?? null,
        authInfo.authInfo.token
      );

      alert('Feedback sent successfully!');
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('Failed to send feedback.');
    }
  };

  return (
    <div>
      <h1>Diver Feedback</h1>
      <ValueBar
        options={locationOptions}
        selectedValue={selectedLocation}
        setSelectedValue={setSelectedLocation}
        onSubmit={() => alert(`Selected location: ${selectedLocation}`)}
      />

      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder='Enter your feedback...'
        maxLength={600}
        rows={4}
        style={{ width: '100%' }}
      />
      <input type='file' onChange={handleFileChange} />
      <button onClick={handleLocationFetch}>Get Location</button>

      <div>
        <h3>Wave Height</h3>
        <input
          type='number'
          value={waveHeight ?? ''}
          onChange={e => setWaveHeight(Number(e.target.value))}
          placeholder='Enter wave height'
        />
        <select onChange={e => setWaveUnit(e.target.value)}>
          <option value=''>Select Unit</option>
          {unitOptions.map(unit => (
            <option key={unit} value={unit}>
              {unit}
            </option>
          ))}
        </select>
      </div>

      <div>
        <h3>Temperature</h3>
        <input
          type='number'
          value={temp ?? ''}
          onChange={e => setTemp(Number(e.target.value))}
          placeholder='Enter temperature'
        />
        <select onChange={e => setTempUnit(e.target.value)}>
          <option value=''>Select Unit</option>
          {unitOptions.map(unit => (
            <option key={unit} value={unit}>
              {unit}
            </option>
          ))}
        </select>
      </div>

      <div>
        <h3>Wind Speed</h3>
        <input
          type='number'
          value={windSpeed ?? ''}
          onChange={e => setWindSpeed(Number(e.target.value))}
          placeholder='Enter wind speed'
        />
        <select onChange={e => setWindUnit(e.target.value)}>
          <option value=''>Select Unit</option>
          {unitOptions.map(unit => (
            <option key={unit} value={unit}>
              {unit}
            </option>
          ))}
        </select>
      </div>

      <button onClick={handleSubmit}>Submit Feedback</button>
    </div>
  );
};

export default DiverFeedback;
