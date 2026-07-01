import { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';

const ToastContext = createContext(null);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');
  return context;
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback((message, type = 'info', duration = 4000) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    if (duration) {
      setTimeout(() => removeToast(id), duration);
    }
  }, [removeToast]);

  const toast = {
    success: (msg) => addToast(msg, 'success'),
    error: (msg) => addToast(msg, 'error'),
    warning: (msg) => addToast(msg, 'warning'),
    info: (msg) => addToast(msg, 'info'),
  };

  const iconMap = {
    success: { Icon: CheckCircle, color: '#10B981', bg: '#D1FAE5', border: '#6EE7B7' },
    error: { Icon: XCircle, color: '#EF4444', bg: '#FEE2E2', border: '#FCA5A5' },
    warning: { Icon: AlertCircle, color: '#F59E0B', bg: '#FEF3C7', border: '#FCD34D' },
    info: { Icon: Info, color: '#2563EB', bg: '#DBEAFE', border: '#93C5FD' },
  };

  return (
    <ToastContext.Provider value={toast}>
      {children}
      {/* Toasts Container */}
      <div style={{
        position: 'fixed',
        top: '80px',
        right: '1rem',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        maxWidth: '400px',
      }}>
        {toasts.map((t) => {
          const { Icon, color, bg, border } = iconMap[t.type];
          return (
            <div
              key={t.id}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.75rem',
                padding: '0.875rem 1rem',
                backgroundColor: 'white',
                borderRadius: '0.625rem',
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                border: `1px solid ${border}`,
                borderLeft: `4px solid ${color}`,
                animation: 'slideInRight 0.3s ease-out',
                minWidth: '280px',
              }}
            >
              <div style={{
                padding: '0.25rem',
                backgroundColor: bg,
                borderRadius: '50%',
                flexShrink: 0,
              }}>
                <Icon size={18} color={color} />
              </div>
              <p style={{
                flex: 1,
                fontSize: '0.875rem',
                color: '#374151',
                margin: 0,
                lineHeight: 1.5,
              }}>
                {t.message}
              </p>
              <button
                onClick={() => removeToast(t.id)}
                style={{
                  padding: '0.125rem',
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#9CA3AF',
                  flexShrink: 0,
                }}
              >
                <X size={16} />
              </button>
            </div>
          );
        })}
      </div>

      <style>{`
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(100%); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </ToastContext.Provider>
  );
};