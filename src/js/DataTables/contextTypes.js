import { PropTypes } from 'react';

export default {
  uncheckedIconClassName: PropTypes.string.isRequired,
  uncheckedIconChildren: PropTypes.node,
  checkedIconClassName: PropTypes.string.isRequired,
  checkedIconChildren: PropTypes.node,
  plain: PropTypes.bool,
  allSelected: PropTypes.bool.isRequired,
  selectedRows: PropTypes.arrayOf(PropTypes.bool).isRequired,
  createCheckbox: PropTypes.func.isRequired,
  removeCheckbox: PropTypes.func.isRequired,
  toggleAllRows: PropTypes.func.isRequired,
  toggleSelectedRow: PropTypes.func.isRequired,
  baseId: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  baseName: PropTypes.string,
};
