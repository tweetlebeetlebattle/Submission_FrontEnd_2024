import React from 'react';

type Section = {
  title: string;
  description: string;
  onClick?: () => void;
  backgroundImage: string;
};

interface PageSegmentorProps {
  sections: Section[];
}

const PageSegmentor: React.FC<PageSegmentorProps> = ({ sections }) => {
  return (
    <div style={containerStyle}>
      {sections.map((section, index) => (
        <div
          key={index}
          className='section'
          style={{
            ...sectionStyle,
            backgroundImage: `url(${section.backgroundImage})`,
          }}
          onClick={section.onClick}
        >
          <div className='overlay' />
          <div style={textContainerStyle}>
            <h2 style={titleStyle}>{section.title}</h2>
            <p style={descriptionStyle}>{section.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

const containerStyle: React.CSSProperties = {
  display: 'flex',
  height: '100vh',
  width: '100%',
  overflow: 'hidden',
};

const sectionStyle: React.CSSProperties = {
  position: 'relative',
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  textDecoration: 'none',
  cursor: 'pointer',
  transition: 'border-color 0.3s ease, filter 0.3s ease, opacity 0.3s ease',
  border: '5px solid transparent',
  paddingTop: '70px',
  overflow: 'hidden',
};

const textContainerStyle: React.CSSProperties = {
  position: 'relative',
  textAlign: 'center',
  padding: '10px',
  zIndex: 2,
};

const titleStyle: React.CSSProperties = {
  color: 'white',
  fontSize: '24px',
  textShadow: '2px 2px 4px rgba(0,0,0,0.6)',
  margin: 0,
};

const descriptionStyle: React.CSSProperties = {
  color: 'white',
  fontSize: '18px',
  textShadow: '1px 1px 2px rgba(0,0,0,0.6)',
  margin: '10px 0 0',
  padding: '0 20px',
};

document.head.appendChild(
  (() => {
    const style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = `
      .section {
        position: relative;
      }
      .section .overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0); /* No darkening initially */
        transition: background-color 0.3s ease;
        z-index: 1; /* Places overlay below the text */
      }
      .section:hover .overlay {
        background-color: rgba(0, 0, 0, 0.4); /* Darkens on hover */
      }
    `;
    return style;
  })()
);

export default PageSegmentor;
