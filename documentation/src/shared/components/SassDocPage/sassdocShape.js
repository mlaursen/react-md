import { PropTypes } from 'react';

import parameterShape from './parameterShape';

export default PropTypes.shape({
  code: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  variableType: PropTypes.string, // Variables only
  type: PropTypes.oneOf(['placeholder', 'variable', 'function', 'mixin']).isRequired,
  path: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,

  parameters: PropTypes.arrayOf(parameterShape),
  requires: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  })),
  usedBy: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  })),

  examples: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  })),
});
