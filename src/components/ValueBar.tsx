import React from 'react';

// Assuming the prop types for better type-checking.
interface DropdownProps {
  options: string[];
  selectedValue: string;
  setSelectedValue: (value: string) => void;
  onSubmit: () => void;
}

const ValueBar: React.FC<DropdownProps> = ({
  options,
  selectedValue,
  setSelectedValue,
  onSubmit,
}) => {
  return (
    <div style={containerStyle}>
      <select
        value={selectedValue}
        onChange={e => setSelectedValue(e.target.value)}
        style={dropdownStyle}
      >
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      <button onClick={onSubmit} style={buttonStyle}>
        Submit
      </button>
    </div>
  );
};

// Styles
const containerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  padding: '5px 0',
  backgroundColor: '#f8f8f8', // Light gray background
  boxSizing: 'border-box',
};

const dropdownStyle: React.CSSProperties = {
  marginRight: '10px',
  padding: '5px 10px',
};

const buttonStyle: React.CSSProperties = {
  padding: '5px 10px',
  cursor: 'pointer',
};

export default ValueBar;
