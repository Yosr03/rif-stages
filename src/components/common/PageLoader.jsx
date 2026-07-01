const PageLoader = ({ text = 'Chargement...' }) => (
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '4rem 1rem',
    gap: '1rem',
  }}>
    <div style={{
      width: '48px',
      height: '48px',
      border: '4px solid #E5E7EB',
      borderTopColor: '#1E3A5F',
      borderRadius: '50%',
      animation: 'spin 0.8s linear infinite',
    }} />
    <p style={{
      fontSize: '0.875rem',
      color: '#6B7280',
      fontWeight: 500,
    }}>
      {text}
    </p>
    <style>{`
      @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);

export default PageLoader;