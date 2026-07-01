import { MOCK_CANDIDATES } from '../utils/constants';
import {
  BarChart3, PieChart, Users, TrendingUp,
  Clock, CheckCircle2, XCircle, Calendar,
  Briefcase, GraduationCap, Building2,
} from 'lucide-react';

const StatsPage = () => {
  const candidates = MOCK_CANDIDATES;

  // Calculate stats
  const statusStats = candidates.reduce((acc, c) => {
    acc[c.status] = (acc[c.status] || 0) + 1;
    return acc;
  }, {});

  const departmentStats = candidates.reduce((acc, c) => {
    acc[c.department] = (acc[c.department] || 0) + 1;
    return acc;
  }, {});

  const stageTypeStats = candidates.reduce((acc, c) => {
    acc[c.stageType] = (acc[c.stageType] || 0) + 1;
    return acc;
  }, {});

  const educationStats = candidates.reduce((acc, c) => {
    acc[c.educationLevel] = (acc[c.educationLevel] || 0) + 1;
    return acc;
  }, {});

  const getStatusColor = (status) => {
    if (status.includes('Acceptée')) return '#10B981';
    if (status.includes('Refusée')) return '#EF4444';
    if (status.includes('attente')) return '#F59E0B';
    if (status.includes('Entretien')) return '#A855F7';
    return '#3B82F6';
  };

  const StatBar = ({ label, count, total, color }) => {
    const percentage = total ? (count / total) * 100 : 0;
    return (
      <div style={{ marginBottom: '1rem' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '0.375rem',
        }}>
          <span style={{
            fontSize: '0.875rem',
            color: '#374151',
            fontWeight: 500,
            flex: 1,
            marginRight: '1rem',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}>
            {label}
          </span>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            flexShrink: 0,
          }}>
            <span style={{
              fontSize: '0.75rem',
              color: '#9CA3AF',
              fontWeight: 500,
            }}>
              {percentage.toFixed(0)}%
            </span>
            <span style={{
              fontSize: '0.875rem',
              fontWeight: 700,
              color: '#1F2937',
              minWidth: '24px',
              textAlign: 'right',
            }}>
              {count}
            </span>
          </div>
        </div>
        <div style={{
          width: '100%',
          backgroundColor: '#F3F4F6',
          borderRadius: '9999px',
          height: '10px',
          overflow: 'hidden',
        }}>
          <div style={{
            height: '100%',
            width: `${percentage}%`,
            backgroundColor: color,
            borderRadius: '9999px',
            transition: 'width 0.7s ease-out',
            boxShadow: `0 0 8px ${color}40`,
          }} />
        </div>
      </div>
    );
  };

  const StatCard = ({ title, icon: Icon, iconColor, iconBg, children, totalLabel, total }) => (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '1rem',
      padding: '1.5rem',
      border: '1px solid #F3F4F6',
      boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '1.5rem',
        paddingBottom: '1rem',
        borderBottom: '1px solid #F3F4F6',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
        }}>
          <div style={{
            padding: '0.625rem',
            backgroundColor: iconBg,
            borderRadius: '0.625rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Icon size={20} color={iconColor} />
          </div>
          <h3 style={{
            fontSize: '1rem',
            fontWeight: 700,
            color: '#1F2937',
            margin: 0,
          }}>
            {title}
          </h3>
        </div>
        {total !== undefined && (
          <div style={{ textAlign: 'right' }}>
            <p style={{
              fontSize: '0.7rem',
              color: '#9CA3AF',
              margin: 0,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              fontWeight: 600,
            }}>
              {totalLabel}
            </p>
            <p style={{
              fontSize: '1.25rem',
              fontWeight: 700,
              color: iconColor,
              margin: 0,
              lineHeight: 1,
              marginTop: '2px',
            }}>
              {total}
            </p>
          </div>
        )}
      </div>
      {/* Content */}
      <div>{children}</div>
    </div>
  );

  // Top summary stats
  const summaryStats = [
    { label: 'Total', value: candidates.length, icon: Users, color: '#2563EB', bg: '#DBEAFE' },
    { label: 'En attente', value: statusStats['En attente'] || 0, icon: Clock, color: '#D97706', bg: '#FEF3C7' },
    { label: 'Acceptées', value: statusStats['Acceptée'] || 0, icon: CheckCircle2, color: '#059669', bg: '#D1FAE5' },
    { label: 'Refusées', value: statusStats['Refusée'] || 0, icon: XCircle, color: '#DC2626', bg: '#FEE2E2' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Page Header */}
      <div>
        <h1 style={{
          fontSize: 'clamp(1.5rem, 3vw, 2rem)',
          fontWeight: 700,
          color: '#1F2937',
          margin: 0,
        }}>
          Statistiques
        </h1>
        <p style={{
          color: '#6B7280',
          marginTop: '0.25rem',
          fontSize: '0.9375rem',
        }}>
          Vue d'ensemble des candidatures et tendances
        </p>
      </div>

      {/* Summary Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1rem',
      }}>
        {summaryStats.map((stat, i) => (
          <div key={i} style={{
            backgroundColor: 'white',
            borderRadius: '0.75rem',
            padding: '1.25rem',
            border: '1px solid #F3F4F6',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
          }}>
            <div style={{
              padding: '0.875rem',
              backgroundColor: stat.bg,
              borderRadius: '0.75rem',
              flexShrink: 0,
            }}>
              <stat.icon size={22} color={stat.color} />
            </div>
            <div>
              <p style={{
                fontSize: '0.75rem',
                color: '#6B7280',
                margin: 0,
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.03em',
              }}>
                {stat.label}
              </p>
              <p style={{
                fontSize: '1.75rem',
                fontWeight: 700,
                color: '#1F2937',
                margin: 0,
                lineHeight: 1,
                marginTop: '4px',
              }}>
                {stat.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Stats Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
        gap: '1.5rem',
      }}>
        {/* By Status */}
        <StatCard
          title="Répartition par Statut"
          icon={PieChart}
          iconColor="#2563EB"
          iconBg="#DBEAFE"
          totalLabel="Total"
          total={candidates.length}
        >
          {Object.entries(statusStats).map(([status, count]) => (
            <StatBar
              key={status}
              label={status}
              count={count}
              total={candidates.length}
              color={getStatusColor(status)}
            />
          ))}
        </StatCard>

        {/* By Department */}
        <StatCard
          title="Par Département"
          icon={Building2}
          iconColor="#4F46E5"
          iconBg="#E0E7FF"
          totalLabel="Départements"
          total={Object.keys(departmentStats).length}
        >
          {Object.entries(departmentStats).map(([dept, count]) => (
            <StatBar
              key={dept}
              label={dept}
              count={count}
              total={candidates.length}
              color="#4F46E5"
            />
          ))}
        </StatCard>

        {/* By Stage Type */}
        <StatCard
          title="Par Type de Stage"
          icon={Briefcase}
          iconColor="#EA580C"
          iconBg="#FFEDD5"
          totalLabel="Types"
          total={Object.keys(stageTypeStats).length}
        >
          {Object.entries(stageTypeStats).map(([type, count]) => (
            <StatBar
              key={type}
              label={type}
              count={count}
              total={candidates.length}
              color="#EA580C"
            />
          ))}
        </StatCard>

        {/* By Education */}
        <StatCard
          title="Par Niveau d'Études"
          icon={GraduationCap}
          iconColor="#9333EA"
          iconBg="#F3E8FF"
          totalLabel="Niveaux"
          total={Object.keys(educationStats).length}
        >
          {Object.entries(educationStats).map(([level, count]) => (
            <StatBar
              key={level}
              label={level}
              count={count}
              total={candidates.length}
              color="#9333EA"
            />
          ))}
        </StatCard>
      </div>
    </div>
  );
};

export default StatsPage;