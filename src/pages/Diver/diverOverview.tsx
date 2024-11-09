import PageSegmentor from '../../components/PageSegmentor';
import {
  diverBlogDescription,
  diverCurrentConditionsDescription,
  diverHistoricConditionsDescription,
  diverFeedbackDescription,
} from '../../media/text/text';
import overviewBlog from '../../media/images/diver/overviewBlog.webp';
import overviewCurrent from '../../media/images/diver/overviewCurrent.webp';
import overviewFeedback from '../../media/images/diver/overviewFeedback.webp';
import overviewHistoric from '../../media/images/diver/overviewHistoric.webp';
import { useNavigate } from 'react-router-dom';

const DiverOverview = () => {
  const navigate = useNavigate();

  const onClickBlog = () => {
    navigate('/diver-blog');
  };
  const onClickCurrentConditions = () => {
    navigate('/diver-current-conditions');
  };
  const onClickHistoricConditions = () => {
    navigate('/diver-historic-conditions');
  };
  const onClickDiverFeedback = () => {
    navigate('/diver-feedback');
  };
  const sections = [
    {
      title: 'Diver Blog',
      description: diverBlogDescription,
      onClick: onClickBlog,
      backgroundImage: overviewBlog,
    },
    {
      title: 'Current Conditions',
      description: diverCurrentConditionsDescription,
      onClick: onClickCurrentConditions,
      backgroundImage: overviewCurrent,
    },
    {
      title: 'Historic Conditions',
      description: diverHistoricConditionsDescription,
      onClick: onClickHistoricConditions,
      backgroundImage: overviewHistoric,
    },
    {
      title: 'Diver Feedback',
      description: diverFeedbackDescription,
      onClick: onClickDiverFeedback,
      backgroundImage: overviewFeedback,
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

export default DiverOverview;
