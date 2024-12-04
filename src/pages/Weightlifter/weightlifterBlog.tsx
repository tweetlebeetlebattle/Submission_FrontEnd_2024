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

const WeightlifterBlog = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 4;
  const authInfo = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTotalPages = async () => {
      try {
        const response =
          await apiTerminal.FetchNumberOfApprovedWeightlifterBlogs(navigate);
        const totalBlogs = response.data;
        setTotalPages(Math.ceil(totalBlogs / blogsPerPage));
      } catch (error) {
        console.error('Failed to fetch total pages:', error);
      }
    };

    fetchTotalPages();
  }, []);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      setError(null);
      try {
        const response =
          await apiTerminal.fetchApprovedWeightlifterBlogsComments(
            blogsPerPage,
            currentPage,
            navigate
          );

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
      const response = await apiTerminal.createWeightlifterBlog(
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
      const response = await apiTerminal.createWeightlifterComment(
        blogId,
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
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  return (
    <div>
      <BlogDefaultDisplay
        blogPostsData={blogs}
        handleCreateBlog={handleCreateBlog}
        handleCreateComment={handleCreateComment}
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default WeightlifterBlog;
