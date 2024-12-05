import { useEffect, useState } from 'react';
import Pagination from './Pagination';
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

interface OtherProfileOverviewProps {
  targetUsername: string;
  fetchPageNumberMethod: (
    queryTarget: string,
    navigate: (path: string, state?: any) => void
  ) => Promise<{ data: any }>;
  fetchMethod: (
    blogsPerPage: number,
    currentPage: number,
    username: string,
    navigate: (path: string, state?: any) => void
  ) => Promise<{ data: any }>;
}

const OtherProfileOverview: React.FC<OtherProfileOverviewProps> = ({
  targetUsername,
  fetchPageNumberMethod,
  fetchMethod,
}) => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = Number(process.env.REACT_APP_BLOGS_PER_PAGE) || 4;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTotalPages = async () => {
      try {
        const response = await fetchPageNumberMethod(targetUsername, navigate);
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
      try {
        const resposne = await fetchMethod(
          blogsPerPage,
          currentPage,
          targetUsername,
          navigate
        );
        const transformedBlogs = resposne.data.map((blog: any) => ({
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
        console.error(error);
      }
    };

    fetchBlogs();
  }, [currentPage]);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  return (
    <Pagination
      totalPages={totalPages}
      currentPage={currentPage}
      onPageChange={handlePageChange}
    />
  );
};

export default OtherProfileOverview;
