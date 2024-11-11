import React, { useState } from 'react';
import Blog from './Blog';
import SearchBar from './SearchBar';
import CreateBlog from './CreateBlog';

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

interface BlogDefaultDisplayProps {
  blogPostsData: BlogPost[];
}

const BlogDefaultDisplay: React.FC<BlogDefaultDisplayProps> = ({
  blogPostsData,
}) => {
  const [showCreateBlogForm] = useState(true); // Always true for demonstration, be determined by logged in user or guest

  // should have env value that sets the max blogs per page
  // should be paginated:
  // should send to the backend first: how many blogs per page second: which page it wants (it calculates only which comments to send to the frontend)
  // should have loadData parameter, that loads the correct blog
  return (
    <div>
      <SearchBar />
      {showCreateBlogForm && <CreateBlog />}
      {blogPostsData.map(blog => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default BlogDefaultDisplay;
