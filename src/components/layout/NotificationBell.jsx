import { useState, useRef, useEffect } from 'react';
import { Bell, User, Check, X, Clock, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock notifications - sera remplacé par Firestore plus tard
const MOCK_NOTIFICATIONS = [
  {
    id: 1,
    type: 'new_application',
    candidateName: 'Ahmed Ben Ali',
    message: 'a soumis une nouvelle candidature',
    department: 'Développement Web',
    timestamp: new Date(Date.now() - 5 * 60000).toISOString(), // il y a 5 min
    read: false,
  },
  {
    id: 2,
    type: 'new_application',
    candidateName: 'Sara Trabelsi',
    message: 'a soumis une nouvelle candidature',
    department: 'Data Science & IA',
    timestamp: new Date(Date.now() - 30 * 60000).toISOString(), // il y a 30 min
    read: false,
  },
  {
    id: 3,
    type: 'interview_reminder',
    candidateName: 'Yasmine Gharbi',
    message: 'Entretien prévu demain à 10h00',
    department: 'UI/UX Design',
    timestamp: new Date(Date.now() - 2 * 3600000).toISOString(), // il y a 2h
    read: false,
  },
  {
    id: 4,
    type: 'new_application',
    candidateName: 'Karim Mansouri',
    message: 'a soumis une nouvelle candidature',
    department: 'Développement Mobile',
    timestamp: new Date(Date.now() - 24 * 3600000).toISOString(), // hier
    read: true,
  },
  {
    id: 5,
    type: 'status_change',
    candidateName: 'Mohamed Khelifi',
    message: 'a été accepté',
    department: 'DevOps & Cloud',
    timestamp: new Date(Date.now() - 2 * 24 * 3600000).toISOString(), // il y a 2 jours
    read: true,
  },
];

const NotificationBell = () => {
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const removeNotification = (id, e) => {
    e.stopPropagation();
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  // Format relative time
  const getRelativeTime = (timestamp) => {
    const now = new Date();
    const then = new Date(timestamp);
    const diffMs = now - then;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'À l\'instant';
    if (diffMins < 60) return `Il y a ${diffMins} min`;
    if (diffHours < 24) return `Il y a ${diffHours}h`;
    if (diffDays === 1) return 'Hier';
    return `Il y a ${diffDays} jours`;
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'new_application':
        return { Icon: User, color: '#2563EB', bg: '#DBEAFE' };
      case 'interview_reminder':
        return { Icon: Clock, color: '#D97706', bg: '#FEF3C7' };
      case 'status_change':
        return { Icon: Check, color: '#059669', bg: '#D1FAE5' };
      default:
        return { Icon: Bell, color: '#6B7280', bg: '#F3F4F6' };
    }
  };

  return (
    <div ref={dropdownRef} style={{ position: 'relative' }}>
      {/* Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0.5rem',
          backgroundColor: isOpen ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.1)',
          color: 'white',
          borderRadius: '0.5rem',
          border: 'none',
          cursor: 'pointer',
          transition: 'background 0.2s',
        }}
        onMouseOver={(e) => {
          if (!isOpen) e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)';
        }}
        onMouseOut={(e) => {
          if (!isOpen) e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
        }}
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span style={{
            position: 'absolute',
            top: '2px',
            right: '2px',
            minWidth: '18px',
            height: '18px',
            padding: '0 5px',
            backgroundColor: '#EF4444',
            color: 'white',
            borderRadius: '9999px',
            fontSize: '0.6875rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid #1E3A5F',
            lineHeight: 1,
          }}>
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <>
          {/* Mobile overlay */}
          <div
            className="notif-mobile-overlay"
            onClick={() => setIsOpen(false)}
            style={{
              display: 'none',
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0,0,0,0.3)',
              zIndex: 45,
            }}
          />

          <div
            className="notif-dropdown"
            style={{
              position: 'absolute',
              top: 'calc(100% + 8px)',
              right: 0,
              width: '380px',
              maxHeight: '500px',
              backgroundColor: 'white',
              borderRadius: '0.75rem',
              boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
              border: '1px solid #E5E7EB',
              zIndex: 50,
              display: 'flex',
              flexDirection: 'column',
              animation: 'slideDown 0.2s ease-out',
            }}
          >
            {/* Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '1rem 1.25rem',
              borderBottom: '1px solid #F3F4F6',
              flexShrink: 0,
            }}>
              <div>
                <h3 style={{
                  fontSize: '1rem',
                  fontWeight: 700,
                  color: '#1F2937',
                  margin: 0,
                }}>
                  Notifications
                </h3>
                <p style={{
                  fontSize: '0.75rem',
                  color: '#6B7280',
                  margin: 0,
                  marginTop: '2px',
                }}>
                  {unreadCount > 0
                    ? `${unreadCount} non lue${unreadCount > 1 ? 's' : ''}`
                    : 'Tout est à jour'}
                </p>
              </div>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  style={{
                    fontSize: '0.75rem',
                    color: '#2563EB',
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: 600,
                    padding: '0.25rem 0.5rem',
                    borderRadius: '0.375rem',
                    transition: 'background 0.2s',
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#EFF6FF'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  Tout marquer comme lu
                </button>
              )}
            </div>

            {/* List */}
            <div style={{
              overflowY: 'auto',
              flex: 1,
              padding: '0.5rem',
            }}>
              {notifications.length === 0 ? (
                <div style={{
                  textAlign: 'center',
                  padding: '3rem 1rem',
                  color: '#9CA3AF',
                }}>
                  <Bell size={40} style={{ margin: '0 auto 0.75rem', opacity: 0.4 }} />
                  <p style={{ fontSize: '0.875rem', margin: 0 }}>
                    Aucune notification
                  </p>
                </div>
              ) : (
                notifications.map((notif) => {
                  const { Icon, color, bg } = getNotificationIcon(notif.type);
                  return (
                    <div
                      key={notif.id}
                      onClick={() => markAsRead(notif.id)}
                      style={{
                        display: 'flex',
                        gap: '0.75rem',
                        padding: '0.75rem',
                        borderRadius: '0.5rem',
                        cursor: 'pointer',
                        backgroundColor: notif.read ? 'transparent' : '#F0F9FF',
                        transition: 'background 0.2s',
                        position: 'relative',
                        marginBottom: '4px',
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = notif.read ? '#F9FAFB' : '#DBEAFE';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = notif.read ? 'transparent' : '#F0F9FF';
                      }}
                    >
                      {/* Icon */}
                      <div style={{
                        padding: '0.5rem',
                        backgroundColor: bg,
                        borderRadius: '0.5rem',
                        flexShrink: 0,
                        alignSelf: 'flex-start',
                      }}>
                        <Icon size={16} color={color} />
                      </div>

                      {/* Content */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{
                          fontSize: '0.875rem',
                          color: '#1F2937',
                          margin: 0,
                          lineHeight: 1.4,
                        }}>
                          <strong>{notif.candidateName}</strong> {notif.message}
                        </p>
                        <p style={{
                          fontSize: '0.75rem',
                          color: '#6B7280',
                          margin: 0,
                          marginTop: '2px',
                        }}>
                          {notif.department}
                        </p>
                        <p style={{
                          fontSize: '0.6875rem',
                          color: '#9CA3AF',
                          margin: 0,
                          marginTop: '4px',
                        }}>
                          {getRelativeTime(notif.timestamp)}
                        </p>
                      </div>

                      {/* Unread indicator */}
                      {!notif.read && (
                        <div style={{
                          width: '8px',
                          height: '8px',
                          backgroundColor: '#2563EB',
                          borderRadius: '50%',
                          flexShrink: 0,
                          marginTop: '6px',
                        }} />
                      )}

                      {/* Delete button */}
                      <button
                        onClick={(e) => removeNotification(notif.id, e)}
                        style={{
                          position: 'absolute',
                          top: '6px',
                          right: '6px',
                          padding: '2px',
                          backgroundColor: 'transparent',
                          border: 'none',
                          cursor: 'pointer',
                          opacity: 0,
                          transition: 'opacity 0.2s',
                          borderRadius: '4px',
                          color: '#9CA3AF',
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.opacity = 1;
                          e.currentTarget.style.backgroundColor = '#FEE2E2';
                          e.currentTarget.style.color = '#DC2626';
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.opacity = 0;
                          e.currentTarget.style.backgroundColor = 'transparent';
                          e.currentTarget.style.color = '#9CA3AF';
                        }}
                      >
                        <X size={12} />
                      </button>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer */}
            {notifications.length > 0 && (
              <div style={{
                padding: '0.75rem 1rem',
                borderTop: '1px solid #F3F4F6',
                flexShrink: 0,
              }}>
                <Link
                  to="/dashboard/candidatures"
                  onClick={() => setIsOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.375rem',
                    fontSize: '0.875rem',
                    color: '#2563EB',
                    fontWeight: 600,
                    textDecoration: 'none',
                    padding: '0.5rem',
                    borderRadius: '0.375rem',
                    transition: 'background 0.2s',
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#EFF6FF'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <Eye size={14} />
                  Voir toutes les candidatures
                </Link>
              </div>
            )}
          </div>
        </>
      )}

      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @media (max-width: 480px) {
          .notif-dropdown {
            position: fixed !important;
            top: 64px !important;
            left: 8px !important;
            right: 8px !important;
            width: auto !important;
            max-height: calc(100vh - 80px) !important;
          }
          .notif-mobile-overlay {
            display: block !important;
          }
        }
      `}</style>
    </div>
  );
};

export default NotificationBell;