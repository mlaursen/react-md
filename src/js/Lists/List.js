import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import cn from 'classnames';
import deprecated from 'react-prop-types/lib/deprecated';

import getField from '../utils/getField';
import fixedToShape from '../Helpers/fixedToShape';
import Subheader from '../Subheaders';

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
    cascadingFixedTo: fixedToShape,
    cascadingZDepth: PropTypes.number,
  };

  static contextTypes = {
    listLevel: PropTypes.number,
    cascadingMenu: PropTypes.bool,
    cascadingFixedTo: fixedToShape,
    cascadingZDepth: PropTypes.number,
  };

  state = {};

  getChildContext() {
    const { listLevel, ...context } = this.context;
    const cascadingFixedTo = getField(this.state, this.context, 'cascadingFixedTo');
    return {
      ...context,
      cascadingFixedTo,
      listLevel: typeof listLevel === 'undefined'
        ? 1
        : listLevel + 1,
    };
  }

  componentDidMount() {
    if (this.context.cascadingMenu) {
      const list = findDOMNode(this);
      if (list.offsetHeight < list.scrollHeight) {
        const cascadingFixedTo = { y: findDOMNode(this) };
        this.setState({ cascadingFixedTo }); // eslint-disable-line react/no-did-mount-set-state
      }
    }
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
          [`md-paper md-paper--${cascadingZDepth}`]: cascadingZDepth && cascadingMenu && listLevel > 0,
          [`md-list--nested-${listLevel}`]: listLevel && !cascadingMenu,
        }, className)}
      >
        {subheaderEl}
        {children}
      </Component>
    );
  }
}
