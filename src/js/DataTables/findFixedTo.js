export default function findFixedTo(table) {
  if (table && table.firstChild.firstChild.classList.contains('md-data-table__scroll-wrapper')) {
    return {
      x: table,
      y: table.firstChild.firstChild,
    };
  }

  return table;
}
