import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';
import FontIcon from './FontIcon';

export default class Collapser extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    iconClassName: PropTypes.string,
    children: PropTypes.node,
    flipped: PropTypes.bool,
    suffix: PropTypes.string,
    suffixFlipped: PropTypes.bool,
  };

  static defaultProps = {
    children: 'keyboard_arrow_down',
  };

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { className, flipped, suffix, suffixFlipped, ...props } = this.props;
    return (
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
  }
}
