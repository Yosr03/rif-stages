import { useState, useEffect } from 'react';
import {
  Calendar, ChevronLeft, ChevronRight, Clock, Video,
  Building2, ChevronRight as ArrowRight, Trash2,
} from 'lucide-react';
import { subscribeToInterviews, deleteInterview } from '../services/interviewService';

const InterviewsPage = () => {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToInterviews((data) => {
      setInterviews(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (window.confirm('Supprimer cet entretien ?')) {
      try {
        await deleteInterview(id);
      } catch (error) {
        alert('Erreur lors de la suppression');
      }
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const days = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
    const months = ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'];
    return `${days[date.getDay()]} ${date.getDate()} ${months[date.getMonth()]}`;
  };

  const getStatusStyle = (status) => {
    if (status === 'Confirmé') {
      return { bg: '#D1FAE5', text: '#065F46', border: '#10B981' };
    }
    return { bg: '#FEF3C7', text: '#92400E', border: '#F59E0B' };
  };

  const getAvatarColor = (name) => {
    const colors = ['#EF4444', '#3B82F6', '#A855F7', '#F59E0B', '#10B981', '#EC4899'];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
        <div style={{
          width: '48px',
          height: '48px',
          border: '4px solid #E5E7EB',
          borderTopColor: '#1E3A5F',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
        }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h1 style={{
          fontSize: 'clamp(1.5rem, 3vw, 2rem)',
          fontWeight: 700,
          color: '#1F2937',
          margin: 0,
        }}>
          Entretiens
        </h1>
        <p style={{
          color: '#6B7280',
          marginTop: '0.25rem',
          fontSize: '0.875rem',
        }}>
          {interviews.length} entretien{interviews.length !== 1 ? 's' : ''} planifié{interviews.length !== 1 ? 's' : ''}
        </p>
      </div>

      <div>
        <h2 style={{
          fontSize: '0.75rem',
          fontWeight: 700,
          color: '#6B7280',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          marginBottom: '1rem',
        }}>
          Prochains entretiens
        </h2>

        {interviews.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '3rem',
            backgroundColor: 'white',
            borderRadius: '0.75rem',
            border: '1px solid #F3F4F6',
          }}>
            <Calendar size={48} color="#D1D5DB" style={{ margin: '0 auto 1rem' }} />
            <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#374151' }}>
              Aucun entretien planifié
            </h3>
            <p style={{ fontSize: '0.875rem', color: '#9CA3AF', marginTop: '0.5rem' }}>
              Acceptez une candidature pour planifier un entretien
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {interviews.map((interview) => {
              const statusStyle = getStatusStyle(interview.status);
              const avatarColor = getAvatarColor(interview.candidateName);
              return (
                <div
                  key={interview.id}
                  style={{
                    backgroundColor: 'white',
                    borderRadius: '0.75rem',
                    padding: '1rem 1.25rem',
                    border: '1px solid #F3F4F6',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    transition: 'all 0.2s',
                  }}
                >
                  <div style={{
                    width: '44px',
                    height: '44px',
                    backgroundColor: avatarColor,
                    color: 'white',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.875rem',
                    fontWeight: 700,
                    flexShrink: 0,
                  }}>
                    {interview.candidateName.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{
                      fontSize: '0.9375rem',
                      fontWeight: 700,
                      color: '#1F2937',
                      margin: 0,
                      marginBottom: '2px',
                    }}>
                      {interview.candidateName}
                    </p>
                    <p style={{
                      fontSize: '0.8125rem',
                      color: '#6B7280',
                      margin: 0,
                      marginBottom: '6px',
                    }}>
                      {interview.department}
                    </p>
                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '0.75rem',
                      fontSize: '0.75rem',
                      color: '#9CA3AF',
                    }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <Calendar size={13} />
                        {formatDate(interview.date)}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <Clock size={13} />
                        {interview.time}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        {interview.type === 'Visio' ? <Video size={13} /> : <Building2 size={13} />}
                        {interview.type}
                      </span>
                    </div>
                  </div>

                  <div style={{
                    padding: '0.25rem 0.75rem',
                    backgroundColor: statusStyle.bg,
                    color: statusStyle.text,
                    borderRadius: '9999px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    border: `1px solid ${statusStyle.border}30`,
                    flexShrink: 0,
                  }}>
                    {interview.status}
                  </div>

                  <button
                    onClick={(e) => handleDelete(interview.id, e)}
                    style={{
                      padding: '0.5rem',
                      backgroundColor: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      color: '#EF4444',
                      borderRadius: '0.375rem',
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#FEE2E2'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default InterviewsPage;