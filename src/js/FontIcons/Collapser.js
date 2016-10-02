import React, { PropTypes } from 'react';
import cn from 'classnames';
import FontIcon from './FontIcon';

const Collapser = ({ className, flipped, suffix, suffixFlipped, ...props }) => (
  <FontIcon
    key="collapser"
    {...props}
    className={cn('md-collapser', {
      'md-collapser--flipped': flipped && (!suffixFlipped || !suffix),
      [`md-collapser--${suffix}`]: suffix,
      [`md-collapser--${suffix}-flipped`]: suffix && flipped && suffixFlipped,
    }, className)}
  />
);

Collapser.propTypes = {
  className: PropTypes.string,
  iconClassName: PropTypes.string,
  children: PropTypes.node,
  flipped: PropTypes.bool,
  suffix: PropTypes.string,
  suffixFlipped: PropTypes.bool,
};

Collapser.defaultProps = {
  children: 'keyboard_arrow_down',
};

export default Collapser;
