import { PropTypes } from 'react';

export default {
  uncheckedIconClassName: PropTypes.string.isRequired,
  uncheckedIconChildren: PropTypes.node,
  checkedIconClassName: PropTypes.string.isRequired,
  checkedIconChildren: PropTypes.node,
  rowId: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  baseName: PropTypes.string.isRequired,
  createCheckbox: PropTypes.func.isRequired,
  removeCheckbox: PropTypes.func.isRequired,
};
