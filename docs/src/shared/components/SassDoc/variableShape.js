import { PropTypes } from 'react';

import lineType from './lineType';
import sassdocTypes from './sassdocTypes';

export default PropTypes.shape({
  access: PropTypes.string.isRequired,
  commentRange: lineType,
  context: PropTypes.shape({
    line: lineType,
    name: PropTypes.string.isRequired,
    scope: PropTypes.string.isRequired,
    type: sassdocTypes,
    value: PropTypes.string.isRequired,
  }).isRequired,
  description: PropTypes.string.isRequired,
  file: PropTypes.shape({
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
  }).isRequired,
  group: PropTypes.arrayOf(PropTypes.string).isRequired,
  type: PropTypes.string.isRequired,
});
