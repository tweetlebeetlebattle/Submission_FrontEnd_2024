import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';
import ValueBar from '../../components/ValueBar';

// Define types for the location state
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
  const [selectedValue, setSelectedValue] = useState('Option 1');
  const optionsValue = [
    'Шабла',
    'Калиакра',
    'Варна',
    'Емине',
    'Бургас',
    'Ахтопол',
  ];

  const handleSubmitLocation = () => {
    alert(`You have selected: ${selectedValue}`);
  };
  const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]); // Assuming single file upload
    }
  };

  const fetchLocation = () => {
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
    const formData = new FormData();
    formData.append('text', text);
    if (file) {
      formData.append('file', file);
    }
    formData.append('latitude', location.latitude?.toString() ?? '');
    formData.append('longitude', location.longitude?.toString() ?? '');

    try {
      // Replace 'your-backend-endpoint' with your actual backend API endpoint
      const response = await axios.post('your-backend-endpoint', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      alert('Feedback sent successfully!');
    } catch (error) {
      console.error('Error sending feedback:', error);
      alert('Failed to send feedback.');
    }
  };

  return (
    <>
      <div>
        <ValueBar
          options={optionsValue}
          selectedValue={selectedValue}
          setSelectedValue={setSelectedValue}
          onSubmit={handleSubmitLocation}
        />
        <div>
          <textarea
            value={text}
            onChange={handleTextChange}
            placeholder='Enter your feedback...'
            maxLength={600}
            rows={4}
            style={{ width: '100%' }}
          />
          <input type='file' onChange={handleFileChange} />
          <button onClick={fetchLocation}>Get Location</button>
          <button onClick={handleSubmit}>Send Feedback</button>
        </div>
      </div>
    </>
  );
};

export default DiverFeedback;
