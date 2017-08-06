import React, { PureComponent, Children, cloneElement, isValidElement } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import isRequiredForA11y from 'react-prop-types/lib/isRequiredForA11y';

import themeColors from '../utils/themeColors';

/**
 * The main use case of the `Badge` component is for notifications. It can
 * however also place any content floating to whatever children are supplied.
 */
export default class Badge extends PureComponent {
  static propTypes = {
    /**
     * An optional style to apply to the badge's container.
     */
    style: PropTypes.object,

    /**
     * An optional className to apply to the badge's container.
     */
    className: PropTypes.string,

    /**
     * An optional style to apply to the badge.
     */
    badgeStyle: PropTypes.object,

    /**
     * An optional className to apply to the badge.
     */
    badgeClassName: PropTypes.string,

    /**
     * The id to give the badge's content. This is required to help with the
     * `aria-describedby` attribute that should be applied to one of the children.
     *
     * If there is only one child that is a valid React element, the `aria-describedby`
     * will automatically be cloned into that child (so make sure your component passes
     * that prop correctly).
     *
     * If there is only one child, but it is a string or number, the badge's container
     * will be updated to include the `aria-describedby`.
     *
     * If there is more than child, you are required to add it to a child yourself.
     */
    badgeId: isRequiredForA11y(PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ])),

    /**
     * The content to display with the badge's content. The size of this
     * element is determinate of the location of the content. You might have
     * to update the positioning yourself.
     */
    children: PropTypes.node.isRequired,

    /**
     * The component to render the badge as.
     */
    component: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
    ]).isRequired,

    /**
     * The content to display in the badge. If the content is a number or a number string,
     * the number will be normalized if `normalizeContent` is enabled.
     */
    badgeContent: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
      PropTypes.node,
    ]).isRequired,

    /**
     * This will basically update the display value of the content to only be 2 digits. If
     * a number is greater than 99, 99+ will be displayed instead. This is really just to
     * keep the count inside the circular bubble.
     */
    max: PropTypes.number,

    /**
     * Boolean if the primary color background should get applied to the badge's content.
     */
    primary: PropTypes.bool,

    /**
     * Boolean if the secondary color background should get applied to the badge's content.
     */
    secondary: PropTypes.bool,

    /**
     * Boolean if the default styles should be applied.
     */
    default: PropTypes.bool,

    /**
     * Boolean if the badge's content should appear in a circular container. If this is
     * undefined, the content will be in a circular container if the badgeContent is a number.
     */
    circular: PropTypes.bool,

    /**
     * Boolean if the badge's notification should be invisible when the count is 0.
     */
    invisibleOnZero: PropTypes.bool,
  };

  static defaultProps = {
    max: 99,
    component: 'div',
  };

  constructor(props) {
    super(props);

    const single = this._isSingleChild(props);
    this.state = {
      single,
      element: single && isValidElement(props.children),
      count: this._normalizeCount(props),
    };
  }

  componentWillReceiveProps(nextProps) {
    const { badgeContent, max, children } = this.props;
    let nextState;
    if (badgeContent !== nextProps.badgeContent || max !== nextProps.max) {
      nextState = { count: this._normalizeCount(nextProps) };
    }

    if (children !== nextProps.children) {
      nextState = nextState || {};
      nextState.single = this._isSingleChild(nextProps);
      nextState.element = nextState.single && isValidElement(nextProps.children);
    }

    if (nextState) {
      this.setState(nextState);
    }
  }

  _isSingleChild({ children }) {
    return Children.count(children) === 1;
  }

  _normalizeCount({ badgeContent, max }) {
    let count;
    if (max) {
      const n = parseInt(badgeContent, 10);
      if (!Number.isNaN(n) && n.toString() === badgeContent.toString()) {
        count = n > max ? `${max}+` : n;
      }
    }

    return count;
  }

  render() {
    const { count, single, element } = this.state;
    const {
      className,
      badgeStyle,
      badgeClassName,
      badgeContent,
      component: Component,
      children,
      primary,
      secondary,
      default: defaultTheme,
      circular,
      badgeId,
      invisibleOnZero,
      max, // eslint-disable-line no-unused-vars
      ...props
    } = this.props;

    const useCircular = typeof circular !== 'undefined' ? circular : typeof count !== 'undefined';
    let content = children;
    if (single && element) {
      const c = Children.only(content);
      if (!c.props['aria-describedby']) {
        content = cloneElement(c, { 'aria-describedby': badgeId });
      }
    } else if (single && !element && !props['aria-describedby']) {
      props['aria-describedby'] = badgeId;
    }

    const badge = (
      <span
        id={badgeId}
        key="badge"
        role="status"
        style={badgeStyle}
        className={cn('md-badge', {
          'md-badge--circular': useCircular,
          'md-badge--default': defaultTheme,
        }, themeColors({
          primary,
          secondary,
          text: useCircular,
          themeText: !primary && !secondary,
        }, badgeClassName))}
      >
        {count || badgeContent}
      </span>
    );

    return (
      <Component
        {...props}
        className={cn('md-badge-container md-inline-block', className)}
      >
        {content}
        {invisibleOnZero && count === 0 ? null : badge}
      </Component>
    );
  }
}
