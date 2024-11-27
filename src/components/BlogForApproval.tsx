import React, { useContext, useEffect, useState } from 'react';
import apiTerminal from '../client/apiTerminal';
import { AuthContext } from '../store/authContext';

interface UnapprovedData {
  id: string;
  text?: string;
  username: string;
  timestamp: string;
  imageUrl?: string;
}

interface Props {
  data: UnapprovedData;
  onActionComplete: () => void;
}

const BlogForApproval: React.FC<Props> = ({ data, onActionComplete }) => {
  const authInfo = useContext(AuthContext);
  const [blogText, setBlogText] = useState<string | null>(null);
  const [loadingText, setLoadingText] = useState(true);
  const [errorText, setErrorText] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogText = async () => {
      if (!data.text) {
        setBlogText(null);
        setLoadingText(false);
        return;
      }

      try {
        const response = await fetch(data.text);
        if (!response.ok) {
          throw new Error('Failed to fetch blog text.');
        }

        const text = await response.text();
        setBlogText(text);
      } catch (error) {
        setErrorText('Unable to load blog text.');
        console.error('Error fetching blog text:', error);
      } finally {
        setLoadingText(false);
      }
    };

    fetchBlogText();
  }, [data.text]);

  const handleApprove = async () => {
    console.log(`Blog with ID ${data.id} approved.`);
    try {
      await apiTerminal.updateBlogCommentStatus(
        data.id,
        'approved',
        authInfo.authInfo.token
      );
      onActionComplete();
    } catch (error) {
      console.error('Failed to approve blog:', error);
    }
  };

  const handleReject = async () => {
    console.log(`Blog with ID ${data.id} rejected.`);
    try {
      await apiTerminal.updateBlogCommentStatus(
        data.id,
        'rejected',
        authInfo.authInfo.token
      );
      onActionComplete();
    } catch (error) {
      console.error('Failed to reject blog:', error);
    }
  };

  return (
    <div
      style={{
        border: '1px solid gray',
        padding: '20px',
        marginBottom: '10px',
      }}
    >
      <p>By: {data.username}</p>
      <p>At: {data.timestamp}</p>
      {loadingText && <p>Loading blog text...</p>}
      {errorText && <p style={{ color: 'red' }}>{errorText}</p>}
      {blogText && (
        <pre style={{ whiteSpace: 'pre-wrap' }}>{blogText}</pre>
      )}{' '}
      {data.imageUrl && (
        <img
          src={data.imageUrl}
          alt='Blog content'
          style={{ maxWidth: '100%' }}
        />
      )}
      <div>
        <button onClick={handleApprove} style={{ marginRight: '10px' }}>
          Approve
        </button>
        <button onClick={handleReject}>Reject</button>
      </div>
    </div>
  );
};

export default BlogForApproval;
