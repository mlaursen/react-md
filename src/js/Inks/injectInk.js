import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import PureRenderMixin from 'react-addons-pure-render-mixin';
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
export default ComposedComponent => class Ink extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      inks: [],
      touch: false,
    };
  }

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

  componentDidMount() {
    this.setState({ touch: isTouchDevice() }); // eslint-disable-line
  }

  componentWillUnmount() {
    if(this.state.timeout) {
      clearTimeout(this.state.timeout);
    }
  }

  calcR = (a, b) => {
    return Math.sqrt((a * a) + (b * b));
  };

  invalidClickEvent = ({ button, ctrlKey }) => {
    return button !== LEFT_MOUSE || ctrlKey;
  };

  createInk = (pageX, pageY) => {
    const container = ReactDOM.findDOMNode(this).querySelector('.md-ink-container');

    let left = 0, top = 0;
    let size, x, y;
    if(typeof pageX !== 'undefined' && typeof pageY !== 'undefined') {
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
      this.calcR(x, y),
      this.calcR(offsetWidth - x, y),
      this.calcR(offsetWidth - x, offsetHeight - y),
      this.calcR(x, offsetHeight - y)
    );

    left = x - r;
    top = y - r;
    size = r * 2;

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
  };

  popInk = () => {
    if(!this.state.inks.length) { return; }
    let inks = this.state.inks.slice();
    inks.pop();
    this.setState({ inks });
  };

  disabled = () => {
    return this.props.disabled || this.props.inkDisabled;
  };

  handleMouseDown = (e) => {
    this.props.onMouseDown && this.props.onMouseDown(e);
    if(this.state.touch) { return; }
    const nextState = { skipFocus: true };
    if(!this.invalidClickEvent(e)) {
      e.stopPropagation();
      this.createInk(e.pageX, e.pageY);
      nextState.skipMouseUp = false;
    }

    this.setState(nextState);
  };

  handleMouseLeave = (e) => {
    this.props.onMouseLeave && this.props.onMouseLeave(e);
    if(this.state.touch) { return; }
    this.popInk();
    this.setState({ skipMouseUp: true });
  };

  handleMouseUp = (e) => {
    this.props.onMouseUp && this.props.onMouseUp(e);
    if(this.state.touch || this.invalidClickEvent(e) || this.state.skipMouseUp) { return; }
    this.popInk();
    this.setState({ skipFocus: false });
  };

  handleTouchStart = (e) => {
    this.props.onTouchStart && this.props.onTouchStart(e);

    e.stopPropagation();
    const { pageX, pageY } = e.changedTouches[0];
    this.setState({
      skipFocus: true,
      timeout: setTimeout(() => {
        this.createInk(pageX, pageY);
        this.setState({ timeout: null });
      }, 100),
    });
  };

  handleTouchMove = (e) => {
    this.props.onTouchMove && this.props.onTouchMove(e);
    if(this.state.timeout) {
      clearTimeout(this.state.timeout);
      this.setState({ timeout: null });
    }
  };

  handleTouchEnd = (e) => {
    this.props.onTouchEnd && this.props.onTouchEnd(e);
    this.popInk();
  };

  handleTouchCancel = (e) => {
    this.props.onTouchCancel && this.props.onTouchCancel(e);
    this.popInk();
  };

  handleBlur = (e) => {
    this.props.onBlur && this.props.onBlur(e);
    this.popInk();
  };

  handleFocus = (e) => {
    this.props.onFocus && this.props.onFocus(e);
    if(this.state.skipFocus) { return; }
    e.stopPropagation();

    this.createInk();
  };

  render() {
    const { ...props } = this.props;
    delete props.inkDisabled;

    // Don't inject ink and new props if disabled
    if(this.disabled()) {
      return <ComposedComponent {...props} />;
    }

    const ink = (
      <TransitionGroup className="md-ink-container" key="ink-container">
        {this.state.inks.map(ink => <InkTransition key={ink.time.getTime()} {...ink} />)}
      </TransitionGroup>
    );

    return (
      <ComposedComponent
        {...props}
        onMouseUp={this.handleMouseUp}
        onMouseDown={this.handleMouseDown}
        onMouseLeave={this.handleMouseLeave}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        onTouchStart={this.handleTouchStart}
        onTouchMove={this.handleTouchMove}
        onTouchCancel={this.handleTouchCancel}
        onTouchEnd={this.handleTouchEnd}
        ink={ink}
      />
    );
  }
};
