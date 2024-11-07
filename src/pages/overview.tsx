import React, { useState } from 'react';
import overviewDive from '../media/images/overviewDive.webp';
import overviewLifting from '../media/images/overviewLifting.webp';
import OnboardingModal from '../modal/onboardingModal';

const Overview = () => {
    // block onboarding modal if userInfo is set

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [direction, setDirection] = useState<string | null>(null);

    const handleClick = (side: string) => {
        setIsModalVisible(true);
        if (side === 'Left') {
            setDirection('diver-overview');
        } else {
            setDirection('weightlifter-overview');
        }
    };
    return (
        <div style={containerStyle}>
            {isModalVisible && (
                <OnboardingModal
                    direction={direction || ""}
                />
            )}
            <div
                style={imageSideStyle}
                className="image-container left-side"
                onClick={() => handleClick('Left')}
            >
                <img src={overviewDive} alt="Left Side" style={imageStyle} />
                <h2 style={textStyle}>Left Side Content</h2>
            </div>
            <div
                style={imageSideStyle}
                className="image-container right-side"
                onClick={() => handleClick('Right')}
            >
                <img src={overviewLifting} alt="Right Side" style={imageStyle} />
                <h2 style={textStyle}>Right Side Content</h2>
            </div>
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

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default Overview;
