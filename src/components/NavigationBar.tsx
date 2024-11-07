import React from 'react';
import { Link } from 'react-router-dom';

type PageLink = {
    path: string;
    label: string;
}

interface NavbarProps {
    localHome: string;
    links: PageLink[];
}

const NavigationBar: React.FC<NavbarProps> = ({ localHome, links }) => {
    return (
        <nav style={navStyle}>
            <div>
                <Link to="/" style={homeLinkStyle}>Home</Link>
                <Link to={localHome} style={linkStyle}>Local Home</Link>
            </div>
            <div>
                {links.map(link => (
                    <Link key={link.path} to={link.path} style={otherLinkStyle}>
                        {link.label}
                    </Link>
                ))}
            </div>
        </nav>
    );
};

export default NavigationBar;

// Style Definitions
const navStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: '10px'
};

const linkStyle: React.CSSProperties = {
    textDecoration: 'none',
    color: 'black'
};

const homeLinkStyle: React.CSSProperties = {
    marginRight: '20px',
    ...linkStyle
};

const otherLinkStyle: React.CSSProperties = {
    marginLeft: '20px',
    ...linkStyle
};
