const StatsCard = ({ title, value, icon: Icon, color, trend, trendValue }) => {
  const colorMap = {
    blue: { bg: '#DBEAFE', text: '#2563EB' },
    green: { bg: '#D1FAE5', text: '#059669' },
    yellow: { bg: '#FEF3C7', text: '#D97706' },
    red: { bg: '#FEE2E2', text: '#DC2626' },
    purple: { bg: '#F3E8FF', text: '#9333EA' },
    indigo: { bg: '#E0E7FF', text: '#4F46E5' },
  };

  const colors = colorMap[color] || colorMap.blue;

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '0.75rem',
      padding: '1.25rem',
      border: '1px solid #F3F4F6',
      boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
      transition: 'all 0.2s',
      cursor: 'default',
    }}
    onMouseOver={(e) => e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)'}
    onMouseOut={(e) => e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)'}
    >
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: '1rem',
      }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{
            fontSize: '0.875rem',
            fontWeight: 500,
            color: '#6B7280',
            margin: 0,
          }}>
            {title}
          </p>
          <p style={{
            fontSize: '1.875rem',
            fontWeight: 700,
            color: '#1F2937',
            marginTop: '0.5rem',
            marginBottom: 0,
            lineHeight: 1,
          }}>
            {value}
          </p>
          {trend && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
              marginTop: '0.5rem',
            }}>
              <span style={{
                fontSize: '0.875rem',
                fontWeight: 500,
                color: trend === 'up' ? '#059669' : '#DC2626',
              }}>
                {trend === 'up' ? '↑' : '↓'} {trendValue}
              </span>
              <span style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>
                vs mois dernier
              </span>
            </div>
          )}
        </div>
        <div style={{
          padding: '0.75rem',
          borderRadius: '0.75rem',
          backgroundColor: colors.bg,
          color: colors.text,
          flexShrink: 0,
        }}>
          <Icon size={24} />
        </div>
      </div>
    </div>
  );
};

export default StatsCard;