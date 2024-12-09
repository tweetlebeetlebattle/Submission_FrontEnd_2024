import React, { useContext, useState, useEffect } from 'react';
import overviewDive from '../media/images/overviewDive.webp';
import overviewLifting from '../media/images/overviewLifting.webp';
import overviewAdmin from '../media/images/overviewAdmin.webp';
import OnboardingModal from '../modal/onboardingModal';
import { AuthContext } from '../store/authContext';
import { useNavigate } from 'react-router-dom';
import {
  overviewDiver,
  overviewWeightlfiter,
  overviewAdminText,
} from '../media/text/text';
import PageSegmentor from '../components/PageSegmentor';

const Overview = () => {
  const authInfo = useContext(AuthContext);
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    if (authInfo.authInfo.username === '') {
      setIsModalVisible(true);
    } else {
      setIsModalVisible(false);
    }
  }, [authInfo.authInfo.username]);

  const handleDiverClick = () => {
    navigate('/diver-overview');
  };
  const handleWeightlifterClick = () => {
    navigate('/weightlifter-overview');
  };
  const handleAdminClick = () => {
    navigate('/admin-overview');
  };

  const sections = [
    {
      title: 'Diver',
      description: overviewDiver,
      onClick: handleDiverClick,
      backgroundImage: overviewDive,
    },
    {
      title: 'Weightlifter',
      description: overviewWeightlfiter,
      onClick: handleWeightlifterClick,
      backgroundImage: overviewLifting,
    },
  ];

  if (authInfo.authInfo.isAdmin) {
    sections.push({
      title: 'Admin',
      description: overviewAdminText,
      onClick: handleAdminClick,
      backgroundImage: overviewAdmin,
    });
  }

  return (
    <div style={containerStyle}>
      {isModalVisible && <OnboardingModal />}
      <PageSegmentor sections={sections} />
    </div>
  );
};

const containerStyle: React.CSSProperties = {
  display: 'flex',
  height: '100vh',
};

export default Overview;
