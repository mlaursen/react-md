import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import classnames from 'classnames';

import { FlatButton } from '../';
import { isPropEnabled } from '../utils/PropUtils';

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
  };

  static defaultProps = {
    autohide: true,
    autohideTimeout: 3000,
  };

  componentDidUpdate(prevProps) {
    const { toasts, dismiss, autohide, autohideTimeout } = this.props;
    const [toast] = toasts;

    toast && toast.onAppear && toast.onAppear();
    if(toasts === prevProps.toasts || !autohide || !toast || this.toastTimeout) {
      return;
    }

    this.toastTimeout = setTimeout(() => {
      this.toastTimeout = null;
      dismiss();
    }, autohideTimeout);
  }

  getToastActionProps = ({ action }) => {
    return typeof action === 'string' ? { label: action, onClick: this.props.dismiss } : action;
  };

  render() {
    const { className, toasts } = this.props;
    const [toast] = toasts;
    return (
      <CSSTransitionGroup
        className="md-snackbar-container"
        transitionName="snackbar"
        transitionEnterTimeout={1200}
        transitionLeaveTimeout={450}
        >
        {toast &&
        <section className={classnames('md-snackbar', className, { 'multiline': isPropEnabled(this.props, 'multiline') })} key={toast.key}>
          <p>{toast.text}</p>
          {toast.action && <FlatButton {...this.getToastActionProps(toast)} />}
        </section>
        }
      </CSSTransitionGroup>
    );
  }
}
