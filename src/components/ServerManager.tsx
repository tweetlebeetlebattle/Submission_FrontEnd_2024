import React, { useContext } from 'react';
import apiTerminal from '../client/apiTerminal';
import { AuthContext } from '../store/authContext';
import { useNavigate } from 'react-router-dom';

interface ServerData {
  id: string;
  timestamp: string;
  text: string;
}

interface ServerManagerProps {
  serverData: ServerData;
  onDelete: () => void;
}

const ServerManager: React.FC<ServerManagerProps> = ({
  serverData,
  onDelete,
}) => {
  const authInfo = useContext(AuthContext);
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      console.log('Deleted server data with ID:', serverData.id);

      await apiTerminal.deleteServerLog(
        serverData.id,
        authInfo.authInfo.token,
        navigate
      );
      onDelete();
    } catch (error) {
      console.error('Error deleting server log:', error);
    }
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
      <button onClick={handleDelete} style={{ cursor: 'pointer' }}>
        Delete
      </button>
    </div>
  );
};

export default ServerManager;
