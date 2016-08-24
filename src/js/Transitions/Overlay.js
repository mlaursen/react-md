import React, { PureComponent, PropTypes } from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import cn from 'classnames';

/**
 * This is a controlled component for rendering an overlay on the page.
 *
 * Any event listeners will be applied to overlay instead of the `CSSTransitionGroup`
 * containing the overlay when open.
 */
export default class Overlay extends PureComponent {
  static propTypes = {
    /**
     * Boolean if the Overlay is currently open.
     */
    isOpen: PropTypes.bool.isRequired,

    /**
     * An optional function to call when the overlay is clicked.
     */
    onClick: PropTypes.func,

    /**
     * The transition name for the overlay.
     */
    transitionName: PropTypes.string.isRequired,

    /**
     * The enter timeout for the overlay when it has been toggled on.
     */
    transitionEnterTimeout: PropTypes.number.isRequired,

    /**
     * The leave timeout for the overlay when it has been toggled off.
     */
    transitionLeaveTimeout: PropTypes.number.isRequired,

    /**
     * An optional style to apply to the `CSSTransitionGroup` containing the overlay.
     */
    style: PropTypes.object,

    /**
     * An optional className to apply to the `CSSTransitionGroup` holding the overlay.
     */
    className: PropTypes.string,

    /**
     * The component to render the `CSSTransitionGroup` as.
     */
    component: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
    ]).isRequired,

    /**
     * An optional style to apply to the overlay itself.
     */
    overlayStyle: PropTypes.object,

    /**
     * An optional className to apply to the overlay itself.
     */
    overlayClassName: PropTypes.string,
  };

  static defaultProps = {
    component: 'span',
    transitionName: 'md-overlay',
    transitionEnterTimeout: 150,
    transitionLeaveTimeout: 150,
  };

  render() {
    const {
      isOpen,
      component,
      style,
      className,
      overlayStyle,
      overlayClassName,
      transitionName,
      transitionEnterTimeout,
      transitionLeaveTimeout,
      ...props,
    } = this.props;

    let overlay;
    if (isOpen) {
      const overlayProps = {
        key: 'overlay',
        style: overlayStyle,
        className: cn('md-overlay', overlayClassName),
        ...props,
      };

      overlay = <div {...overlayProps} />;
    }

    return (
      <CSSTransitionGroup
        component={component}
        style={style}
        className={className}
        transitionName={transitionName}
        transitionEnterTimeout={transitionEnterTimeout}
        transitionLeaveTimeout={transitionLeaveTimeout}
      >
        {overlay}
      </CSSTransitionGroup>
    );
  }
}
