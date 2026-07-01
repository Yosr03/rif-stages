import { useState } from 'react';
import { Search, Filter, Eye, Check, X, MoreVertical } from 'lucide-react';
import StatusBadge from '../common/StatusBadge';
import { APPLICATION_STATUS } from '../../utils/constants';

const CandidateTable = ({ candidates, onViewCandidate, onUpdateStatus }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [openMenuId, setOpenMenuId] = useState(null);

  const filteredCandidates = candidates.filter((c) => {
    const matchSearch = `${c.firstName} ${c.lastName} ${c.email}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchStatus = !statusFilter || c.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit', month: 'short', year: 'numeric',
    });
  };

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '0.75rem',
      padding: '1.5rem',
      border: '1px solid #F3F4F6',
      boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
    }}>
      {/* Filters */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.75rem',
        marginBottom: '1.5rem',
      }}>
        <div style={{ position: 'relative', flex: '1 1 200px' }}>
          <Search
            size={18}
            style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#9CA3AF',
            }}
          />
          <input
            type="text"
            placeholder="Rechercher un candidat..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '0.625rem 1rem 0.625rem 2.5rem',
              border: '1px solid #D1D5DB',
              borderRadius: '0.5rem',
              fontSize: '0.875rem',
              outline: 'none',
              fontFamily: 'inherit',
            }}
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{
            padding: '0.625rem 1rem',
            border: '1px solid #D1D5DB',
            borderRadius: '0.5rem',
            fontSize: '0.875rem',
            outline: 'none',
            backgroundColor: 'white',
            cursor: 'pointer',
            fontFamily: 'inherit',
            minWidth: '160px',
          }}
        >
          <option value="">Tous les statuts</option>
          {Object.values(APPLICATION_STATUS).map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <p style={{
        fontSize: '0.875rem',
        color: '#6B7280',
        marginBottom: '1rem',
      }}>
        {filteredCandidates.length} candidature{filteredCandidates.length !== 1 ? 's' : ''}
      </p>

      {/* Desktop Table */}
      <div className="table-desktop" style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#F9FAFB', borderBottom: '1px solid #E5E7EB' }}>
              {['Candidat', 'Département', 'Type', 'Date', 'Statut', ''].map((h) => (
                <th key={h} style={{
                  textAlign: 'left',
                  padding: '0.75rem 1rem',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: '#6B7280',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredCandidates.map((candidate) => (
              <tr
                key={candidate.id}
                style={{ borderBottom: '1px solid #F3F4F6', transition: 'background 0.15s' }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#F9FAFB'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <td style={{ padding: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      backgroundColor: '#1E3A5F',
                      color: 'white',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.875rem',
                      fontWeight: 700,
                      flexShrink: 0,
                    }}>
                      {candidate.firstName[0]}{candidate.lastName[0]}
                    </div>
                    <div>
                      <p style={{ fontWeight: 600, color: '#1F2937', margin: 0, fontSize: '0.875rem' }}>
                        {candidate.firstName} {candidate.lastName}
                      </p>
                      <p style={{ fontSize: '0.75rem', color: '#6B7280', margin: 0 }}>
                        {candidate.email}
                      </p>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#4B5563' }}>
                  {candidate.department}
                </td>
                <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#4B5563' }}>
                  {candidate.stageType}
                </td>
                <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#4B5563' }}>
                  {formatDate(candidate.submittedAt)}
                </td>
                <td style={{ padding: '1rem' }}>
                  <StatusBadge status={candidate.status} size="sm" />
                </td>
                <td style={{ padding: '1rem', textAlign: 'right' }}>
                  <div style={{ display: 'flex', gap: '0.25rem', justifyContent: 'flex-end' }}>
                    <button
                      onClick={() => onViewCandidate(candidate)}
                      title="Voir"
                      style={{ padding: '0.5rem', borderRadius: '0.375rem', color: '#2563EB', backgroundColor: 'transparent', cursor: 'pointer', border: 'none' }}
                      onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#EFF6FF'}
                      onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      onClick={() => onUpdateStatus(candidate.id, APPLICATION_STATUS.ACCEPTED)}
                      title="Accepter"
                      style={{ padding: '0.5rem', borderRadius: '0.375rem', color: '#059669', backgroundColor: 'transparent', cursor: 'pointer', border: 'none' }}
                      onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#D1FAE5'}
                      onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <Check size={16} />
                    </button>
                    <button
                      onClick={() => onUpdateStatus(candidate.id, APPLICATION_STATUS.REJECTED)}
                      title="Refuser"
                      style={{ padding: '0.5rem', borderRadius: '0.375rem', color: '#DC2626', backgroundColor: 'transparent', cursor: 'pointer', border: 'none' }}
                      onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#FEE2E2'}
                      onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <X size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="table-mobile" style={{ display: 'none', flexDirection: 'column', gap: '0.75rem' }}>
        {filteredCandidates.map((candidate) => (
          <div key={candidate.id} style={{
            padding: '1rem',
            border: '1px solid #E5E7EB',
            borderRadius: '0.75rem',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{
                  width: '40px', height: '40px', backgroundColor: '#1E3A5F', color: 'white',
                  borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.875rem', fontWeight: 700,
                }}>
                  {candidate.firstName[0]}{candidate.lastName[0]}
                </div>
                <div>
                  <p style={{ fontWeight: 600, color: '#1F2937', margin: 0, fontSize: '0.875rem' }}>
                    {candidate.firstName} {candidate.lastName}
                  </p>
                  <p style={{ fontSize: '0.75rem', color: '#6B7280', margin: 0 }}>{candidate.email}</p>
                </div>
              </div>
              <StatusBadge status={candidate.status} size="sm" />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.875rem', marginBottom: '0.75rem' }}>
              <div>
                <p style={{ fontSize: '0.75rem', color: '#9CA3AF', margin: 0 }}>Département</p>
                <p style={{ color: '#374151', fontWeight: 500, margin: 0 }}>{candidate.department}</p>
              </div>
              <div>
                <p style={{ fontSize: '0.75rem', color: '#9CA3AF', margin: 0 }}>Type</p>
                <p style={{ color: '#374151', fontWeight: 500, margin: 0 }}>{candidate.stageType}</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', paddingTop: '0.75rem', borderTop: '1px solid #F3F4F6' }}>
              <button onClick={() => onViewCandidate(candidate)} style={{
                flex: 1, padding: '0.5rem', fontSize: '0.875rem', fontWeight: 500,
                color: '#2563EB', backgroundColor: '#EFF6FF', borderRadius: '0.5rem',
                border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem',
              }}>
                <Eye size={16} /> Détails
              </button>
              <button onClick={() => onUpdateStatus(candidate.id, APPLICATION_STATUS.ACCEPTED)} style={{
                flex: 1, padding: '0.5rem', fontSize: '0.875rem', fontWeight: 500,
                color: '#059669', backgroundColor: '#D1FAE5', borderRadius: '0.5rem',
                border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem',
              }}>
                <Check size={16} /> Accepter
              </button>
              <button onClick={() => onUpdateStatus(candidate.id, APPLICATION_STATUS.REJECTED)} style={{
                flex: 1, padding: '0.5rem', fontSize: '0.875rem', fontWeight: 500,
                color: '#DC2626', backgroundColor: '#FEE2E2', borderRadius: '0.5rem',
                border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem',
              }}>
                <X size={16} /> Refuser
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredCandidates.length === 0 && (
        <div style={{ textAlign: 'center', padding: '3rem 0' }}>
          <div style={{
            width: '64px', height: '64px', backgroundColor: '#F3F4F6', borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem',
          }}>
            <Search size={32} color="#9CA3AF" />
          </div>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#374151', margin: 0 }}>
            Aucune candidature trouvée
          </h3>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .table-desktop { display: none !important; }
          .table-mobile { display: flex !important; }
        }
      `}</style>
    </div>
  );
};

export default CandidateTable;