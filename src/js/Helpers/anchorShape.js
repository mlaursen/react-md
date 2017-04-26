import { PropTypes } from 'react';
export const HorizontalAnchors = {
  LEFT: 'left',
  INNER_LEFT: 'inner left',
  CENTER: 'center',
  RIGHT: 'right',
  INNER_RIGHT: 'inner right',
};
export const VerticalAnchors = {
  TOP: 'top',
  CENTER: 'center',
  OVERLAP: 'overlap',
  BOTTOM: 'bottom',
};

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
