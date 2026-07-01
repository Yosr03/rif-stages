const Input = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  required = false,
  disabled = false,
  icon: Icon,
  className = '',
  ...props
}) => {
  return (
    <div style={{ marginBottom: '1rem' }} className={className}>
      {label && (
        <label
          htmlFor={name}
          style={{
            display: 'block',
            fontSize: '0.875rem',
            fontWeight: 600,
            color: '#374151',
            marginBottom: '0.375rem',
          }}
        >
          {label}
          {required && <span style={{ color: '#EF4444', marginLeft: '0.25rem' }}>*</span>}
        </label>
      )}
      <div style={{ position: 'relative' }}>
        {Icon && (
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '12px',
            transform: 'translateY(-50%)',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#9CA3AF',
          }}>
            <Icon size={18} />
          </div>
        )}
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          style={{
            width: '100%',
            padding: '0.625rem 1rem',
            paddingLeft: Icon ? '2.5rem' : '1rem',
            border: `1px solid ${error ? '#EF4444' : '#D1D5DB'}`,
            borderRadius: '0.5rem',
            color: '#1F2937',
            fontSize: '0.875rem',
            backgroundColor: disabled ? '#F3F4F6' : 'white',
            cursor: disabled ? 'not-allowed' : 'text',
            outline: 'none',
            fontFamily: 'inherit',
            transition: 'all 0.2s',
          }}
          onFocus={(e) => {
            if (!error) {
              e.target.style.borderColor = '#2563EB';
              e.target.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)';
            }
          }}
          onBlur={(e) => {
            e.target.style.borderColor = error ? '#EF4444' : '#D1D5DB';
            e.target.style.boxShadow = 'none';
          }}
          {...props}
        />
      </div>
      {error && (
        <p style={{
          marginTop: '0.25rem',
          fontSize: '0.875rem',
          color: '#DC2626',
          display: 'flex',
          alignItems: 'center',
          gap: '0.25rem',
        }}>
          <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;