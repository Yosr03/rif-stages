import { Link } from 'react-router-dom';
import { CheckCircle2, Home, ArrowRight, Mail, Clock, UserCheck, Bell } from 'lucide-react';
import Navbar from '../components/layout/Navbar';

const SuccessPage = () => {
  const steps = [
    { icon: UserCheck, text: 'Examen de votre candidature par l\'équipe RH' },
    { icon: Clock, text: 'Évaluation de vos compétences et de votre profil' },
    { icon: Mail, text: 'Prise de contact pour un éventuel entretien' },
    { icon: Bell, text: 'Notification de la décision finale par email' },
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F9FAFB', paddingTop: '64px' }}>
      <Navbar />

      <div style={{
        maxWidth: '640px',
        margin: '0 auto',
        padding: '3rem 1rem',
        width: '100%',
      }}>
        {/* Success Animation */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            position: 'relative',
            display: 'inline-flex',
            marginBottom: '1.5rem',
          }}>
            {/* Ping effect */}
            <div style={{
              position: 'absolute',
              inset: 0,
              width: '96px',
              height: '96px',
              backgroundColor: '#A7F3D0',
              borderRadius: '50%',
              animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
              opacity: 0.4,
            }} />
            {/* Main circle */}
            <div style={{
              position: 'relative',
              width: '96px',
              height: '96px',
              backgroundColor: '#D1FAE5',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              animation: 'bounce 1s ease-in-out',
            }}>
              <CheckCircle2 size={56} color="#10B981" strokeWidth={2.5} />
            </div>
          </div>

          <h1 style={{
            fontSize: 'clamp(1.5rem, 4vw, 2rem)',
            fontWeight: 700,
            color: '#1F2937',
            marginBottom: '0.75rem',
            lineHeight: 1.2,
          }}>
            Candidature envoyée avec succès ! 🎉
          </h1>
          <p style={{
            fontSize: '1.0625rem',
            color: '#4B5563',
            marginBottom: '0.5rem',
          }}>
            Merci pour votre candidature au sein du <strong>Groupe RIF</strong>.
          </p>
          <p style={{
            fontSize: '0.875rem',
            color: '#6B7280',
            lineHeight: 1.6,
          }}>
            Vous recevrez un email de confirmation sous peu.
            Notre équipe RH examinera votre dossier et vous tiendra informé(e) de la suite.
          </p>
        </div>

        {/* What's next Card */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '1rem',
          padding: '1.75rem',
          border: '1px solid #F3F4F6',
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
          marginBottom: '2rem',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '1.25rem',
          }}>
            <span style={{ fontSize: '1.25rem' }}>📌</span>
            <h3 style={{
              fontSize: '1.0625rem',
              fontWeight: 700,
              color: '#1F2937',
              margin: 0,
            }}>
              Prochaines étapes
            </h3>
          </div>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}>
            {steps.map((step, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.875rem',
                  padding: '0.75rem',
                  backgroundColor: '#F9FAFB',
                  borderRadius: '0.625rem',
                  border: '1px solid #F3F4F6',
                }}
              >
                <div style={{
                  width: '32px',
                  height: '32px',
                  backgroundColor: '#DBEAFE',
                  color: '#2563EB',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.875rem',
                  fontWeight: 700,
                  flexShrink: 0,
                }}>
                  {i + 1}
                </div>
                <div style={{
                  padding: '0.375rem',
                  backgroundColor: 'white',
                  borderRadius: '0.5rem',
                  flexShrink: 0,
                }}>
                  <step.icon size={16} color="#6B7280" />
                </div>
                <p style={{
                  fontSize: '0.875rem',
                  color: '#374151',
                  margin: 0,
                  fontWeight: 500,
                  flex: 1,
                }}>
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.75rem',
          justifyContent: 'center',
        }}>
          <Link
            to="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.5rem',
              backgroundColor: '#1E3A5F',
              color: 'white',
              fontWeight: 600,
              fontSize: '0.9375rem',
              borderRadius: '0.5rem',
              textDecoration: 'none',
              transition: 'all 0.2s',
              flex: '1 1 200px',
              maxWidth: '260px',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#2563EB';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = '#1E3A5F';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <Home size={16} />
            Retour à l'accueil
          </Link>
          <Link
            to="/candidature"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.5rem',
              backgroundColor: 'white',
              color: '#1E3A5F',
              fontWeight: 600,
              fontSize: '0.9375rem',
              borderRadius: '0.5rem',
              textDecoration: 'none',
              border: '2px solid #1E3A5F',
              transition: 'all 0.2s',
              flex: '1 1 200px',
              maxWidth: '260px',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#1E3A5F';
              e.currentTarget.style.color = 'white';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'white';
              e.currentTarget.style.color = '#1E3A5F';
            }}
          >
            Nouvelle candidature
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes ping {
          75%, 100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </div>
  );
};

export default SuccessPage;