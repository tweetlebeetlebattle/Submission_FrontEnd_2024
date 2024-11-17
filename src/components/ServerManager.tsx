import React from 'react';

interface ServerData {
  id: string;
  timestamp: string;
  text: string;
}

interface ServerManagerProps {
  serverData: ServerData;
}

const ServerManager: React.FC<ServerManagerProps> = ({ serverData }) => {
  // Define the delete function inside the component
  const onDelete = () => {
    console.log('Delete server data with ID:', serverData.id);
    // Here you might want to update state or make an API call to remove the server data
  };

  return (
    <div
      className='server-item'
      style={{
        border: '1px solid #ccc',
        padding: '10px',
        marginBottom: '10px',
        borderRadius: '5px',
      }}
    >
      <p>
        <strong>ID:</strong> {serverData.id}
      </p>
      <p>
        <strong>Timestamp:</strong> {serverData.timestamp}
      </p>
      <p>
        <strong>Text:</strong> {serverData.text}
      </p>
      <button onClick={onDelete} style={{ cursor: 'pointer' }}>
        Delete
      </button>
    </div>
  );
};

export default ServerManager;
