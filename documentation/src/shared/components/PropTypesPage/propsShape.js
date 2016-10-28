import { PropTypes } from 'react';

const typeShape = PropTypes.oneOfType([
  PropTypes.shape({
    name: PropTypes.oneOf(['string', 'bool', 'number', 'object', 'func']).isRequired,
  }),
  PropTypes.shape({
    name: PropTypes.oneOf(['custom']).isRequired,
    raw: PropTypes.string.isRequired,
  }),
  PropTypes.shape({
    name: PropTypes.oneOf(['union']).isRequired,
    value: PropTypes.arrayOf(PropTypes.object), // Really this shape again.
  }),
]).isRequired;

export default PropTypes.shape({
  propName: PropTypes.string.isRequired,
  description: PropTypes.string,
  required: PropTypes.bool.isRequired,
  type: typeShape,
  defaultValue: PropTypes.shape({
    computed: PropTypes.bool.isRequired,
    value: PropTypes.string,
  }),
});
