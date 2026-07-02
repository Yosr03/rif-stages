import emailjs from 'emailjs-com';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

/**
 * Configuration des différents types d'emails
 */
const EMAIL_TEMPLATES = {
  submitted: {
    email_subject: '✅ Candidature reçue - Groupe RIF',
    header_title: '🎉 Candidature reçue !',
    header_color: 'linear-gradient(135deg, #1E3A5F, #2563EB)',
    border_color: '#2563EB',
    main_message: 'Nous avons bien reçu votre candidature. Merci de l\'intérêt que vous portez au Groupe RIF !',
    secondary_message: 'Notre équipe RH examinera votre dossier dans les meilleurs délais et vous tiendra informé(e) de la suite du processus.',
  },
  accepted: {
    email_subject: '🎉 Félicitations ! Votre candidature a été acceptée',
    header_title: '🎉 Félicitations !',
    header_color: 'linear-gradient(135deg, #10B981, #059669)',
    border_color: '#10B981',
    main_message: 'Excellente nouvelle ! Votre candidature a été acceptée par notre équipe RH.',
    secondary_message: 'Merci de bien noter cet entretien dans votre agenda. En cas d\'empêchement, contactez-nous au plus vite. Nous sommes ravis de vous accueillir bientôt au sein du Groupe RIF !',
  },
  accepted_no_interview: {
    email_subject: '🎉 Félicitations ! Votre candidature a été acceptée',
    header_title: '🎉 Félicitations !',
    header_color: 'linear-gradient(135deg, #10B981, #059669)',
    border_color: '#10B981',
    main_message: 'Excellente nouvelle ! Votre candidature a été acceptée par notre équipe RH.',
    secondary_message: 'Nous vous contacterons prochainement pour organiser un entretien et finaliser les détails de votre intégration.',
  },
  rejected: {
    email_subject: 'Réponse à votre candidature - Groupe RIF',
    header_title: 'Réponse à votre candidature',
    header_color: 'linear-gradient(135deg, #6B7280, #4B5563)',
    border_color: '#6B7280',
    main_message: 'Nous vous remercions pour l\'intérêt que vous portez au Groupe RIF et pour le temps consacré à votre candidature.',
    secondary_message: 'Après examen attentif de votre dossier, nous sommes au regret de ne pas pouvoir donner une suite favorable à votre demande pour le moment. Cette décision ne reflète en rien la qualité de votre profil. Nous vous encourageons à postuler à nos futures offres. Nous vous souhaitons une pleine réussite dans vos projets professionnels.',
  },
};

/**
 * Fonction générique d'envoi d'email
 */
const sendEmail = async (candidateData, type, interviewData = null) => {
  try {
    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      console.warn('⚠️ EmailJS non configuré, email non envoyé');
      return { success: false, error: 'EmailJS non configuré' };
    }

    const templateConfig = EMAIL_TEMPLATES[type];
    if (!templateConfig) {
      throw new Error(`Type d'email inconnu: ${type}`);
    }

    // Paramètres de base
    const templateParams = {
      to_name: `${candidateData.firstName} ${candidateData.lastName}`,
      to_email: candidateData.email,
      stage_type: candidateData.stageType,
      department: candidateData.department,
      ...templateConfig,
    };

    // Si on a des infos d'entretien, on les ajoute
    if (interviewData) {
      const dateFormatted = new Date(interviewData.date).toLocaleDateString('fr-FR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });

      templateParams.interview_date = dateFormatted;
      templateParams.interview_time = interviewData.time;
      templateParams.interview_type = interviewData.type;
      templateParams.interview_notes = interviewData.notes || '';
    }

    const response = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      templateParams,
      PUBLIC_KEY
    );

    console.log(`✅ Email "${type}" envoyé à ${candidateData.email}`, response);
    return { success: true };
  } catch (error) {
    console.error(`❌ Erreur envoi email "${type}":`, error);
    return { success: false, error: error.message };
  }
};

/**
 * Envoie un email de confirmation après soumission
 */
export const sendSubmissionEmail = async (candidateData) => {
  return sendEmail(candidateData, 'submitted');
};

/**
 * Envoie un email d'acceptation SANS entretien planifié
 */
export const sendAcceptedEmail = async (candidateData) => {
  return sendEmail(candidateData, 'accepted_no_interview');
};

/**
 * Envoie un email d'acceptation AVEC entretien planifié
 */
export const sendAcceptedWithInterviewEmail = async (candidateData, interviewData) => {
  return sendEmail(candidateData, 'accepted', interviewData);
};

/**
 * Envoie un email de refus
 */
export const sendRejectedEmail = async (candidateData) => {
  return sendEmail(candidateData, 'rejected');
};

/**
 * Fonction générique pour mise à jour de statut (compatible avec l'ancien code)
 */
export const sendStatusUpdateEmail = async (candidateData, newStatus, interviewData = null) => {
  if (newStatus === 'Acceptée') {
    if (interviewData) {
      return sendAcceptedWithInterviewEmail(candidateData, interviewData);
    }
    return sendAcceptedEmail(candidateData);
  } else if (newStatus === 'Refusée') {
    return sendRejectedEmail(candidateData);
  }
  return { success: true, skipped: true };
};