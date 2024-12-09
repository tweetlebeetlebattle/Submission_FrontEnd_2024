import React from 'react';

interface BasicModalProps {
  title: string;
  buttonLabel: string;
  onSubmit: () => void;
  isOpen: boolean;
  onClose: () => void;
}

const BasicModal: React.FC<BasicModalProps> = ({
  title,
  buttonLabel,
  onSubmit,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div style={backdropStyle} onClick={onClose}>
      <div style={modalStyle} onClick={e => e.stopPropagation()}>
        <h2>{title}</h2>

        <button onClick={onSubmit} style={buttonStyle}>
          {buttonLabel}
        </button>
      </div>
    </div>
  );
};

const backdropStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
};

const modalStyle: React.CSSProperties = {
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  maxWidth: '400px',
  width: '100%',
};

const buttonStyle: React.CSSProperties = {
  marginTop: '20px',
  padding: '10px 20px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

export default BasicModal;
