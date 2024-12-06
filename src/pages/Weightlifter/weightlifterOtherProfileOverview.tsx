import React from 'react';
import apiTerminal from '../../client/apiTerminal';
import OtherProfileOverview from '../../components/OtherProfileOverview';
import ProfileHeader from '../../components/ProfileHeader';

type WeightlifterOtherProfileOverviewProps = {
  targetUsername: string;
};

const WeightlifterOtherProfileOverview: React.FC<
  WeightlifterOtherProfileOverviewProps
> = ({ targetUsername }) => {
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
    <div>
      <ProfileHeader
        username={targetUsername}
        description={`Explore blogs and comments by ${targetUsername}.`}
      />

      <OtherProfileOverview
        targetUsername={targetUsername}
        fetchMethod={fetchBlogMethod}
        fetchPageNumberMethod={fetchBlogPageNumberMethod}
      />
    </div>
  );
};

export default WeightlifterOtherProfileOverview;
