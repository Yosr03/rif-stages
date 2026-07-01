import { Component } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          backgroundColor: '#F9FAFB',
        }}>
          <div style={{
            textAlign: 'center',
            maxWidth: '400px',
          }}>
            <AlertCircle size={64} color="#EF4444" style={{ margin: '0 auto 1rem' }} />
            <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1F2937' }}>
              Oups, une erreur est survenue
            </h1>
            <p style={{ color: '#6B7280', marginTop: '0.5rem', marginBottom: '1.5rem' }}>
              Nous n'avons pas pu charger cette page. Veuillez réessayer.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="btn-primary"
            >
              <RefreshCw size={16} />
              Recharger la page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;