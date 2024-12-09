import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
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
  diverUserLinks,
  weightlifterUserLinks,
} from './utils/componentProps';
import NavigationBar from './components/NavigationBar';
import { AuthContext, AuthProvider } from './store/authContext';
import BadRequest from './pages/badRequest';
import NotFound from './pages/notFount';
import DiverOtherProfileOverview from './pages/Diver/diverOtherProfileOverview';
import { useParams } from 'react-router-dom';
import WeightlifterOtherProfileOverview from './pages/Weightlifter/weightlifterOtherProfileOverview';
import { useContext, useEffect, useState } from 'react';

const DiverOtherProfileOverviewWrapper = () => {
  const { username } = useParams<{ username: string }>();

  if (!username) {
    return <NotFound />;
  }

  return <DiverOtherProfileOverview targetUsername={username} />;
};
const WeightlifterOtherProfileOverviewWrapper = () => {
  const { username } = useParams<{ username: string }>();

  if (!username) {
    return <NotFound />;
  }

  return <WeightlifterOtherProfileOverview targetUsername={username} />;
};

function AppContent() {
  const authInfo = useContext(AuthContext);
  const location = useLocation();
  const [currentDiverLinks, setCurrentDiverLinks] = useState(diverLinks);
  const [currentWeightlifterLinks, setCurrentWeightlifterLinks] =
    useState(weightlifterLinks);

  useEffect(() => {
    if (authInfo.authInfo.username) {
      setCurrentDiverLinks([...diverLinks, ...diverUserLinks]);
      setCurrentWeightlifterLinks([
        ...weightlifterLinks,
        ...weightlifterUserLinks,
      ]);
    } else {
      setCurrentDiverLinks(diverLinks);
      setCurrentWeightlifterLinks(weightlifterLinks);
    }
  }, [authInfo.authInfo.username]);

  const shouldShowNavbarDiver = currentDiverLinks.some(
    link => link.path === location.pathname
  );
  const shouldShowNavbarWeightlifter = currentWeightlifterLinks.some(
    link => link.path === location.pathname
  );
  const shouldShowNavbarAdmin = adminLinks.some(
    link => link.path === location.pathname
  );

  return (
    <div>
      {shouldShowNavbarDiver && <NavigationBar links={currentDiverLinks} />}
      {shouldShowNavbarWeightlifter && (
        <NavigationBar links={currentWeightlifterLinks} />
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
        <Route
          path='/diver-other-profile-overview/:username'
          element={<DiverOtherProfileOverviewWrapper />}
        />{' '}
        <Route
          path='/weightlifter-other-profile-overview/:username'
          element={<WeightlifterOtherProfileOverviewWrapper />}
        />{' '}
        <Route path='/overview' element={<Overview />} />
        <Route path='/500' element={<BadRequest />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
