import React, { PureComponent, PropTypes, Children, cloneElement } from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import cn from 'classnames';

import TICK from '../constants/CSSTransitionGroupTick';
import oneRequired from '../utils/PropTypes/oneRequired';
import invalidIf from '../utils/PropTypes/invalidIf';
import CardTitleBlock from '../Cards/CardTitleBlock';

/**
 * The `TableCardHeader` is used when contextual actions should appear when
 * a user selects a row.
 */
export default class TableCardHeader extends PureComponent {
  static propTypes = {
    /**
     * An optional style to apply.
     */
    style: PropTypes.object,

    /**
     * An optional className to apply.
     */
    className: PropTypes.string,

    /**
     * The component to render as.
     */
    component: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.string,
    ]).isRequired,

    /**
     * The transition name to use when the contextual header appears.
     */
    transitionName: PropTypes.string.isRequired,

    /**
     * The transition time to use when the contextual header appears.
     */
    transitionEnterTimeout: PropTypes.number.isRequired,

    /**
     * The transition time to use when the contextual header disappears.
     */
    transitionLeaveTimeout: PropTypes.number.isRequired,

    /**
     * An optional title to display. It is invalid to have both `title` and `leftChildren`
     * defined as only one will be used.
     */
    title: oneRequired(PropTypes.node, 'leftChildren', 'children'),

    /**
     * An optional title to display in the contextual header. This will get wrapped in an `h2`
     * tag and additional styles applied.
     */
    contextualTitle: PropTypes.node,

    /**
     * Any additional children to display in the contextual header. This will be displayed after
     * the optional `contextualTile` and before the `actions`.
     */
    contextualChildren: PropTypes.node,

    /**
     * An optional button or list of buttons to display instead of a title.
     */
    leftChildren: invalidIf(PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.arrayOf(PropTypes.element),
    ]), 'title'),

    /**
     * An additional children to display after the `title` or `leftChildren` prop.
     * This is _normally_ a list of icon button or menu button.
     */
    children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.arrayOf(PropTypes.element),
    ]),

    /**
     * An optional button/menu button or a list of button/menu button to display in the
     * contextual header once the user has selected a row or multiple rows.
     */
    actions: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.arrayOf(PropTypes.element),
    ]),

    /**
     * Boolean if the `actions` prop should not have each element cloned with additional
     * class names.
     */
    noActionsAdjust: PropTypes.bool,

    /**
     * Boolean if the `children` prop should not have each element cloned with additional
     * class names.
     */
    noChildrenAdjust: PropTypes.bool,

    /**
     * Boolean if the `leftChildren` prop should not have each element cloned with additional
     * class names.
     */
    noLeftChildrenClone: PropTypes.bool,

    /**
     * Boolean if the contextual header is currently visible.
     */
    visible: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    component: 'header',
    transitionName: 'md-drop-down',
    transitionEnterTimeout: 150,
    transitionLeaveTimeout: 150,
  };

  constructor(props) {
    super(props);

    this.state = { animating: false };
  }

  componentWillReceiveProps(nextProps) {
    const { visible } = this.props;
    const { visible: nVisible, transitionEnterTimeout, transitionLeaveTimeout } = nextProps;
    const timeout = !nVisible ? transitionLeaveTimeout : transitionEnterTimeout;
    if (visible !== nVisible) {
      if (this._timeout) {
        clearTimeout(this._timeout);
      }

      this._timeout = setTimeout(() => {
        this._timeout = setTimeout(() => {
          this._timeout = null;
          this.setState({ animating: false });
        }, timeout);
      }, TICK);

      if (!this.state.animating) {
        this.setState({ animating: true });
      }
    }
  }

  _cloneCellRight(noAdjust, children) {
    if (noAdjust || !children) {
      return children;
    }

    return Children.map(Children.toArray(children), (child, i) => {
      if (i === 0) {
        return cloneElement(child, { className: cn('md-cell--right', child.props.className) });
      }

      return child;
    });
  }

  _cloneLeftChildren(noClone, children) {
    if (noClone || !children) {
      return children;
    }

    return Children.map(Children.toArray(children), child => cloneElement(child, {
      className: cn('md-btn--dialog', child.props.className),
    }));
  }

  render() {
    const { animating } = this.state;
    const {
      style,
      className,
      title,
      actions,
      contextualChildren,
      noActionsAdjust,
      noChildrenAdjust,
      noLeftChildrenClone,
      visible,
      ...props
    } = this.props;
    delete props.children;
    delete props.leftChildren;
    delete props.contextualTitle;

    let { children, leftChildren, contextualTitle } = this.props;
    children = this._cloneCellRight(noChildrenAdjust, children);
    leftChildren = this._cloneLeftChildren(noLeftChildrenClone, leftChildren);

    if (title) {
      children = (
        <div className="md-card-title" key="main-title">
          <CardTitleBlock title={title} />
          {children}
        </div>
      );
    } else if (leftChildren) {
      leftChildren = Children.toArray(leftChildren);

      if (children) {
        children = leftChildren.concat(Children.toArray(children));
      } else {
        children = leftChildren;
      }
    }

    if (contextualTitle) {
      contextualTitle = (
        <h2 className="md-card-title--title md-card-title--title-contextual">
          {contextualTitle}
        </h2>
      );
    }

    const contextualHeader = (
      <div key="contextual-header" className="md-card-title md-card-title--contextual">
        {contextualTitle}
        {contextualChildren}
        {this._cloneCellRight(noActionsAdjust, actions)}
      </div>
    );

    let mergedStyles = style;
    if (animating) {
      mergedStyles = Object.assign({}, style, { overflow: 'hidden' });
    }

    return (
      <CSSTransitionGroup
        {...props}
        style={mergedStyles}
        className={cn('md-table-card-header', {
          'md-table-card-header--no-title': !title,
        }, className)}
      >
        {children}
        {visible ? contextualHeader : null}
      </CSSTransitionGroup>
    );
  }
}
