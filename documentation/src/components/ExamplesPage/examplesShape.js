import { PropTypes } from 'react';

export default PropTypes.shape({
  readme: PropTypes.string.isRequired,
  examples: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    code: PropTypes.string.isRequired,
    component: PropTypes.func.isRequired,
    tableCard: PropTypes.bool,
  })),
});
