import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const OnboardingModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const navigate = useNavigate();

  const handleRegisterLogin = () => {
    console.log('Navigating to Register/Login');
    navigate('/onboarding');
    setIsModalOpen(false);
  };

  const handleContinueAsGuest = () => {
    console.log('Continuing as Guest');
    setIsModalOpen(false);
  };

  return (
    <div style={containerStyle}>
      {isModalOpen && (
        <div style={modalOverlayStyle}>
          <div style={modalStyle}>
            <h2>Would you like to continue as a guest or login/register?</h2>
            <div style={buttonContainerStyle}>
              <button style={buttonStyle} onClick={handleRegisterLogin}>
                Register/Login
              </button>
              <button style={buttonStyle} onClick={handleContinueAsGuest}>
                Continue as Guest
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const containerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  backgroundColor: '#f4f4f9',
};

const modalOverlayStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
};

const modalStyle: React.CSSProperties = {
  width: '300px',
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
  textAlign: 'center',
};

const buttonContainerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '20px',
};

const buttonStyle: React.CSSProperties = {
  padding: '10px 20px',
  fontSize: '16px',
  cursor: 'pointer',
  borderRadius: '5px',
  border: 'none',
  backgroundColor: '#4CAF50',
  color: 'white',
  transition: 'background-color 0.3s',
};

export default OnboardingModal;
