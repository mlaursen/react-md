import { PropTypes } from 'react';
import lineType from './lineType';
import sassdocTypes from './sassdocTypes';

export default PropTypes.shape({
  access: PropTypes.string.isRequired,
  commentRange: lineType,
  context: PropTypes.shape({
    code: PropTypes.string.isRequired,
    line: lineType,
    name: PropTypes.string.isRequired,
    type: sassdocTypes,
  }).isRequired,
  description: PropTypes.string.isRequired,
  file: PropTypes.shape({
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
  }).isRequired,
  usedBy: PropTypes.arrayOf(PropTypes.shape({
    context: PropTypes.shape({
      code: PropTypes.string.isRequired,
      line: lineType,
      name: PropTypes.string.isRequired,
      type: sassdocTypes,
    }),
  })).isRequired,
});
