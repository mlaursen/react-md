import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';

import deprecated from 'react-prop-types/lib/deprecated';

/**
 * Lists present multiple line items vertically as a single continuous element.
 */
export default class List extends PureComponent {
  static propTypes = {
    /**
     * An optional style to apply to the list.
     */
    style: PropTypes.object,

    /**
     * An optional className to apply to the list.
     */
    className: PropTypes.string,

    /**
     * Boolean if this should be an ordered list (`<ol>`) component. Otherwise, it will
     * be rendered as `<ul>`.
     */
    ordered: PropTypes.object,

    /**
     * This *should* be a list of `ListItem`, `ListItemControl`, `Divider`, or
     * `Subheader`.
     */
    children: PropTypes.node,
    subheader: deprecated(PropTypes.string, 'Use the `Subheader` component as a child instead.'),
    primarySubheader: deprecated(PropTypes.bool, 'Use the `Subheader` component as a child instead.'),
  };

  render() {
    const { className, ordered, children, ...props } = this.props;
    const Component = ordered ? 'ol' : 'ul';
    return (
      <Component {...props} className={cn('md-list', className)}>
        {children}
      </Component>
    );
  }
}
