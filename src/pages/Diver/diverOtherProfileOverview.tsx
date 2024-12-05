import apiTerminal from '../../client/apiTerminal';
import OtherProfileOverview from '../../components/OtherProfileOverview';

const DiverOtherProfileOverview = (targetUsername: string) => {
  const fetchBlogMethod = async (
    blogsPerPage: number,
    currentPage: number,
    username: string,
    navigate: (path: string, state?: any) => void
  ) => {
    return await apiTerminal.fetchApprovedUserDiverBlogsComments(
      blogsPerPage,
      currentPage,
      username,
      navigate
    );
  };
  const fetchBlogPageNumberMethod = async (
    queryTarget: string,
    navigate: (path: string, state?: any) => void
  ) => {
    return await apiTerminal.FetchNumberOfApprovedUserDiverBlogs(
      queryTarget,
      navigate
    );
  };
  return (
    <OtherProfileOverview
      targetUsername={targetUsername}
      fetchMethod={fetchBlogMethod}
      fetchPageNumberMethod={fetchBlogPageNumberMethod}
    />
  );
};

export default DiverOtherProfileOverview;
