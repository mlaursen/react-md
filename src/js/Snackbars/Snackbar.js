import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import classnames from 'classnames';

import Toast from './Toast';

/**
 * A snackbar takes a queue of toasts and displays them to the user one after another.
 * They can be auto dismissed, or require user interaction to close the toast.
 */
export default class Snackbar extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = { multiline: false };
  }

  static propTypes = {
    /**
     * An optional className to apply to the active toast.
     */
    className: PropTypes.string,

    /**
     * The moving queue of toasts to display.
     *
     * ##### Shape Description
     */
    toasts: PropTypes.arrayOf(PropTypes.shape({
      /**
       * The text to display in the toast.
       */
      text: PropTypes.string.isRequired,

      /**
       * An optional key for the toast.
       */
      key: PropTypes.any,

      /**
       * An optional action to take. If this value is a string, a `FlatButton`
       * will be created with a `label` of this value and the `onClick` function
       * will be the `dismiss` function. If this is an object, all values will be
       * applied to the `FlatButton`.
       */
      action: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
          onClick: PropTypes.func,
          label: PropTypes.string.isRequired,
        }),
      ]),

      /**
       * An optional function to call when the toast appears.
       */
      onAppear: PropTypes.func,
    })).isRequired,

    /**
     * Boolean if the toast should automatically hide after the given timeout.
     */
    autohide: PropTypes.bool,

    /**
     * The auto hide timeout.
     */
    autohideTimeout: PropTypes.number,

    /**
     * A function to call that will dismiss the active toast.
     */
    dismiss: PropTypes.func.isRequired,

    /**
     * The transition name to use for the snackbar.
     */
    transitionName: PropTypes.string.isRequired,

    /**
     * The transition enter timeout for the snackbar.
     */
    transitionEnterTimeout: PropTypes.number.isRequired,

    /**
     * The transition leave timeout for the snackbar.
     */
    transitionLeaveTimeout: PropTypes.number.isRequired,

    /**
     * An optional Floating Action Button element that should be moved
     * when a toast appears/disappears.
     */
    fab: PropTypes.object,
  };

  static defaultProps = {
    autohide: true,
    autohideTimeout: 3000,
    transitionName: 'snackbar',
    transitionEnterTimeout: 450,
    transitionLeaveTimeout: 450,
    toasts: [],
  };

  componentWillReceiveProps({ toasts, dismiss, autohide, autohideTimeout, fab, transitionEnterTimeout }) {
    if(this.props.toasts.length === toasts.length) { return; }
    const [toast] = toasts;
    toast && toast.onAppear && toast.onAppear();
    this.isMultilineToast(toast);

    if(fab) {
      fab.classList.remove('snackbar-multiline-adjust');
      fab.classList.remove('snackbar-adjust');

      if(toast) {
        this.fabTimeout = setTimeout(() => {
          fab.classList.add(`snackbar${this.state.multiline ? '-multiline' : ''}-adjust`);
        }, this.props.toasts.length > 1 ? transitionEnterTimeout : 0);
      }
    }

    if(!toast || !autohide || this.toastTimeout) { return; }

    this.toastTimeout = setTimeout(() => {
      this.toastTimeout = null;
      dismiss();
    }, autohideTimeout);
  }

  componentWillUnmount() {
    this.toastTimeout && clearTimeout(this.toastTimeout);
    this.fabTimeout && clearTimeout(this.fabTimeout);
  }

  getToastActionProps = ({ action }) => {
    return typeof action === 'string' ? { label: action, onClick: this.props.dismiss } : action;
  };

  /**
   * Checks if a toast is a multiline toast and updates the state with the new value.
   * It checks by rendering the new toast and comparing it's size, then removing the
   * new toast.
   *
   * @param {Object} toast the toast to check.
   */
  isMultilineToast = (toast) => {
    if(!toast) { return; }

    const p = document.createElement('p');
    p.innerHTML = toast.text;


    const snackbar = document.createElement('section');
    snackbar.className = classnames('md-snackbar', this.props.className);

    snackbar.appendChild(p);
    if(toast.action) {
      const btn = document.createElement('button');
      btn.className = 'md-btn md-flat-btn';
      btn.innerHTML = typeof toast.action === 'string' ? toast.action : toast.action.label;

      snackbar.appendChild(btn);
    }

    const node = ReactDOM.findDOMNode(this);
    node.appendChild(snackbar);

    const lineHeight = this.state.lineHeight || parseInt(window.getComputedStyle(p).getPropertyValue('line-height'));
    const multiline = p.offsetHeight > lineHeight;
    node.removeChild(snackbar);

    this.setState({ multiline, lineHeight });
  };

  render() {
    const { multiline } = this.state;
    const {
      className,
      toasts,
      dismiss,
      transitionName,
      transitionEnterTimeout,
      transitionLeaveTimeout,
      ...props,
    } = this.props;

    const [toast] = toasts;
    return (
      <CSSTransitionGroup
        className="md-snackbar-container"
        transitionName={transitionName}
        transitionEnterTimeout={transitionEnterTimeout}
        transitionLeaveTimeout={transitionLeaveTimeout}
      >
        {toast &&
          <Toast
            key={toast.key || Date.now()}
            className={className}
            toast={toast}
            dismiss={dismiss}
            multiline={multiline}
            {...props}
          />
        }
      </CSSTransitionGroup>
    );
  }
}
