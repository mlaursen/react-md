import React, { PureComponent, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import cn from 'classnames';
import isRequiredForA11y from 'react-prop-types/lib/isRequiredForA11y';

import oneRequiredForA11y from '../utils/PropTypes/oneRequiredForA11y';
import FocusContainer from '../Helpers/FocusContainer';
import Paper from '../Papers/Paper';
import DialogTitle from './DialogTitle';
import DialogFooter from './DialogFooter';

/**
 * The `Dialog` is just a static component for creating dialogs. Dialogs
 * seemed like they could be used outside of the `DialogContainer` component,
 * so it was exposed as well. In *most* cases, you will still want to use
 * the `DialogContainer` component.
 */
export default class Dialog extends PureComponent {
  /* eslint-disable max-len */
  static propTypes = {
    /**
     * @see {@link Dialogs/DialogContainer#id}
     */
    id: isRequiredForA11y(PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ])),
    /* eslint-enable max-len */

    /**
     * @see {@link Dialogs/DialogContainer#aria-describedby}
     */
    'aria-describedby': oneRequiredForA11y(PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]), 'title', 'aria-labelledby', 'aria-label'),

    /**
     * @see {@link Dialogs/DialogContainer#aria-labelledby}
     */
    'aria-labelledby': PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),

    /**
     * @see {@link Dialogs/DialogContainer#aria-label}
     */
    'aria-label': PropTypes.string,

    /**
     * An optional style to apply to the dialog.
     */
    style: PropTypes.object,

    /**
     * An optional className to apply to the dialog.
     */
    className: PropTypes.string,

    /**
     * An optional style to apply to the dialog's content.
     */
    contentStyle: PropTypes.object,

    /**
     * An optional className to apply to the dialog's content.
     */
    contentClassName: PropTypes.string,

    /**
     * The component to render the content as. This is helpful if you would like to use
     * the CSSTransitionGroup. This really just saves a tiny bit of markup.
     *
     * ```js
     * <Dialog
     *   contentComponent={CSSTransitionGroup}
     *   contentProps={{
     *     transitionName: 'md-cross-fade',
     *     transitionLeave: false,
     *     transitionEnterTimeout: 150,
     *   }}
     * >
     *   {dynamicContent}
     * </Dialog>
     * ```
     */
    contentComponent: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
    ]).isRequired,

    /**
     * Any additional props to pass to the content component.
     */
    contentProps: PropTypes.object,

    /**
     * An optional title to display in the dialog.
     */
    title: PropTypes.node,

    /**
     * Any children to display in the content of the dialog.
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
     * @see {@link Helpers/FocusContainer#additionalFocusKeys}
     */
    additionalFocusKeys: FocusContainer.propTypes.additionalFocusKeys,

    /**
     * @see {@link Helpers/FocusContainer#initialFocus}
     */
    initialFocus: FocusContainer.propTypes.initialFocus,

    /**
     * @see {@link Helpers/FocusContainer#focusOnMount}
     */
    focusOnMount: FocusContainer.propTypes.focusOnMount,

    /**
     * @see {@link Helpers/FocusContainer#containFocus}
     */
    containFocus: FocusContainer.propTypes.containFocus,

    /**
     * An optional x coordinate on the page that caused a full page dialog
     * to be created. This is really just used for a `transformOrigin` style.
     */
    pageX: PropTypes.number,

    /**
     * An optional y coordinate on the page that caused a full page dialog
     * to be created. This is really just used for a `transformOrigin` style.
     */
    pageY: PropTypes.number,

    /**
     * An optional x scroll position of the container holding the dialog. This
     * is really just used for a `transformOrigin` style on full page dialogs.
     */
    containerX: PropTypes.number,

    /**
     * An optional y scroll position of the container holding the dialog. This
     * is really just used for a `transformOrigin` style on full page dialogs.
     */
    containerY: PropTypes.number,

    /**
     * Boolean if the dialog should be rendered as a full page dialog.
     */
    fullPage: PropTypes.bool,

    /**
     * The zDepth to use for the dialog.
     */
    zDepth: PropTypes.number.isRequired,

    /**
     * An optional function to call when the dialog has been opened. This is
     * really just used for the `DialogContainer`.
     */
    onOpen: PropTypes.func,

    /**
     * An optional function to call when the dialog has been closed. This is
     * really just used for the `DialogContainer`.
     */
    onLeave: PropTypes.func,

    /**
     * Boolean if the dialog should be centered in the page.
     */
    centered: PropTypes.bool,

    /**
     * Boolean if the content should be padded. This will take precidence
     * over the `autopadContent` prop. So if this is defined, that value
     * will be used instead of any thing that was was caclulated in this
     * component.
     *
     * @see {@link #autopadContent}
     */
    paddedContent: PropTypes.bool,

    /**
     * Boolean if the dialog should automatically try to determine if the content
     * should be padded. It will be padded if the dialog does not contain a `List`.
     */
    autopadContent: PropTypes.bool,
  };

  static defaultProps = {
    autopadContent: true,
    contentComponent: 'section',
    zDepth: 5,
  };

  static childContextTypes = {
    renderNode: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = { transformOrigin: null };
    this._setContent = this._setContent.bind(this);
  }

  getChildContext() {
    return { renderNode: this._renderNode };
  }

  componentWillMount() {
    const { pageX, containerX, pageY, containerY } = this.props;
    if (!pageX || !pageY) {
      return;
    }

    this.setState({
      transformOrigin: `${pageX - containerX}px ${pageY - containerY}px`,
    });
  }

  componentDidMount() {
    if (this.props.onOpen) {
      this.props.onOpen();
    }
  }

  componentWillUnmount() {
    if (this.props.onLeave) {
      this.props.onLeave();
    }
  }

  _setRenderNode = (dialog) => {
    this._renderNode = findDOMNode(dialog);
  };

  _setContent(content) {
    if (content !== null) {
      this._content = findDOMNode(content);
      const contentPadded = this._content.querySelectorAll('.md-list').length === 0;

      this.setState({ contentPadded });
    }
  }

  render() {
    const { contentPadded, transformOrigin } = this.state;
    const {
      id,
      className,
      contentStyle,
      contentClassName,
      title,
      contentComponent: Content,
      contentProps,
      actions,
      children,
      fullPage,
      centered,
      autopadContent,
      paddedContent,
      /* eslint-disable no-unused-vars */
      style: propStyle,
      pageX,
      pageY,
      containerX,
      containerY,
      onOpen,
      onLeave,
      /* eslint-enable no-unused-vars */
      ...props
    } = this.props;

    let { 'aria-labelledby': labelledBy, style } = this.props;
    const titleId = `${id}-title`;
    if (!labelledBy && title) {
      labelledBy = titleId;
    }

    const padDefined = typeof paddedContent !== 'undefined';
    const dialogChildren = fullPage ? children : [
      <DialogTitle key="title" id={titleId}>{title}</DialogTitle>,
      <Content
        ref={!padDefined && autopadContent ? this._setContent : null}
        key="content"
        {...contentProps}
        style={contentStyle}
        className={cn('md-dialog-content', {
          'md-dialog-content--padded': padDefined ? paddedContent : contentPadded,
        }, contentClassName)}
      >
        {children}
      </Content>,
      <DialogFooter key="footer" actions={actions} />,
    ];

    if (transformOrigin) {
      style = Object.assign({}, style, { transformOrigin });
    }

    return (
      <Paper
        {...props}
        id={id}
        component={FocusContainer}
        ref={this._setRenderNode}
        style={style}
        className={cn('md-dialog', {
          'md-dialog--full-page': fullPage,
          'md-dialog--centered': centered,
        }, className)}
        role="dialog"
        aria-labelledby={labelledBy}
      >
        {dialogChildren}
      </Paper>
    );
  }
}
