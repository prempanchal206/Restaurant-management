/**
 * Removes all non-numeric characters from the input.
 * @param {string} value - The input value to sanitize.
 * @returns {string} - The sanitized numeric string.
 */
export function allowOnlyNumbers(value) {
  return value.replace(/[^0-9]/g, "");
}

/**
 * Maximum character length constraints for input fields.
 */
export const maxLength = {
  contact: 10,
};
