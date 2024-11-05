import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <ul>
        <li><Link to="/admin-blog-manager">Admin Blog Manager</Link></li>
        <li><Link to="/admin-feedback-manager">Admin Feedback Manager</Link></li>
        <li><Link to="/admin-server-manager">Admin Server Manager</Link></li>
        <li><Link to="/diver-blog">Diver Blog</Link></li>
        <li><Link to="/diver-current-conditions">Diver Current Conditions</Link></li>
        <li><Link to="/diver-historic-conditions">Diver Historic Conditions</Link></li>
        <li><Link to="/diver-overview">Diver Overview</Link></li>
        <li><Link to="/feedback">Feedback</Link></li>
        <li><Link to="/weightlifter-blog">Weightlifter Blog</Link></li>
        <li><Link to="/weightlifter-conditions">Weightlifter Conditions</Link></li>
        <li><Link to="/weightlifter-overview">Weightlifter Overview</Link></li>
        <li><Link to="/onboarding">Onboarding</Link></li>
        <li><Link to="/overview">Overview</Link></li>
      </ul>
    </nav>
  );
}


export default Navbar; 
