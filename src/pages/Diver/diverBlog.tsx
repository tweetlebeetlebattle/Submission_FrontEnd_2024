import { useContext, useEffect, useState } from 'react';
import BlogDefaultDisplay from '../../components/BlogDefaultDisplay';
import { AuthContext } from '../../store/authContext';
import apiTerminal from '../../client/apiTerminal';
import { useNavigate } from 'react-router-dom';

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

const DiverBlog = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const authInfo = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      setError(null);
      try {
        const response =
          await apiTerminal.fetchApprovedDiverBlogsComments(navigate);

        const transformedBlogs = response.map((blog: any) => ({
          id: blog.blogId,
          username: blog.applicationUserName,
          text: blog.mediaTextUrl,
          timestamp: blog.time,
          imageUrl: blog.mediaPictureUrl,
          comments: blog.comments.map((comment: any) => ({
            id: comment.id,
            text: comment.mediaTextUrl,
            username: comment.applicationUserName,
            timestamp: comment.time,
            imageUrl: comment.mediaPictureUrl,
          })),
        }));

        setBlogs(transformedBlogs);
      } catch (error) {
        setError('Failed to fetch blogs. Please try again later.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [authInfo.authInfo.token]);

  const handleCreateBlog = async (blogText: string, blogImage: File | null) => {
    try {
      const response = await apiTerminal.createDiverBlog(
        blogText,
        blogImage as File,
        authInfo.authInfo.token,
        navigate
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
        authInfo.authInfo.token,
        navigate
      );
      alert('Comment created successfully!');
    } catch (error) {
      console.error('Failed to create Comment:', error);
      alert('An error occurred while creating the Comment. Please try again.');
    }
  };
  return (
    <div>
      <BlogDefaultDisplay
        blogPostsData={blogs}
        handleCreateBlog={handleCreateBlog}
        handleCreateComment={handleCreateComment}
      />
    </div>
  );
};

export default DiverBlog;
