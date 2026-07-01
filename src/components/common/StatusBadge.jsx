const STATUS_STYLES = {
  'En attente': {
    bg: '#FEF3C7',
    text: '#92400E',
    dot: '#F59E0B',
  },
  "En cours d'examen": {
    bg: '#DBEAFE',
    text: '#1E40AF',
    dot: '#3B82F6',
  },
  'Entretien planifié': {
    bg: '#F3E8FF',
    text: '#6B21A8',
    dot: '#A855F7',
  },
  'Acceptée': {
    bg: '#D1FAE5',
    text: '#065F46',
    dot: '#10B981',
  },
  'Refusée': {
    bg: '#FEE2E2',
    text: '#991B1B',
    dot: '#EF4444',
  },
};

const SIZE_STYLES = {
  sm: {
    padding: '0.25rem 0.625rem',
    fontSize: '0.75rem',
    dotSize: '6px',
  },
  md: {
    padding: '0.375rem 0.875rem',
    fontSize: '0.875rem',
    dotSize: '8px',
  },
  lg: {
    padding: '0.5rem 1rem',
    fontSize: '1rem',
    dotSize: '10px',
  },
};

const StatusBadge = ({ status, size = 'md' }) => {
  const colors = STATUS_STYLES[status] || {
    bg: '#F3F4F6',
    text: '#374151',
    dot: '#6B7280',
  };
  
  const sizeStyle = SIZE_STYLES[size] || SIZE_STYLES.md;

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.375rem',
        borderRadius: '9999px',
        fontWeight: 600,
        backgroundColor: colors.bg,
        color: colors.text,
        padding: sizeStyle.padding,
        fontSize: sizeStyle.fontSize,
        lineHeight: 1,
        whiteSpace: 'nowrap',
        border: `1px solid ${colors.dot}20`,
      }}
    >
      <span
        style={{
          width: sizeStyle.dotSize,
          height: sizeStyle.dotSize,
          borderRadius: '50%',
          backgroundColor: colors.dot,
          flexShrink: 0,
          display: 'inline-block',
        }}
      />
      {status}
    </span>
  );
};

export default StatusBadge;