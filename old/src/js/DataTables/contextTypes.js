import PropTypes from 'prop-types';

export default {
  checkedIcon: PropTypes.element,
  uncheckedIcon: PropTypes.element,
  indeterminateIcon: PropTypes.element,
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
