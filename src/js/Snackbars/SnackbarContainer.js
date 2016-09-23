import React, { PureComponent, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import deprecated from 'react-prop-types/lib/deprecated';

// Sane as CSSTransitionGroup
const TICK = 17;
import isInvalidAnimate from './isInvalidAnimate';
import Snackbar from './Snackbar';

export default class SnackbarContainer extends PureComponent {
  static propTypes = {
    /**
     * An optional style to apply to the snackbar once it appears.
     */
    style: PropTypes.object,

    /**
     * An optional className to apply to the snackbar once it appears.
     */
    className: PropTypes.string,

    /**
     * An immutable controlled queue of toasts that should appear in the snackbar.
     * The snackbar will always display the first toast in this list. When the user has
     * either clicked the action of the toast, or the `autohideTimeout` has been reached,
     * the `onDismiss` function will be called. The `onDismiss` function should remove the
     * the first toast and return a new list of remaining toasts.
     *
     * ```js
     * let toasts = [];
     * const onDismiss = () => {
     *   const [, ...remainingToasts] = toasts;
     *   toasts = remainingToasts;
     * };
     * ```
     */
    toasts: PropTypes.arrayOf(PropTypes.shape({
      /**
       * The text to display in the toast.
       */
      text: PropTypes.string.isRequired,

      /**
       * An optional action to take. If this value is a string, the `label` for the
       * button will be this value, Otherwise, all the keys in the action object will
       * be applied to the `Button`.
       */
      action: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
          onClick: PropTypes.func,
          label: PropTypes.string.isRequired,
        }),
      ]),
    })).isRequired,

    /**
     * A function to call that will dismiss a toast. This will automatically be bound to
     * any toast that has an `action` and it will also be called when the `autohideTimeout`
     * has been reached.
     */
    onDismiss: PropTypes.func.isRequired,

    /**
     * Boolean if the snackbar's toasts should automatically be dismissed after the
     * `autohideTimeout` has been reached.
     */
    autohide: PropTypes.bool,

    /**
     * The amount of time before the snackbar should be dequeued and the next toast
     * should be displayed.
     */
    autohideTimeout: PropTypes.number.isRequired,

    /**
     * The transition time for the snackbar to enter. This should match the `$md-snackbar-transition-time`
     * sass variable.
     */
    transitionEnterTimeout: PropTypes.number.isRequired,

    /**
     * The transition time for the snackbar to leave. This should match the `$md-snackbar-transition-time`
     * sass variable.
     */
    transitionLeaveTimeout: PropTypes.number.isRequired,

    /**
     * When the app contains a floating action button that is fixed to the bottom of the screen,
     * you should set this to be a ref of the floating action button. When a snackbar appears,
     * the FAB will be moved to not overlay the snackbar.
     */
    fab: (props, propName, componentName, location, propFullName) => {
      const propValue = props[propName];
      const propType = typeof propValue;

      if (!propValue) {
        return null;
      }

      if (propType !== 'object' || typeof propValue.render !== 'function' || isInvalidAnimate(propValue)) {
        const componentNameSafe = componentName || '<<anonymous>>';
        const propFullNameSafe = propFullName || propName;
        return new Error(
          `Invalid ${location} \`${propFullNameSafe}\` supplied to \`${componentNameSafe}\`, expected a ` +
          'ref to a floating `Button` component. This should not be a DOMElement from `findDOMNode` but instead ' +
          'the React ref object.'
        );
      }

      return null;
    },
    dismiss: deprecated(PropTypes.func, 'Use `onDismiss` instead'),
  };

  static defaultProps = {
    autohide: true,
    toasts: [],
    autohideTimeout: 3000,
    transitionEnterTimeout: 300,
    transitionLeaveTimeout: 300,
  };

  constructor(props) {
    super(props);

    const visible = !!props.toasts.length;
    this.state = {
      visible,
      toast: null,
    };

    this._isMultiline = this._isMultiline.bind(this);
    this._initAndToast = this._initAndToast.bind(this);
    this._createSwapTimer = this._createSwapTimer.bind(this);
    this._createLeaveTimer = this._createLeaveTimer.bind(this);
  }

  componentDidMount() {
    const { toasts } = this.props;
    if (toasts.length) {
      this._initAndToast(toasts[0]);
    }
  }

  componentWillReceiveProps(nextProps) {
    const [toast] = nextProps.toasts;
    if (toast === this.state.toast) {
      return;
    }

    if (!toast) {
      this._createLeaveTimer();
    } else if (!this.state.visible) {
      this._initAndToast(toast);
    } else {
      this._createSwapTimer(toast);
    }
  }

  componentWillUnmount() {
    if (this._initTimeout) {
      clearTimeout(this._initTimeout);
    }

    if (this._leaveTimeout) {
      clearTimeout(this._leaveTimeout);
    }

    if (this._swapTimeout) {
      clearTimeout(this._swapTimeout);
    }

    if (this._dismissTimeout) {
      clearTimeout(this._dismissTimeout);
    }
  }

  /**
   * This function takes in a new toast object and checks if the message will span
   * multiple lines of text by creating the new snackbar before the `Snackbar` component
   * gets made, checking the height of the message, and then removing the temporary
   * snackbar.
   */
  _isMultiline(toast) {
    const container = findDOMNode(this);
    if (container === null) {
      return false;
    }

    const message = document.createElement('p');
    message.classList.add('md-snackbar--toast');
    message.innerHTML = toast.text;

    let snackbar;
    if (toast.action) {
      snackbar = document.createElement('section');
      snackbar.className = 'md-snackbar';
      snackbar.appendChild(message);

      const action = document.createElement('button');
      action.innerHTML = typeof toast.action === 'string' ? toast.action : toast.action.label;
      action.className = 'md-btn md-btn--flat md-btn--text md-btn--snackbar';
      snackbar.appendChild(action);
    } else {
      snackbar = message;
    }

    container.appendChild(snackbar);
    const multiline = message.offsetHeight > 20;
    container.removeChild(snackbar);

    return multiline;
  }

  _initAndToast(toast) {
    this._initTimeout = setTimeout(() => {
      this._initTimeout = null;

      this.setState({ toast, multiline: this._isMultiline(toast) });
    }, TICK);

    this.setState({ visible: true });
  }

  _createLeaveTimer() {
    const { transitionLeaveTimeout: time } = this.props;
    this._leaveTimeout = setTimeout(() => {
      this._leaveTimeout = null;

      this.setState({ visible: false });
    }, time + TICK);

    this.setState({ toast: null });
  }

  _createSwapTimer(toast) {
    this._swapTimeout = setTimeout(() => {
      this._swapTimeout = null;

      this.setState({ toast });
    }, this.props.transitionLeaveTimeout + 50);

    this.setState({ toast: null });
  }

  render() {
    const { visible, toast, multiline } = this.state;
    if (!visible) {
      return null;
    }

    const {
      transitionEnterTimeout,
      transitionLeaveTimeout,
      dismiss,
      onDismiss,
      ...props,
    } = this.props;
    delete props.toasts;

    let snackbar;
    if (toast) {
      snackbar = (
        <Snackbar
          {...props}
          leaveTimeout={transitionLeaveTimeout}
          toast={toast}
          multiline={multiline}
          onDismiss={onDismiss || dismiss}
        />
      );
    }

    return (
      <CSSTransitionGroup
        className="md-snackbar-container"
        transitionName="md-snackbar"
        transitionEnterTimeout={transitionEnterTimeout}
        transitionLeaveTimeout={transitionLeaveTimeout}
      >
        {snackbar}
      </CSSTransitionGroup>
    );
  }
}
