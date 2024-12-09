import React from 'react';

interface DropdownProps {
  options: string[];
  text: string;
  selectedValue: string;
  setSelectedValue: (value: string) => void;
}

const ValueBar: React.FC<DropdownProps> = ({
  options,
  selectedValue,
  setSelectedValue,
  text,
}) => {
  return (
    <div style={containerStyle}>
      <label style={{ marginBottom: '5px' }}>{text}</label>

      <select
        value={selectedValue}
        onChange={e => setSelectedValue(e.target.value)}
        style={dropdownStyle}
      >
        <option value='' disabled>
          -- Select an Option --
        </option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

const containerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  padding: '5px 0',
  backgroundColor: '#f8f8f8',
  boxSizing: 'border-box',
};

const dropdownStyle: React.CSSProperties = {
  padding: '5px 10px',
  width: '100%',
  maxWidth: '300px',
};

export default ValueBar;
