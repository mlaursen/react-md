import { PropTypes } from 'react';

export default PropTypes.shape({
  docblock: PropTypes.string,
  modifiers: PropTypes.arrayOf(PropTypes.oneOf(['static'])),
  name: PropTypes.string.isRequired,
  params: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    type: PropTypes.shape({
      name: PropTypes.string,
    }),
  })),
  returns: PropTypes.shape({
    description: PropTypes.string,
    type: PropTypes.shape({
      name: PropTypes.string,
    }),
  }),
});
