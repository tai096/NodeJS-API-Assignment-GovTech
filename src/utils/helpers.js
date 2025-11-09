/**
 * Utility functions for the application
 */

/**
 * Validate email format
 * @param {string} email - Email address to validate
 * @returns {boolean} - True if valid, false otherwise
 */
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Extract email mentions from text
 * Pattern: @email@domain.com
 * @param {string} text - Text to extract mentions from
 * @returns {string[]} - Array of mentioned email addresses
 */
const extractMentions = (text) => {
  const mentionRegex = /@([^\s@]+@[^\s@]+\.[^\s@]+)/g;
  const mentions = [];
  let match;

  while ((match = mentionRegex.exec(text)) !== null) {
    mentions.push(match[1]);
  }

  return mentions;
};

/**
 * Remove duplicate values from array
 * @param {Array} array - Array to deduplicate
 * @returns {Array} - Array without duplicates
 */
const removeDuplicates = (array) => {
  return [...new Set(array)];
};

/**
 * Sort array of strings (case-insensitive)
 * @param {string[]} array - Array to sort
 * @returns {string[]} - Sorted array
 */
const sortStrings = (array) => {
  return array.sort((a, b) => a.localeCompare(b));
};

/**
 * Format error response
 * @param {string} message - Error message
 * @param {number} statusCode - HTTP status code
 * @returns {Object} - Error object
 */
const formatError = (message, statusCode = 500) => {
  return {
    message,
    statusCode,
  };
};

/**
 * Validate required fields in request body
 * @param {Object} body - Request body
 * @param {string[]} requiredFields - Array of required field names
 * @returns {Object|null} - Error object if validation fails, null otherwise
 */
const validateRequiredFields = (body, requiredFields) => {
  const missingFields = [];

  for (const field of requiredFields) {
    if (!body[field]) {
      missingFields.push(field);
    }
  }

  if (missingFields.length > 0) {
    return formatError(`Missing required fields: ${missingFields.join(", ")}`, 400);
  }

  return null;
};

/**
 * Validate array field
 * @param {any} value - Value to validate
 * @param {string} fieldName - Name of the field
 * @returns {Object|null} - Error object if validation fails, null otherwise
 */
const validateArray = (value, fieldName = "field") => {
  if (!Array.isArray(value)) {
    return formatError(`${fieldName} must be an array`, 400);
  }

  if (value.length === 0) {
    return formatError(`${fieldName} cannot be empty`, 400);
  }

  return null;
};

/**
 * Validate email array
 * @param {string[]} emails - Array of email addresses
 * @param {string} fieldName - Name of the field
 * @returns {Object|null} - Error object if validation fails, null otherwise
 */
const validateEmailArray = (emails, fieldName = "emails") => {
  const arrayValidation = validateArray(emails, fieldName);
  if (arrayValidation) return arrayValidation;

  for (const email of emails) {
    if (!isValidEmail(email)) {
      return formatError(`Invalid email format: ${email}`, 400);
    }
  }

  return null;
};

/**
 * Sanitize string input (basic XSS prevention)
 * @param {string} str - String to sanitize
 * @returns {string} - Sanitized string
 */
const sanitizeString = (str) => {
  if (typeof str !== "string") return str;

  return str.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;").replace(/\//g, "&#x2F;");
};

/**
 * Log with timestamp
 * @param {string} message - Message to log
 * @param {string} level - Log level (info, error, warn)
 */
const log = (message, level = "info") => {
  const timestamp = new Date().toISOString();
  const prefix = `[${timestamp}] [${level.toUpperCase()}]`;

  switch (level) {
    case "error":
      console.error(`${prefix} ${message}`);
      break;
    case "warn":
      console.warn(`${prefix} ${message}`);
      break;
    default:
      console.log(`${prefix} ${message}`);
  }
};

export {
  isValidEmail,
  extractMentions,
  removeDuplicates,
  sortStrings,
  formatError,
  validateRequiredFields,
  validateArray,
  validateEmailArray,
  sanitizeString,
  log,
};
