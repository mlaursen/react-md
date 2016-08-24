import React, { PureComponent, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import TransitionGroup from 'react-addons-transition-group';

import { LEFT_MOUSE } from '../constants/keyCodes';
import InkTransition from './InkTransition';
import { getOffset, isTouchDevice } from '../utils';

/**
 * Takes any component and injects an ink container along with event
 * listeners for handling those inks. It also injects a prop
 * named `ink` which needs to be added to the `ComposedComponent`.
 *
 * ```js
 * @param ComposedComponent the component to compose with the ink functionality.
 * @return the ComposedComponent with inks.
 * ```
 */
export default ComposedComponent => class Ink extends PureComponent {
  static propTypes = {
    /**
     * An optional onMouseUp function to call along with the ink creation onMouseUp.
     */
    onMouseUp: PropTypes.func,

    /**
     * An optional onMouseDown function to call along with the ink creation onMouseDown.
     */
    onMouseDown: PropTypes.func,

    /**
     * An optional onMouseLeave function to call along with the ink creation onMouseLeave.
     */
    onMouseLeave: PropTypes.func,

    /**
     * An optional onFocus function to call along with the ink creation onFocus.
     */
    onFocus: PropTypes.func,

    /**
     * An optional onBlur function to call along with the ink creation onBlur.
     */
    onBlur: PropTypes.func,

    /**
     * An optional onTouchStart function to call along with the ink creation onTouchStart.
     */
    onTouchStart: PropTypes.func,

    /**
     * An optional onTouchMove function to call along with the ink creation onTouchMove.
     */
    onTouchMove: PropTypes.func,

    /**
     * An optional onTouchEnd function to call along with the ink creation onTouchEnd.
     */
    onTouchEnd: PropTypes.func,

    /**
     * An optional onTouchCancel function to call along with the ink creation onTouchCancel.
     */
    onTouchCancel: PropTypes.func,

    /**
     * Boolean if the ink or the composed component is disabled.
     */
    disabled: PropTypes.bool,

    /**
     * Boolean if only the ink is disabled.
     */
    inkDisabled: PropTypes.bool,
  };

  constructor(props) {
    super(props);

    this.state = {
      inks: [],
      touch: false,
    };

    this._popInk = this._popInk.bind(this);
    this._createInk = this._createInk.bind(this);
    this._disabled = this._disabled.bind(this);
    this._handleBlur = this._handleBlur.bind(this);
    this._handleFocus = this._handleFocus.bind(this);
    this._handleMouseUp = this._handleMouseUp.bind(this);
    this._handleMouseDown = this._handleMouseDown.bind(this);
    this._handleMouseLeave = this._handleMouseLeave.bind(this);
    this._handleTouchEnd = this._handleTouchEnd.bind(this);
    this._handleTouchMove = this._handleTouchMove.bind(this);
    this._handleTouchStart = this._handleTouchStart.bind(this);
    this._handleTouchCancel = this._handleTouchCancel.bind(this);
  }

  componentDidMount() {
    this.setState({ touch: isTouchDevice() }); // eslint-disable-line
  }

  componentWillUnmount() {
    if (this.state.timeout) {
      clearTimeout(this.state.timeout);
    }
  }

  _calcR(a, b) {
    return Math.sqrt((a * a) + (b * b));
  }

  _invalidClickEvent({ button, ctrlKey }) {
    return button !== LEFT_MOUSE || ctrlKey;
  }

  _createInk(pageX, pageY) {
    const container = findDOMNode(this).querySelector('.md-ink-container');

    let x;
    let y;
    if (typeof pageX !== 'undefined' && typeof pageY !== 'undefined') {
      const offset = getOffset(container);

      x = pageX - offset.left;
      y = pageY - offset.top;
    } else {
      const node = container.parentNode;
      x = node.offsetWidth / 2;
      y = node.offsetHeight / 2;
    }

    const { offsetWidth, offsetHeight } = container;
    const r = Math.max(
      this._calcR(x, y),
      this._calcR(offsetWidth - x, y),
      this._calcR(offsetWidth - x, offsetHeight - y),
      this._calcR(x, offsetHeight - y)
    );

    const left = x - r;
    const top = y - r;
    const size = r * 2;

    const ink = {
      style: {
        left,
        top,
        width: size,
        height: size,
      },
      time: new Date(),
    };
    this.setState({
      inks: [
        ...this.state.inks,
        ink,
      ],
    });
  }

  _popInk() {
    if (!this.state.inks.length) { return; }
    const inks = this.state.inks.slice();
    inks.pop();
    this.setState({ inks });
  }

  _disabled() {
    return this.props.disabled || this.props.inkDisabled;
  }

  _handleMouseDown(e) {
    if (this.props.onMouseDown) {
      this.props.onMouseDown(e);
    }

    if (this.state.touch) { return; }
    const nextState = { skipFocus: true };
    if (!this._invalidClickEvent(e)) {
      e.stopPropagation();
      this._createInk(e.pageX, e.pageY);
      nextState.skipMouseUp = false;
    }

    this.setState(nextState);
  }

  _handleMouseLeave(e) {
    if (this.props.onMouseLeave) {
      this.props.onMouseLeave(e);
    }

    if (this.state.touch) { return; }
    this._popInk();
    this.setState({ skipMouseUp: true });
  }

  _handleMouseUp(e) {
    if (this.props.onMouseUp) {
      this.props.onMouseUp(e);
    }

    if (this.state.touch || this._invalidClickEvent(e) || this.state.skipMouseUp) { return; }
    this._popInk();
    this.setState({ skipFocus: false });
  }

  _handleTouchStart(e) {
    if (this.props.onTouchStart) {
      this.props.onTouchStart(e);
    }

    e.stopPropagation();
    const { pageX, pageY } = e.changedTouches[0];
    this.setState({
      skipFocus: true,
      timeout: setTimeout(() => {
        this._createInk(pageX, pageY);
        this.setState({ timeout: null });
      }, 100),
    });
  }

  _handleTouchMove(e) {
    if (this.props.onTouchMove) {
      this.props.onTouchMove(e);
    }

    if (this.state.timeout) {
      clearTimeout(this.state.timeout);
      this.setState({ timeout: null });
    }
  }

  _handleTouchEnd(e) {
    if (this.props.onTouchEnd) {
      this.props.onTouchEnd(e);
    }

    this._popInk();
  }

  _handleTouchCancel(e) {
    if (this.props.onTouchCancel) {
      this.props.onTouchCancel(e);
    }

    this._popInk();
  }

  _handleBlur(e) {
    if (this.props.onBlur) {
      this.props.onBlur(e);
    }

    this._popInk();
  }

  _handleFocus(e) {
    if (this.props.onFocus) {
      this.props.onFocus(e);
    }

    if (this.state.skipFocus) { return; }
    e.stopPropagation();

    this._createInk();
  }

  render() {
    const { ...props } = this.props;
    delete props.inkDisabled;

    // Don't inject ink and new props if disabled
    if (this._disabled()) {
      return <ComposedComponent {...props} />;
    }

    const inks = this.state.inks.map(({ time, ...inkProps }) => <InkTransition key={time.getTime()} {...inkProps} />);
    const ink = (
      <TransitionGroup className="md-ink-container" key="ink-container">
        {inks}
      </TransitionGroup>
    );

    return (
      <ComposedComponent
        {...props}
        onMouseUp={this._handleMouseUp}
        onMouseDown={this._handleMouseDown}
        onMouseLeave={this._handleMouseLeave}
        onFocus={this._handleFocus}
        onBlur={this._handleBlur}
        onTouchStart={this._handleTouchStart}
        onTouchMove={this._handleTouchMove}
        onTouchCancel={this._handleTouchCancel}
        onTouchEnd={this._handleTouchEnd}
        ink={ink}
      />
    );
  }
};
