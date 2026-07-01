import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  FileText,
  Settings,
  Calendar,
  X,
} from 'lucide-react';

const menuItems = [
  { icon: LayoutDashboard, label: 'Tableau de bord', path: '/dashboard' },
  { icon: Users, label: 'Candidatures', path: '/dashboard/candidatures' },
  { icon: Calendar, label: 'Entretiens', path: '/dashboard/interviews' },
  { icon: Settings, label: 'Paramètres', path: '/dashboard/settings' },
];

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="sidebar-overlay"
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 30,
          }}
        />
      )}

      {/* Sidebar */}
      <aside
        className="sidebar-container"
        style={{
          position: 'fixed',
          top: '64px',
          left: 0,
          height: 'calc(100vh - 64px)',
          width: '260px',
          backgroundColor: 'white',
          borderRight: '1px solid #E5E7EB',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          zIndex: 35,
          transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.3s ease',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Mobile Close Button */}
        <div className="sidebar-close-btn" style={{
          display: 'none',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1rem',
          borderBottom: '1px solid #F3F4F6',
        }}>
          <span style={{ fontWeight: 600, color: '#374151' }}>Menu</span>
          <button
            onClick={onClose}
            style={{
              padding: '0.25rem',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              borderRadius: '0.375rem',
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav style={{
          padding: '1rem 0.75rem',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: '0.25rem',
        }}>
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/dashboard'}
              onClick={onClose}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem 1rem',
                borderRadius: '0.5rem',
                fontSize: '0.875rem',
                fontWeight: 500,
                textDecoration: 'none',
                transition: 'all 0.2s',
                backgroundColor: isActive ? '#1E3A5F' : 'transparent',
                color: isActive ? 'white' : '#4B5563',
                boxShadow: isActive ? '0 2px 4px rgba(30, 58, 95, 0.2)' : 'none',
              })}
            >
              <item.icon size={20} style={{ flexShrink: 0 }} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Bottom Info */}
        <div style={{ padding: '0.75rem' }}>
          <div style={{
            backgroundColor: '#EFF6FF',
            borderRadius: '0.5rem',
            padding: '1rem',
          }}>
            <p style={{
              fontSize: '0.75rem',
              fontWeight: 600,
              color: '#1E40AF',
              margin: 0,
            }}>
              RIF-Stages
            </p>
            <p style={{
              fontSize: '0.75rem',
              color: '#2563EB',
              marginTop: '0.25rem',
            }}>
              Groupe RIF © 2026
            </p>
          </div>
        </div>
      </aside>

      <style>{`
        /* Desktop : sidebar visible */
        @media (min-width: 1024px) {
          .sidebar-container {
            transform: translateX(0) !important;
          }
          .sidebar-overlay {
            display: none !important;
          }
        }
        
        /* Mobile : bouton de fermeture visible */
        @media (max-width: 1023px) {
          .sidebar-close-btn {
            display: flex !important;
          }
        }
      `}</style>
    </>
  );
};

export default Sidebar;