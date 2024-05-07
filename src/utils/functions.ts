/**
 * Cuts a text string to a maximum length and appends an ellipsis if the text exceeds the maximum length.
 *
 * @param {string} txt - The text string to be cut.
 * @param {number} [max=100] - The maximum length of the text string. Default is 100.
 * @returns {string} The truncated text string with an ellipsis if applicable.
 */

export function textCut (txt: string, max: number = 50) {
  if (txt.length >= max) return `${txt.slice(0, max)}...`
  return txt;
}