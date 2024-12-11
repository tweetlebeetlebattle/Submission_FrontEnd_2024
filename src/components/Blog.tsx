import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../store/authContext';

interface Comment {
  id: string;
  text: string;
  username: string;
  timestamp: string;
  imageUrl?: string;
}

interface BlogPost {
  id: string;
  username: string;
  text: string;
  timestamp: string;
  imageUrl?: string;
  comments: Comment[];
}

interface BlogPostProps {
  blog: BlogPost;
  handleCreateComment: (
    blogId: string,
    commentText: string,
    commentImage: File | null
  ) => void;
}

const Blog: React.FC<BlogPostProps> = ({ blog, handleCreateComment }) => {
  const authInfo = useContext(AuthContext);
  const showCommentForm = authInfo.authInfo.username !== '';

  const [blogText, setBlogText] = useState<string>('Loading...');
  const [commentTexts, setCommentTexts] = useState<Record<string, string>>({});
  const [commentText, setCommentText] = useState('');
  const [commentImage, setCommentImage] = useState<File | null>(null);

  useEffect(() => {
    const fetchBlogText = async () => {
      try {
        const response = await fetch(blog.text);
        const text = await response.text();
        setBlogText(text);
      } catch (error) {
        setBlogText('Failed to load blog content.');
      }
    };
    fetchBlogText();
  }, [blog.text]);

  useEffect(() => {
    const fetchCommentTexts = async () => {
      const promises = blog.comments.map(async comment => {
        if (comment.text.startsWith('http')) {
          try {
            const response = await fetch(comment.text);
            const text = await response.text();
            return { id: comment.id, text };
          } catch (error) {
            return { id: comment.id, text: 'Failed to load comment content.' };
          }
        } else {
          return { id: comment.id, text: comment.text };
        }
      });

      const results = await Promise.all(promises);
      const textsMap = results.reduce(
        (acc, { id, text }) => ({ ...acc, [id]: text }),
        {}
      );
      setCommentTexts(textsMap);
    };

    fetchCommentTexts();
  }, [blog.comments]);

  const handleCommentSubmit = () => {
    if (!commentText.trim()) {
      alert('Comment text cannot be empty.');
      return;
    }

    handleCreateComment(blog.id, commentText, commentImage);

    setCommentText('');
    setCommentImage(null);

    const fileInput =
      document.querySelector<HTMLInputElement>("input[type='file']");
    if (fileInput) {
      fileInput.value = '';
    }
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
      <p style={{ marginTop: '40px' }}>{blogText}</p>
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
          {new Date(comment.timestamp).toLocaleString()}):{' '}
          {commentTexts[comment.id] || 'Loading...'}
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
