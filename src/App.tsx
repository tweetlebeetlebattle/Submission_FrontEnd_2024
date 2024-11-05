import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './navigation/navigation';
import AdminBlogManager from './pages/Admin/adminBlogManager';
import AdminFeedbackManager from './pages/Admin/adminFeedbackManager';
import AdminServerManager from './pages/Admin/adminServerManager';
import DiverBlog from './pages/Diver/diverBlog';
import DiverCurrentConditions from './pages/Diver/diverCurrentConditions';
import DiverHistoricConditions from './pages/Diver/diverHistoricConditions';
import DiverOverview from './pages/Diver/diverOverview';
import Feedback from './pages/Diver/feedback';
import WeightlifterBlog from './pages/Weightlifter/weightlifterBlog';
import WeightlifterConditions from './pages/Weightlifter/weightlifterConditions';
import WeightlifterOverview from './pages/Weightlifter/weightlifterOverview';
import Onboarding from './pages/onboarding';
import Overview from './pages/overview';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/admin-blog-manager" element={<AdminBlogManager />} />
          <Route path="/admin-feedback-manager" element={<AdminFeedbackManager />} />
          <Route path="/admin-server-manager" element={<AdminServerManager />} />
          <Route path="/diver-blog" element={<DiverBlog />} />
          <Route path="/diver-current-conditions" element={<DiverCurrentConditions />} />
          <Route path="/diver-historic-conditions" element={<DiverHistoricConditions />} />
          <Route path="/diver-overview" element={<DiverOverview />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/weightlifter-blog" element={<WeightlifterBlog />} />
          <Route path="/weightlifter-conditions" element={<WeightlifterConditions />} />
          <Route path="/weightlifter-overview" element={<WeightlifterOverview />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/overview" element={<Overview />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
