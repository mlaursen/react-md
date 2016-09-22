import React, { PureComponent, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import TransitionGroup from 'react-addons-transition-group';
import cn from 'classnames';

import isValidClick from '../utils/EventUtils/isValidClick';
import calcPageOffset from '../utils/calcPageOffset';
import calculateHypotenuse from '../utils/NumberUtils/calculateHypotenuse';

import Ink from './Ink';


/**
 * The `InkContainer` is usesd for holding the list of inks that get created by touch,
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
  };

  static defaultProps = {
    transitionOverlap: 150,
    transitionEnterTimeout: 450,
    transitionLeaveTimeout: 300,
  };

  constructor(props) {
    super(props);

    this.state = { inks: [] };
    this.createInk = this.createInk.bind(this);
    this.focus = this.focus.bind(this);
    this._handleFocus = this._handleFocus.bind(this);
    this._createInk = this._createInk.bind(this);
    this._removeInk = this._removeInk.bind(this);
    this._setContainers = this._setContainers.bind(this);
    this._maybeDelayClick = this._maybeDelayClick.bind(this);
    this._handleBlur = this._handleBlur.bind(this);
    this._handleMouseDown = this._handleMouseDown.bind(this);
    this._handleMouseUp = this._handleMouseUp.bind(this);
    this._handleMouseLeave = this._handleMouseLeave.bind(this);
    this._handleTouchStart = this._handleTouchStart.bind(this);
    this._handleTouchMove = this._handleTouchMove.bind(this);
    this._handleTouchEnd = this._handleTouchEnd.bind(this);
    this._handleRemove = this._handleRemove.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
    this._getKeyboardContainer = this._getKeyboardContainer.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { disabledInteractions: di } = this.props;
    const { disabledInteractions: ndi } = nextProps;
    if (di === ndi || !this._container) {
      return;
    }

    if (this._isListeneredDisabledDiff('keyboard', di, ndi)) {
      const fn = `${this._isListeneredDisabled('keyboard', ndi) ? 'remove' : 'add'}EventListener`;
      this._getKeyboardContainer()[fn]('focus', this._handleFocus);

      if (this._container.getAttribute('type') === 'submit') {
        window[fn]('submit', this._handleSubmit);
      }
    }

    if (this._isListeneredDisabledDiff('mouse', di, ndi)) {
      const fn = `${this._isListeneredDisabled('mouse', ndi) ? 'remove' : 'add'}EventListener`;
      this._container[fn]('mousedown', this._handleMouseDown);
      this._container[fn]('mouseup', this._handleMouseUp);
    }

    if (this._isListeneredDisabledDiff('touch', di, ndi)) {
      const fn = `${this._isListeneredDisabled('touch', ndi) ? 'remove' : 'add'}EventListener`;
      this._container[fn]('touchstart', this._handleTouchStart);
      this._container[fn]('touchend', this._handleTouchEnd);
    }
  }

  componentWillUnmount() {
    if (this._removeTimeout) {
      clearTimeout(this._removeTimeout);
    }

    if (this._container) {
      const { disabledInteractions } = this.props;
      if (!this._isListeneredDisabled('keyboard', disabledInteractions)) {
        this._getKeyboardContainer().removeEventListener('focus', this._handleFocus);
        this._getKeyboardContainer().removeEventListener('blur', this._handleBlur);

        if (this._container.getAttribute('type') === 'submit') {
          window.removeEventListener('submit', this._handleSubmit);
        }
      }

      if (!this._isListeneredDisabled('mouse', disabledInteractions)) {
        this._container.removeEventListener('mousedown', this._handleMouseDown);
        this._container.removeEventListener('mouseup', this._handleMouseUp);
      }

      if (!this._isListeneredDisabled('touch', disabledInteractions)) {
        this._container.removeEventListener('touchstart', this._handleTouchStart);
        this._container.removeEventListener('touchend', this._handleTouchEnd);
      }
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
  createInk(pageX, pageY) {
    this._createInk(pageX, pageY);
    this._removeTimeout = setTimeout(() => {
      this._removeTimeout = null;
      this._removeInk();
    }, this.props.transitionOverlap);
  }

  focus() {
    this._getKeyboardContainer().focus();
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
  _createInk(pageX, pageY) {
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
  }

  /**
   * Removes an ink from the container.
   */
  _removeInk() {
    const inks = this.state.inks.slice();
    inks.pop();

    this.setState({ inks });
  }

  _getKeyboardContainer() {
    if (this._container.classList.contains('md-text-field-container')) {
      return this._container.querySelector('.md-text-field');
    }

    return this._container;
  }

  _setContainers(inkContainer) {
    if (inkContainer !== null) {
      this._inkContainer = findDOMNode(inkContainer);
      this._container = this._inkContainer.parentNode;

      if (this._container) {
        const { disabledInteractions } = this.props;
        if (!this._isListeneredDisabled('keyboard', disabledInteractions)) {
          this._getKeyboardContainer().addEventListener('focus', this._handleFocus);

          if (this._container.getAttribute('type') === 'submit') {
            window.addEventListener('submit', this._handleSubmit);
          }
        }

        if (!this._isListeneredDisabled('mouse', disabledInteractions)) {
          this._container.addEventListener('mousedown', this._handleMouseDown);
          this._container.addEventListener('mouseup', this._handleMouseUp);
        }

        if (!this._isListeneredDisabled('touch', disabledInteractions)) {
          this._container.addEventListener('touchstart', this._handleTouchStart);
          this._container.addEventListener('touchend', this._handleTouchEnd);
        }
      }
    }
  }

  _isListeneredDisabledDiff(interaction, disabledInteractions, nextDisabledInteractions) {
    const i = disabledInteractions.indexOf(interaction);
    const ni = nextDisabledInteractions.indexOf(interaction);

    return (i < 0 && ni >= 0) || (i >= 0 && ni < 0);
  }

  _isListeneredDisabled(interaction, disabledInteractions) {
    return disabledInteractions && disabledInteractions.indexOf(interaction) !== -1;
  }

  _maybeDelayClick() {
    if (!this.props.waitForInkTransition) {
      return;
    }

    const captured = e => {
      e.stopPropagation();
      this._container.removeEventListener('click', captured, true);
    };

    // Prevent the next click event on the container only during the bubbling phase
    this._container.addEventListener('click', captured, true);
  }

  _handleRemove() {
    if (this._clicked && this.props.waitForInkTransition) {
      this._container.click();
    }

    this._clicked = false;
  }

  _handleFocus() {
    if (this._clicked) {
      return;
    }

    this._createInk();
    this._getKeyboardContainer().addEventListener('blur', this._handleBlur);
  }

  _handleBlur() {
    this._getKeyboardContainer().removeEventListener('blur', this._handleBlur);
    this._removeInk();
  }

  _handleMouseDown(e) {
    if (!isValidClick(e) || this._skipNextMouse) {
      this._skipNextMouse = false;
      return;
    }

    e.stopPropagation();
    this._clicked = true;
    this._mouseLeave = false;
    this._container.addEventListener('mouseleave', this._handleMouseLeave);
    this._createInk(e.pageX, e.pageY);
  }

  _handleMouseLeave() {
    this._container.removeEventListener('mouseleave', this._handleMouseLeave);
    this._mouseLeave = true;
    this._removeInk();
  }

  _handleMouseUp() {
    if (this._mouseLeave) {
      return;
    }

    this._maybeDelayClick();
    this._container.removeEventListener('mouseleave', this._handleMouseLeave);
    this._removeInk();
  }

  _handleTouchStart(e) {
    this._aborted = false;
    this._clicked = true;
    e.stopPropagation();
    window.addEventListener('touchmove', this._handleTouchMove);

    const { pageX, pageY } = e.changedTouches[0];
    this._createInk(pageX, pageY);
  }

  _handleTouchMove() {
    window.removeEventListener('touchmove', this._handleTouchMove);
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
  }

  _handleTouchEnd() {
    this._skipNextMouse = true;

    if (this._aborted) {
      return;
    } else {
      window.removeEventListener('touchmove', this._handleTouchMove);
    }

    this._removeInk();
  }

  /**
   * If a form was submitted that contains the container of the ink and the current focus element
   * is not the container, trigger an ink effect.
   *
   * The current focus check is added so that two inks are not created.
   */
  _handleSubmit(e) {
    if (document.activeElement === this._container || !e.target.contains(this._container)) {
      return;
    }

    this._maybeDelayClick();
    this.createInk();
  }

  render() {
    const {
      style,
      className,
      inkStyle,
      inkClassName,
      transitionOverlap,
      transitionEnterTimeout,
      transitionLeaveTimeout,
    } = this.props;
    const inks = this.state.inks.map(props => (
      <Ink
        {...props}
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
        ref={this._setContainers}
        component="div"
        style={style}
        className={cn('md-ink-container', className)}
      >
        {inks}
      </TransitionGroup>
    );
  }
}
