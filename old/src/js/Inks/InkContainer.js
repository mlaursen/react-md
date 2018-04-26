import React, { PureComponent } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import cn from 'classnames';

import { ENTER, SPACE } from '../constants/keyCodes';
import isFormPartRole from '../utils/isFormPartRole';
import calcPageOffset from '../utils/Positioning/calcPageOffset';
import isValidClick from '../utils/EventUtils/isValidClick';
import { setTouchEvent, addTouchEvent, removeTouchEvent } from '../utils/EventUtils/touches';
import captureNextEvent from '../utils/EventUtils/captureNextEvent';
import calculateHypotenuse from '../utils/NumberUtils/calculateHypotenuse';

import Ink from './Ink';


/**
 * The `InkContainer` is used for holding the list of inks that get created by touch,
 * click, or keyboard focus.
 *
 * If the container element has the `type="submit"` attribute, the ink will also be
 * triggered when the user presses enter anywhere in the form.
 */
export default class InkContainer extends PureComponent {
  static propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
    inkStyle: PropTypes.object,
    inkClassName: PropTypes.string,
    waitForInkTransition: PropTypes.bool,
    disabledInteractions: PropTypes.arrayOf(PropTypes.oneOf(['keyboard', 'mouse', 'touch'])),
    transitionOverlap: PropTypes.number.isRequired,
    transitionEnterTimeout: PropTypes.number.isRequired,
    transitionLeaveTimeout: PropTypes.number.isRequired,
    pulse: PropTypes.bool,
  };

  static defaultProps = {
    transitionOverlap: 150,
    transitionEnterTimeout: 450,
    transitionLeaveTimeout: 300,
  };

  state = { inks: [] };

  componentWillReceiveProps(nextProps) {
    const { disabledInteractions: di } = this.props;
    const { disabledInteractions: ndi } = nextProps;
    if (di === ndi || !this._container) {
      return;
    }

    const mouseDisabledDiff = this._isListenerDisabledDiff('mouse', di, ndi);
    const touchDisabledDiff = this._isListenerDisabledDiff('touch', di, ndi);
    const keyboardDisabledDiff = this._isListenerDisabledDiff('keyboard', di, ndi);
    this._initOrRemoveEvents(nextProps, keyboardDisabledDiff, mouseDisabledDiff, touchDisabledDiff);
  }

  componentWillUnmount() {
    if (this._removeTimeout) {
      clearTimeout(this._removeTimeout);
    }

    if (this._container) {
      this._initOrRemoveEvents({ disabledInteractions: ['keyboard', 'mouse', 'touch'] });
      this._getKeyboardContainer().removeEventListener('blur', this._handleBlur);
    }
  }


  /**
   * Creates an ink from pageX and pageY coordinates. These values should either come
   * from the `changedTouches` or just the base event (if clicked). These coordinates
   * are used to position the ink correctly in the container from touch/click point.
   * If either value is undefined, an ink will be created from the center of the
   * container.
   *
   * It will also automatically remove the ink.
   *
   * @param {number} pageX - The page x coordinate of the click or touch event.
   * @param {number} pageY - The page y coordinate of the click or touch event.
   */
  createInk = (pageX, pageY) => {
    this._createInk(pageX, pageY);
    this._removeTimeout = setTimeout(() => {
      this._removeTimeout = null;
      this._removeInk();
    }, this.props.transitionOverlap);
  };

  /**
   * Focuses the main element.
   */
  focus = () => {
    this._getKeyboardContainer().focus();
  };

  _isListenerDisabledDiff(interaction, disabledInteractions, nextDisabledInteractions) {
    const i = disabledInteractions.indexOf(interaction);
    const ni = nextDisabledInteractions.indexOf(interaction);

    return (i < 0 && ni >= 0) || (i >= 0 && ni < 0);
  }

  _isListenerDisabled(interaction, disabledInteractions) {
    return disabledInteractions && disabledInteractions.indexOf(interaction) !== -1;
  }

  /**
   * Creates an ink from pageX and pageY coordinates. These values should either come
   * from the `changedTouches` or just the base event (if clicked). These coordinates
   * are used to position the ink correctly in the container from touch/click point.
   * If either value is undefined, an ink will be created from the center of the
   * container.
   *
   * @param {number} pageX - The page x coordinate of the click or touch event.
   * @param {number} pageY - The page y coordinate of the click or touch event.
   */
  _createInk = (pageX, pageY) => {
    const { offsetWidth, offsetHeight } = this._inkContainer;

    let x;
    let y;
    if (typeof pageX !== 'undefined' && typeof pageY !== 'undefined') {
      const pageOffset = calcPageOffset(this._inkContainer);

      x = pageX - pageOffset.left;
      y = pageY - pageOffset.top;
    } else {
      x = offsetWidth / 2;
      y = offsetHeight / 2;
    }

    const r = Math.max(
      calculateHypotenuse(x, y),
      calculateHypotenuse(offsetWidth - x, y),
      calculateHypotenuse(offsetWidth - x, offsetHeight - y),
      calculateHypotenuse(x, offsetHeight - y)
    );

    const ink = {
      left: x - r,
      top: y - r,
      size: r * 2,
      key: Date.now(),
    };

    const inks = this.state.inks.slice();
    inks.push(ink);
    this.setState({ inks });
  };

  /**
   * Removes an ink from the container.
   */
  _removeInk = () => {
    const inks = this.state.inks.slice();
    inks.pop();

    this.setState({ inks });
  };

  /**
   * Gets the container for any keyboard events. This will almost always be the main element,
   * but text fields will need to be the input itself.
   */
  _getKeyboardContainer = () => {
    if (this._container.classList.contains('md-text-field-container')) {
      return this._container.querySelector('.md-text-field');
    }

    return this._container;
  };

  /**
   * Sets the ink container and the main container from the ref callback. When the component
   * is mounting, the keyboard, mouse, and keyboard events will be initialized.
   */
  _setContainers = (group) => {
    if (group !== null) {
      this._inkContainer = findDOMNode(group);
      this._container = this._inkContainer.parentElement;

      if (this._container) {
        this._initOrRemoveEvents(this.props);
      }
    }
  };

  /**
   * This function will either add or remove the event listeners for creating inks.
   *
   * @param {Object} props - The current props to use for figuring out if the events should
   *    be added or removed.
   * @param {bool=} keyboardDiff - Boolean if there was a difference between the current props and either
   *    the previous or next props for the keyboard interactions being disabled.
   * @param {bool=} mouseDiff - Boolean if there was a difference between the current props and either
   *    the previous or next props for the mouse interactions being disabled.
   * @param {bool=} touchDiff - Boolean if there was a difference between the current props and either
   *    the previous or next props for the touch interactions being disabled.
   */
  _initOrRemoveEvents = (props, keyboardDiff = true, mouseDiff = true, touchDiff = true) => {
    const mouseDisabled = this._isListenerDisabled('mouse', props.disabledInteractions);
    const touchDisabled = this._isListenerDisabled('touch', props.disabledInteractions);
    const keyboardDisabled = this._isListenerDisabled('keyboard', props.disabledInteractions);

    if (keyboardDiff) {
      const fn = `${keyboardDisabled ? 'remove' : 'add'}EventListener`;
      this._getKeyboardContainer()[fn]('focus', this._handleFocus);
      this._getKeyboardContainer()[fn]('keydown', this._handleKeyDown);

      if (this._container.getAttribute('type') === 'submit') {
        window[fn]('submit', this._handleSubmit);
      }

      if (mouseDiff) {
        this._container[`${!mouseDisabled ? 'add' : 'remove'}EventListener`]('mousedown', this._stopPropagationToFocus);
      }

      if (touchDiff) {
        setTouchEvent(!touchDisabled, this._container, 'start', this._stopPropagationToFocus);
      }
    }

    if (mouseDiff) {
      const fn = `${mouseDisabled ? 'remove' : 'add'}EventListener`;
      this._container[fn]('mousedown', this._handleMouseDown);
      this._container[fn]('mouseup', this._handleMouseUp);
    }

    if (touchDiff) {
      setTouchEvent(!touchDisabled, this._container, 'start', this._handleTouchStart);
      setTouchEvent(!touchDisabled, this._container, 'end', this._handleTouchEnd);
    }
  };

  _maybeDelayClick = () => {
    if (!this.props.waitForInkTransition) {
      return;
    }

    captureNextEvent('click', this._container);
  };

  _handleRemove = () => {
    if (this._clicked && this.props.waitForInkTransition) {
      // For some reason if the click event will make the ink unmount, it will no longer
      // have a debug id in the TransitionGroup and it displays a warning. Adding a 1ms timeout
      // fixes that issue... It only happens on an actual click instead of an enter click.
      setTimeout(() => {
        this._container.click();
      }, 1);
    }

    this._clicked = false;
  };

  _handleKeyDown = (e) => {
    const key = e.which || e.keyCode;
    const enter = key === ENTER;
    const space = key === SPACE;
    // Don't trigger ink when enter key is pressed and the target has an input inside of it (SelectField)
    if (space || (enter && !isFormPartRole(e.target) && !e.target.querySelector('input'))) {
      this._clicked = true;
      this.createInk();
      this._maybeDelayClick();
    }
  };

  _handleFocus = () => {
    if (this._clicked) {
      return;
    }

    this._createInk();
    this._getKeyboardContainer().addEventListener('blur', this._handleBlur);
  };

  _handleBlur = () => {
    this._getKeyboardContainer().removeEventListener('blur', this._handleBlur);
    this._removeInk();
  };

  _handleMouseDown = (e) => {
    this._clicked = true;
    if (!isValidClick(e) || this._skipNextMouse) {
      this._skipNextMouse = false;
      return;
    }

    this._mouseLeave = false;
    this._container.addEventListener('mouseleave', this._handleMouseLeave);
    this._createInk(e.pageX, e.pageY);
  };

  _handleMouseLeave = () => {
    this._container.removeEventListener('mouseleave', this._handleMouseLeave);
    this._mouseLeave = true;
    this._removeInk();
  };

  _handleMouseUp = () => {
    if (this._mouseLeave) {
      return;
    }

    this._maybeDelayClick();
    this._container.removeEventListener('mouseleave', this._handleMouseLeave);
    this._removeInk();
  };

  _handleTouchStart = (e) => {
    this._aborted = false;
    this._clicked = true;
    this._skipNextMouse = true;
    addTouchEvent(window, 'move', this._handleTouchMove);

    const { pageX, pageY } = e.changedTouches[0];
    this._createInk(pageX, pageY);
  };

  _handleTouchMove = () => {
    removeTouchEvent(window, 'move', this._handleTouchMove);
    const lastInk = this.state.inks[this.state.inks.length - 1];
    if (!lastInk || Date.now() > (lastInk.key + 200)) {
      this._aborted = false;
      return;
    }

    const inks = this.state.inks.slice();
    const index = inks.length - 1;

    const abortedInk = Object.assign({}, lastInk, { aborted: true });
    inks.splice(index, 1, abortedInk);

    this._aborted = true;
    this.setState({ inks }, this._removeInk);
  };

  _handleTouchEnd = () => {
    this._skipNextMouse = true;

    if (this._aborted) {
      return;
    } else {
      removeTouchEvent(window, 'move', this._handleTouchMove);
    }

    this._removeInk();
  };

  /**
   * If a form was submitted that contains the container of the ink and the current focus element
   * is not the container, trigger an ink effect.
   *
   * The current focus check is added so that two inks are not created.
   */
  _handleSubmit = (e) => {
    if (document.activeElement === this._container || !e.target.contains(this._container)) {
      return;
    }

    this._maybeDelayClick();
    this.createInk();
  };

  _stopPropagationToFocus = (e) => {
    switch (e.type) {
      case 'touchstart':
        addTouchEvent(window, 'end', this._stopPropagationToFocus, { capture: true });
        break;
      case 'touchend':
        removeTouchEvent(window, 'end', this._stopPropagationToFocus, { capture: true });
        break;
      case 'mousedown':
        window.addEventListener('mouseup', this._stopPropagationToFocus, true);
        break;
      case 'mouseup':
        window.removeEventListener('mouseup', this._stopPropagationToFocus, true);
        break;
      default:
    }
  };

  render() {
    const {
      style,
      className,
      inkStyle,
      inkClassName,
      transitionOverlap,
      transitionEnterTimeout,
      transitionLeaveTimeout,
      pulse,
    } = this.props;
    const inks = this.state.inks.map(props => (
      <Ink
        {...props}
        pulse={pulse}
        style={inkStyle}
        className={inkClassName}
        onRemove={this._handleRemove}
        transitionOverlap={transitionOverlap}
        transitionEnterTimeout={transitionEnterTimeout}
        transitionLeaveTimeout={transitionLeaveTimeout}
      />
    ));

    return (
      <TransitionGroup
        component="div"
        style={style}
        className={cn('md-ink-container', className)}
        ref={this._setContainers}
      >
        {inks}
      </TransitionGroup>
    );
  }
}
