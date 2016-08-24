import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';

/**
 * The `Subheader` component is generally used inside of lists or menus.
 */
export default class Subheader extends PureComponent {
  static propTypes = {
    /**
     * The text to display as a subheader.
     */
    primaryText: PropTypes.string.isRequired,

    /**
     * The component to render the Subheader as.
     */
    component: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
    ]).isRequired,

    /**
     * An optional className to apply to the subheader.
     */
    className: PropTypes.string,

    /**
     * Boolean if the subheader should be styled with the primary color.
     */
    primary: PropTypes.bool,

    /**
     * Boolean if the Subheader is inset in the list. This will add additional
     * spacing to align the subheader.
     */
    inset: PropTypes.bool,
  };

  static defaultProps = {
    component: 'li',
  };

  render() {
    const { component, inset, primary, primaryText, className, ...props } = this.props;
    delete props.expanderIconChildren;
    delete props.expanderIconClassName;

    return React.createElement(component, {
      ...props,
      className: cn('md-subheader', className, {
        inset,
        'md-primary': primary,
      }),
    }, primaryText);
  }
}
