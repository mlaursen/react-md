import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import deprecated from 'react-prop-types/lib/deprecated';

import getField from '../utils/getField';
import TICK from '../constants/CSSTransitionGroupTick';
import isInvalidAnimate from './isInvalidAnimate';
import Portal from '../Helpers/Portal';
import Snackbar from './Snackbar';

const CHAINED_TOAST_DELAY = 50;

/**
 * The `Snackbar` component is used for displaying a concise and small message to the user about
 * an operation performed.
 *
 * > The main component for the `Snackbar` is actually named the `SnackbarContainer`, so you need
 * to make sure the import is `react-md/lib/Snackbars` or `react-md/lib/Snackbars/SnackbarContainer`.
 * The first import is preferable.
 */
export default class SnackbarContainer extends PureComponent {
  static propTypes = {
    /**
     * An id for the Snackbar once a toast has been added and is visible. This is a recommended
     * prop for accessibility concerns. If it is omitted, the id will become `'snackbar-alert'`
     * when there is no action on the toast, or `'snackbar-alert-dialog'` when there is an action
     * on the toast.
     */
    id: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),

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
     * first toast and return a new list of remaining toasts.
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
      text: PropTypes.node.isRequired,

      /**
       * An optional action to take. If this value is a string, the `label` for the
       * button will be this value, Otherwise, all the keys in the action object will
       * be applied to the `Button`.
       */
      action: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.shape({
          onClick: PropTypes.func,
          children: PropTypes.node,
          // Deprecated
          label: PropTypes.node,
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
     * When a toast has an action, it will automatically be focused when this prop is enabled.
     * This will require your action onClick handler to correctly focus an element on the page
     * once the toast is hidden. If this prop is disabled, it is recommended to add custom focus
     * logic so that keyboard users can interact with the snackbar.
     */
    autoFocusAction: PropTypes.bool,

    /**
     * The transition name to use for the snackbar appearing and disappearing.
     */
    transitionName: PropTypes.string.isRequired,

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

    /**
     * Boolean if the Portal's functionality of rendering in a separate react tree should be applied
     * to the snackbar.
     *
     * @see {@link Helpers/Portal}
     */
    portal: PropTypes.bool,

    /**
     * An optional DOM node to render the Snackbar in. If this is omitted, it will render as the first
     * child in the `body`.
     */
    renderNode: PropTypes.object,

    /**
     * Boolean if the snackbar should render as the last child in the `renderNode` or `body` instead of
     * as the first.
     */
    lastChild: PropTypes.bool,
    dismiss: deprecated(PropTypes.func, 'Use `onDismiss` instead'),
  };

  static defaultProps = {
    autoFocusAction: false,
    autohide: true,
    toasts: [],
    autohideTimeout: 3000,
    transitionName: 'md-snackbar',
    transitionEnterTimeout: 300,
    transitionLeaveTimeout: 300,
  };

  static contextTypes = {
    renderNode: PropTypes.object,
  };

  constructor(props) {
    super(props);

    const visible = !!props.toasts.length;
    this.state = {
      visible,
      toast: null,
    };
  }

  componentDidMount() {
    const { toasts } = this.props;
    if (toasts.length) {
      this._initAndToast(toasts[0]);
    }
  }

  componentWillReceiveProps(nextProps) {
    const [toast] = nextProps.toasts;
    const [prevToast] = this.props.toasts;
    if (toast === prevToast || toast === this.state.toast) {
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

  _setContainer = (container) => {
    this._container = findDOMNode(container);
  };

  /**
   * This function takes in a new toast object and checks if the message will span
   * multiple lines of text by creating the new snackbar before the `Snackbar` component
   * gets made, checking the height of the message, and then removing the temporary
   * snackbar.
   */
  _isMultiline = (toast) => {
    const container = this._container;
    if (container === null) {
      return false;
    }

    const message = document.createElement('p');
    message.classList.add('md-snackbar--toast');
    message.innerHTML = toast.text;

    let snackbar;
    if (toast.action) {
      message.classList.add('md-snackbar--action');

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

    // Only style we really want from the .md-snackbar
    snackbar.style.maxWidth = '568px';

    container.appendChild(snackbar);
    const multiline = message.offsetHeight > 20;
    container.removeChild(snackbar);

    return multiline;
  };

  _initAndToast = (toast) => {
    this._initTimeout = setTimeout(() => {
      this._initTimeout = null;

      this.setState({ toast, multiline: this._isMultiline(toast) });
    }, TICK);

    this.setState({ visible: true });
  };

  _createLeaveTimer = () => {
    const { transitionLeaveTimeout: time } = this.props;
    this._leaveTimeout = setTimeout(() => {
      this._leaveTimeout = null;

      this.setState({ visible: false });
    }, time + TICK);

    this.setState({ toast: null });
  };

  _createSwapTimer = (toast) => {
    this._swapTimeout = setTimeout(() => {
      this._swapTimeout = null;

      this.setState({ toast, multiline: this._isMultiline(toast) });
    }, this.props.transitionLeaveTimeout + CHAINED_TOAST_DELAY);

    this.setState({ toast: null });
  };

  render() {
    const { visible, toast, multiline } = this.state;
    const {
      transitionName,
      transitionEnterTimeout,
      transitionLeaveTimeout,
      dismiss,
      onDismiss,
      lastChild,
      portal,
      renderNode: propRenderNode, // eslint-disable-line no-unused-vars
      toasts, // eslint-disable-line no-unused-vars
      ...props
    } = this.props;
    const renderNode = getField(this.props, this.context, 'renderNode');

    let snackbar;
    if (toast) {
      snackbar = (
        <Snackbar
          {...props}
          key="snackbar"
          leaveTimeout={transitionLeaveTimeout}
          toast={toast}
          multiline={multiline}
          onDismiss={onDismiss || dismiss}
        />
      );
    }

    const container = (
      <CSSTransitionGroup
        ref={this._setContainer}
        key="container"
        className="md-snackbar-container"
        transitionName={transitionName}
        transitionEnterTimeout={transitionEnterTimeout}
        transitionLeaveTimeout={transitionLeaveTimeout}
      >
        {snackbar}
      </CSSTransitionGroup>
    );

    if (!portal) {
      return visible ? container : null;
    }

    return (
      <Portal visible={visible} renderNode={renderNode} lastChild={lastChild}>
        {container}
      </Portal>
    );
  }
}
