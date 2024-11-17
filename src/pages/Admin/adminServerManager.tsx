import React from 'react';
import ServerManager from '../../components/ServerManager';

interface ServerData {
  id: string;
  timestamp: string;
  text: string;
}

const AdminServerManager: React.FC = () => {
  // Simulated server data array
  const serverDataArray: ServerData[] = [
    {
      id: '1',
      timestamp: '2023-11-01T12:00:00Z',
      text: 'Server #1 is active.',
    },
    {
      id: '2',
      timestamp: '2023-11-02T13:00:00Z',
      text: 'Server #2 is under maintenance.',
    },
    {
      id: '3',
      timestamp: '2023-11-03T14:00:00Z',
      text: 'Server #3 has been upgraded.',
    },
    // Add more entries as needed
  ];

  return (
    <div>
      {serverDataArray.map(serverData => (
        <ServerManager key={serverData.id} serverData={serverData} />
      ))}
    </div>
  );
};

export default AdminServerManager;
