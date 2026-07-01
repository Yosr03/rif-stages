import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ToastProvider } from './contexts/ToastContext';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import CandidatureForm from './pages/CandidatureForm';
import SuccessPage from './pages/SuccessPage';
import DashboardHome from './pages/DashboardHome';
import CandidaturesList from './pages/CandidaturesList';
import InterviewsPage from './pages/InterviewsPage';
import SettingsPage from './pages/SettingsPage';
import NotFound from './pages/NotFound';

// Layouts
import DashboardLayout from './components/layout/DashboardLayout';

function App() {
  return (
    
    <AuthProvider>
      <ToastProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/candidature" element={<CandidatureForm />} />
          <Route path="/success" element={<SuccessPage />} />

          {/* Protected Dashboard Routes */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="candidatures" element={<CandidaturesList />} />
            <Route path="interviews" element={<InterviewsPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;