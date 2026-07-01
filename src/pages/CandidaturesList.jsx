import { useState } from 'react';
import CandidateTable from '../components/dashboard/CandidateTable';
import CandidateDetailModal from '../components/dashboard/CandidateDetailModal';
import { MOCK_CANDIDATES, APPLICATION_STATUS } from '../utils/constants';
import { generateCandidatePDF } from '../services/pdfService';
import { sendStatusUpdateEmail } from '../services/emailService';

const CandidaturesList = () => {
  const [candidates, setCandidates] = useState(MOCK_CANDIDATES);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleViewCandidate = (candidate) => {
    setSelectedCandidate(candidate);
    setModalOpen(true);
  };

  const handleUpdateStatus = async (id, newStatus) => {
    setCandidates((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
    );

    const candidate = candidates.find((c) => c.id === id);
    if (candidate && (newStatus === APPLICATION_STATUS.ACCEPTED || newStatus === APPLICATION_STATUS.REJECTED)) {
      await sendStatusUpdateEmail(candidate, newStatus);
    }

    if (selectedCandidate?.id === id) {
      setSelectedCandidate((prev) => ({ ...prev, status: newStatus }));
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Gestion des Candidatures
        </h1>
        <p className="text-gray-500 mt-1">
          Consultez et gérez toutes les candidatures reçues
        </p>
      </div>

      <CandidateTable
        candidates={candidates}
        onViewCandidate={handleViewCandidate}
        onUpdateStatus={handleUpdateStatus}
      />

      <CandidateDetailModal
        candidate={selectedCandidate}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onUpdateStatus={handleUpdateStatus}
        onGeneratePDF={generateCandidatePDF}
      />
    </div>
  );
};

export default CandidaturesList;