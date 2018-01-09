import React, { PureComponent } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';

import getField from '../utils/getField';
import getDisplayName from '../utils/StringUtils/getDisplayName';

import InkContainer from './InkContainer';
import inkContextTypes from './inkContextTypes';

/**
 * Takes any component and injects an ink container for having the Material Design Ink effect.
 *
 * The default triggers for an ink are:
 * - mouse down event
 * - touch start event
 * - keyboard focus
 * - form submit
 *
 * The form submit ink will only be triggered if the `ComposedComponent` has the attribute
 * `type="submit"`, the `ComposedComponent` is in a form, and the user hits the `enter` key
 * while not actively focusing the `ComposedComponent`.
 *
 * ```js
 * @param {function} ComposedComponent - The React Component to inject an `ink` prop into.
 * @return {function} a new React class rendering the `ComposedComponent` and adding an
 *    `ink` pop.
 * ```
 */
export default ComposedComponent => class InkedComponent extends PureComponent {
  static displayName = getDisplayName(ComposedComponent, 'Ink');
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

    /**
     * Boolean if the ink should do a pulse animation while focused. This was enabled by default in
     * previous versions.
     */
    pulse: PropTypes.bool,

    /**
     * When using inked components in a `TransitionGroup`, the ref callback is not actually invoked.
     * This is a little _hack_ to get it to work by not using `ref`, but this name.
     */
    __SUPER_SECRET_REF__: PropTypes.func,
  };

  static defaultProps = {
    inkTransitionOverlap: 150,
    inkTransitionEnterTimeout: 450,
    inkTransitionLeaveTimeout: 300,
  };

  static contextTypes = inkContextTypes;

  componentDidMount() {
    const { __SUPER_SECRET_REF__: ref } = this.props;
    // Emulate the ref callback...
    if (ref) {
      ref(this);
    }
  }

  componentWillUnmount() {
    const { __SUPER_SECRET_REF__: ref } = this.props;
    // Emulate the ref callback...
    if (ref) {
      ref(null);
    }
  }

  /**
   * A publicly accessible way to manually create an ink. This can be used with the `refs`.
   * The ink can either be created by using the `pageX` and `pageY` from a click/touch event
   * or it will be created in the center of the `ComposedComponent`.
   *
   * ```js
   * <SomeInkedComponent ref={inkHOC => inkHOC.createInk()} />
   * ```
   *
   * @param {number=} pageX - An optional pageX of the click or touch event.
   * @param {number=} pageY - An optional pageY of the click or touch event.
   */
  createInk = (pageX, pageY) => {
    if (this._inkContainer && !this.props.disabled && !this.props.inkDisabled) {
      this._inkContainer.createInk(pageX, pageY);
    }
  };

  /**
   * This will attempt to focus the composed component. If the component is disabled, nothing
   * will happen. If the `disabled` and `inkDisabled` props are not set to `true`, an ink will
   * also be created.
   *
   * ```js
   * <SomeInkedComponent ref={inkHOC => inkHOC.focus()} />
   * ```
   */
  focus = () => {
    if (this.props.inkDisabled) {
      const composed = findDOMNode(this._composed);
      if (composed) {
        composed.focus();
      }
    } else if (this._inkContainer) {
      this._inkContainer.focus();
    }
  };

  /**
   * Gets the composed component as a ref. This is useful if you need to access the ref of the
   * composed component instead of the `injectInk` HOC to use some publicly accessible methods.
   *
   * ```js
   * <SomeInkedComponent
   *   ref={inkHOC => {
   *     inkHOC.getComposedComponent().focus();
   *   }}
   * />
   * ```
   */
  getComposedComponent = () => this._composed;

  _setInkRef= (inkContainer) => {
    if (inkContainer) {
      this._inkContainer = inkContainer;
    }
  };

  _setComposedComponent = (component) => {
    this._composed = component;
  };

  render() {
    const {
      inkTransitionOverlap: transitionOverlap,
      inkTransitionEnterTimeout: transitionEnterTimeout,
      inkTransitionLeaveTimeout: transitionLeaveTimeout,
      inkStyle,
      inkClassName,
      inkContainerStyle,
      inkContainerClassName,
      waitForInkTransition,
      disabledInteractions,
      pulse,
      inkDisabled: propInkDisabled, // eslint-disable-line no-unused-vars
      __SUPER_SECRET_REF__, // eslint-disable-line no-unused-vars
      ...props
    } = this.props;

    const inkDisabled = getField(this.props, this.context, 'inkDisabled');
    const inkDisabledInteractions = typeof disabledInteractions !== 'undefined'
      ? disabledInteractions
      : this.context.inkDisabledInteractions;

    if (!(props.disabled || inkDisabled)) {
      props.ink = (
        <InkContainer
          ref={this._setInkRef}
          key="ink-container"
          pulse={pulse}
          style={inkContainerStyle}
          className={inkContainerClassName}
          inkStyle={inkStyle}
          inkClassName={inkClassName}
          disabledInteractions={inkDisabledInteractions}
          transitionOverlap={transitionOverlap}
          transitionEnterTimeout={transitionEnterTimeout}
          transitionLeaveTimeout={transitionLeaveTimeout}
          waitForInkTransition={waitForInkTransition}
        />
      );
    }

    props.ref = this._setComposedComponent;

    return <ComposedComponent {...props} />;
  }
};
