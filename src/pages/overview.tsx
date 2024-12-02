import React, { useContext, useState } from 'react';
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
  const [isModalVisible, setIsModalVisible] = useState(
    authInfo.authInfo.username === ''
  );

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

const imageSideStyle: React.CSSProperties = {
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  overflow: 'hidden',
  cursor: 'pointer',
};

const imageStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
  top: 0,
  left: 0,
  zIndex: 0,
  transition: 'filter 0.3s ease, opacity 0.3s ease',
};

const textStyle: React.CSSProperties = {
  color: 'white',
  fontSize: '2rem',
  zIndex: 1,
  fontFamily: 'Arial, sans-serif',
  transition: 'font-family 0.3s ease',
};

const styles = `
html, body {
    margin: 0;
    padding: 0;
    height: 100%;
}

.image-container:hover img,
.image-container:active img {
    filter: brightness(0.7);
    opacity: 0.9;
}

.image-container:active img {
    opacity: 0.85;
}

.left-side:hover h2 {
    font-family: 'Courier New', monospace;
}

.right-side:hover h2 {
    font-family: 'Georgia', serif;
}
`;

const styleSheet = document.createElement('style');
styleSheet.type = 'text/css';
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default Overview;
