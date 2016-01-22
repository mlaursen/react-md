import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import classnames from 'classnames';

import { isPropEnabled } from '../utils';
import Dialog from './Dialog';

export default class DialogContainer extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = { openClassName: props.isOpen };
  }

  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired,
    children: PropTypes.node,
    title: PropTypes.string,
    actions: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
    actionLeft: PropTypes.node,
    actionRight: PropTypes.node,
    className: PropTypes.string,
    contentClassName: PropTypes.string,
    containerClassName: PropTypes.string,
    modal: PropTypes.bool,
    style: PropTypes.object,
    pageX: PropTypes.number,
    pageY: PropTypes.number,
    transitionName: PropTypes.string.isRequired,
    transitionEnter: PropTypes.bool,
    transitionEnterTimeout: PropTypes.number,
    transitionLeave: PropTypes.bool,
    transitionLeaveTimeout: PropTypes.number,
    onlyChildren: PropTypes.bool,
  };

  static defaultProps = {
    transitionName: 'md-dialog',
    transitionEnter: true,
    transitionEnterTimeout: 300,
    transitionLeave: true,
    transitionLeaveTimeout: 300,
  };

  componentWillReceiveProps(nextProps) {
    if(!this.props.isOpen && nextProps.isOpen) {
      document.body.classList.add('hide-overflow');
      if(nextProps.pageX && nextProps.pageY) {
        this.openFullPageDialog(nextProps);
      }
    } else if(this.props.isOpen && !nextProps.isOpen) {
      document.body.classList.remove('hide-overflow');
      this.delayIsOpen(nextProps.transitionLeaveTimeout);
    }
  }

  componentWillUnmount() {
    document.body.classList.remove('hide-overflow');
    this.state.timeout && clearTimeout(this.state.timeout);
  }

  getTransformOrigin = (pageX, pageY) => {
    if(!pageX || !pageY) { return; }
    return `${pageX - window.scrollX}px ${pageY - window.scrollY}px`;
  };

  delayIsOpen = (time) => {
    const timeout = setTimeout(() => {
      this.setState({ openClassName: false, timeout: null });
    }, time);

    this.setState({ timeout, openClassName: true });
  };

  openFullPageDialog = ({ pageX, pageY }) => {
    this.setState({ transformOrigin: this.getTransformOrigin(pageX, pageY) });
  };

  render() {
    const {
      actions,
      isOpen,
      title,
      children,
      className,
      contentClassName,
      containerClassName,
      close,
      actionLeft,
      actionRight,
      style,
      transitionName,
      transitionEnter,
      transitionEnterTimeout,
      transitionLeave,
      transitionLeaveTimeout,
      ...props,
    } = this.props;
    const isSimple = !actions;

    const isFullPage = !!actionLeft || !!actionRight;
    return (
      <CSSTransitionGroup
        transitionName={transitionName}
        transitionEnter={transitionEnter}
        transitionEnterTimeout={transitionEnterTimeout}
        transisionLeave={transitionLeave}
        transitionLeaveTimeout={transitionLeaveTimeout}
        className={classnames('md-dialog-container', containerClassName, {
          'open': isOpen || this.state.openClassName,
          'simple': isSimple,
          'dialog-centered': !isFullPage,
        })}
        >
        {isOpen &&
          <Dialog
            key="dialog"
            title={title}
            children={children}
            className={className}
            contentClassName={contentClassName}
            actions={actions}
            actionLeft={actionLeft}
            actionRight={actionRight}
            style={style}
            transformOrigin={this.state.transformOrigin}
            isSimple={isSimple}
            isFullPage={isFullPage}
            {...props}
          />
        }
        <CSSTransitionGroup
          transitionName="md-overlay"
          transitionEnterTimeout={150}
          transitionLeaveTimeout={transitionLeaveTimeout}
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
