import React, { PureComponent, PropTypes } from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import cn from 'classnames';

import { setOverflow } from '../utils';
import Dialog from './Dialog';
import Overlay from '../Transitions/Overlay';

/**
 * This component renders a `Dialog` when the `isOpen` prop is set to true.
 * It will manage the css transitions between the open and closed states.
 */
export default class DialogContainer extends PureComponent {
  static propTypes = {
    /**
     * Boolean if the Dialog is currently open.
     */
    isOpen: PropTypes.bool.isRequired,

    /**
     * A function to call that will close the dialog. This function will
     * be called when the overlay is clicked on simple dialogs.
     */
    close: PropTypes.func.isRequired,

    /**
     * Any children to display in the Dialog.
     */
    children: PropTypes.node,

    /**
     * An optional title to display in the dialog.
     */
    title: PropTypes.string,

    /**
     * A single action or a list of actions to display in the Dialog.
     * This can either be a list of `FlatButton` props or `FlatButton` elements.
     */
    actions: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.object,
      PropTypes.arrayOf(PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.object,
      ])),
    ]),

    /**
     * Any action to display to the left of the title in a full page dialog's toolbar.
     * See the [Toolbar's actionLeft](/components/toolbars) documentation for more information.
     */
    actionLeft: PropTypes.node,

    /**
     * Any action to display to the right of the title in a full page dialog's toolbar.
     * See the [Toolbar actionsRight](/components/toolbars) documentation for more information.
     */
    actionRight: PropTypes.node,

    /**
     * An optional className to apply to the `Dialog` container.
     */
    className: PropTypes.string,

    /**
     * An optional className to apply to the `Dialog` itself.
     */
    dialogClassName: PropTypes.string,

    /**
     * An optional className to apply to the `Dialog`'s content section.
     */
    contentClassName: PropTypes.string,

    /**
     * Boolean if the `Dialog` should behave as a modal. This means that one
     * of the actions must be selected to close the dialog. The overlay
     * can not be clicked to be closed.
     */
    modal: PropTypes.bool,

    /**
     * An optional style to apply to the `Dialog` container.
     */
    style: PropTypes.object,

    /**
     * An optional style to apply to the `Dialog` itself.
     */
    dialogStyle: PropTypes.object,

    /**
     * An optional style to apply to the `Dialog`'s content section.
     */
    contentStyle: PropTypes.object,

    /**
     * An optional click/touch event's pageX location to use when
     * rendering a full page dialog. This will make the `Dialog` appear relative
     * to the click origin.
     */
    pageX: PropTypes.number,

    /**
     * An optional click/touch event's pageY location to use when
     * rendering a full page dialog. This will make the `Dialog` appear relative
     * to the click origin.
     */
    pageY: PropTypes.number,

    /**
     * The transition name to use for the `Dialog` when appearing/disappearing
     */
    transitionName: PropTypes.string.isRequired,

    /**
     * Boolean if the enter transition should be used.
     */
    transitionEnter: PropTypes.bool,

    /**
     * The timeout for the the enter transition.
     */
    transitionEnterTimeout: PropTypes.number,

    /**
     * Boolean if the leave transition should be used.
     */
    transitionLeave: PropTypes.bool,

    /**
     * The timeout for the leave transition.
     */
    transitionLeaveTimeout: PropTypes.number,
  };

  static defaultProps = {
    modal: false,
    transitionName: 'md-dialog',
    transitionEnter: true,
    transitionEnterTimeout: 300,
    transitionLeave: true,
    transitionLeaveTimeout: 300,
  };

  constructor(props) {
    super(props);

    this.state = { openClassName: props.isOpen };
    this._delayIsOpen = this._delayIsOpen.bind(this);
    this._openFullPageDialog = this._openFullPageDialog.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.isOpen && nextProps.isOpen) {
      setOverflow(true);
      if (nextProps.pageX && nextProps.pageY) {
        this._openFullPageDialog(nextProps);
      }
    } else if (this.props.isOpen && !nextProps.isOpen) {
      setOverflow(false);
      this._delayIsOpen(nextProps.transitionLeaveTimeout);
    }
  }

  componentWillUnmount() {
    setOverflow(false);

    if (this.state.timeout) {
      clearTimeout(this.state.timeout);
    }
  }

  _getTransformOrigin(pageX, pageY) {
    if (!pageX || !pageY) {
      return null;
    }

    return `${pageX - window.scrollX}px ${pageY - window.scrollY}px`;
  }

  /**
   * The only purpose of this function is to be used when closing the dialog.
   * The visibility gets changed to hidden and the z-index turns to -1. So
   * this function will wait for the dialog to finish animating before removing
   * the open className
   */
  _delayIsOpen(time) {
    const timeout = setTimeout(() => {
      this.setState({ openClassName: false, timeout: null });
    }, time);

    this.setState({ timeout, openClassName: true });
  }

  _openFullPageDialog({ pageX, pageY }) {
    this.setState({ transformOrigin: this._getTransformOrigin(pageX, pageY) });
  }

  render() {
    const {
      actions,
      isOpen,
      title,
      children,
      className,
      contentClassName,
      dialogClassName,
      modal,
      close,
      actionLeft,
      actionRight,
      style,
      dialogStyle,
      contentStyle,
      transitionName,
      transitionEnter,
      transitionEnterTimeout,
      transitionLeave,
      transitionLeaveTimeout,
      ...props,
    } = this.props;
    const isSimple = !actions || !actions.length;

    const isFullPage = !!actionLeft || !!actionRight;
    return (
      <CSSTransitionGroup
        transitionName={transitionName}
        transitionEnter={transitionEnter}
        transitionEnterTimeout={transitionEnterTimeout}
        transitionLeave={transitionLeave}
        transitionLeaveTimeout={transitionLeaveTimeout}
        className={cn('md-dialog-container', className, {
          'open': isOpen || this.state.openClassName,
          'simple': isSimple,
          'dialog-centered': !isFullPage,
        })}
        style={style}
      >
        {isOpen &&
          <Dialog
            key="dialog"
            title={title}
            children={children}
            className={dialogClassName}
            contentClassName={contentClassName}
            actions={actions}
            actionLeft={actionLeft}
            actionRight={actionRight}
            style={dialogStyle}
            contentStyle={contentStyle}
            transformOrigin={this.state.transformOrigin}
            isSimple={isSimple}
            isFullPage={isFullPage}
            {...props}
          />
        }
        <Overlay isOpen={isOpen} onClick={modal ? null : close} />
      </CSSTransitionGroup>
    );
  }
}
