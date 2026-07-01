import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { LogOut, User, Menu, X } from 'lucide-react';
import NotificationBell from './NotificationBell';
import { useState } from 'react';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setMobileMenuOpen(false);
  };

  return (
    <nav style={{
      backgroundColor: '#1E3A5F',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 40,
      width: '100%',
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 1rem',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        {/* Logo */}
        <Link to="/" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          textDecoration: 'none',
        }}>
          <div style={{
            width: '36px',
            height: '36px',
            backgroundColor: '#F59E0B',
            borderRadius: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}>
            <span style={{
              color: '#1E3A5F',
              fontWeight: 900,
              fontSize: '1.125rem',
            }}>R</span>
          </div>
          <div className="navbar-title">
            <h1 style={{
              color: 'white',
              fontWeight: 700,
              fontSize: '1.125rem',
              lineHeight: 1.2,
              margin: 0,
            }}>
              RIF-Stages
            </h1>
            <p style={{
              color: '#93C5FD',
              fontSize: '0.75rem',
              margin: 0,
              lineHeight: 1.2,
            }}>
              Portail de Candidature
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="navbar-desktop" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
        }}>
          {isAuthenticated() ? (
            <>
              {/* 🔔 Notification Bell */}
              <NotificationBell />

              {/* User info */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: '#93C5FD',
              }}>
                <User size={16} />
                <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>
                  {user?.name}
                </span>
              </div>

              {/* Logout button */}
              <button
                onClick={handleLogout}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.5rem 1rem',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: 'white',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  borderRadius: '0.5rem',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
              >
                <LogOut size={16} />
                Déconnexion
              </button>
            </>
          ) : (
            <Link
              to="/login"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 1rem',
                fontSize: '0.875rem',
                fontWeight: 500,
                color: 'white',
                backgroundColor: 'rgba(255,255,255,0.1)',
                borderRadius: '0.5rem',
                textDecoration: 'none',
              }}
            >
              <User size={16} />
              Espace RH
            </Link>
          )}
        </div>

        {/* Mobile section (bell + menu button) */}
        <div className="navbar-mobile-section" style={{
          display: 'none',
          alignItems: 'center',
          gap: '0.5rem',
        }}>
          {/* Notification bell on mobile (only if authenticated) */}
          {isAuthenticated() && <NotificationBell />}

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              padding: '0.5rem',
              color: 'white',
              backgroundColor: 'transparent',
              borderRadius: '0.5rem',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="navbar-mobile-menu" style={{
          backgroundColor: '#1E3A5F',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          padding: '0.75rem 1rem',
        }}>
          {isAuthenticated() ? (
            <>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: '#93C5FD',
                padding: '0.5rem 0.75rem',
              }}>
                <User size={16} />
                <span style={{ fontSize: '0.875rem' }}>{user?.name}</span>
              </div>
              <button
                onClick={handleLogout}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.5rem 0.75rem',
                  fontSize: '0.875rem',
                  color: 'white',
                  backgroundColor: 'transparent',
                  borderRadius: '0.5rem',
                  textAlign: 'left',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                <LogOut size={16} />
                Déconnexion
              </button>
            </>
          ) : (
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 0.75rem',
                fontSize: '0.875rem',
                color: 'white',
                textDecoration: 'none',
              }}
            >
              <User size={16} />
              Espace RH
            </Link>
          )}
        </div>
      )}

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 640px) {
          .navbar-title {
            display: none;
          }
        }
        @media (max-width: 768px) {
          .navbar-desktop {
            display: none !important;
          }
          .navbar-mobile-section {
            display: flex !important;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;