import Modal from '../common/Modal';
import StatusBadge from '../common/StatusBadge';
import { APPLICATION_STATUS } from '../../utils/constants';
import {
  Calendar, GraduationCap, Building2, Briefcase, Clock,
  FileText, Download, MapPin,
} from 'lucide-react';

const InfoRow = ({ icon: Icon, label, value }) => (
  <div style={{
    display: 'flex',
    alignItems: 'flex-start',
    gap: '0.75rem',
    padding: '0.75rem 0',
  }}>
    <div style={{
      padding: '0.5rem',
      backgroundColor: '#F3F4F6',
      borderRadius: '0.5rem',
      flexShrink: 0,
    }}>
      <Icon size={16} color="#6B7280" />
    </div>
    <div style={{ minWidth: 0, flex: 1 }}>
      <p style={{
        fontSize: '0.7rem',
        color: '#9CA3AF',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        margin: 0,
      }}>
        {label}
      </p>
      <p style={{
        fontSize: '0.875rem',
        color: '#1F2937',
        fontWeight: 500,
        marginTop: '0.125rem',
        marginBottom: 0,
        wordBreak: 'break-word',
      }}>
        {value}
      </p>
    </div>
  </div>
);

const CandidateDetailModal = ({ candidate, isOpen, onClose, onUpdateStatus, onGeneratePDF }) => {
  if (!candidate) return null;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit', month: 'long', year: 'numeric',
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Détails de la candidature" size="lg">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* Header Card */}
        <div style={{
          background: 'linear-gradient(135deg, #1E3A5F, #2563EB)',
          borderRadius: '0.75rem',
          padding: '1.25rem',
          color: 'white',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: '1rem',
        }}>
          <div style={{
            width: '64px',
            height: '64px',
            backgroundColor: 'rgba(255,255,255,0.2)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
            fontWeight: 700,
            flexShrink: 0,
          }}>
            {candidate.firstName[0]}{candidate.lastName[0]}
          </div>
          <div style={{ flex: '1 1 200px', minWidth: 0 }}>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: 700,
              margin: 0,
              marginBottom: '0.25rem',
            }}>
              {candidate.firstName} {candidate.lastName}
            </h3>
            <p style={{
              color: '#BFDBFE',
              fontSize: '0.875rem',
              margin: 0,
              wordBreak: 'break-word',
            }}>
              {candidate.email}
            </p>
            <p style={{
              color: '#BFDBFE',
              fontSize: '0.875rem',
              margin: 0,
            }}>
              {candidate.phone}
            </p>
          </div>
          <div style={{ flexShrink: 0 }}>
            <StatusBadge status={candidate.status} size="md" />
          </div>
        </div>

        {/* Info Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '0 1.5rem',
        }}>
          <InfoRow icon={Calendar} label="Date de naissance" value={formatDate(candidate.dateOfBirth)} />
          <InfoRow icon={GraduationCap} label="Niveau d'études" value={candidate.educationLevel} />
          <InfoRow icon={Building2} label="Établissement" value={candidate.university} />
          <InfoRow icon={Briefcase} label="Type de stage" value={candidate.stageType} />
          <InfoRow icon={MapPin} label="Département" value={candidate.department} />
          <InfoRow icon={Clock} label="Période" value={`${formatDate(candidate.startDate)} - ${formatDate(candidate.endDate)}`} />
        </div>

        {/* Skills */}
        {candidate.skills && (
          <div>
            <h4 style={{
              fontSize: '0.875rem',
              fontWeight: 600,
              color: '#374151',
              marginBottom: '0.5rem',
              marginTop: 0,
            }}>
              Compétences
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {candidate.skills.split(',').map((skill, i) => (
                <span key={i} style={{
                  padding: '0.25rem 0.75rem',
                  backgroundColor: '#EFF6FF',
                  color: '#1E40AF',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  borderRadius: '9999px',
                }}>
                  {skill.trim()}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Motivation */}
        <div>
          <h4 style={{
            fontSize: '0.875rem',
            fontWeight: 600,
            color: '#374151',
            marginBottom: '0.5rem',
            marginTop: 0,
          }}>
            Lettre de motivation
          </h4>
          <div style={{
            padding: '1rem',
            backgroundColor: '#F9FAFB',
            borderRadius: '0.5rem',
            border: '1px solid #E5E7EB',
          }}>
            <p style={{
              fontSize: '0.875rem',
              color: '#374151',
              lineHeight: 1.6,
              margin: 0,
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
            }}>
              {candidate.motivation}
            </p>
          </div>
        </div>

        {/* CV Download */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          padding: '0.875rem 1rem',
          backgroundColor: '#EFF6FF',
          borderRadius: '0.5rem',
          border: '1px solid #BFDBFE',
        }}>
          <FileText size={20} color="#2563EB" style={{ flexShrink: 0 }} />
          <span style={{
            fontSize: '0.875rem',
            fontWeight: 500,
            color: '#1E40AF',
            flex: 1,
          }}>
            CV du candidat
          </span>
          <button style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.375rem',
            fontSize: '0.875rem',
            fontWeight: 500,
            color: '#2563EB',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
          }}>
            <Download size={16} />
            Télécharger
          </button>
        </div>

        {/* Submission Info */}
        <p style={{
          fontSize: '0.75rem',
          color: '#9CA3AF',
          margin: 0,
        }}>
          Candidature soumise le {formatDate(candidate.submittedAt)} à{' '}
          {new Date(candidate.submittedAt).toLocaleTimeString('fr-FR', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>

        {/* Action Buttons */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.75rem',
          paddingTop: '1rem',
          borderTop: '1px solid #E5E7EB',
        }}>
          <button
            onClick={() => onGeneratePDF(candidate)}
            className="btn-secondary"
          >
            <FileText size={16} />
            Générer PDF
          </button>
          
          <div style={{ flex: 1, minWidth: '10px' }} />
          
          {candidate.status !== APPLICATION_STATUS.ACCEPTED && (
            <button
              onClick={() => {
                onUpdateStatus(candidate.id, APPLICATION_STATUS.ACCEPTED);
                onClose();
              }}
              className="btn-success"
            >
              Accepter
            </button>
          )}
          {candidate.status !== APPLICATION_STATUS.REJECTED && (
            <button
              onClick={() => {
                onUpdateStatus(candidate.id, APPLICATION_STATUS.REJECTED);
                onClose();
              }}
              className="btn-danger"
            >
              Refuser
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default CandidateDetailModal;