import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';
import Toolbar from '../Toolbars/Toolbar';
import Divider from '../Dividers/Divider';

import DialogFooter from './DialogFooter';

const DIALOG_PADDING = 8;

/**
 * This is the Dialog that appears when the `DialogContainer` component has
 * a true value for `isOpen`.
 */
export default class Dialog extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = { stacked: false };
  }

  static propTypes = {
    /**
     * Boolean if it is a simple dialog.
     */
    isSimple: PropTypes.bool.isRequired,

    /**
     * Boolean if it is a full page dialog.
     */
    isFullPage: PropTypes.bool.isRequired,

    /**
     * A transform-origin string to use for a full page dialog. This will
     * allow the dialog to appear from that origin.
     */
    transformOrigin: PropTypes.string,

    /**
     * An optional title to display above the content or in the `Toolbar` of a `Dialog`.
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
     * An optional style to apply to the `Dialog`.
     */
    style: PropTypes.object,

    /**
     * An optional className to apply to the `Dialog`.
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
     * Any children to display in the `Dialog`.
     */
    children: PropTypes.node,
  };

  componentDidMount() {
    let state = {};
    const { dialog, content } = this.refs;

    if(content.scrollHeight > content.clientHeight) {
      state.divided = true;
    }

    if(this.props.actions) {
      const maxButtonWidth = (dialog.offsetWidth - DIALOG_PADDING * 3) / 2;
      const actions = dialog.querySelectorAll('.md-btn');
      for(let action of actions) {
        if(action.offsetWidth > maxButtonWidth) {
          state.stacked = true;
          break;
        }
      }
    }

    this.setState(state); //eslint-disable-line react/no-did-mount-set-state
  }

  render() {
    const {
      title,
      children,
      className,
      contentStyle,
      contentClassName,
      actions,
      actionLeft,
      actionRight,
      style,
      transformOrigin,
      isSimple,
      isFullPage,
      ...props,
    } = this.props;
    const { stacked, divided } = this.state;

    let header, footer;
    if(!isFullPage && title) {
      header = <h1 className="md-title">{title}</h1>;
    } else if(isFullPage) {
      header = (
        <Toolbar
          primary
          fixed={true}
          actionLeft={actionLeft}
          title={title}
          actionsRight={actionRight}
        />
      );
    }

    if(actions && actions.length) {
      footer = <DialogFooter className={classnames({ stacked })} actions={actions} />;
    }

    return (
      <div
        ref="dialog"
        className={classnames('md-dialog', className, {
          'full-page': isFullPage,
          'dialog-centered': !isFullPage,
        })}
        style={Object.assign({}, style, { transformOrigin })}
        {...props}
      >
        {header}
        {header && divided && <Divider />}
        <section
          ref="content"
          style={contentStyle}
          className={classnames('md-dialog-content', contentClassName, {
            'simple': isSimple,
          })}
        >
          {children}
        </section>
        {footer && divided && <Divider />}
        {footer}
      </div>
    );
  }
}
