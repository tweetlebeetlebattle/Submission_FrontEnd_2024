import PageSegmentor from '../../components/PageSegmentor';
import { useNavigate } from 'react-router-dom';
import {
  adminBlogDescription,
  adminFeedbackDescription,
  adminServerDescription,
} from '../../media/text/text';
import overviewBlog from '../../media/images/admin/overviewBlog.webp';
import overviewFeedback from '../../media/images/admin/overviewFeedback.webp';
import overviewServer from '../../media/images/admin/overviewServer.webp';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../../store/authContext';

const AdminOverview = () => {
  const navigate = useNavigate();
  const authInfo = useContext(AuthContext);

  const onClickBlog = () => {
    navigate('/admin-blog-manager');
  };
  const onClickFeedback = () => {
    navigate('/admin-feedback-manager');
  };
  const onClickServer = () => {
    navigate('/admin-server-manager');
  };
  useEffect(() => {
    if (authInfo.authInfo.isAdmin === false) {
      navigate('/');
    }
  }, []);

  const sections = [
    {
      title: 'Admin Blog Manager',
      description: adminBlogDescription,
      onClick: onClickBlog,
      backgroundImage: overviewBlog,
    },
    {
      title: 'Admin Feedback Manager',
      description: adminFeedbackDescription,
      onClick: onClickFeedback,
      backgroundImage: overviewFeedback,
    },
    {
      title: 'Admin Server Manager',
      description: adminServerDescription,
      onClick: onClickServer,
      backgroundImage: overviewServer,
    },
  ];

  return (
    <>
      <div>
        <PageSegmentor sections={sections} />
      </div>
    </>
  );
};

export default AdminOverview;
