import { useState, useEffect } from 'react';
import CandidateTable from '../components/dashboard/CandidateTable';
import CandidateDetailModal from '../components/dashboard/CandidateDetailModal';
import InterviewModal from '../components/dashboard/InterviewModal';
import { APPLICATION_STATUS } from '../utils/constants';
import { generateCandidatePDF } from '../services/pdfService';
import { 
  getAllCandidatures, 
  updateCandidatureStatus 
} from '../services/candidatureService';
import { sendStatusUpdateEmail } from '../services/emailService';
import { createInterview } from '../services/interviewService';
import { createNotification } from '../services/notificationService';

const CandidaturesList = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  
  // States pour le modal d'entretien
  const [interviewModalOpen, setInterviewModalOpen] = useState(false);
  const [candidateForInterview, setCandidateForInterview] = useState(null);

  useEffect(() => {
    loadCandidatures();
  }, []);

  const loadCandidatures = async () => {
    try {
      setLoading(true);
      const data = await getAllCandidatures();
      setCandidates(data);
    } catch (error) {
      console.error('Erreur chargement:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewCandidate = (candidate) => {
    setSelectedCandidate(candidate);
    setModalOpen(true);
  };

  const handleUpdateStatus = async (id, newStatus) => {
  try {
    await updateCandidatureStatus(id, newStatus);
    
    const candidate = candidates.find((c) => c.id === id);
    
    setCandidates((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
    );
    
    if (selectedCandidate?.id === id) {
      setSelectedCandidate((prev) => ({ ...prev, status: newStatus }));
    }

    if (candidate) {
      // Créer notification
      await createNotification({
        type: 'status_change',
        candidateName: `${candidate.firstName} ${candidate.lastName}`,
        message: `est maintenant : ${newStatus}`,
        department: candidate.department,
        candidateId: id,
      });

      // Si REFUSÉE : envoyer email tout de suite
      if (newStatus === APPLICATION_STATUS.REJECTED) {
        await sendStatusUpdateEmail(candidate, newStatus);
      }

      // Si ACCEPTÉE : ouvrir le modal, l'email sera envoyé après création entretien
      if (newStatus === APPLICATION_STATUS.ACCEPTED) {
        setCandidateForInterview(candidate);
        setInterviewModalOpen(true);
      }
    }
  } catch (error) {
    console.error('Erreur:', error);
    alert('Erreur lors de la mise à jour du statut');
  }
};

const handleCreateInterview = async (interviewData) => {
  try {
    // 1. Créer l'entretien dans Firestore
    await createInterview({
      ...interviewData,
      candidateId: candidateForInterview.id,
      candidateName: `${candidateForInterview.firstName} ${candidateForInterview.lastName}`,
      candidateEmail: candidateForInterview.email,
      department: candidateForInterview.department,
      status: 'Confirmé',
    });

    // 2. Créer notification
    await createNotification({
      type: 'interview_reminder',
      candidateName: `${candidateForInterview.firstName} ${candidateForInterview.lastName}`,
      message: `Entretien planifié le ${new Date(interviewData.date).toLocaleDateString('fr-FR')} à ${interviewData.time}`,
      department: candidateForInterview.department,
      candidateId: candidateForInterview.id,
    });

    // 3. ✨ NOUVEAU : Envoyer email d'acceptation AVEC les infos d'entretien
    await sendStatusUpdateEmail(
      candidateForInterview,
      APPLICATION_STATUS.ACCEPTED,
      interviewData
    );

    console.log('✅ Entretien créé + email envoyé');
    alert('Entretien planifié ! Le candidat a été notifié par email.');
  } catch (error) {
    console.error('❌ Erreur:', error);
    throw error;
  }
};

// ✨ NOUVEAU : Gérer le cas où le RH ferme le modal SANS planifier
const handleCloseInterviewModal = async () => {
  setInterviewModalOpen(false);
  
  // Si le RH ferme sans planifier, on envoie quand même l'email d'acceptation (sans entretien)
  if (candidateForInterview) {
    if (window.confirm(
      'Voulez-vous envoyer l\'email d\'acceptation au candidat sans entretien planifié ?\n\n' +
      'Cliquez OK pour envoyer, Annuler pour ne pas envoyer.'
    )) {
      await sendStatusUpdateEmail(candidateForInterview, APPLICATION_STATUS.ACCEPTED);
      alert('Email d\'acceptation envoyé sans planning d\'entretien.');
    }
    setCandidateForInterview(null);
  }
};

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '400px',
      }}>
        <div style={{
          width: '48px',
          height: '48px',
          border: '4px solid #E5E7EB',
          borderTopColor: '#1E3A5F',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
        }} />
        <style>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h1 style={{
          fontSize: 'clamp(1.5rem, 3vw, 2rem)',
          fontWeight: 700,
          color: '#1F2937',
          margin: 0,
        }}>
          Gestion des Candidatures
        </h1>
        <p style={{
          color: '#6B7280',
          marginTop: '0.25rem',
          fontSize: '0.9375rem',
        }}>
          Consultez et gérez toutes les candidatures reçues
        </p>
      </div>

      <CandidateTable
        candidates={candidates}
        onViewCandidate={handleViewCandidate}
        onUpdateStatus={handleUpdateStatus}
      />

      {/* Modal détails candidature */}
      <CandidateDetailModal
        candidate={selectedCandidate}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onUpdateStatus={handleUpdateStatus}
        onGeneratePDF={generateCandidatePDF}
      />

      {/* Modal planification entretien */}
      <InterviewModal
  isOpen={interviewModalOpen}
  onClose={handleCloseInterviewModal}
  onSave={handleCreateInterview}
  candidate={candidateForInterview}
/>
    </div>
  );
};

export default CandidaturesList;