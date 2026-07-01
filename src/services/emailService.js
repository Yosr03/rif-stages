import emailjs from 'emailjs-com';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID';
const TEMPLATE_ACCEPTED = import.meta.env.VITE_EMAILJS_TEMPLATE_ACCEPTED || 'YOUR_TEMPLATE_ACCEPTED';
const TEMPLATE_REJECTED = import.meta.env.VITE_EMAILJS_TEMPLATE_REJECTED || 'YOUR_TEMPLATE_REJECTED';
const TEMPLATE_SUBMITTED = import.meta.env.VITE_EMAILJS_TEMPLATE_SUBMITTED || 'YOUR_TEMPLATE_SUBMITTED';
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY';

/**
 * Send notification email when application is submitted
 */
export const sendSubmissionEmail = async (candidateData) => {
  try {
    const templateParams = {
      to_name: `${candidateData.firstName} ${candidateData.lastName}`,
      to_email: candidateData.email,
      candidate_name: `${candidateData.firstName} ${candidateData.lastName}`,
      stage_type: candidateData.stageType,
      department: candidateData.department,
      submission_date: new Date().toLocaleDateString('fr-FR'),
    };

    await emailjs.send(SERVICE_ID, TEMPLATE_SUBMITTED, templateParams, PUBLIC_KEY);
    return { success: true };
  } catch (error) {
    console.error('Email sending failed:', error);
    return { success: false, error };
  }
};

/**
 * Send notification when status changes
 */
export const sendStatusUpdateEmail = async (candidateData, newStatus) => {
  try {
    const templateId = newStatus === 'Acceptée' ? TEMPLATE_ACCEPTED : TEMPLATE_REJECTED;

    const templateParams = {
      to_name: `${candidateData.firstName} ${candidateData.lastName}`,
      to_email: candidateData.email,
      candidate_name: `${candidateData.firstName} ${candidateData.lastName}`,
      new_status: newStatus,
      stage_type: candidateData.stageType,
      department: candidateData.department,
    };

    await emailjs.send(SERVICE_ID, templateId, templateParams, PUBLIC_KEY);
    return { success: true };
  } catch (error) {
    console.error('Email sending failed:', error);
    return { success: false, error };
  }
};