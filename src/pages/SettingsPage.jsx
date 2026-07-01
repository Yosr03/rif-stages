import { useState } from 'react';
import { Save, Bell, Shield, Palette, Mail, Building, Check } from 'lucide-react';

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    companyName: 'Groupe RIF',
    hrEmail: 'rh@grouperif.com',
    notificationsEnabled: true,
    autoReply: true,
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  // Reusable Toggle Switch
  const Toggle = ({ name, checked, onChange }) => (
    <label style={{
      position: 'relative',
      display: 'inline-block',
      width: '44px',
      height: '24px',
      flexShrink: 0,
      cursor: 'pointer',
    }}>
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        style={{
          opacity: 0,
          width: 0,
          height: 0,
        }}
      />
      <span style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: checked ? '#2563EB' : '#D1D5DB',
        borderRadius: '9999px',
        transition: 'all 0.2s',
      }}>
        <span style={{
          position: 'absolute',
          top: '2px',
          left: checked ? '22px' : '2px',
          width: '20px',
          height: '20px',
          backgroundColor: 'white',
          borderRadius: '50%',
          transition: 'all 0.2s',
          boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
        }} />
      </span>
    </label>
  );

  // Card wrapper
  const SettingsCard = ({ icon: Icon, iconColor, iconBg, title, description, children }) => (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '1rem',
      border: '1px solid #F3F4F6',
      boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
      overflow: 'hidden',
    }}>
      {/* Card Header */}
      <div style={{
        padding: '1.25rem 1.5rem',
        borderBottom: '1px solid #F3F4F6',
        display: 'flex',
        alignItems: 'center',
        gap: '0.875rem',
      }}>
        <div style={{
          padding: '0.625rem',
          backgroundColor: iconBg,
          borderRadius: '0.625rem',
          flexShrink: 0,
        }}>
          <Icon size={20} color={iconColor} />
        </div>
        <div>
          <h3 style={{
            fontSize: '1rem',
            fontWeight: 700,
            color: '#1F2937',
            margin: 0,
          }}>
            {title}
          </h3>
          {description && (
            <p style={{
              fontSize: '0.8125rem',
              color: '#6B7280',
              margin: 0,
              marginTop: '2px',
            }}>
              {description}
            </p>
          )}
        </div>
      </div>

      {/* Card Body */}
      <div style={{ padding: '1.5rem' }}>
        {children}
      </div>
    </div>
  );

  // Input Field
  const Field = ({ label, name, type = 'text', value, onChange, icon: Icon }) => (
    <div>
      <label style={{
        display: 'block',
        fontSize: '0.875rem',
        fontWeight: 600,
        color: '#374151',
        marginBottom: '0.5rem',
      }}>
        {label}
      </label>
      <div style={{ position: 'relative' }}>
        {Icon && (
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '12px',
            transform: 'translateY(-50%)',
            color: '#9CA3AF',
            display: 'flex',
            alignItems: 'center',
          }}>
            <Icon size={18} />
          </div>
        )}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          style={{
            width: '100%',
            padding: '0.625rem 1rem',
            paddingLeft: Icon ? '2.5rem' : '1rem',
            border: '1px solid #D1D5DB',
            borderRadius: '0.5rem',
            fontSize: '0.9375rem',
            color: '#1F2937',
            outline: 'none',
            fontFamily: 'inherit',
            backgroundColor: 'white',
            transition: 'all 0.2s',
          }}
          onFocus={(e) => {
            e.target.style.borderColor = '#2563EB';
            e.target.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = '#D1D5DB';
            e.target.style.boxShadow = 'none';
          }}
        />
      </div>
    </div>
  );

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem',
    }}>
      {/* Page Header */}
      <div>
        <h1 style={{
          fontSize: 'clamp(1.5rem, 3vw, 2rem)',
          fontWeight: 700,
          color: '#1F2937',
          margin: 0,
        }}>
          Paramètres
        </h1>
        <p style={{
          color: '#6B7280',
          marginTop: '0.25rem',
          fontSize: '0.9375rem',
        }}>
          Configuration de l'application
        </p>
      </div>

      {/* General Settings */}
      <SettingsCard
        icon={Palette}
        iconColor="#2563EB"
        iconBg="#DBEAFE"
        title="Général"
        description="Informations de base de l'entreprise"
      >
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
        }}>
          <Field
            label="Nom de l'entreprise"
            name="companyName"
            value={settings.companyName}
            onChange={handleChange}
            icon={Building}
          />
          <Field
            label="Email RH"
            name="hrEmail"
            type="email"
            value={settings.hrEmail}
            onChange={handleChange}
            icon={Mail}
          />
        </div>
      </SettingsCard>

      {/* Notifications Settings */}
      <SettingsCard
        icon={Bell}
        iconColor="#D97706"
        iconBg="#FEF3C7"
        title="Notifications"
        description="Gérez vos préférences de notification"
      >
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}>
          {/* Toggle 1 */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            padding: '0.875rem',
            backgroundColor: '#F9FAFB',
            borderRadius: '0.625rem',
            border: '1px solid #F3F4F6',
          }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{
                fontWeight: 600,
                color: '#374151',
                margin: 0,
                fontSize: '0.9375rem',
              }}>
                Notifications par email
              </p>
              <p style={{
                fontSize: '0.8125rem',
                color: '#6B7280',
                margin: 0,
                marginTop: '2px',
              }}>
                Recevoir un email pour chaque nouvelle candidature
              </p>
            </div>
            <Toggle
              name="notificationsEnabled"
              checked={settings.notificationsEnabled}
              onChange={handleChange}
            />
          </div>

          {/* Toggle 2 */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            padding: '0.875rem',
            backgroundColor: '#F9FAFB',
            borderRadius: '0.625rem',
            border: '1px solid #F3F4F6',
          }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{
                fontWeight: 600,
                color: '#374151',
                margin: 0,
                fontSize: '0.9375rem',
              }}>
                Réponse automatique
              </p>
              <p style={{
                fontSize: '0.8125rem',
                color: '#6B7280',
                margin: 0,
                marginTop: '2px',
              }}>
                Envoyer un accusé de réception automatique
              </p>
            </div>
            <Toggle
              name="autoReply"
              checked={settings.autoReply}
              onChange={handleChange}
            />
          </div>
        </div>
      </SettingsCard>

      {/* Security Settings */}
      <SettingsCard
        icon={Shield}
        iconColor="#059669"
        iconBg="#D1FAE5"
        title="Sécurité"
        description="Gestion des données sensibles"
      >
        <p style={{
          fontSize: '0.9375rem',
          color: '#6B7280',
          marginBottom: '1rem',
          lineHeight: 1.6,
        }}>
          Les mots de passe et les clés d'API sont gérés via les variables d'environnement pour garantir une sécurité optimale.
        </p>
      </SettingsCard>

      {/* Save Button */}
      <div style={{
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '0.75rem',
        alignItems: 'center',
        paddingTop: '0.5rem',
      }}>
        {saved && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.375rem',
            color: '#059669',
            fontSize: '0.875rem',
            fontWeight: 500,
            animation: 'fadeIn 0.3s',
          }}>
            <Check size={16} />
            Enregistré avec succès
          </div>
        )}
        <button
          onClick={handleSave}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem 1.5rem',
            backgroundColor: '#1E3A5F',
            color: 'white',
            fontWeight: 600,
            fontSize: '0.9375rem',
            borderRadius: '0.5rem',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.2s',
            boxShadow: '0 4px 12px rgba(30, 58, 95, 0.2)',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#2563EB';
            e.currentTarget.style.transform = 'translateY(-1px)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = '#1E3A5F';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <Save size={16} />
          Sauvegarder les modifications
        </button>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateX(10px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};

export default SettingsPage;