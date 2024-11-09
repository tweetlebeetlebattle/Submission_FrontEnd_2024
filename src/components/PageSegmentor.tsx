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
          <h2 style={titleStyle}>{section.title}</h2>
          <p style={descriptionStyle}>{section.description}</p>
        </div>
      ))}
    </div>
  );
};

// Inline CSS styles
const containerStyle: React.CSSProperties = {
  display: 'flex',
  height: '100vh',
  width: '100%',
  overflow: 'hidden',
};

const sectionStyle: React.CSSProperties = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  textDecoration: 'none',
  cursor: 'pointer',
  transition: 'border-color 0.3s ease, filter 0.3s ease, opacity 0.3s ease',
  border: '5px solid transparent',
};

const titleStyle: React.CSSProperties = {
  color: 'white',
  fontSize: '24px',
  zIndex: 2,
  textShadow: '2px 2px 4px rgba(0,0,0,0.6)',
};

const descriptionStyle: React.CSSProperties = {
  color: 'white',
  fontSize: '18px',
  zIndex: 2,
  textShadow: '1px 1px 2px rgba(0,0,0,0.6)',
  padding: '0 20px',
};

// Adding the styles to the document head for hover effects
document.head.appendChild(
  (() => {
    const style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = `
        .section:hover {
            border-color: rgba(255,255,255,0.5);
            filter: brightness(0.7);
            opacity: 0.9;
        }
        .section:active {
            opacity: 0.85;
        }
    `;
    return style;
  })()
);

export default PageSegmentor;
