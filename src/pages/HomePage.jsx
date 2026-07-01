import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import { ArrowRight, Clock, CheckCircle, FileText, Zap, Users, Award, Target } from 'lucide-react';

const HomePage = () => {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F9FAFB', paddingTop: '64px' }}>
      <Navbar />

      {/* ===== HERO SECTION ===== */}
      <section style={{
        background: 'linear-gradient(135deg, #1E3A5F 0%, #1E3A5F 50%, #2563EB 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div className="container-app section-padding" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            maxWidth: '800px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}>
            
            {/* Badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 1rem',
              backgroundColor: 'rgba(255,255,255,0.1)',
              borderRadius: '9999px',
              color: '#BFDBFE',
              fontSize: '0.875rem',
              marginBottom: '1.5rem',
              border: '1px solid rgba(255,255,255,0.1)',
            }}>
              <Zap size={16} style={{ color: '#FBBF24' }} />
              <span>Plateforme du Groupe RIF</span>
            </div>

            {/* Title */}
            <h1 style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 700,
              color: 'white',
              lineHeight: 1.1,
              marginBottom: '1.5rem',
            }}>
              Lancez votre carrière avec{' '}
              <span style={{ color: '#FBBF24' }}>RIF-Stages</span>
            </h1>

            {/* Description */}
            <p style={{
              fontSize: 'clamp(0.95rem, 2vw, 1.125rem)',
              color: '#DBEAFE',
              maxWidth: '600px',
              marginBottom: '2rem',
              lineHeight: 1.6,
            }}>
              Déposez votre candidature de stage en quelques clics et rejoignez
              une équipe d'ingénieurs passionnés par l'innovation.
            </p>

            {/* CTA Buttons */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1rem',
              justifyContent: 'center',
              marginBottom: '3rem',
            }}>
              <Link
                to="/candidature"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.875rem 1.75rem',
                  backgroundColor: '#F59E0B',
                  color: '#1E3A5F',
                  fontWeight: 700,
                  borderRadius: '0.75rem',
                  fontSize: '1rem',
                  boxShadow: '0 10px 20px rgba(0,0,0,0.15)',
                  transition: 'transform 0.2s',
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                Déposer ma candidature 
                <ArrowRight size={18} />
              </Link>
              <Link
                to="/login"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.875rem 1.75rem',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  color: 'white',
                  fontWeight: 600,
                  borderRadius: '0.75rem',
                  fontSize: '1rem',
                  border: '1px solid rgba(255,255,255,0.2)',
                }}
              >
                Espace RH
              </Link>
            </div>

            {/* Trust indicators */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1.5rem',
              justifyContent: 'center',
              color: '#BFDBFE',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Users size={18} style={{ color: '#FBBF24' }} />
                <span style={{ fontSize: '0.875rem' }}>+100 stagiaires</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Award size={18} style={{ color: '#FBBF24' }} />
                <span style={{ fontSize: '0.875rem' }}>Depuis 2018</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Target size={18} style={{ color: '#FBBF24' }} />
                <span style={{ fontSize: '0.875rem' }}>Réponse 100%</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURES SECTION ===== */}
      <section className="section-padding" style={{ backgroundColor: 'white' }}>
        <div className="container-app">
          
          {/* Header */}
          <div style={{
            textAlign: 'center',
            maxWidth: '600px',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginBottom: '3rem',
          }}>
            <span style={{
              display: 'inline-block',
              padding: '0.25rem 0.75rem',
              backgroundColor: '#EFF6FF',
              color: '#2563EB',
              fontSize: '0.75rem',
              fontWeight: 600,
              borderRadius: '9999px',
              marginBottom: '0.75rem',
              letterSpacing: '0.05em',
            }}>
              PROCESSUS
            </span>
            <h2 style={{
              fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
              fontWeight: 700,
              color: '#1F2937',
              marginBottom: '0.75rem',
            }}>
              Comment ça marche ?
            </h2>
            <p style={{
              fontSize: '1rem',
              color: '#6B7280',
              lineHeight: 1.6,
            }}>
              Un processus simple et transparent pour votre candidature
            </p>
          </div>

          {/* Cards Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
          }}>
            {[
              {
                icon: FileText,
                iconBg: '#DBEAFE',
                iconColor: '#2563EB',
                title: '1. Déposez votre candidature',
                description: 'Remplissez le formulaire en ligne avec vos informations personnelles, votre parcours et votre motivation.',
              },
              {
                icon: Clock,
                iconBg: '#FEF3C7',
                iconColor: '#D97706',
                title: '2. Suivi en temps réel',
                description: 'Notre équipe RH examine votre dossier et vous tient informé de l\'avancement via email.',
              },
              {
                icon: CheckCircle,
                iconBg: '#D1FAE5',
                iconColor: '#059669',
                title: '3. Recevez votre réponse',
                description: 'Vous recevrez une notification par email avec la décision finale concernant votre candidature.',
              },
            ].map((feature, i) => (
              <div 
                key={i}
                style={{
                  padding: '1.75rem',
                  backgroundColor: 'white',
                  borderRadius: '1rem',
                  border: '1px solid #F3F4F6',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                  transition: 'all 0.3s',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 20px 30px rgba(0,0,0,0.08)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)';
                }}
              >
                <div style={{
                  display: 'inline-flex',
                  padding: '0.875rem',
                  borderRadius: '0.75rem',
                  backgroundColor: feature.iconBg,
                  color: feature.iconColor,
                  marginBottom: '1rem',
                }}>
                  <feature.icon size={24} />
                </div>
                <h3 style={{
                  fontSize: '1.125rem',
                  fontWeight: 700,
                  color: '#1F2937',
                  marginBottom: '0.5rem',
                }}>
                  {feature.title}
                </h3>
                <p style={{
                  fontSize: '0.9375rem',
                  color: '#6B7280',
                  lineHeight: 1.6,
                }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section style={{
        background: 'linear-gradient(135deg, #1E3A5F, #2563EB)',
        padding: '4rem 0',
      }}>
        <div className="container-app" style={{ textAlign: 'center' }}>
          <h2 style={{
            fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)',
            fontWeight: 700,
            color: 'white',
            marginBottom: '1rem',
          }}>
            Prêt à rejoindre l'aventure RIF ?
          </h2>
          <p style={{
            fontSize: '1rem',
            color: '#DBEAFE',
            maxWidth: '500px',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginBottom: '2rem',
          }}>
            Plus de 100 stagiaires nous ont déjà fait confiance.
          </p>
          <Link
            to="/candidature"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.875rem 2rem',
              backgroundColor: '#F59E0B',
              color: '#1E3A5F',
              fontWeight: 700,
              borderRadius: '0.75rem',
              fontSize: '1rem',
              boxShadow: '0 10px 20px rgba(0,0,0,0.15)',
            }}
          >
            Commencer maintenant 
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer style={{
        backgroundColor: '#111827',
        color: '#9CA3AF',
        padding: '2rem 0',
      }}>
        <div className="container-app" style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{
              width: '32px',
              height: '32px',
              backgroundColor: '#F59E0B',
              borderRadius: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <span style={{ color: '#1E3A5F', fontWeight: 900 }}>R</span>
            </div>
            <span style={{ color: 'white', fontWeight: 700 }}>RIF-Stages</span>
          </div>
          <p style={{ fontSize: '0.875rem' }}>
            © 2026 Groupe RIF — Tous droits réservés
          </p>
          <a 
            href="mailto:contact@grouperif.com"
            style={{ fontSize: '0.875rem' }}
          >
            contact@grouperif.com
          </a>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;