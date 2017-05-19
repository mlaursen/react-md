import PropTypes from 'prop-types';

export default {
  checkedIconChildren: PropTypes.node,
  checkedIconClassName: PropTypes.string,
  uncheckedIconChildren: PropTypes.node,
  uncheckedIconClassName: PropTypes.string,
  indeterminateIconChildren: PropTypes.node,
  indeterminateIconClassName: PropTypes.string,
  indeterminate: PropTypes.bool,
  plain: PropTypes.bool,
  selectableRows: PropTypes.bool.isRequired,
  allSelected: PropTypes.bool.isRequired,
  selectedRows: PropTypes.arrayOf(PropTypes.bool).isRequired,
  createCheckbox: PropTypes.func.isRequired,
  removeCheckbox: PropTypes.func.isRequired,
  toggleSelectedRow: PropTypes.func.isRequired,
  baseId: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  baseName: PropTypes.string,
  checkboxHeaderLabel: PropTypes.string.isRequired,
  checkboxLabelTemplate: PropTypes.string.isRequired,
  fixedHeader: PropTypes.bool.isRequired,
  fixedFooter: PropTypes.bool.isRequired,
};
