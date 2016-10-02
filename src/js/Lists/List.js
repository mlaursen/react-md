import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';
import Subheader from '../Subheaders';

import deprecated from 'react-prop-types/lib/deprecated';
import contextTypes from '../Menus/contextTypes';

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
    ordered: PropTypes.bool,

    /**
     * This *should* be a list of `ListItem`, `ListItemControl`, `Divider`, or
     * `Subheader`.
     */
    children: PropTypes.node,
    subheader: deprecated(PropTypes.string, 'Use the `Subheader` component as a child instead'),
    primarySubheader: deprecated(PropTypes.bool, 'Use the `Subheader` component as a child instead'),
  };

  static childContextTypes = contextTypes;
  static contextTypes = contextTypes;

  getChildContext() {
    const { listLevel, ...context } = this.context;
    return {
      ...context,
      listLevel: typeof listLevel === 'undefined'
        ? 1
        : listLevel + 1,
    };
  }

  render() {
    const { className, ordered, children, subheader, primarySubheader, ...props } = this.props;
    const { menuPosition, menuCascading, listLevel } = this.context;

    let subheaderEl;
    if (subheader) {
      subheaderEl = <Subheader key="subheader" primaryText={subheader} primary={primarySubheader} />;
    }

    const Component = ordered ? 'ol' : 'ul';
    return (
      <Component
        {...props}
        className={cn('md-list', {
          'md-list--menu': menuPosition,
          'md-list--menu-scrollable': menuPosition && !menuCascading,
          'md-list--menu-cascading': menuCascading,
          'md-list--menu-nested': menuPosition && listLevel,
          [`md-list--nested-${listLevel}`]: listLevel && !menuPosition,
          [`md-list--menu-${menuPosition}`]: menuPosition,
        }, className)}
      >
        {subheaderEl}
        {children}
      </Component>
    );
  }
}
