import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import fiveoo from '../media/images/500.png';

const BadRequest: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const details = location.state?.details || 'No additional details provided.';

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div style={containerStyle}>
      <img src={fiveoo} alt='500 Bad Request' style={imageStyle} />
      <h1 style={titleStyle}>Bad Request</h1>
      <p style={messageStyle}>Sorry, the server crashed.</p>
      <p style={detailsStyle}>Details: {details}</p>
      <div style={buttonContainerStyle}>
        <button onClick={handleGoBack} style={buttonStyle}>
          Go Back
        </button>
        <button onClick={handleGoHome} style={buttonStyle}>
          Go Home
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
  height: '100vh',
  textAlign: 'center',
  backgroundColor: '#f8f9fa',
  padding: '20px',
};

const imageStyle: React.CSSProperties = {
  maxWidth: '100%',
  maxHeight: '400px',
  marginBottom: '20px',
};

const titleStyle: React.CSSProperties = {
  fontSize: '2rem',
  marginBottom: '10px',
};

const messageStyle: React.CSSProperties = {
  fontSize: '1.2rem',
  marginBottom: '10px',
};

const detailsStyle: React.CSSProperties = {
  fontSize: '1rem',
  color: '#555',
  marginBottom: '20px',
};

const buttonContainerStyle: React.CSSProperties = {
  display: 'flex',
  gap: '10px',
};

const buttonStyle: React.CSSProperties = {
  padding: '10px 20px',
  fontSize: '1rem',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  backgroundColor: '#007bff',
  color: '#fff',
  transition: 'background-color 0.3s',
};

export default BadRequest;
