import React, { PureComponent, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import cn from 'classnames';
import deprecated from 'react-prop-types/lib/deprecated';
import isRequiredForA11y from 'react-prop-types/lib/isRequiredForA11y';

import TICK from '../constants/CSSTransitionGroupTick';
import toggleScroll from '../utils/toggleScroll';
import oneRequiredForA11y from '../utils/PropTypes/oneRequiredForA11y';
import Dialog from './Dialog';
import Portal from '../Helpers/Portal';

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
     * <Dialog id="accessibleExample" isOpen aria-describedby="accessibleContent">
     *   <p id="accessibleContent">This is some content that describes the dialog.</p>
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
     * <Dialog isOpen id="accessibleExample" aria-labelledby="accessibleDialogLabel">
     *   <h2 id="accessibleDialogLabel">Some Accessible Dialog</h2>
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
     * <Dialog isOpen id="accessibleExample" aria-label="Some Accessible Dialog">
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
     * An optional style to apply to the dialog itself when the `isOpen` prop is `true`.
     */
    dialogStyle: PropTypes.object,

    /**
     * An optional className to apply to the dialog itself when the `isOpen` prop is `true`.
     */
    dialogClassName: PropTypes.string,

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
     * Bolean if the `Dialog` is current open.
     */
    isOpen: PropTypes.bool.isRequired,

    /**
     * An optional function to call when the `isOpen` prop is changed from `false` to `true`.
     */
    onOpen: PropTypes.func,

    /**
     * A function to call that will close the dialog. This is required when the `modal` prop is
     * not `true`.
     */
    onClose: (props, propName, ...args) => {
      let validator = PropTypes.func;
      if (!props.modal) {
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
     * Boolean if the dialog should focus one of children once it has mounted.
     */
    focusOnMount: PropTypes.bool.isRequired,

    /**
     * The transition enter timeout for the dialog.
     */
    transitionEnterTimeout: PropTypes.number.isRequired,

    /**
     * The transition leave timeout for the dialog.
     */
    transitionLeaveTimeout: PropTypes.number.isRequired,

    /**
     * Since the `Dialog` uses the `Portal` component, you can pass an optional HTML Node to render
     * the dialog in instead of the `document.body`.
     */
    renderNode: PropTypes.object,

    transitionName: deprecated(PropTypes.string, 'The transition name will be managed by the component'),
    transitionEnter: deprecated(PropTypes.bool, 'The transition will always be enforced'),
    transitionLeave: deprecated(PropTypes.bool, 'The transition will always be enforced'),
    actionLeft: deprecated(PropTypes.node, 'Use the `fullPage` prop instead'),
    actionRight: deprecated(PropTypes.node, 'Use the `fullPage` prop instead'),
    close: deprecated(PropTypes.func, 'Use `onClose` instead.'),
  };

  static defaultProps = {
    component: 'span',
    contentComponent: 'section',
    focusOnMount: true,
    transitionEnterTimeout: 300,
    transitionLeaveTimeout: 300,
  };

  constructor(props) {
    super(props);

    this.state = {
      active: props.isOpen && !props.fullPage,
      overlay: props.isOpen && !props.fullPage,
      portalVisible: props.isOpen,
      dialogVisible: false,
    };
    this._setContainer = this._setContainer.bind(this);
    this._handleClick = this._handleClick.bind(this);
    this._handleDialogMounting = this._handleDialogMounting.bind(this);
    this._mountPortal = this._mountPortal.bind(this);
    this._mountDialog = this._mountDialog.bind(this);
    this._unmountPortal = this._unmountPortal.bind(this);
  }

  componentDidMount() {
    if (!this.props.isOpen) {
      return;
    }

    toggleScroll(true);
    this._mountDialog(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isOpen === nextProps.isOpen) {
      return;
    }

    const { isOpen } = nextProps;
    toggleScroll(isOpen);

    if (isOpen) {
      this._activeElement = document.activeElement;
      this._mountPortal(nextProps);
    } else {
      this.setState({ dialogVisible: false, active: false });
    }
  }

  componentWillUnmount() {
    if (this.props.isOpen) {
      toggleScroll(false);
    }

    if (this._inTimeout) {
      clearTimeout(this._inTimeout);
    }
  }

  _setContainer(container) {
    if (container !== null) {
      this._container = findDOMNode(container);
    }
  }

  _mountPortal(props) {
    this._mountDialog(props);
    this.setState({ portalVisible: true });
  }

  _mountDialog(props) {
    const { fullPage } = props;
    this._inTimeout = setTimeout(() => {
      this._inTimeout = fullPage ? null : setTimeout(() => {
        this._inTimeout = null;
        this.setState({ active: true });
      }, TICK);
      this.setState({ dialogVisible: true, overlay: !fullPage });
    }, TICK);
  }

  _unmountPortal() {
    this.setState({ portalVisible: false });
  }

  _handleClick(e) {
    if (this.props.modal || !this.props.isOpen || e.target !== this._container) {
      return;
    }

    (this.props.onClose || this.props.close)(e);
  }

  _handleDialogMounting(dialog) {
    if (dialog === null) {
      if (this._activeElement) {
        this._activeElement.focus();
      }

      this._activeElement = null;
      this.setState({ overlay: false });
      return;
    }
  }

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
      renderNode,
      ...props
    } = this.props;
    delete props.close;
    delete props.isOpen;
    delete props.onClose;
    delete props.actionLeft;
    delete props.actionRight;
    delete props.transitionName;
    delete props.transitionEnter;
    delete props.transitionLeave;

    const dialog = (
      <Dialog
        key="dialog"
        style={dialogStyle}
        className={dialogClassName}
        ref={this._handleDialogMounting}
        fullPage={fullPage}
        {...props}
        onLeave={this._unmountPortal}
      />
    );

    return (
      <Portal visible={portalVisible} renderNode={renderNode}>
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
          onClick={this._handleClick}
        >
          {dialogVisible ? dialog : null}
        </CSSTransitionGroup>
      </Portal>
    );
  }
}
