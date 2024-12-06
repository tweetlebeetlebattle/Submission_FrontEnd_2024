import React, { useEffect, useState } from 'react';

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
}

const OtherDisplayBlog: React.FC<BlogPostProps> = ({ blog }) => {
  const [blogText, setBlogText] = useState<string>('Loading...');
  const [commentTexts, setCommentTexts] = useState<Record<string, string>>({});

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
    </div>
  );
};

export default OtherDisplayBlog;
