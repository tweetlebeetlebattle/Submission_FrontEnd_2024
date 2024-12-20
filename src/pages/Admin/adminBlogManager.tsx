import { useContext, useEffect, useState } from 'react';
import BlogForApproval from '../../components/BlogForApproval';
import { AuthContext } from '../../store/authContext';
import apiTerminal from '../../client/apiTerminal';
import { useNavigate } from 'react-router-dom';

interface UnapprovedData {
  id: string;
  text?: string;
  username: string;
  timestamp: string;
  imageUrl?: string;
}

const AdminBlogManager = () => {
  const [blogs, setBlogs] = useState<UnapprovedData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(false);
  const authInfo = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUnapprovedBlogs = async () => {
      if (authInfo.authInfo.isAdmin === false) {
        navigate('/');
      }
      setLoading(true);
      setError(null);
      try {
        const response = await apiTerminal.fetchUnapprovedBlogsComments(
          authInfo.authInfo.token,
          navigate
        );

        const transformedBlogs = response.data.unapprovedData.map(
          (item: any) => ({
            id: item.id,
            text: item.textUrl || '',
            username: item.username,
            timestamp: item.timeOfPosting,
            imageUrl: item.pictureUrl || null,
          })
        );
        setBlogs(transformedBlogs);
      } catch (err) {
        setError('Failed to fetch unapproved blogs. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchUnapprovedBlogs();
  }, [authInfo.authInfo.token, refreshTrigger]);

  const handleRefresh = () => {
    setRefreshTrigger(prev => !prev);
  };

  return (
    <div>
      {loading && <p>Loading blogs for approval...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && blogs.length === 0 && (
        <p>No more blogs to approve or reject.</p>
      )}
      {!loading &&
        !error &&
        blogs.map(blog => (
          <BlogForApproval
            key={blog.id}
            data={blog}
            onActionComplete={handleRefresh}
          />
        ))}
    </div>
  );
};

export default AdminBlogManager;
