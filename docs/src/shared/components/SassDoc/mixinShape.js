import { PropTypes } from 'react';
import parameterShape from './parameterShape';

import lineType from './lineType';
export default PropTypes.shape({
  access: PropTypes.string.isRequired,
  commentRange: lineType,
  context: PropTypes.shape({
    code: PropTypes.string.isRequired,
    line: lineType,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
  description: PropTypes.string.isRequired,
  example: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  })),
  parameter: PropTypes.arrayOf(parameterShape),
  require: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  })),
});
