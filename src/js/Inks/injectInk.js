import React, { PureComponent, PropTypes } from 'react';

import InkContainer from './InkContainer';

/**
 * Takes any component and injects an ink container for having the Material Design Ink effect.
 *
 * The default triggers for an ink are:
 * - mouse down event
 * - touch start event
 * - keyboard focus with tab key
 * - form submit
 *
 * The form submit ink will only be triggered if the `ComposedComponent` has the attribute
 * `type="submit"`, the `ComposedComponent` is in a form, and the user hits the `enter` key
 * while not actively focusing the `ComposedComponent`.
 *
 * Any additional keyboard focus keys can also be added.
 *
 * ```js
 * @param {function} ComposedComponent - The React Component to inject an `ink` prop into.
 * @return {function} a new React class rendering the `ComposedComponent` and adding an
 *    `ink` pop.
 * ```
 */
export default ComposedComponent => class InkedComponent extends PureComponent {
  static propTypes = {
    /**
     * An optional style to apply to each ink that gets generated.
     */
    inkStyle: PropTypes.object,

    /**
     * An optional className to apply to each ink that gets generated.
     */
    inkClassName: PropTypes.string,

    /**
     * An optional style to apply to the ink's container.
     */
    inkContainerStyle: PropTypes.object,

    /**
     * An optional className to apply to the ink's container.
     */
    inkContainerClassName: PropTypes.string,

    /**
     * Boolean if the composed component or the ink is disabled.
     */
    disabled: PropTypes.bool,

    /**
     * Boolean if only the ink is disabled for the composed component.
     */
    inkDisabled: PropTypes.bool,

    /**
     * An optional array of additional key codes that can trigger the ink creationg.
     * The default is to only work with the tab key.
     */
    additionalInkTriggerKeys: PropTypes.arrayOf(PropTypes.number),

    /**
     * The time (in ms) that the enter and leave transitions for the ink should overlap.
     * This really just allows for a more _fluid_ looking ink when something is quickly
     * touched or clicked by having it fade out while growing.
     */
    inkTransitionOverlap: PropTypes.number.isRequired,

    /**
     * The transition time for the ink to be considered fully entered. This should really
     * map up to whatever value you set for `$md-ink-enter-transition-time`.
     */
    inkTransitionEnterTimeout: PropTypes.number.isRequired,

    /**
     * The transition time for the ink to be considered fully leaved (left?). This should really
     * map up to whatever value you set for `$md-ink-leave-transition-time`.
     */
    inkTransitionLeaveTimeout: PropTypes.number.isRequired,

    /**
     * Boolean if the `ComposedComponent`'s click event only after the ink has finished transitioning
     * in and out. This is really only to get a more _fluid_ looking click event when clicking on
     * the `ComposedComponent` ends up taking it out of the view. (ex: Closing a Dialog).
     */
    waitForInkTransition: PropTypes.bool,

    /**
     * An optional array of interactions that can be disabled for the ink. This is a *very* limited
     * use case where `Switches` needed the ink disabled only when using a mouse.
     */
    disabledInteractions: PropTypes.arrayOf(PropTypes.oneOf(['keyboard', 'mouse', 'touch'])),
  };

  static defaultProps = {
    inkTransitionOverlap: 150,
    inkTransitionEnterTimeout: 450,
    inkTransitionLeaveTimeout: 300,
  };

  _setInkRef = (inkContainer) => {
    this._inkContainer = inkContainer;
  };

  /**
   * A publically accessible way to manually create an ink. This can be used with the `refs`.
   * The ink can either be created by using the `pageX` and `pageY` from a click/touch event
   * or it will be created in the center of the `ComposedComponent`.
   *
   * @param {number=} pageX - An optional pageX of the click or touch event.
   * @param {number=} pageY - An optional pageY of the click or touch event.
   */
  createInk(pageX, pageY) {
    if (this._inkContainer && !this.props.disabled && !this.props.inkDisabled) {
      this._inkContainer.createInk(pageX, pageY);
    }
  }

  render() {
    const {
      inkDisabled,
      additionalInkTriggerKeys,
      inkTransitionOverlap: transitionOverlap,
      inkTransitionEnterTimeout: transitionEnterTimeout,
      inkTransitionLeaveTimeout: transitionLeaveTimeout,
      inkStyle,
      inkClassName,
      inkContainerStyle,
      inkContainerClassName,
      disabledInteractions,
      waitForInkTransition,
      ...props,
    } = this.props;

    if (!(props.disabled || inkDisabled)) {
      props.ink = (
        <InkContainer
          ref={this._setInkRef}
          key="ink-container"
          style={inkContainerStyle}
          className={inkContainerClassName}
          inkStyle={inkStyle}
          inkClassName={inkClassName}
          disabledInteractions={disabledInteractions}
          additionalTriggerKeys={additionalInkTriggerKeys}
          transitionOverlap={transitionOverlap}
          transitionEnterTimeout={transitionEnterTimeout}
          transitionLeaveTimeout={transitionLeaveTimeout}
          waitForInkTransition={waitForInkTransition}
        />
      );
    }

    return <ComposedComponent {...props} />;
  }
};
