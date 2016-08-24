import React, { PureComponent, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import cn from 'classnames';

/**
 * A toolbar is a container that has an optional title and action areas.
 *
 * If you do not want to use the `NavigationDrawer` component, you can get
 * almost the same effect by combining the `Toolbar` and `Sidebar` components.
 */
export default class Toolbar extends PureComponent {
  static propTypes = {
    /**
     * An optional style to apply to the toobar header.
     */
    style: PropTypes.object,

    /**
     * An optional style to apply to the toolbar container.
     */
    containerStyle: PropTypes.object,

    /**
     * An optional className to apply to the header.
     */
    className: PropTypes.string,

    /**
     * An optional className to apply to the toolbar container.
     */
    containerClassName: PropTypes.string,

    /**
     * Boolean if the toolbar should be styled with the primary color.
     */
    primary: PropTypes.bool,

    /**
     * An element to render to the left of the toolbar's title. This is normally a
     * Hamburger menu button or some sort of button.
     */
    actionLeft: PropTypes.element,

    /**
     * A title to include in the toolbar.
     */
    title: PropTypes.string,

    /**
     * Any children to display underneath the toolbar title. This will
     * normally be the `Tabs` component.
     */
    children: PropTypes.node,

    /**
     * Any elements or nodes to display to the right of the toolbar title.
     */
    actionsRight: PropTypes.node,

    /**
     * Boolean if the toolbar is fixed to the top of the page. If this is set to true,
     * box-shadow will be added and any relative components/DOM nodes will have
     * additional spacing applied to them.
     */
    fixed: PropTypes.bool,
  };

  static defaultProps = {
    primary: true,
  };

  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    if (!this.refs.content) { return; }

    const tabs = findDOMNode(this.refs.content);
    if (tabs.querySelector('.md-tabs.tabs-centered') || tabs.querySelector('.md-tabs.fixed-width')) { return; }

    const actionLeft = findDOMNode(this).querySelector('.action-left');
    if (!actionLeft) { return; }
    const actionLeftMargin = parseInt(window.getComputedStyle(actionLeft, null).getPropertyValue('margin-left'), 10);
    const offset = tabs.querySelector('.md-tab-label > div').offsetLeft;

    /* eslint-disable react/no-did-mount-set-state*/
    this.setState({
      tabsOffset: `${actionLeftMargin * 2 + actionLeft.offsetWidth - offset}px`,
    });
  }

  render() {
    const {
      actionLeft,
      title,
      actionsRight,
      children,
      fixed,
      primary,
      className,
      containerStyle,
      containerClassName,
      ...props,
    } = this.props;
    const { tabsOffset } = this.state;
    const childrenAsHeader = !!children && !actionLeft && !title && !actionsRight;

    let header;
    if (childrenAsHeader) {
      header = children;
    } else {
      header = [
        actionLeft && React.cloneElement(actionLeft, { key: 'action-left', className: 'action-left' }),
        title && <h3 key="title" className="md-title">{title}</h3>,
        actionsRight && React.cloneElement(actionsRight, { key: 'actions-right' }),
      ];
    }

    let content;
    if (!childrenAsHeader && children) {
      content = React.cloneElement(children, {
        ref: 'content',
        style: Object.assign({}, children.props.style, { marginLeft: tabsOffset }),
      });
    }
    return (
      <div className={cn('md-toolbar-container', containerClassName, { fixed })} style={containerStyle}>
        <header
          {...props}
          className={cn('md-toolbar', className, { 'md-primary': primary })}
        >
          {header}
        </header>
        {content}
      </div>
    );
  }
}
