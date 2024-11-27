import React, { useContext, useState } from 'react';
import Blog from './Blog';
import SearchBar from './SearchBar';
import CreateBlog from './CreateBlog';
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

interface BlogDefaultDisplayProps {
  blogPostsData: BlogPost[];
  handleCreateBlog: (blogText: string, blogImage: File | null) => void;
  handleCreateComment: (
    blogId: string,
    blogText: string,
    blogImage: File | null
  ) => void;
}

const BlogDefaultDisplay: React.FC<BlogDefaultDisplayProps> = ({
  blogPostsData,
  handleCreateBlog,
  handleCreateComment,
}) => {
  const authInfo = useContext(AuthContext);

  const [showCreateBlogForm] = useState(authInfo.authInfo.username !== '');
  // should be paginated:
  return (
    <div>
      <SearchBar />
      {showCreateBlogForm && <CreateBlog onSubmit={handleCreateBlog} />}
      {blogPostsData.map(blog => (
        <Blog
          key={blog.id}
          blog={blog}
          handleCreateComment={handleCreateComment}
        />
      ))}
    </div>
  );
};

export default BlogDefaultDisplay;
