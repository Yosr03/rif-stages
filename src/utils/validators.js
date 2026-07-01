/**
 * Validates email format
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validates phone number (Tunisian or French format)
 */
export const isValidPhone = (phone) => {
  const phoneRegex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,4}[-\s\.]?[0-9]{1,9}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

/**
 * Sanitizes input to prevent XSS
 */
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

/**
 * Validates required fields
 */
export const isNotEmpty = (value) => {
  return value !== null && value !== undefined && value.toString().trim() !== '';
};

/**
 * Validates file type
 */
export const isValidFileType = (file, allowedTypes) => {
  return allowedTypes.includes(file.type);
};

/**
 * Validates file size (in MB)
 */
export const isValidFileSize = (file, maxSizeMB) => {
  return file.size <= maxSizeMB * 1024 * 1024;
};

/**
 * Validates date is in the future
 */
export const isFutureDate = (dateString) => {
  return new Date(dateString) > new Date();
};

/**
 * Validates end date is after start date
 */
export const isEndDateAfterStart = (startDate, endDate) => {
  return new Date(endDate) > new Date(startDate);
};

/**
 * Validate entire candidature form
 */
export const validateCandidatureForm = (formData) => {
  const errors = {};

  if (!isNotEmpty(formData.firstName)) {
    errors.firstName = 'Le prénom est requis';
  } else if (formData.firstName.length < 2) {
    errors.firstName = 'Le prénom doit contenir au moins 2 caractères';
  }

  if (!isNotEmpty(formData.lastName)) {
    errors.lastName = 'Le nom est requis';
  } else if (formData.lastName.length < 2) {
    errors.lastName = 'Le nom doit contenir au moins 2 caractères';
  }

  if (!isNotEmpty(formData.email)) {
    errors.email = 'L\'email est requis';
  } else if (!isValidEmail(formData.email)) {
    errors.email = 'Format d\'email invalide';
  }

  if (!isNotEmpty(formData.phone)) {
    errors.phone = 'Le téléphone est requis';
  } else if (!isValidPhone(formData.phone)) {
    errors.phone = 'Format de téléphone invalide';
  }

  if (!isNotEmpty(formData.dateOfBirth)) {
    errors.dateOfBirth = 'La date de naissance est requise';
  }

  if (!isNotEmpty(formData.educationLevel)) {
    errors.educationLevel = 'Le niveau d\'études est requis';
  }

  if (!isNotEmpty(formData.university)) {
    errors.university = 'L\'établissement est requis';
  }

  if (!isNotEmpty(formData.stageType)) {
    errors.stageType = 'Le type de stage est requis';
  }

  if (!isNotEmpty(formData.department)) {
    errors.department = 'Le département est requis';
  }

  if (!isNotEmpty(formData.startDate)) {
    errors.startDate = 'La date de début est requise';
  }

  if (!isNotEmpty(formData.endDate)) {
    errors.endDate = 'La date de fin est requise';
  } else if (formData.startDate && !isEndDateAfterStart(formData.startDate, formData.endDate)) {
    errors.endDate = 'La date de fin doit être après la date de début';
  }

  if (!isNotEmpty(formData.motivation)) {
    errors.motivation = 'La lettre de motivation est requise';
  } else if (formData.motivation.length < 50) {
    errors.motivation = 'La motivation doit contenir au moins 50 caractères';
  }

  return errors;
};