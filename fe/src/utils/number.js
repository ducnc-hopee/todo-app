/**
 * Pads a number with leading zero if it's less than 10.
 * 
 * @param {number} number - The number to be padded.
 * @returns {string} - A string representing the number, padded with a leading zero if less than 10.
 * 
 * Example:
 *   zeroPad(3)  => "03"
 *   zeroPad(12) => "12"
 */

export const zeroPad = (number, length = 2) => {
  return String(number).padStart(length, '0');
};

