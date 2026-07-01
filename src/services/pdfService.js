import jsPDF from 'jspdf';

/**
 * Generate a PDF report for a candidate
 */
export const generateCandidatePDF = (candidate) => {
  const doc = new jsPDF();

  const primaryColor = [30, 58, 95];
  const accentColor = [245, 158, 11];

  // Header
  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, 210, 40, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.text('RIF-Stages', 20, 18);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('Fiche de Candidature', 20, 28);
  doc.text(`Réf: CAND-${candidate.id}`, 20, 35);

  // Accent bar
  doc.setFillColor(...accentColor);
  doc.rect(0, 40, 210, 3, 'F');

  // Candidate Info
  let y = 55;
  doc.setTextColor(30, 58, 95);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Informations du Candidat', 20, y);

  y += 12;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(80, 80, 80);

  const addField = (label, value) => {
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 58, 95);
    doc.text(`${label}:`, 20, y);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(80, 80, 80);
    doc.text(value || 'N/A', 80, y);
    y += 8;
  };

  addField('Nom complet', `${candidate.firstName} ${candidate.lastName}`);
  addField('Email', candidate.email);
  addField('Téléphone', candidate.phone);
  addField('Date de naissance', new Date(candidate.dateOfBirth).toLocaleDateString('fr-FR'));
  addField('Niveau d\'études', candidate.educationLevel);
  addField('Établissement', candidate.university);
  addField('Type de stage', candidate.stageType);
  addField('Département', candidate.department);
  addField('Période', `${new Date(candidate.startDate).toLocaleDateString('fr-FR')} - ${new Date(candidate.endDate).toLocaleDateString('fr-FR')}`);
  addField('Statut', candidate.status);

  // Skills
  y += 5;
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(30, 58, 95);
  doc.setFontSize(14);
  doc.text('Compétences', 20, y);
  y += 8;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(80, 80, 80);
  doc.text(candidate.skills || 'Non spécifiées', 20, y);

  // Motivation
  y += 15;
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(30, 58, 95);
  doc.setFontSize(14);
  doc.text('Lettre de Motivation', 20, y);
  y += 8;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(80, 80, 80);

  const motivationLines = doc.splitTextToSize(candidate.motivation || 'Non fournie', 170);
  doc.text(motivationLines, 20, y);

  // Footer
  doc.setFillColor(...primaryColor);
  doc.rect(0, 280, 210, 17, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(8);
  doc.text('Groupe RIF - Rassemblement des Ingénieurs Francophones', 20, 288);
  doc.text(`Document généré le ${new Date().toLocaleDateString('fr-FR')} à ${new Date().toLocaleTimeString('fr-FR')}`, 20, 293);

  // Save
  doc.save(`candidature_${candidate.firstName}_${candidate.lastName}.pdf`);
};

/**
 * Generate a summary report PDF for all candidates
 */
export const generateSummaryPDF = (candidates) => {
  const doc = new jsPDF();
  const primaryColor = [30, 58, 95];

  // Header
  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, 210, 35, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('Rapport de Candidatures - RIF-Stages', 20, 15);
  doc.setFontSize(10);
  doc.text(`Généré le ${new Date().toLocaleDateString('fr-FR')}`, 20, 25);

  let y = 50;

  // Stats
  const statusCounts = candidates.reduce((acc, c) => {
    acc[c.status] = (acc[c.status] || 0) + 1;
    return acc;
  }, {});

  doc.setTextColor(30, 58, 95);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Résumé', 20, y);
  y += 10;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(80, 80, 80);
  doc.text(`Total de candidatures: ${candidates.length}`, 20, y);
  y += 7;

  Object.entries(statusCounts).forEach(([status, count]) => {
    doc.text(`${status}: ${count}`, 25, y);
    y += 6;
  });

  // Save
  doc.save('rapport_candidatures_rif_stages.pdf');
};