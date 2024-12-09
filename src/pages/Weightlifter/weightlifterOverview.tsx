import { useNavigate } from 'react-router-dom';
import PageSegmentor from '../../components/PageSegmentor';
import {
  weightlifterBlogDescription,
  weightlifterCurrentConditionsDescription,
} from '../../media/text/text';
import overviewBlog from '../../media/images/weightlifter/overviewBlog.webp';
import overviewCurrent from '../../media/images/weightlifter/overviewCurrent.webp';
import { useContext } from 'react';
import { AuthContext } from '../../store/authContext';

const WeightlifterOverview = () => {
  const authInfo = useContext(AuthContext);
  const navigate = useNavigate();

  const onClickBlog = () => {
    navigate('/weightlifter-blog');
  };
  const onClickCurrentConditions = () => {
    navigate('/weightlifter-conditions');
  };
  const sections = [
    {
      title: 'Weightlifter Blog',
      description: weightlifterBlogDescription,
      onClick: onClickBlog,
      backgroundImage: overviewBlog,
    },
  ];
  if (authInfo.authInfo.username !== '') {
    sections.push({
      title: 'Current Conditions',
      description: weightlifterCurrentConditionsDescription,
      onClick: onClickCurrentConditions,
      backgroundImage: overviewCurrent,
    });
  }
  return (
    <>
      <div>
        <PageSegmentor sections={sections} />
      </div>
    </>
  );
};

export default WeightlifterOverview;
