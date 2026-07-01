import { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { Menu } from 'lucide-react';

const DashboardLayout = () => {
  const { isAuthenticated, isHR, loading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          border: '4px solid #E5E7EB',
          borderTopColor: '#2563EB',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
        }} />
      </div>
    );
  }

  if (!isAuthenticated() || !isHR()) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F9FAFB' }}>
      <Navbar />

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Mobile sidebar toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="dashboard-menu-btn"
        style={{
          display: 'none',
          position: 'fixed',
          bottom: '1.5rem',
          right: '1.5rem',
          zIndex: 20,
          backgroundColor: '#1E3A5F',
          color: 'white',
          padding: '1rem',
          borderRadius: '50%',
          boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        <Menu size={24} />
      </button>

      {/* Main Content */}
      <main className="dashboard-main" style={{
        padding: '1.5rem',
        paddingTop: 'calc(64px + 1.5rem)',    // ← Ajouté (64px = hauteur navbar)
        minHeight: '100vh',
        }}>
          <Outlet />
      </main>

      <style>{`
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  /* Desktop */
  @media (min-width: 1024px) {
    .dashboard-main {
      margin-left: 260px;
      padding: 2rem !important;
      padding-top: calc(64px + 2rem) !important;   /* ← Ajouté */
    }
  }
  
  /* Mobile */
  @media (max-width: 1023px) {
    .dashboard-menu-btn {
      display: flex !important;
    }
  }
`}</style>
    </div>
  );
};

export default DashboardLayout;