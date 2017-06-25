import PropTypes from 'prop-types';
import parameterShape from './parameterShape';
import sassdocLinkShape from './sassdocLinkShape';
import exampleShape from './exampleShape';

const variableType = PropTypes.oneOf(['Boolean', 'Number', 'String', 'Map', 'Color', 'List']);

export default PropTypes.shape({
  code: PropTypes.string.isRequired,
  oneLineCode: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['placeholder', 'variable', 'function', 'mixin']).isRequired,
  path: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,

  variableType, // Variables only
  examples: PropTypes.arrayOf(exampleShape),
  parameters: PropTypes.arrayOf(parameterShape),
  requires: PropTypes.arrayOf(sassdocLinkShape),
  returns: PropTypes.shape({
    description: PropTypes.string.isRequired,
    type: variableType.isRequired,
  }),
  see: PropTypes.arrayOf(sassdocLinkShape).isRequired,
  usedBy: PropTypes.arrayOf(sassdocLinkShape).isRequired,
});
