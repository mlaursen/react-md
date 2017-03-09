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

    /**
     * Boolean if the list should appear horizontally instead of vertically.
     */
    inline: PropTypes.bool,
    subheader: deprecated(PropTypes.string, 'Use the `Subheader` component as a child instead'),
    primarySubheader: deprecated(PropTypes.bool, 'Use the `Subheader` component as a child instead'),
  };

  static childContextTypes = {
    listLevel: PropTypes.number,
    cascadingMenu: PropTypes.bool,
    cascadingZDepth: PropTypes.number,
  };

  static contextTypes = {
    listLevel: PropTypes.number,
    cascadingMenu: PropTypes.bool,
    cascadingZDepth: PropTypes.number,
  };

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
    const {
      className,
      ordered,
      children,
      subheader,
      inline,
      primarySubheader,
      ...props
    } = this.props;
    const { cascadingMenu, cascadingZDepth, listLevel } = this.context;

    let subheaderEl;
    if (subheader) {
      subheaderEl = <Subheader key="subheader" primaryText={subheader} primary={primarySubheader} />;
    }

    const Component = ordered ? 'ol' : 'ul';
    return (
      <Component
        {...props}
        className={cn('md-list', {
          'md-list--inline': inline,
          'md-list--menu-cascading': cascadingMenu,
          [`md-paper md-paper--${cascadingZDepth}`]: cascadingZDepth && cascadingMenu,
          [`md-list--nested-${listLevel}`]: listLevel && !cascadingMenu,
        }, className)}
      >
        {subheaderEl}
        {children}
      </Component>
    );
  }
}
