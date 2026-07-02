import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Input from '../components/common/Input';
import Select from '../components/common/Select';
import TextArea from '../components/common/TextArea';
import FileUpload from '../components/common/FileUpload';
import { createCandidature } from '../services/candidatureService';
import { validateCandidatureForm, sanitizeInput } from '../utils/validators';
import { STAGE_TYPES, DEPARTMENTS, EDUCATION_LEVELS } from '../utils/constants';
import {
  User, Mail, Phone, Calendar, GraduationCap, Building2,
  Briefcase, Send, ArrowLeft, ArrowRight, CheckCircle2,
} from 'lucide-react';
import { sendSubmissionEmail } from '../services/emailService';
import { createNotification } from '../services/notificationService';

const STEPS = [
  { id: 1, title: 'Informations personnelles', icon: User },
  { id: 2, title: 'Formation & Stage', icon: GraduationCap },
  { id: 3, title: 'Motivation & Documents', icon: Briefcase },
];

const CandidatureForm = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '', dateOfBirth: '',
    educationLevel: '', university: '', stageType: '', department: '',
    startDate: '', endDate: '', motivation: '', skills: '', cv: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateStep = (step) => {
    const allErrors = validateCandidatureForm(formData);
    let stepErrors = {};
    const stepFields = {
      1: ['firstName', 'lastName', 'email', 'phone', 'dateOfBirth'],
      2: ['educationLevel', 'university', 'stageType', 'department', 'startDate', 'endDate'],
      3: ['motivation'],
    };
    stepFields[step].forEach((f) => {
      if (allErrors[f]) stepErrors[f] = allErrors[f];
    });
    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) setCurrentStep((prev) => Math.min(prev + 1, 3));
  };

  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validateStep(3)) return;
  setLoading(true);

  const sanitizedData = {
    ...formData,
    firstName: sanitizeInput(formData.firstName),
    lastName: sanitizeInput(formData.lastName),
    email: sanitizeInput(formData.email),
    phone: sanitizeInput(formData.phone),
    university: sanitizeInput(formData.university),
    motivation: sanitizeInput(formData.motivation),
    skills: sanitizeInput(formData.skills),
  };

  try {
    // 1. Créer la candidature dans Firestore
    const newCandidature = await createCandidature(sanitizedData);
    console.log('✅ Candidature enregistrée');

    // 2. Créer une notification pour le RH
    await createNotification({
      type: 'new_application',
      candidateName: `${sanitizedData.firstName} ${sanitizedData.lastName}`,
      message: 'a soumis une nouvelle candidature',
      department: sanitizedData.department,
      candidateId: newCandidature.id,
    });
    console.log('✅ Notification créée');

    // 3. Envoyer email de confirmation
    await sendSubmissionEmail(sanitizedData);
    console.log('✅ Email envoyé');

    setLoading(false);
    navigate('/success');
  } catch (error) {
    console.error('❌ Erreur:', error);
    alert('Erreur lors de l\'envoi. Veuillez réessayer.');
    setLoading(false);
  }
};

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F9FAFB', paddingTop: '64px' }}>
      <Navbar />

      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '2rem 1rem',
        width: '100%',
      }}>
        {/* Page Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{
            fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
            fontWeight: 700,
            color: '#1F2937',
            marginBottom: '0.5rem',
          }}>
            Dépôt de Candidature
          </h1>
          <p style={{
            fontSize: '1rem',
            color: '#6B7280',
          }}>
            Rejoignez le Groupe RIF en tant que stagiaire
          </p>
        </div>

        {/* Stepper */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            position: 'relative',
            padding: '0 1rem',
          }}>
            {/* Progress Bar */}
            <div style={{
              position: 'absolute',
              top: '20px',
              left: '3rem',
              right: '3rem',
              height: '2px',
              backgroundColor: '#E5E7EB',
              zIndex: 0,
            }}>
              <div style={{
                height: '100%',
                backgroundColor: '#1E3A5F',
                width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%`,
                transition: 'width 0.5s',
              }} />
            </div>

            {STEPS.map((step) => (
              <div key={step.id} style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                position: 'relative',
                zIndex: 1,
                flex: 1,
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  transition: 'all 0.3s',
                  backgroundColor: currentStep > step.id ? '#10B981' 
                    : currentStep === step.id ? '#1E3A5F' 
                    : '#E5E7EB',
                  color: currentStep >= step.id ? 'white' : '#6B7280',
                  boxShadow: currentStep === step.id ? '0 0 0 4px #DBEAFE' : 'none',
                }}>
                  {currentStep > step.id ? <CheckCircle2 size={20} /> : step.id}
                </div>
                <p style={{
                  fontSize: '0.75rem',
                  marginTop: '0.5rem',
                  fontWeight: 500,
                  color: currentStep >= step.id ? '#1E3A5F' : '#9CA3AF',
                  textAlign: 'center',
                  maxWidth: '120px',
                }}
                className="stepper-label"
                >
                  {step.title}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '1rem',
          padding: 'clamp(1.25rem, 3vw, 2rem)',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          border: '1px solid #F3F4F6',
        }}>
          <form onSubmit={handleSubmit}>
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div className="animate-fade-in">
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  marginBottom: '1.5rem',
                }}>
                  <div style={{
                    padding: '0.5rem',
                    backgroundColor: '#DBEAFE',
                    borderRadius: '0.5rem',
                  }}>
                    <User size={20} color="#2563EB" />
                  </div>
                  <div>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1F2937' }}>
                      Informations personnelles
                    </h2>
                    <p style={{ fontSize: '0.875rem', color: '#6B7280' }}>
                      Vos coordonnées de contact
                    </p>
                  </div>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                  gap: '0 1rem',
                }}>
                  <Input
                    label="Prénom" name="firstName" value={formData.firstName}
                    onChange={handleChange} placeholder="Votre prénom"
                    error={errors.firstName} required icon={User}
                  />
                  <Input
                    label="Nom" name="lastName" value={formData.lastName}
                    onChange={handleChange} placeholder="Votre nom"
                    error={errors.lastName} required icon={User}
                  />
                </div>

                <Input
                  label="Adresse email" name="email" type="email"
                  value={formData.email} onChange={handleChange}
                  placeholder="votre.email@exemple.com"
                  error={errors.email} required icon={Mail}
                />

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                  gap: '0 1rem',
                }}>
                  <Input
                    label="Téléphone" name="phone" type="tel"
                    value={formData.phone} onChange={handleChange}
                    placeholder="+216 XX XXX XXX"
                    error={errors.phone} required icon={Phone}
                  />
                  <Input
                    label="Date de naissance" name="dateOfBirth" type="date"
                    value={formData.dateOfBirth} onChange={handleChange}
                    error={errors.dateOfBirth} required icon={Calendar}
                  />
                </div>
              </div>
            )}

            {/* Step 2: Education & Internship */}
            {currentStep === 2 && (
              <div className="animate-fade-in">
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  marginBottom: '1.5rem',
                }}>
                  <div style={{
                    padding: '0.5rem',
                    backgroundColor: '#F3E8FF',
                    borderRadius: '0.5rem',
                  }}>
                    <GraduationCap size={20} color="#9333EA" />
                  </div>
                  <div>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1F2937' }}>
                      Formation & Stage
                    </h2>
                    <p style={{ fontSize: '0.875rem', color: '#6B7280' }}>
                      Votre parcours et le stage souhaité
                    </p>
                  </div>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                  gap: '0 1rem',
                }}>
                  <Select
                    label="Niveau d'études" name="educationLevel"
                    value={formData.educationLevel} onChange={handleChange}
                    options={EDUCATION_LEVELS} error={errors.educationLevel} required
                  />
                  <Input
                    label="Établissement" name="university"
                    value={formData.university} onChange={handleChange}
                    placeholder="Nom de votre université/école"
                    error={errors.university} required icon={Building2}
                  />
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                  gap: '0 1rem',
                }}>
                  <Select
                    label="Type de stage" name="stageType"
                    value={formData.stageType} onChange={handleChange}
                    options={STAGE_TYPES} error={errors.stageType} required
                  />
                  <Select
                    label="Département souhaité" name="department"
                    value={formData.department} onChange={handleChange}
                    options={DEPARTMENTS} error={errors.department} required
                  />
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                  gap: '0 1rem',
                }}>
                  <Input
                    label="Date de début" name="startDate" type="date"
                    value={formData.startDate} onChange={handleChange}
                    error={errors.startDate} required icon={Calendar}
                  />
                  <Input
                    label="Date de fin" name="endDate" type="date"
                    value={formData.endDate} onChange={handleChange}
                    error={errors.endDate} required icon={Calendar}
                  />
                </div>
              </div>
            )}

            {/* Step 3: Motivation & Documents */}
            {currentStep === 3 && (
              <div className="animate-fade-in">
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  marginBottom: '1.5rem',
                }}>
                  <div style={{
                    padding: '0.5rem',
                    backgroundColor: '#D1FAE5',
                    borderRadius: '0.5rem',
                  }}>
                    <Briefcase size={20} color="#059669" />
                  </div>
                  <div>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1F2937' }}>
                      Motivation & Documents
                    </h2>
                    <p style={{ fontSize: '0.875rem', color: '#6B7280' }}>
                      Pourquoi souhaitez-vous nous rejoindre ?
                    </p>
                  </div>
                </div>

                <Input
                  label="Compétences techniques" name="skills"
                  value={formData.skills} onChange={handleChange}
                  placeholder="Ex: React, Node.js, Python (séparés par des virgules)"
                />

                <TextArea
                  label="Lettre de motivation" name="motivation"
                  value={formData.motivation} onChange={handleChange}
                  placeholder="Expliquez votre motivation, vos objectifs et ce que vous pouvez apporter..."
                  error={errors.motivation} required rows={6} maxLength={1500}
                />

                <FileUpload
                  label="Curriculum Vitae (CV)" name="cv"
                  onChange={handleChange} accept=".pdf,.doc,.docx"
                  maxSizeMB={5} required
                />

                {/* Summary */}
                <div style={{
                  marginTop: '1.5rem',
                  padding: '1rem',
                  backgroundColor: '#EFF6FF',
                  borderRadius: '0.75rem',
                  border: '1px solid #BFDBFE',
                }}>
                  <h3 style={{
                    fontSize: '0.875rem',
                    fontWeight: 700,
                    color: '#1E40AF',
                    marginBottom: '0.75rem',
                  }}>
                    📋 Récapitulatif
                  </h3>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '0.5rem',
                    fontSize: '0.875rem',
                  }}>
                    <div>
                      <span style={{ color: '#2563EB' }}>Nom: </span>
                      <span style={{ fontWeight: 500, color: '#1E3A8A' }}>
                        {formData.firstName} {formData.lastName}
                      </span>
                    </div>
                    <div>
                      <span style={{ color: '#2563EB' }}>Email: </span>
                      <span style={{ fontWeight: 500, color: '#1E3A8A' }}>
                        {formData.email}
                      </span>
                    </div>
                    <div>
                      <span style={{ color: '#2563EB' }}>Stage: </span>
                      <span style={{ fontWeight: 500, color: '#1E3A8A' }}>
                        {formData.stageType}
                      </span>
                    </div>
                    <div>
                      <span style={{ color: '#2563EB' }}>Département: </span>
                      <span style={{ fontWeight: 500, color: '#1E3A8A' }}>
                        {formData.department}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
              marginTop: '2rem',
              paddingTop: '1.5rem',
              borderTop: '1px solid #E5E7EB',
            }}>
              {currentStep > 1 ? (
                <button type="button" onClick={prevStep} className="btn-secondary">
                  <ArrowLeft size={16} /> Précédent
                </button>
              ) : (
                <Link to="/" className="btn-secondary">
                  <ArrowLeft size={16} /> Accueil
                </Link>
              )}

              {currentStep < 3 ? (
                <button type="button" onClick={nextStep} className="btn-primary">
                  Suivant <ArrowRight size={16} />
                </button>
              ) : (
                <button type="submit" disabled={loading} className="btn-primary" style={{ padding: '0.75rem 2rem' }}>
                  {loading ? (
                    <>
                      <div style={{
                        width: '20px',
                        height: '20px',
                        border: '2px solid rgba(255,255,255,0.3)',
                        borderTopColor: 'white',
                        borderRadius: '50%',
                        animation: 'spin 0.8s linear infinite',
                      }} />
                      Envoi...
                    </>
                  ) : (
                    <>
                      <Send size={16} /> Soumettre
                    </>
                  )}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Hide stepper labels on very small screens */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @media (max-width: 480px) {
          .stepper-label {
            font-size: 0.65rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default CandidatureForm;