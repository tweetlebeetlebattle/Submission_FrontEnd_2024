import { useNavigate } from 'react-router-dom';
import PageSegmentor from '../../components/PageSegmentor';
import {
  weightlifterBlogDescription,
  weightlifterCurrentConditionsDescription,
} from '../../media/text/text';
import overviewBlog from '../../media/images/weightlifter/overviewBlog.webp';
import overviewCurrent from '../../media/images/weightlifter/overviewCurrent.webp';

const WeightlifterOverview = () => {
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
    {
      title: 'Current Conditions',
      description: weightlifterCurrentConditionsDescription,
      onClick: onClickCurrentConditions,
      backgroundImage: overviewCurrent,
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

export default WeightlifterOverview;