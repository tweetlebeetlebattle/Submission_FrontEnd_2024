import React, { useContext, useState } from 'react';
import { AuthContext } from '../store/authContext';

interface Comment {
  id: number;
  text: string;
  username: string;
  timestamp: string;
  imageUrl?: string;
}

interface BlogPost {
  id: number;
  username: string;
  text: string;
  timestamp: string;
  imageUrl?: string;
  comments: Comment[];
}

interface BlogPostProps {
  blog: BlogPost;
}

const Blog: React.FC<BlogPostProps> = ({ blog }) => {
  const authInfo = useContext(AuthContext);
  const [showCommentForm] = useState(authInfo.authInfo.username !== ''); // Always true for demonstration, be determined by logged in user or guest
  const [commentText, setCommentText] = useState('');
  const [commentImage, setCommentImage] = useState<File | null>(null);

  const handleCommentSubmit = () => {
    const timestamp = new Date().toISOString(); // Set current time as timestamp
    console.log({
      text: commentText,
      image: commentImage,
      blogId: blog.id,
      timestamp,
    });
    // Reset fields after submit
    setCommentText('');
    setCommentImage(null);
  };

  return (
    <div
      style={{
        border: '1px solid black',
        margin: '20px',
        padding: '20px',
        position: 'relative',
      }}
    >
      <h4 style={{ position: 'absolute', top: '20px', left: '20px' }}>
        {blog.username} - {new Date(blog.timestamp).toLocaleString()}
      </h4>
      <p style={{ marginTop: '40px' }}>{blog.text}</p>
      {blog.imageUrl && (
        <img
          src={blog.imageUrl}
          alt='Blog'
          style={{ maxWidth: '100%', margin: '10px 0' }}
        />
      )}
      {blog.comments.map(comment => (
        <div
          key={comment.id}
          style={{
            borderTop: '1px dashed grey',
            padding: '10px',
            marginTop: '10px',
          }}
        >
          <strong>{comment.username}</strong> (
          {new Date(comment.timestamp).toLocaleString()}): {comment.text}
          {comment.imageUrl && (
            <img
              src={comment.imageUrl}
              alt='Comment'
              style={{ maxWidth: '100%', marginTop: '5px' }}
            />
          )}
        </div>
      ))}
      {showCommentForm && (
        <div style={{ marginTop: '20px' }}>
          <input
            type='text'
            value={commentText}
            onChange={e => setCommentText(e.target.value)}
            placeholder='Write a comment...'
            style={{ width: '100%', padding: '10px' }}
          />
          <input
            type='file'
            onChange={e =>
              setCommentImage(e.target.files ? e.target.files[0] : null)
            }
          />
          <button
            onClick={handleCommentSubmit}
            style={{ padding: '10px 20px', marginTop: '10px' }}
          >
            Submit Comment
          </button>
        </div>
      )}
    </div>
  );
};

export default Blog;
