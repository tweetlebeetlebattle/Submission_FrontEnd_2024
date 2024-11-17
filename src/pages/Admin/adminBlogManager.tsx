import React, { useState } from 'react';
import BlogForApproval from '../../components/BlogForApproval';

interface UnapprovedData {
  id: number;
  text: string;
  username: string;
  timestamp: string;
  imageUrl?: string;
}

const AdminBlogManager = () => {
  const initialBlogs: UnapprovedData[] = [
    {
      id: 1,
      text: 'First example blog post about nature conservation.',
      username: 'nature_lover',
      timestamp: '2024-11-17T12:00:00Z',
      imageUrl: 'http://example.com/nature.jpg',
    },
    {
      id: 2,
      text: 'Second example blog post about technology advances.',
      username: 'tech_guru',
      timestamp: '2024-11-17T13:00:00Z',
      imageUrl: 'http://example.com/tech.jpg',
    },
    {
      id: 3,
      text: 'Third example blog post about healthy eating.',
      username: 'health_advocate',
      timestamp: '2024-11-17T14:00:00Z',
      imageUrl: 'http://example.com/food.jpg',
    },
  ];

  const [blogs, setBlogs] = useState<UnapprovedData[]>(initialBlogs);
  return (
    <div>
      {blogs.map(blog => (
        <BlogForApproval key={blog.id} data={blog} />
      ))}
      {blogs.length === 0 && <p>No more blogs to approve or reject.</p>}
    </div>
  );
};

export default AdminBlogManager;
