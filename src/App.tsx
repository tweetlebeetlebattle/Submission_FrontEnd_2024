import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import Navbar from './navigation/navigation';
import AdminBlogManager from './pages/Admin/adminBlogManager';
import AdminFeedbackManager from './pages/Admin/adminFeedbackManager';
import AdminServerManager from './pages/Admin/adminServerManager';
import DiverBlog from './pages/Diver/diverBlog';
import DiverCurrentConditions from './pages/Diver/diverCurrentConditions';
import DiverHistoricConditions from './pages/Diver/diverHistoricConditions';
import DiverOverview from './pages/Diver/diverOverview';
import WeightlifterBlog from './pages/Weightlifter/weightlifterBlog';
import WeightlifterConditions from './pages/Weightlifter/weightlifterConditions';
import WeightlifterOverview from './pages/Weightlifter/weightlifterOverview';
import Onboarding from './pages/onboarding';
import Overview from './pages/overview';
import DiverFeedback from './pages/Diver/diverFeedback';
import AdminOverview from './pages/Admin/adminOverview';
import {
  adminLinks,
  diverLinks,
  weightlifterLinks,
} from './utils/componentProps';
import NavigationBar from './components/NavigationBar';

function AppContent() {
  const location = useLocation();
  const shouldShowNavbarDiver = diverLinks.some(
    link => link.path === location.pathname
  );
  const shouldShowNavbarWeightlifter = weightlifterLinks.some(
    link => link.path === location.pathname
  );
  const shouldShowNavbarAdmin = adminLinks.some(
    link => link.path === location.pathname
  );

  return (
    <div>
      {location.pathname === '/' && <Navbar />}
      {shouldShowNavbarDiver && <NavigationBar links={diverLinks} />}
      {shouldShowNavbarWeightlifter && (
        <NavigationBar links={weightlifterLinks} />
      )}
      {shouldShowNavbarAdmin && <NavigationBar links={adminLinks} />}

      <Routes>
        <Route path='/' element={<Overview />} />
        <Route path='/admin-overview' element={<AdminOverview />} />
        <Route path='/admin-blog-manager' element={<AdminBlogManager />} />
        <Route
          path='/admin-feedback-manager'
          element={<AdminFeedbackManager />}
        />
        <Route path='/admin-server-manager' element={<AdminServerManager />} />
        <Route path='/diver-blog' element={<DiverBlog />} />
        <Route
          path='/diver-current-conditions'
          element={<DiverCurrentConditions />}
        />
        <Route
          path='/diver-historic-conditions'
          element={<DiverHistoricConditions />}
        />
        <Route path='/diver-overview' element={<DiverOverview />} />
        <Route path='/diver-feedback' element={<DiverFeedback />} />
        <Route path='/weightlifter-blog' element={<WeightlifterBlog />} />
        <Route
          path='/weightlifter-conditions'
          element={<WeightlifterConditions />}
        />
        <Route
          path='/weightlifter-overview'
          element={<WeightlifterOverview />}
        />
        <Route path='/onboarding' element={<Onboarding />} />
        <Route path='/overview' element={<Overview />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
