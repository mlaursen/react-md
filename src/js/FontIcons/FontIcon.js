import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';

/**
 * Any additional props such as style or event listeners will also be included.
 */
export default class FontIcon extends PureComponent {
  static propTypes = {
    /**
     * The icon font library className to use to display the icon.
     */
    iconClassName: PropTypes.string.isRequired,

    /**
     * Any children required to display the icon with the font library.
     */
    children: PropTypes.node,

    /**
     * An optional className to apply to the `FontIcon`.
     */
    className: PropTypes.string,
  };

  static defaultProps = {
    iconClassName: 'material-icons',
  };

  render() {
    const { iconClassName, className, children, ...props } = this.props;
    return <i className={cn('md-icon', iconClassName, className)} {...props}>{children}</i>;
  }
}
