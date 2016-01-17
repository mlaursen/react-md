import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import CSSTransitionGroup from 'react-addons-css-transition-group';

import { isPropEnabled } from '../utils';
import Toast from './Toast';

export default class Snackbar extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static propTypes = {
    className: PropTypes.string,
    toasts: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string.isRequired,
      key: PropTypes.string,
      action: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
          onClick: PropTypes.func,
          label: PropTypes.string.isRequired,
        }),
      ]),
      onAppear: PropTypes.func,
    })).isRequired,
    autohide: PropTypes.bool,
    autohideTimeout: PropTypes.number,
    dismiss: PropTypes.func.isRequired,
    multiline: PropTypes.bool,
    fabTimeout: PropTypes.number,
  };

  static defaultProps = {
    autohide: true,
    autohideTimeout: 3000,
    fabTimeout: 450,
  };

  componentWillReceiveProps({ toasts, dismiss, autohide, multiline, autohideTimeout, fabTimeout }) {
    if(this.props.toasts.length === toasts.length) { return; }
    const [toast] = toasts;
    toast && toast.onAppear && toast.onAppear();

    const fixedFAB = document.querySelector('.md-floating-btn.fixed');
    if(fixedFAB) {
      fixedFAB.classList.remove('snackbar-multiline-adjust');
      fixedFAB.classList.remove('snackbar-adjust');
      if(toast) {
        this.fabTimeout = setTimeout(() => {
          fixedFAB.classList.add(`snackbar${multiline ? '-multiline' : ''}-adjust`);
        }, this.props.toasts.length > 1 ? fabTimeout : 0);
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

  render() {
    const { className, toasts, dismiss, ...props } = this.props;
    const [toast] = toasts;
    return (
      <CSSTransitionGroup
        className="md-snackbar-container"
        transitionName="snackbar"
        transitionEnterTimeout={1200}
        transitionLeaveTimeout={450}
        >
        {toast &&
          <Toast
            key={toast.key || Date.now()}
            className={className}
            toast={toast}
            dismiss={dismiss}
            multiline={isPropEnabled(props, 'multiline')}
            {...props}
          />
        }
      </CSSTransitionGroup>
    );
  }
}
