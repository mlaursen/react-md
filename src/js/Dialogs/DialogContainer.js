import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import cn from 'classnames';
import deprecated from 'react-prop-types/lib/deprecated';
import isRequiredForA11y from 'react-prop-types/lib/isRequiredForA11y';

import { ESC } from '../constants/keyCodes';
import TICK from '../constants/CSSTransitionGroupTick';
import getField from '../utils/getField';
import toggleScroll from '../utils/toggleScroll';
import oneRequiredForA11y from '../utils/PropTypes/oneRequiredForA11y';
import Dialog from './Dialog';
import Portal from '../Helpers/Portal';

/**
 * The `DialogContainer` component is used for dynamically creating the `Dialog` with
 * transitions.
 */
export default class DialogContainer extends PureComponent {
  /* eslint-disable max-len */
  static propTypes = {
    /**
     * An id to use for the `Dialog` once it has been opened. This is used for the
     * [dialog role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_dialog_role).
     * This is used to generate an `id` for the `title` prop when it has been defined.
     */
    id: isRequiredForA11y(PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ])),
    /* eslint-enable max-len */

    /**
     * An optional accessibility prop to use when the `Dialog` is opened. This should be an id
     * pointing to some text that describes the content of the dialog. For accessibility
     * reasons, one of the following props must be defined:
     * - `title`
     * - `aria-describedby`
     * - `aria-labelledby`
     * - `aria-label`
     *
     * An example usage:
     *
     * ```js
     * <Dialog id="accessible-example" visible aria-describedby="accessible-content">
     *   <p id="accessible-content">This is some content that describes the dialog.</p>
     * </Dialog>
     * ```
     */
    'aria-describedby': oneRequiredForA11y(PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]), 'title', 'aria-labelledby', 'aria-label'),

    /**
     * An optional accessibility prop to use when the `title` prop is not given. This should be
     * an id pointing to a `h` tag that labels the dialog.
     *
     * An example usage:
     *
     * ```js
     * <Dialog visible id="accessible-example" aria-labelledby="accessible-dialog-label">
     *   <h2 id="accessible-dialog-label">Some Accessible Dialog</h2>
     * </Dialog>
     * ```
     */
    'aria-labelledby': PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),

    /**
     * An optional accessibility prop to use when the `title` and `aria-labelledby` props are
     * not defined. This should be a string that describes what is in the `Dialog`.
     *
     * An example usage:
     *
     * ```js
     * <Dialog visible id="accessible-example" aria-label="Some Accessible Dialog">
     *   <p>Lorem Ipsum</p>
     * </Dialog>
     * ```
     */
    'aria-label': PropTypes.string,

    /**
     * An optional style to apply to the dialog's container.
     */
    style: PropTypes.object,

    /**
     * An optional className to apply to the dialog's container.
     */
    className: PropTypes.string,

    /**
     * An optional style to apply to the dialog itself when the `visible` prop is `true`.
     */
    dialogStyle: PropTypes.object,

    /**
     * An optional className to apply to the dialog itself when the `visible` prop is `true`.
     */
    dialogClassName: PropTypes.string,

    /**
     * An optional styke to apply to the title.
     */
    titleStyle: PropTypes.object,

    /**
     * An optional className to apply to the title.
     */
    titleClassName: PropTypes.string,

    /**
     * An optional style to apply to the footer. This is used when the `actions`
     * prop is defined.
     */
    footerStyle: PropTypes.object,

    /**
     * An optional className to apply to the footer. This is used when the `actions`
     * prop is defined.
     */
    footerClassName: PropTypes.string,

    /**
     * An optional style to apply to the dialog's content.
     */
    contentStyle: PropTypes.object,

    /**
     * An optional className to apply to the dialog's content.
     */
    contentClassName: PropTypes.string,

    /**
     * The component to render the dialog's container in.
     */
    component: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.string,
    ]).isRequired,

    /**
     * The component to render the dialog's content in.
     */
    contentComponent: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.string,
    ]).isRequired,

    /**
     * The content to display in the dialog once open.
     */
    children: PropTypes.node,

    /**
     * A single action or a list of actions to display in the dialog. This can either be a list
     * of `FlatButton` props or `<Button flat {...props} />` elements.
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
     * Boolean if the `Dialog` is current visible.
     */
    visible: PropTypes.bool.isRequired,

    /**
     * An optional function to call when the `visible` prop is changed from `false` to `true`.
     */
    onShow: PropTypes.func,

    /**
     * A function to call that will close the dialog. This is required when the `modal` and `fullPage`
     * props are not `true`.
     */
    onHide: (props, propName, ...args) => {
      let validator = PropTypes.func;
      if (!props.modal && !props.fullPage) {
        validator = validator.isRequired;
      }

      return validator(props, propName, ...args);
    },

    /**
     * Boolean if the dialog should behave like a modal. This means that the dialog can only
     * be closed by clicking on an action instead of also clicking on the overlay.
     */
    modal: PropTypes.bool,

    /**
     * Boolean if the dialog should be displayed as a full page dialog.
     */
    fullPage: (props, propName, componentName, ...args) => {
      if (typeof props[propName] === 'undefined') {
        return null;
      }
      const componentNameSafe = componentName || '<<anonymous>>';

      let err = PropTypes.bool(props, propName, componentName, ...args);

      if (!err && typeof props.title !== 'undefined') {
        err = new Error(
          `You provided a \`title\` ${location} to the \`${componentNameSafe}\` when \`fullPage\` ` +
          'has been set to true. A title for a full page dialog should be rendered as a child instead.'
        );
      }

      return err;
    },

    /**
     * An optional pageX location to use when rendering a full page dialog. This is used to set the location
     * the dialog should appear from.
     */
    pageX: PropTypes.number,

    /**
     * An optional pageY location to use when rendering a full page dialog. This is used to set the location
     * the dialog should appear from.
     */
    pageY: PropTypes.number,

    /**
     * @see {@link Helpers/FocusContainer#additionalFocusKeys}
     */
    additionalFocusKeys: Dialog.propTypes.additionalFocusKeys,

    /**
     * @see {@link Helpers/FocusContainer#initialFocus}
     */
    initialFocus: Dialog.propTypes.initialFocus,

    /**
     * @see {@link Helpers/FocusContainer#focusOnMount}
     */
    focusOnMount: Dialog.propTypes.focusOnMount,

    /**
     * @see {@link Helpers/FocusContainer#containFocus}
     */
    containFocus: Dialog.propTypes.containFocus,

    /**
     * The transition enter timeout for the dialog.
     */
    transitionEnterTimeout: PropTypes.number.isRequired,

    /**
     * The transition leave timeout for the dialog.
     */
    transitionLeaveTimeout: PropTypes.number.isRequired,

    /**
     * Boolean if the dialog should be closable by pressing the escape key.
     * This will always be considered `false` of the `modal` props is `true`.
     */
    closeOnEsc: PropTypes.bool,

    /**
     * Boolean if the Portal's functionality of rendering in a separate react tree should be applied
     * to the dialog.
     *
     * @see {@link Helpers/Portal}
     */
    portal: PropTypes.bool,

    /**
     * Since the `Dialog` uses the `Portal` component, you can pass an optional HTML Node to render
     * the dialog in instead of the `document.body`.
     */
    renderNode: PropTypes.object,

    /**
     * Boolean if the dialog should be rendered as the last child in the `renderNode` or `body` instead
     * of as the first.
     */
    lastChild: PropTypes.bool,

    /**
     * An optional title for the dialog.
     */
    title: PropTypes.node,

    /**
     * Boolean if the dialog should animate into view if it is constructed with `visible` enabled.
     *
     * This basically means that if the `Dialog` has `visible` enabled on initial page load, does it animate?
     * In some cases, it can also mean if the `Dialog` is added to the render tree with `visible` enabled,
     * does it animate?
     */
    defaultVisibleTransitionable: PropTypes.bool,

    /**
     * Boolean if the Dialog should no longer try to prevent the parent container from scrolling while visible.
     * In most cases, this will attempt to prevent the main window scrolling. If this dialog is nested in another
     * dialog, it will attempt to prevent the parent dialog from scrolling.
     */
    disableScrollLocking: PropTypes.bool,

    /**
     * Boolean if the dialog should automatically try to determine if the content
     * should be padded. It will be padded if the dialog does not contain a `List`.
     */
    autopadContent: PropTypes.bool,

    /**
     * Boolean if the dialog content's size should automatically be resized to overflow
     * correctly when there is a lot of content. This will calculate and apply some `maxHeight`
     * to the `contentStyle`.
     */
    autosizeContent: PropTypes.bool,

    /**
     * An optional height to apply to the dialog. This is used if it is easier to just apply height/width
     * with for specific dialogs instead of in CSS.
     *
     * **This prop should not be used if the `fullPage` prop is enabled.**
     *
     * @see {@link #fullPage}
     * @see {@link #width}
     */
    height: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),

    /**
     * An optional width to apply to the dialog. This is used if it is easier to just apply height/width
     * with for specific dialogs instead of in CSS.
     *
     * **This prop should not be used if the `fullPage` prop is enabled.**
     *
     * @see {@link #fullPage}
     * @see {@link #height}
     */
    width: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),

    /**
     * Boolean if the actions should be stacked on top of each other. If this value is `undefined`, it will
     * automatically attempt to guess if the items should be stacked.
     */
    stackedActions: PropTypes.bool,

    isOpen: deprecated(PropTypes.bool, 'Use `visible` instead'),
    transitionName: deprecated(PropTypes.string, 'The transition name will be managed by the component'),
    transitionEnter: deprecated(PropTypes.bool, 'The transition will always be enforced'),
    transitionLeave: deprecated(PropTypes.bool, 'The transition will always be enforced'),
    actionLeft: deprecated(PropTypes.node, 'Use the `fullPage` prop instead'),
    actionRight: deprecated(PropTypes.node, 'Use the `fullPage` prop instead'),
    close: deprecated(PropTypes.func, 'Use `onHide` instead.'),
  };

  static defaultProps = {
    autopadContent: true,
    autosizeContent: true,
    component: 'span',
    closeOnEsc: true,
    contentComponent: 'section',
    focusOnMount: true,
    transitionEnterTimeout: 300,
    transitionLeaveTimeout: 300,
    defaultVisibleTransitionable: false,
  };

  static contextTypes = {
    renderNode: PropTypes.object,
  };

  constructor(props) {
    super(props);

    const visible = typeof props.isOpen !== 'undefined' ? props.isOpen : props.visible;
    const dialogVisible = visible && !props.defaultVisibleTransitionable;

    this.state = {
      active: visible && !props.fullPage,
      overlay: visible && !props.fullPage,
      portalVisible: visible,
      dialogVisible,
    };
  }

  componentDidMount() {
    if (!this.props.isOpen && !this.props.visible) {
      return;
    }

    this._mountDialog(this.props);
  }

  componentWillReceiveProps(nextProps) {
    const visible = typeof nextProps.isOpen !== 'undefined' ? nextProps.isOpen : nextProps.visible;
    if (this.props.isOpen === visible || this.props.visible === visible) {
      return;
    }

    const el = getField(this.props, this.context, 'renderNode') || window;
    let { scrollX: pageX, scrollY: pageY } = el;
    if (typeof el.scrollTop !== 'undefined' && typeof el.scrollLeft !== 'undefined') {
      pageX = el.scrollLeft;
      pageY = el.scrollTop;
    } else if (typeof el.scrollY !== 'undefined' && typeof el.scrollX !== 'undefined') {
      pageX = el.scrollX;
      pageY = el.scrollY;
    }

    this._pageX = pageX;
    this._pageY = pageY;

    if (this._inTimeout) {
      clearTimeout(this._inTimeout);
      this._inTimeout = null;
    }

    if (visible) {
      this._activeElement = document.activeElement;
      this._mountPortal(nextProps);
    } else {
      this.setState({ dialogVisible: false, active: false });
    }
  }

  componentDidUpdate(prevProps) {
    const { visible, closeOnEsc, modal } = this.props;
    const escapable = !modal && closeOnEsc;
    const prevEscapable = !prevProps.modal && prevProps.closeOnEsc;

    // Only going to support visible here since it was not implemented before.
    if (visible === prevProps.visible && escapable === prevEscapable) {
      return;
    }

    let add = false;
    let remove = false;

    if (escapable !== prevEscapable) {
      add = visible && escapable;
      remove = !visible || (prevEscapable && !escapable);
    } else if (escapable) {
      add = visible;
      remove = !visible;
    }

    if (add) {
      window.addEventListener('keydown', this._handleEscClose);
    } else if (remove) {
      window.removeEventListener('keydown', this._handleEscClose);
    }
  }

  componentWillUnmount() {
    if (this.props.isOpen || this.props.visible) {
      toggleScroll(false);
    }

    if (this.props.visible && (this.props.closeOnEsc && !this.props.modal)) {
      window.removeEventListener('keydown', this._handleEscClose);
    }

    if (this._inTimeout) {
      clearTimeout(this._inTimeout);
    }
  }

  _setContainer = (container) => {
    if (container !== null) {
      this._container = findDOMNode(container);
    }
  };

  _handleEscClose = (e) => {
    if ((e.which || e.keyCode) === ESC) {
      (this.props.onHide || this.props.close)(e);
    }
  };

  _mountPortal = (props) => {
    this._mountDialog(props);
    this.setState({ portalVisible: true });
  };

  _mountDialog = (props) => {
    const { fullPage, onShow } = props;
    this._inTimeout = setTimeout(() => {
      this._inTimeout = fullPage ? null : setTimeout(() => {
        this._inTimeout = null;
        this.setState({ active: true });
      }, TICK);
      this.setState({ dialogVisible: true, overlay: !fullPage }, onShow);
    }, TICK);
  };

  _unmountPortal = () => {
    this.setState({ portalVisible: false });
  };

  _handleClick = (e) => {
    const visible = typeof this.props.isOpen !== 'undefined' ? this.props.isOpen : this.props.visible;
    if (this.props.modal || !visible || e.target !== this._container) {
      return;
    }

    (this.props.onHide || this.props.close)(e);
  };

  _handleDialogMounting = (dialog) => {
    const { disableScrollLocking } = this.props;
    if (dialog === null) {
      if (this._activeElement) {
        this._activeElement.focus();
      }

      if (!disableScrollLocking) {
        toggleScroll(false, this.scrollEl);
      }

      this._activeElement = null;
      this.setState({ overlay: false });
    } else {
      const container = document.querySelector(`#${this.props.id}`);
      if (!container || disableScrollLocking) {
        return;
      }

      let el = getField(this.props, this.context, 'renderNode');
      let node = container.parentNode;
      while (node && node.classList && !el) {
        if (node.classList.contains('md-dialog')) {
          el = node;
        }

        node = node.parentNode;
      }

      this.scrollEl = el;
      toggleScroll(true, el);
    }
  };

  render() {
    const { overlay, active, dialogVisible, portalVisible } = this.state;
    const {
      style,
      className,
      dialogStyle,
      dialogClassName,
      modal,
      fullPage,
      component,
      transitionEnterTimeout,
      transitionLeaveTimeout,
      lastChild,
      portal,
      /* eslint-disable no-unused-vars */
      visible: propVisible,
      renderNode: propRenderNode,
      closeOnEsc,
      onShow,
      onHide,
      disableScrollLocking,
      defaultVisibleTransitionable,

      // deprecated
      close,
      isOpen,
      actionLeft,
      actionRight,
      transitionName,
      transitionEnter,
      transitionLeave,
      /* eslint-enable no-unused-vars */
      ...props
    } = this.props;

    const renderNode = getField(this.props, this.context, 'renderNode');
    const dialog = (
      <Dialog
        key="dialog"
        style={dialogStyle}
        className={cn('md-background--card', dialogClassName)}
        ref={this._handleDialogMounting}
        centered={!fullPage}
        fullPage={fullPage}
        {...props}
        containerX={this._pageX}
        containerY={this._pageY}
        onLeave={this._unmountPortal}
      />
    );

    const container = (
      <CSSTransitionGroup
        component={component}
        ref={this._setContainer}
        style={style}
        className={cn('md-dialog-container', {
          'md-overlay': !fullPage && overlay,
          'md-pointer--hover': !fullPage && overlay && !modal,
          'md-overlay--active': !fullPage && active && overlay,
        }, className)}
        transitionName={`md-dialog--${fullPage ? 'full-page' : 'centered'}`}
        transitionEnterTimeout={transitionEnterTimeout}
        transitionLeaveTimeout={transitionLeaveTimeout}
        tabIndex={-1}
        onClick={this._handleClick}
      >
        {dialogVisible ? dialog : null}
      </CSSTransitionGroup>
    );

    if (!portal) {
      return portalVisible ? container : null;
    }

    return (
      <Portal visible={portalVisible} renderNode={renderNode} lastChild={lastChild}>
        {container}
      </Portal>
    );
  }
}
