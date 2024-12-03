import React, { useContext, useEffect, useState } from 'react';
import ServerManager from '../../components/ServerManager';
import { AuthContext } from '../../store/authContext';
import apiTerminal from '../../client/apiTerminal';
import { useNavigate } from 'react-router-dom';

interface ServerData {
  id: string;
  timestamp: string;
  text: string;
}

const AdminServerManager: React.FC = () => {
  const authInfo = useContext(AuthContext);
  const [serverDataArray, setServerDataArray] = useState<ServerData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [refresh, setRefresh] = useState<boolean>(false);
  const navigate = useNavigate();

  const fetchServerData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiTerminal.fetchAllServerLogs(
        authInfo.authInfo.token,
        navigate
      );
      const transformedData: ServerData[] = response._ServerLogs.map(
        (log: any) => ({
          id: log.id,
          timestamp: log.time,
          text: log.statusLog,
        })
      );
      setServerDataArray(transformedData);
    } catch (err) {
      console.error('Error fetching server logs:', err);
      setError('Failed to fetch server logs. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServerData();
  }, [refresh]);

  const handleRefresh = () => {
    setRefresh(prev => !prev);
  };

  if (loading) {
    return <p>Loading server logs...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      {serverDataArray.map(serverData => (
        <ServerManager
          key={serverData.id}
          serverData={serverData}
          onDelete={handleRefresh}
        />
      ))}
    </div>
  );
};

export default AdminServerManager;
