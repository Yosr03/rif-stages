import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Input from '../components/common/Input';
import { Mail, Lock, LogIn, AlertCircle } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  setLoading(true);

  const result = await login(email, password);
  
  if (result.success) {
    navigate('/dashboard');
  } else {
    setError(result.error);
  }
  setLoading(false);
};

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1E3A5F 0%, #2563EB 50%, #1E3A5F 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem 1rem',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background decoration */}
      <div style={{
        position: 'absolute',
        top: '-160px',
        right: '-160px',
        width: '320px',
        height: '320px',
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: '50%',
        filter: 'blur(60px)',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-160px',
        left: '-160px',
        width: '320px',
        height: '320px',
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        borderRadius: '50%',
        filter: 'blur(60px)',
      }} />

      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: '440px',
        zIndex: 1,
      }}>
        {/* Logo Section */}
        <div style={{
          textAlign: 'center',
          marginBottom: '2rem',
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '64px',
            height: '64px',
            backgroundColor: '#F59E0B',
            borderRadius: '1rem',
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
            marginBottom: '1rem',
          }}>
            <span style={{
              color: '#1E3A5F',
              fontWeight: 900,
              fontSize: '1.75rem',
            }}>R</span>
          </div>
          <h1 style={{
            fontSize: '1.875rem',
            fontWeight: 700,
            color: 'white',
            margin: 0,
          }}>
            RIF-Stages
          </h1>
          <p style={{
            color: '#BFDBFE',
            marginTop: '0.5rem',
            fontSize: '0.9375rem',
          }}>
            Espace Responsable RH
          </p>
        </div>

        {/* Login Card */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '1rem',
          boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
          padding: '2rem',
        }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: 700,
              color: '#1F2937',
              margin: 0,
            }}>
              Connexion
            </h2>
            <p style={{
              color: '#6B7280',
              marginTop: '0.25rem',
              fontSize: '0.875rem',
            }}>
              Accédez à votre tableau de bord
            </p>
          </div>

          {error && (
            <div style={{
              marginBottom: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.875rem 1rem',
              backgroundColor: '#FEF2F2',
              color: '#B91C1C',
              borderRadius: '0.5rem',
              border: '1px solid #FECACA',
            }}>
              <AlertCircle size={18} style={{ flexShrink: 0 }} />
              <p style={{ fontSize: '0.875rem', fontWeight: 500, margin: 0 }}>
                {error}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <Input
              label="Email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="rh@grouperif.com"
              icon={Mail}
              required
            />

            <Input
              label="Mot de passe"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              icon={Lock}
              required
            />

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                padding: '0.875rem 1.5rem',
                backgroundColor: loading ? '#93C5FD' : '#1E3A5F',
                color: 'white',
                fontWeight: 600,
                fontSize: '0.9375rem',
                borderRadius: '0.5rem',
                border: 'none',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s',
                marginTop: '0.5rem',
              }}
              onMouseOver={(e) => !loading && (e.currentTarget.style.backgroundColor = '#2563EB')}
              onMouseOut={(e) => !loading && (e.currentTarget.style.backgroundColor = '#1E3A5F')}
            >
              {loading ? (
                <>
                  <div style={{
                    width: '20px',
                    height: '20px',
                    border: '2px solid rgba(255,255,255,0.3)',
                    borderTopColor: 'white',
                    borderRadius: '50%',
                    animation: 'spin 0.8s linear infinite',
                  }} />
                  Connexion...
                </>
              ) : (
                <>
                  <LogIn size={18} />
                  Se connecter
                </>
              )}
            </button>
          </form>

          {/* Demo credentials
          <div style={{
            marginTop: '1.5rem',
            padding: '1rem',
            backgroundColor: '#EFF6FF',
            borderRadius: '0.5rem',
            border: '1px solid #BFDBFE',
          }}>
            <p style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              color: '#1E40AF',
              marginBottom: '0.5rem',
            }}>
              🔑 Identifiants de démo
            </p>
            <p style={{
              fontSize: '0.75rem',
              color: '#1E40AF',
              marginBottom: '0.25rem',
            }}>
              Email : <code style={{
                backgroundColor: '#DBEAFE',
                padding: '2px 6px',
                borderRadius: '3px',
                fontFamily: 'monospace',
              }}>rh@grouperif.com</code>
            </p>
            <p style={{
              fontSize: '0.75rem',
              color: '#1E40AF',
            }}>
              Mot de passe : <code style={{
                backgroundColor: '#DBEAFE',
                padding: '2px 6px',
                borderRadius: '3px',
                fontFamily: 'monospace',
              }}>rif2024</code>
            </p>
          </div>*/}
        </div> 

        {/* Candidate Link */}
        <div style={{
          textAlign: 'center',
          marginTop: '1.5rem',
        }}>
          <p style={{
            color: '#BFDBFE',
            fontSize: '0.875rem',
          }}>
            Vous êtes candidat ?{' '}
            <Link
              to="/candidature"
              style={{
                color: '#FBBF24',
                fontWeight: 600,
                textDecoration: 'none',
              }}
              onMouseOver={(e) => e.currentTarget.style.textDecoration = 'underline'}
              onMouseOut={(e) => e.currentTarget.style.textDecoration = 'none'}
            >
              Déposer une candidature →
            </Link>
          </p>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default LoginPage;