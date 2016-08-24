import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';
import Toolbar from '../Toolbars/Toolbar';
import Divider from '../Dividers/Divider';

import DialogFooter from './DialogFooter';

const DIALOG_PADDING = 8;

/**
 * This is the Dialog that appears when the `DialogContainer` component has
 * a true value for `isOpen`.
 */
export default class Dialog extends PureComponent {
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

  constructor(props) {
    super(props);

    this.state = { stacked: false };
  }

  componentDidMount() {
    const state = {};
    const { dialog, content } = this.refs;

    if (content.scrollHeight > content.clientHeight) {
      state.divided = true;
    }

    if (this.props.actions) {
      const maxButtonWidth = (dialog.offsetWidth - DIALOG_PADDING * 3) / 2;
      const actions = dialog.querySelectorAll('.md-btn');
      for (const action of actions) {
        if (action.offsetWidth > maxButtonWidth) {
          state.stacked = true;
          break;
        }
      }
    }

    this.setState(state); // eslint-disable-line react/no-did-mount-set-state
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
    delete props.pageX;
    delete props.pageY;

    const { stacked, divided } = this.state;

    let header;
    let footer;
    if (!isFullPage && title) {
      header = <h1 className="md-title">{title}</h1>;
    } else if (isFullPage) {
      header = (
        <Toolbar
          primary
          fixed
          actionLeft={actionLeft}
          title={title}
          actionsRight={actionRight}
        />
      );
    }

    if (actions && actions.length) {
      footer = <DialogFooter className={cn({ stacked })} actions={actions} />;
    }

    return (
      <div
        ref="dialog"
        className={cn('md-dialog', className, {
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
          className={cn('md-dialog-content', contentClassName, {
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
