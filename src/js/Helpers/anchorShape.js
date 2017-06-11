import PropTypes from 'prop-types';
import HorizontalAnchors from './HorizontalAnchors';
import VerticalAnchors from './VerticalAnchors';

export default PropTypes.shape({
  x: PropTypes.oneOf([
    HorizontalAnchors.LEFT,
    HorizontalAnchors.INNER_LEFT,
    HorizontalAnchors.CENTER,
    HorizontalAnchors.RIGHT,
    HorizontalAnchors.INNER_RIGHT,
  ]).isRequired,
  y: PropTypes.oneOf([
    VerticalAnchors.TOP,
    VerticalAnchors.CENTER,
    VerticalAnchors.OVERLAP,
    VerticalAnchors.BOTTOM,
  ]).isRequired,
});
