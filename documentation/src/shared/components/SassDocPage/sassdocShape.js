import { PropTypes } from 'react';

export default PropTypes.shape({
  code: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['placeholder', 'variable', 'function', 'mixin']).isRequired,
  path: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,

  parameters: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    default: PropTypes.string,
    description: PropTypes.string,
    type: PropTypes.string.isRequired,
  })),
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
