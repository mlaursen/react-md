/**
 * Attempts fo find the base table component from an element in the table.
 * This will either be the wrapper for responsive data tables, or the table element.
 *
 * @param {Object} el - The element to traverse from
 * @param {Object} the table or null.
 */
export default function findTable(el) {
  let table;
  let node = el;
  while (node && node.parentNode) {
    if (node.classList && node.classList.contains('md-data-table')) {
      // Attempt to check one more element up to see if there is a table-container
      // for responsive tables.
      table = node;
    } else if (node.classList && node.classList.contains('md-data-table--responsive')) {
      return node;
    } else if (table) {
      return table;
    }

    node = node.parentNode;
  }

  return null;
}
