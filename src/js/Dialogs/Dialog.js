import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import classnames from 'classnames';

import { isPropEnabled } from '../utils';

export default class Dialog extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = { openClassName: props.isOpen };
  }

  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    title: PropTypes.string,
    actions: PropTypes.node,
    className: PropTypes.string,
    transitionName: PropTypes.string.isRequired,
    transitionEnter: PropTypes.bool,
    transitionEnterTimeout: PropTypes.number,
    transitionLeave: PropTypes.bool,
    transitionLeaveTimeout: PropTypes.number,
    children: PropTypes.node,
    modal: PropTypes.bool,
    close: PropTypes.func.isRequired,
  };

  static defaultProps = {
    transitionName: 'md-dialog',
    transitionEnter: true,
    transitionEnterTimeout: 450,
    transitionLeave: true,
    transitionLeaveTimeout: 450,
  };

  componentWillReceiveProps(nextProps) {
    if(this.props.isOpen && !nextProps.isOpen) {
      this.setState({
        openClassName: true,
        timeout: setTimeout(() => {
          this.setState({ openClassName: false, timeout: null });
        }, nextProps.transitionLeaveTimeout),
      });
    }
  }

  render() {
    const {
      actions,
      isOpen,
      title,
      children,
      className,
      close,
      transitionName,
      transitionEnter,
      transitionEnterTimeout,
      transitionLeave,
      transitionLeaveTimeout,
      ...props,
    } = this.props;
    const isSimple = !actions;
    return (
      <CSSTransitionGroup
        transitionName={transitionName}
        transitionEnter={transitionEnter}
        transitionEnterTimeout={transitionEnterTimeout}
        transisionLeave={transitionLeave}
        transitionLeaveTimeout={transitionLeaveTimeout}
        className={classnames('md-dialog-container', { 'open': isOpen || this.state.openClassName, 'simple': isSimple })}
        >
        {isOpen &&
        <div key="dialog" className={classnames('md-dialog', className)} {...props}>
          {title && <h2 className="md-title">{title}</h2>}
          <section className={classnames('md-dialog-content', { 'simple': isSimple })}>
            {children}
          </section>
          {actions &&
            <footer className="md-dialog-footer">
              {actions}
            </footer>
          }
        </div>
        }
        <CSSTransitionGroup
          transitionName="md-overlay"
          transitionEnterTimeout={150}
          transitionLeaveTimeout={450}
          >
          {isOpen &&
            <div
              key="overlay"
              className="md-overlay"
              onClick={isPropEnabled(props, 'modal') ? null : close}
            />
          }
        </CSSTransitionGroup>
      </CSSTransitionGroup>
    );
  }
}
