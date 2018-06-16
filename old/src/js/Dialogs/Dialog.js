import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import cn from 'classnames';
import isRequiredForA11y from 'react-prop-types/lib/isRequiredForA11y';

import oneRequiredForA11y from '../utils/PropTypes/oneRequiredForA11y';
import FocusContainer from '../Helpers/FocusContainer';
import ResizeObserver from '../Helpers/ResizeObserver';
import Paper from '../Papers/Paper';
import DialogTitle from './DialogTitle';
import DialogFooter from './DialogFooter';

const DIFF_KEYS = ['style', 'height', 'width', 'contentStyle'];

/**
 * The `Dialog` is just a static component for creating dialogs. Dialogs
 * seemed like they could be used outside of the `DialogContainer` component,
 * so it was exposed as well. In *most* cases, you will still want to use
 * the `DialogContainer` component.
 */
export default class Dialog extends PureComponent {
  static propTypes = {
    /**
     * @see {@link Dialogs/DialogContainer#id}
     */
    id: isRequiredForA11y(PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ])),

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
     * Boolean if the content should be padded. This will take precedence
     * over the `autopadContent` prop. So if this is defined, that value
     * will be used instead of any thing that was was calculated in this
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
  };

  static defaultProps = {
    autopadContent: true,
    autosizeContent: true,
    contentComponent: 'section',
    zDepth: 5,
  };

  static childContextTypes = {
    renderNode: PropTypes.object,
  };

  constructor(props) {
    super();

    const { height, width } = props;
    let styles = props.style;
    if (height || width) {
      styles = styles || {};
      styles = { height, width, ...styles };
    }

    this.state = {
      styles,
      contentStyles: props.contentStyle,
      contentPadded: false,
    };
  }

  getChildContext() {
    return { renderNode: this._renderNode };
  }

  componentWillMount() {
    const { pageX, pageY } = this.props;
    if (!pageX || !pageY) {
      return;
    }

    this.setState({ styles: this._getStyles(this.props) });
  }

  componentDidMount() {
    if (this.props.onOpen) {
      this.props.onOpen();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (DIFF_KEYS.some(key => nextProps[key] !== this.props[key])) {
      this.setState({
        styles: this._getStyles(nextProps),
        contentStyles: { ...this.state.contentStyles, ...nextProps.contentStyle },
      });
    }
  }

  componentWillUnmount() {
    if (this.props.onLeave) {
      this.props.onLeave();
    }
  }

  _getStyles = ({ pageX, containerX, pageY, containerY, height, width, style } = this.props) => ({
    height: typeof height !== 'undefined' ? height : null,
    width: typeof width !== 'undefined' ? width : null,
    transformOrigin: pageX || pageY ? `${pageX - containerX}px ${pageY - containerY}px` : null,
    ...style,
  });

  _setRenderNode = (dialog) => {
    this._renderNode = findDOMNode(dialog);
  };

  _setContent = (content) => {
    if (content !== null) {
      this._content = findDOMNode(content);
      const contentPadded = this._content.querySelectorAll('.md-list').length === 0;

      this.setState({ contentPadded });
    }
  };

  _handleContentResize = ({ scrollHeight, el: content }) => {
    const maxHeight = content.style.maxHeight;
    const dialog = content.parentNode;
    content.style.maxHeight = 'none';
    const title = this.props.title ? dialog.querySelector('.md-title--dialog') : null;
    const footer = this.props.actions ? dialog.querySelector('.md-dialog-footer') : null;

    const totalHeight = dialog.offsetHeight - (title ? title.offsetHeight : 0) - (footer ? footer.offsetHeight : 0);
    content.style.maxHeight = maxHeight;
    const equalHeight = totalHeight === scrollHeight;
    if (equalHeight) {
      const currentHeight = (this.state.contentStyles && this.state.contentStyles.maxHeight) || null;
      if (currentHeight && currentHeight !== scrollHeight) {
        this.setState({ contentStyles: this.props.contentStyle });
      }
    } else {
      this.setState({ contentStyles: { maxHeight: totalHeight, ...this.props.contentStyle } });
    }
  };

  render() {
    const { contentPadded, styles, contentStyles } = this.state;
    const {
      id,
      className,
      titleStyle,
      titleClassName,
      footerStyle,
      footerClassName,
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
      autosizeContent,
      stackedActions,
      /* eslint-disable no-unused-vars */
      style,
      contentStyle,
      pageX,
      pageY,
      containerX,
      containerY,
      onOpen,
      onLeave,
      height,
      width,
      /* eslint-enable no-unused-vars */
      ...props
    } = this.props;

    let { 'aria-labelledby': labelledBy } = this.props;
    const titleId = `${id}-title`;
    if (!labelledBy && title) {
      labelledBy = titleId;
    }

    const padDefined = typeof paddedContent !== 'undefined';
    const dialogChildren = fullPage ? children : [
      <DialogTitle
        key="title"
        id={titleId}
        style={titleStyle}
        className={titleClassName}
      >
        {title}
      </DialogTitle>,
      <Content
        ref={!padDefined && autopadContent ? this._setContent : null}
        key="content"
        {...contentProps}
        style={contentStyles}
        className={cn('md-dialog-content', {
          'md-dialog-content--padded': padDefined ? paddedContent : contentPadded,
        }, contentClassName)}
      >
        {autosizeContent ? <ResizeObserver watchHeight watchWidth onResize={this._handleContentResize} /> : null}
        {children}
      </Content>,
      <DialogFooter
        key="footer"
        style={footerStyle}
        className={footerClassName}
        actions={actions}
        stacked={stackedActions}
      />,
    ];

    return (
      <Paper
        {...props}
        id={id}
        component={FocusContainer}
        ref={this._setRenderNode}
        style={styles}
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
