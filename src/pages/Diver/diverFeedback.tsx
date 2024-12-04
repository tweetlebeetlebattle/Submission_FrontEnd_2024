import React, { useState, useEffect, ChangeEvent, useContext } from 'react';
import apiTerminal from '../../client/apiTerminal';
import ValueBar from '../../components/ValueBar';
import { AuthContext } from '../../store/authContext';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await apiTerminal.fetchAllLocations(navigate);
        if (response && response.data) {
          setLocationOptions(response.data);
        } else {
          console.error('Unexpected response format:', response);
        }
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };
    const fetchUnits = async () => {
      try {
        const response = await apiTerminal.fetchAllUnits(navigate);
        if (response && response.data) {
          setUnitOptions(response.data);
        } else {
          console.error('Unexpected response format:', response);
        }
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };
    fetchOptions();
    fetchUnits();
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
        authInfo.authInfo.token,
        navigate
      );

      alert('Feedback sent successfully!');
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('Failed to send feedback.');
    }
  };

  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>Diver Feedback</h1>
      <div style={formStyle}>
        <ValueBar
          options={locationOptions}
          selectedValue={selectedLocation}
          setSelectedValue={setSelectedLocation}
        />

        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder='Enter your feedback...'
          maxLength={600}
          rows={4}
          style={textareaStyle}
        />
        <input type='file' onChange={handleFileChange} style={inputStyle} />
        <button onClick={handleLocationFetch} style={buttonStyle}>
          Get Location
        </button>

        <div style={inputGroupStyle}>
          <h3>Wave Height</h3>
          <input
            type='number'
            value={waveHeight ?? ''}
            onChange={e => setWaveHeight(Number(e.target.value))}
            placeholder='Enter wave height'
            style={inputStyle}
          />
          <select
            onChange={e => setWaveUnit(e.target.value)}
            style={inputStyle}
          >
            <option value=''>Select Unit</option>
            {unitOptions.map(unit => (
              <option key={unit} value={unit}>
                {unit}
              </option>
            ))}
          </select>
        </div>

        <div style={inputGroupStyle}>
          <h3>Temperature</h3>
          <input
            type='number'
            value={temp ?? ''}
            onChange={e => setTemp(Number(e.target.value))}
            placeholder='Enter temperature'
            style={inputStyle}
          />
          <select
            onChange={e => setTempUnit(e.target.value)}
            style={inputStyle}
          >
            <option value=''>Select Unit</option>
            {unitOptions.map(unit => (
              <option key={unit} value={unit}>
                {unit}
              </option>
            ))}
          </select>
        </div>

        <div style={inputGroupStyle}>
          <h3>Wind Speed</h3>
          <input
            type='number'
            value={windSpeed ?? ''}
            onChange={e => setWindSpeed(Number(e.target.value))}
            placeholder='Enter wind speed'
            style={inputStyle}
          />
          <select
            onChange={e => setWindUnit(e.target.value)}
            style={inputStyle}
          >
            <option value=''>Select Unit</option>
            {unitOptions.map(unit => (
              <option key={unit} value={unit}>
                {unit}
              </option>
            ))}
          </select>
        </div>

        <button onClick={handleSubmit} style={buttonStyle}>
          Submit Feedback
        </button>
      </div>
    </div>
  );
};

const containerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '20px',
  minHeight: '100vh',
  backgroundColor: '#f0f4f8',
};

const headerStyle: React.CSSProperties = {
  marginBottom: '20px',
  fontSize: '2em',
  fontWeight: 'bold',
  textAlign: 'center',
};

const formStyle: React.CSSProperties = {
  width: '100%',
  maxWidth: '600px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  backgroundColor: '#ffffff',
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  margin: '10px 0',
  padding: '10px',
  borderRadius: '5px',
  border: '1px solid #ccc',
};

const textareaStyle: React.CSSProperties = {
  ...inputStyle,
  resize: 'none',
};

const buttonStyle: React.CSSProperties = {
  padding: '10px 20px',
  marginTop: '10px',
  borderRadius: '5px',
  backgroundColor: '#007bff',
  color: '#ffffff',
  border: 'none',
  cursor: 'pointer',
};

const inputGroupStyle: React.CSSProperties = {
  width: '100%',
  marginBottom: '15px',
};

export default DiverFeedback;
