import { useState } from 'react';
import {
  Calendar, ChevronLeft, ChevronRight, Clock, Video,
  Building2, Plus, ChevronRight as ArrowRight,
} from 'lucide-react';
import { MOCK_INTERVIEWS } from '../utils/constants';

const InterviewsPage = () => {
  const [interviews] = useState(MOCK_INTERVIEWS);
  const [selectedDay, setSelectedDay] = useState(7);
  const [showModal, setShowModal] = useState(false);

  // Days of week
  const weekDays = [
    { label: 'Lun', day: 30, hasEvent: false },
    { label: 'Mar', day: 1, hasEvent: false },
    { label: 'Mer', day: 2, hasEvent: false },
    { label: 'Jeu', day: 3, hasEvent: false },
    { label: 'Ven', day: 4, hasEvent: false },
    { label: 'Lun', day: 7, hasEvent: true },
    { label: 'Mar', day: 8, hasEvent: true },
  ];

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

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Page Header */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
      }}>
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
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}>
            <span>Juillet 2025</span>
            <span>•</span>
            <span>{interviews.length} planifiés</span>
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem 1.25rem',
            backgroundColor: '#10B981',
            color: 'white',
            fontWeight: 600,
            fontSize: '0.875rem',
            borderRadius: '0.5rem',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
            transition: 'all 0.2s',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#059669';
            e.currentTarget.style.transform = 'translateY(-1px)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = '#10B981';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <Calendar size={18} />
          Planifier
        </button>
      </div>

      {/* Calendar Card */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '1rem',
        padding: '1.5rem',
        border: '1px solid #F3F4F6',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
      }}>
        {/* Week Navigation */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1.5rem',
        }}>
          <button style={{
            padding: '0.5rem',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            borderRadius: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#6B7280',
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#F3F4F6'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <ChevronLeft size={20} />
          </button>
          <h3 style={{
            fontSize: '0.9375rem',
            fontWeight: 600,
            color: '#374151',
            margin: 0,
            textAlign: 'center',
          }}>
            Semaine du 30 juin — 8 juil.
          </h3>
          <button style={{
            padding: '0.5rem',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            borderRadius: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#6B7280',
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#F3F4F6'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Days Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '0.5rem',
        }}>
          {weekDays.map((d, i) => {
            const isSelected = d.day === selectedDay;
            return (
              <button
                key={i}
                onClick={() => setSelectedDay(d.day)}
                style={{
                  padding: '0.75rem 0.25rem',
                  backgroundColor: isSelected ? '#10B981' : 'transparent',
                  color: isSelected ? 'white' : '#374151',
                  border: isSelected ? 'none' : '1px solid transparent',
                  borderRadius: '0.75rem',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.25rem',
                  transition: 'all 0.2s',
                  boxShadow: isSelected ? '0 4px 12px rgba(16, 185, 129, 0.3)' : 'none',
                  position: 'relative',
                }}
                onMouseOver={(e) => {
                  if (!isSelected) e.currentTarget.style.backgroundColor = '#F9FAFB';
                }}
                onMouseOut={(e) => {
                  if (!isSelected) e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <span style={{
                  fontSize: '0.7rem',
                  fontWeight: 500,
                  opacity: 0.8,
                }}>
                  {d.label}
                </span>
                <span style={{
                  fontSize: '1.125rem',
                  fontWeight: 700,
                }}>
                  {d.day}
                </span>
                {d.hasEvent && (
                  <span style={{
                    width: '5px',
                    height: '5px',
                    borderRadius: '50%',
                    backgroundColor: isSelected ? 'white' : '#10B981',
                    position: 'absolute',
                    bottom: '6px',
                  }} />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Upcoming Interviews */}
      <div>
        <h2 style={{
          fontSize: '0.75rem',
          fontWeight: 700,
          color: '#6B7280',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          margin: 0,
          marginBottom: '1rem',
        }}>
          Prochains entretiens
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {interviews.map((interview) => {
            const statusStyle = getStatusStyle(interview.status);
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
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.03)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {/* Avatar */}
                <div style={{
                  width: '44px',
                  height: '44px',
                  backgroundColor: interview.color,
                  color: 'white',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.875rem',
                  fontWeight: 700,
                  flexShrink: 0,
                }}>
                  {interview.candidateName.split(' ').map(n => n[0]).join('')}
                </div>

                {/* Info */}
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
                    {interview.company}
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

                {/* Status Badge */}
                <div style={{
                  padding: '0.25rem 0.75rem',
                  backgroundColor: statusStyle.bg,
                  color: statusStyle.text,
                  borderRadius: '9999px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  border: `1px solid ${statusStyle.border}30`,
                  flexShrink: 0,
                  whiteSpace: 'nowrap',
                }}>
                  {interview.status}
                </div>

                {/* Arrow */}
                <ArrowRight size={18} color="#D1D5DB" style={{ flexShrink: 0 }} />
              </div>
            );
          })}
        </div>
      </div>

      {/* Empty state if needed */}
      {interviews.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '3rem',
          backgroundColor: 'white',
          borderRadius: '0.75rem',
        }}>
          <Calendar size={48} color="#D1D5DB" style={{ margin: '0 auto 1rem' }} />
          <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#374151' }}>
            Aucun entretien planifié
          </h3>
          <p style={{ fontSize: '0.875rem', color: '#9CA3AF', marginTop: '0.5rem' }}>
            Cliquez sur "Planifier" pour ajouter un entretien
          </p>
        </div>
      )}
    </div>
  );
};

export default InterviewsPage;