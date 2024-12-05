import React from 'react';
import Blog from './Blog';
import SearchBar from './SearchBar';
import CreateBlog from './CreateBlog';
import Pagination from './Pagination';
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
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  handleSearchSuggestionClick: (suggestionName: string) => void;
}

const BlogDefaultDisplay: React.FC<BlogDefaultDisplayProps> = ({
  blogPostsData,
  handleCreateBlog,
  handleCreateComment,
  totalPages,
  currentPage,
  onPageChange,
  handleSearchSuggestionClick,
}) => {
  const authInfo = React.useContext(AuthContext);
  const showCreateBlogForm = authInfo.authInfo.username !== '';

  return (
    <div>
      <SearchBar handleSuggestionClick={handleSearchSuggestionClick} />
      {showCreateBlogForm && <CreateBlog onSubmit={handleCreateBlog} />}
      {blogPostsData.map(blog => (
        <Blog
          key={blog.id}
          blog={blog}
          handleCreateComment={handleCreateComment}
        />
      ))}
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default BlogDefaultDisplay;
