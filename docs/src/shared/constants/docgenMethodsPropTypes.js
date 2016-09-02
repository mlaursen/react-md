import { PropTypes } from 'react';

const methods = PropTypes.arrayOf(PropTypes.shape({
  docblock: PropTypes.string,
  modifiers: PropTypes.arrayOf(PropTypes.string).isRequired,
  name: PropTypes.string.isRequired,
  params: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    type: PropTypes.shape({
      name: PropTypes.string,
    }),
  })).isRequired,
  returns: PropTypes.shape({
    description: PropTypes.string,
    type: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  }),
})).isRequired;

export default methods;
