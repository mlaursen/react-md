import PropTypes from 'prop-types';

import sassdocShape from './sassdocShape';

export default PropTypes.shape({
  placeholders: PropTypes.arrayOf(sassdocShape).isRequired,
  variables: PropTypes.arrayOf(sassdocShape).isRequired,
  functions: PropTypes.arrayOf(sassdocShape).isRequired,
  mixins: PropTypes.arrayOf(sassdocShape).isRequired,
});
