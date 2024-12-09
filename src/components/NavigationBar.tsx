import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext, useAuth } from '../store/authContext';

type PageLink = {
  path: string;
  label: string;
};

interface NavbarProps {
  links: PageLink[];
}

const NavigationBar: React.FC<NavbarProps> = ({ links }) => {
  const { removeInfo } = useAuth();
  const authInfo = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    removeInfo();
    navigate('/');
  };

  return (
    <nav style={navStyle}>
      <div>
        <Link to='/' style={homeLinkStyle}>
          Home
        </Link>
        {authInfo.authInfo.username && (
          <button onClick={handleLogout} style={logoutButtonStyle}>
            Logout
          </button>
        )}
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

const navStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: '#f0f0f0',
  padding: '10px',
};

const linkStyle: React.CSSProperties = {
  textDecoration: 'none',
  color: 'black',
};

const homeLinkStyle: React.CSSProperties = {
  marginRight: '20px',
  ...linkStyle,
};

const otherLinkStyle: React.CSSProperties = {
  marginLeft: '20px',
  ...linkStyle,
};

const logoutButtonStyle: React.CSSProperties = {
  marginLeft: '20px',
  backgroundColor: 'transparent',
  border: 'none',
  color: 'black',
  cursor: 'pointer',
  textDecoration: 'underline',
};
