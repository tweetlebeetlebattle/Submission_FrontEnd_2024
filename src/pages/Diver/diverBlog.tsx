import React, { useState } from 'react';

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

// Sample data for initial display
const blogPostsData: BlogPost[] = [
  {
    id: 1,
    username: 'JaneDoe',
    text: 'Welcome to my blog! This is my first post.',
    timestamp: '2023-11-10T12:00:00Z',
    imageUrl: 'https://via.placeholder.com/150',
    comments: [
      {
        id: 1,
        text: 'Great post!',
        username: 'JohnDoe',
        timestamp: '2023-11-10T13:00:00Z',
        imageUrl: 'https://via.placeholder.com/100',
      },
    ],
  },
  // Additional sample posts can be added here
];

const DiverBlog = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>(blogPostsData);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const filteredBlogs = blogPostsData.filter(
      blog =>
        blog.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.comments.some(comment =>
          comment.text.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );
    setBlogs(filteredBlogs);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ padding: '20px' }}>
        <input
          type='text'
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder='Search blogs...'
          style={{ marginRight: '10px', padding: '10px', width: '300px' }}
        />
        <button type='submit' style={{ padding: '10px 20px' }}>
          Search
        </button>
      </form>
      {blogs.map(blog => (
        <div
          key={blog.id}
          style={{
            border: '1px solid black',
            margin: '20px',
            padding: '20px',
            position: 'relative',
          }}
        >
          <h4 style={{ position: 'absolute', top: '10px', left: '10px' }}>
            {blog.username} - {new Date(blog.timestamp).toLocaleString()}
          </h4>
          <p>{blog.text}</p>
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
        </div>
      ))}
    </div>
  );
};

export default DiverBlog;
