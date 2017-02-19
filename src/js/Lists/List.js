import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';
import Subheader from '../Subheaders';

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
    ordered: PropTypes.bool,

    /**
     * This *should* be a list of `ListItem`, `ListItemControl`, `Divider`, or
     * `Subheader`.
     */
    children: PropTypes.node,
    subheader: deprecated(PropTypes.string, 'Use the `Subheader` component as a child instead'),
    primarySubheader: deprecated(PropTypes.bool, 'Use the `Subheader` component as a child instead'),
  };

  static contextTypes = {
    listLevel: PropTypes.number,
    cascading: PropTypes.bool,
  }

  static childContextTypes = {
    listLevel: PropTypes.number,
    cascading: PropTypes.bool,
  }

  getChildContext() {
    const listLevel = this.context.listLevel || 0;

    return {
      listLevel: listLevel + 1,
      cascading: this.context.cascading,
    };
  }

  render() {
    const { className, ordered, children, subheader, primarySubheader, ...props } = this.props;
    const { listLevel, cascading } = this.context;

    let subheaderEl;
    if (subheader) {
      subheaderEl = <Subheader key="subheader" primaryText={subheader} primary={primarySubheader} />;
    }

    const Component = ordered ? 'ol' : 'ul';
    return (
      <Component
        {...props}
        className={cn('md-list', {
          'md-list--cascading-menu': cascading,
          [`md-list--nested-${listLevel}`]: listLevel,
          'md-paper md-paper--2': cascading,
        }, className)}
      >
        {subheaderEl}
        {children}
      </Component>
    );
  }
}
