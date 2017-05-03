import PropTypes from 'prop-types';
import headerContextTypes from './headerContextTypes';

const rowContextTypes = Object.assign({}, headerContextTypes, {
  rowId: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
});

delete rowContextTypes.baseId;
export default rowContextTypes;
