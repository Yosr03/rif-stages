import { useState } from 'react';
import {
  Users, Clock, CheckCircle2, XCircle,
  TrendingUp, FileText, Calendar, Eye,
} from 'lucide-react';
import StatsCard from '../components/dashboard/StatsCard';
import CandidateTable from '../components/dashboard/CandidateTable';
import CandidateDetailModal from '../components/dashboard/CandidateDetailModal';
import { MOCK_CANDIDATES, APPLICATION_STATUS } from '../utils/constants';
import { generateCandidatePDF, generateSummaryPDF } from '../services/pdfService';
import { sendStatusUpdateEmail } from '../services/emailService';

const DashboardHome = () => {
  const [candidates, setCandidates] = useState(MOCK_CANDIDATES);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const stats = {
    total: candidates.length,
    pending: candidates.filter((c) => c.status === APPLICATION_STATUS.PENDING).length,
    accepted: candidates.filter((c) => c.status === APPLICATION_STATUS.ACCEPTED).length,
    rejected: candidates.filter((c) => c.status === APPLICATION_STATUS.REJECTED).length,
  };

  const handleViewCandidate = (candidate) => {
    setSelectedCandidate(candidate);
    setModalOpen(true);
  };

  const handleUpdateStatus = async (id, newStatus) => {
    setCandidates((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
    );
    const candidate = candidates.find((c) => c.id === id);
    if (candidate && (newStatus === APPLICATION_STATUS.ACCEPTED || newStatus === APPLICATION_STATUS.REJECTED)) {
      await sendStatusUpdateEmail(candidate, newStatus);
    }
    if (selectedCandidate?.id === id) {
      setSelectedCandidate((prev) => ({ ...prev, status: newStatus }));
    }
  };

  const handleGeneratePDF = (candidate) => generateCandidatePDF(candidate);

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
            Tableau de bord RH
          </h1>
          <p style={{
            color: '#6B7280',
            marginTop: '0.25rem',
            fontSize: '0.9375rem',
          }}>
            Gérez les candidatures de stage en temps réel
          </p>
        </div>
        <button
          onClick={() => generateSummaryPDF(candidates)}
          className="btn-secondary"
        >
          <FileText size={16} />
          Exporter le rapport
        </button>
      </div>

      {/* Stats Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '1rem',
      }}>
        <StatsCard title="Total Candidatures" value={stats.total} icon={Users} color="blue" trend="up" trendValue="+12%" />
        <StatsCard title="En attente" value={stats.pending} icon={Clock} color="yellow" />
        <StatsCard title="Acceptées" value={stats.accepted} icon={CheckCircle2} color="green" trend="up" trendValue="+5%" />
        <StatsCard title="Refusées" value={stats.rejected} icon={XCircle} color="red" />
      </div>

      {/* Main Content Grid */}
      <div className="dashboard-grid" style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '1.5rem',
      }}>
        {/* Main Table */}
        <div>
          <CandidateTable
            candidates={candidates}
            onViewCandidate={handleViewCandidate}
            onUpdateStatus={handleUpdateStatus}
          />
        </div>

        {/* Sidebar Widgets */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Repartition par statut */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '0.75rem',
            padding: '1.5rem',
            border: '1px solid #F3F4F6',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          }}>
            <h3 style={{
              fontSize: '1.125rem',
              fontWeight: 700,
              color: '#1F2937',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}>
              <TrendingUp size={20} color="#2563EB" />
              Répartition par statut
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {Object.entries({
                'En attente': { count: stats.pending, color: '#F59E0B' },
                'Acceptées': { count: stats.accepted, color: '#10B981' },
                'Refusées': { count: stats.rejected, color: '#EF4444' },
                'Autres': {
                  count: stats.total - stats.pending - stats.accepted - stats.rejected,
                  color: '#3B82F6',
                },
              }).map(([label, { count, color }]) => (
                <div key={label}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '0.875rem',
                    marginBottom: '0.25rem',
                  }}>
                    <span style={{ color: '#6B7280' }}>{label}</span>
                    <span style={{ fontWeight: 600, color: '#1F2937' }}>{count}</span>
                  </div>
                  <div style={{
                    width: '100%',
                    backgroundColor: '#F3F4F6',
                    borderRadius: '9999px',
                    height: '8px',
                    overflow: 'hidden',
                  }}>
                    <div style={{
                      height: '100%',
                      backgroundColor: color,
                      width: `${stats.total ? (count / stats.total) * 100 : 0}%`,
                      borderRadius: '9999px',
                      transition: 'width 0.5s',
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '0.75rem',
            padding: '1.5rem',
            border: '1px solid #F3F4F6',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          }}>
            <h3 style={{
              fontSize: '1.125rem',
              fontWeight: 700,
              color: '#1F2937',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}>
              <Calendar size={20} color="#9333EA" />
              Activité récente
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {candidates.slice(0, 4).map((c) => (
                <div
                  key={c.id}
                  onClick={() => handleViewCandidate(c)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.5rem',
                    borderRadius: '0.5rem',
                    cursor: 'pointer',
                    transition: 'background 0.2s',
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#F9FAFB'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <div style={{
                    width: '32px',
                    height: '32px',
                    backgroundColor: '#1E3A5F',
                    color: 'white',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    flexShrink: 0,
                  }}>
                    {c.firstName[0]}{c.lastName[0]}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      color: '#1F2937',
                      margin: 0,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}>
                      {c.firstName} {c.lastName}
                    </p>
                    <p style={{ fontSize: '0.75rem', color: '#9CA3AF', margin: 0 }}>
                      {c.stageType}
                    </p>
                  </div>
                  <Eye size={16} color="#D1D5DB" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <CandidateDetailModal
        candidate={selectedCandidate}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onUpdateStatus={handleUpdateStatus}
        onGeneratePDF={handleGeneratePDF}
      />

      <style>{`
        @media (min-width: 1280px) {
          .dashboard-grid {
            grid-template-columns: 2fr 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default DashboardHome;