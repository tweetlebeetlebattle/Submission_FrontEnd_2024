// DiverBlog.tsx
import React, { useContext, useEffect, useState } from 'react';
import SearchBar from '../../components/SearchBar';
import Blog from '../../components/Blog';
import BlogDefaultDisplay from '../../components/BlogDefaultDisplay';
import { AuthContext } from '../../store/authContext';
import apiTerminal from '../../client/apiTerminal';

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

// Sample data for initial display
const blogPostsData: BlogPost[] = [
  {
    id: '1',
    username: 'JaneDoe',
    text: 'Welcome to my blog! This is my first post.',
    timestamp: '2023-11-10T12:00:00Z',
    imageUrl: 'https://via.placeholder.com/150',
    comments: [
      {
        id: '1',
        text: 'Great post!',
        username: 'JohnDoe',
        timestamp: '2023-11-10T13:00:00Z',
        imageUrl: 'https://via.placeholder.com/100',
      },
      {
        id: '2',
        text: 'Looking forward to reading more!',
        username: 'AliceB',
        timestamp: '2023-11-10T14:00:00Z',
      },
    ],
  },
  {
    id: '2',
    username: 'AliceB',
    text: "Here's something new I learned about sustainable diving practices.",
    timestamp: '2023-11-11T15:00:00Z',
    imageUrl: 'https://via.placeholder.com/150',
    comments: [
      {
        id: '2',
        text: "That's really insightful, thanks for sharing!",
        username: 'JaneDoe',
        timestamp: '2023-11-11T16:30:00Z',
      },
    ],
  },
  {
    id: '3',
    username: 'JohnDoe',
    text: 'Exploring the depths: a dive into unknown waters.',
    timestamp: '2023-11-12T17:45:00Z',
    imageUrl: 'https://via.placeholder.com/150',
    comments: [
      {
        id: '4',
        text: 'Absolutely thrilling experience!',
        username: 'AliceB',
        timestamp: '2023-11-12T18:20:00Z',
        imageUrl: 'https://via.placeholder.com/100',
      },
      {
        id: '5',
        text: "Can't wait to try this out!",
        username: 'JaneDoe',
        timestamp: '2023-11-12T19:00:00Z',
      },
    ],
  },
];

const WeightlifterBlog = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>(blogPostsData);
  // when page is loaded fetch data
  // useEffect().. to load data
  const authInfo = useContext(AuthContext);

  const handleCreateBlog = async (blogText: string, blogImage: File | null) => {
    try {
      const response = await apiTerminal.createDiverBlog(
        blogText,
        blogImage as File,
        authInfo.authInfo.token
      );
      alert('Blog created successfully!');
    } catch (error) {
      console.error('Failed to create blog:', error);
      alert('An error occurred while creating the blog. Please try again.');
    }
  };
  const handleCreateComment = async (
    blogId: string,
    blogText: string,
    blogImage: File | null
  ) => {
    try {
      const response = await apiTerminal.createDiverComment(
        blogId,
        blogText,
        blogImage as File,
        authInfo.authInfo.token
      );
      alert('Blog created successfully!');
    } catch (error) {
      console.error('Failed to create blog:', error);
      alert('An error occurred while creating the blog. Please try again.');
    }
  };
  return (
    <div>
      <BlogDefaultDisplay
        blogPostsData={blogPostsData}
        handleCreateBlog={handleCreateBlog}
        handleCreateComment={handleCreateComment}
      />
    </div>
  );
};

export default WeightlifterBlog;
