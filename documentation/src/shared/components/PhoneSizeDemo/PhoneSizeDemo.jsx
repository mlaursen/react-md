import React, { PureComponent, PropTypes, Children, cloneElement } from 'react';
import cn from 'classnames';
import Paper from 'react-md/lib/Papers';
import Toolbar from 'react-md/lib/Toolbars';

import './_phone-size.scss';
import ClosePhoneSizeDemoButton from './ClosePhoneSizeDemoButton';

export default class PhoneSizeDemo extends PureComponent {
  static propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
    contentStyle: PropTypes.object,
    contentClassName: PropTypes.string,
    contentProps: PropTypes.object,
    toolbarStyle: PropTypes.object,
    toolbarClassName: PropTypes.string,

    title: PropTypes.string.isRequired,
    iconLeft: PropTypes.node,
    toolbar: PropTypes.bool,
    toolbarActions: Toolbar.propTypes.actions,
    toolbarZDepth: PropTypes.number,
    toolbarProminent: PropTypes.bool,
    toolbarProminentTitle: PropTypes.bool,

    mobile: PropTypes.bool,

    /**
     * If this is true, only a mobile device (not tablet or desktop) will be phone-sized.
     * This means that the children will be displayed as-is for tablet and desktop and in
     * a dialog for mobile devices.
     */
    mobileOnly: PropTypes.bool,
    contentComponent: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.string,
    ]).isRequired,
    statusBar: PropTypes.func,
    children: PropTypes.node,
  };

  static defaultProps = {
    title: 'Title',
    iconLeft: 'menu',
    contentComponent: 'section',
    toolbar: true,
  };

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const {
      className,
      statusBar: StatusBar,
      contentComponent: Content,
      contentProps,
      contentStyle,
      contentClassName,
      toolbarStyle,
      toolbarClassName,
      mobile,
      mobileOnly,
      children,
      title,
      iconLeft,
      toolbarZDepth,
      toolbarActions,
      toolbarProminent,
      toolbarProminentTitle,
      ...props
    } = this.props;
    delete props.toolbar;
    delete props.statusBar;

    let { toolbar } = this.props;

    if (mobileOnly && !mobile) {
      if (Children.count(children) > 1) {
        return (
          <Content {...contentProps} style={contentStyle} className={contentClassName}>
            {children}
          </Content>
        );
      }

      const childEl = Children.only(children);
      return cloneElement(children, {
        ...contentProps,
        style: { ...contentStyle, ...childEl.props.style },
        className: cn(contentClassName, childEl.prop.className),
      });
    }

    if (toolbar) {
      toolbar = (
        <Toolbar
          fixed
          colored
          style={toolbarStyle}
          className={cn('toolbar-fixed-phone', toolbarClassName)}
          title={title}
          prominent={toolbarProminent}
          prominentTitle={toolbarProminentTitle}
          nav={<ClosePhoneSizeDemoButton icon>{iconLeft}</ClosePhoneSizeDemoButton>}
          actions={toolbarActions}
          zDepth={toolbarZDepth}
        />
      );
    }

    let statusBar;
    if (StatusBar) {
      statusBar = <StatusBar />;
    }

    return (
      <Paper {...props} className={cn('phone-size-container', className)}>
        {statusBar}
        {toolbar}
        <Content
          {...contentProps}
          style={contentStyle}
          className={cn('phone-size-content', { 'toolbar-offset': toolbar }, contentClassName)}
        >
          {children}
        </Content>
      </Paper>
    );
  }
}
