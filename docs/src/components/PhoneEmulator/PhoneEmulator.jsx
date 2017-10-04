import React, { Children } from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Paper, Toolbar } from 'react-md';

import './_styles.scss';
import StatusBar from './StatusBar';
import CloseEmulator from './CloseEmulator';

const PhoneEmulator = ({
  style,
  className,
  contentStyle,
  contentClassName,
  toolbarStyle,
  toolbarClassName,
  toolbar,
  toolbarTitle,
  toolbarActions,
  toolbarZDepth,
  toolbarProminent,
  toolbarProminentTitle,
  toolbarNavIcon,
  mobile,
  mobileOnly,
  transitionContent,
  contentId,
  contentComponent,
  contentTransitionName,
  contentTransitionEnterTimeout,
  contentTransitionLeaveTimeout,
  children,
}) => {
  const contentProps = {
    id: contentId,
    style: contentStyle,
    className: contentClassName,
    component: contentComponent,
    transitionName: contentTransitionName,
    transitionEnter: transitionContent && !!contentTransitionEnterTimeout,
    transitionEnterTimeout: contentTransitionEnterTimeout,
    transitionLeave: transitionContent && !!contentTransitionLeaveTimeout,
    transitionLeaveTimeout: contentTransitionLeaveTimeout,
  };

  if (mobileOnly && !mobile) {
    // If the demo is for mobile devices only, attempt to display the single child. If there are
    // multiple children, wrap it in the content component.
    if (Children.count(children) > 1) {
      return (
        <CSSTransitionGroup {...contentProps}>
          {children}
        </CSSTransitionGroup>
      );
    } else if (contentStyle || contentClassName) {
      const child = Children.only(children);
      return React.cloneElement(child, {
        style: { ...contentStyle, ...child.props.style },
        className: cn(contentClassName, child.props.className),
      });
    }

    return children;
  }

  let emulatorToolbar;
  let emulatorStatusBar;
  if (toolbar) {
    emulatorToolbar = (
      <Toolbar
        key="toolbar"
        fixed
        colored
        style={toolbarStyle}
        className={cn('phone-emulator__toolbar', toolbarClassName)}
        nav={<CloseEmulator icon>{toolbarNavIcon}</CloseEmulator>}
        actions={toolbarActions}
        title={toolbarTitle}
        prominent={toolbarProminent}
        prominentTitle={toolbarProminentTitle}
        zDepth={toolbarZDepth}
      />
    );
  }

  if (!mobile) {
    emulatorStatusBar = <StatusBar key="status-bar" />;
  }

  return (
    <Paper style={style} className={cn('phone-emulator md-background', className)} zDepth={mobile ? 0 : undefined}>
      {emulatorStatusBar}
      {emulatorToolbar}
      <CSSTransitionGroup
        {...contentProps}
        className={cn('phone-emulator__content', {
          'phone-emulator__content--offset': toolbar,
          'phone-emulator__content--offset-prominent': toolbar && (toolbarProminent || toolbarProminentTitle),
        }, contentClassName)}
      >
        {children}
      </CSSTransitionGroup>
    </Paper>
  );
};

PhoneEmulator.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
  contentStyle: PropTypes.object,
  contentClassName: PropTypes.string,
  toolbarStyle: PropTypes.object,
  toolbarClassName: PropTypes.string,
  contentComponent: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
  ]).isRequired,
  transitionContent: PropTypes.bool,
  contentId: PropTypes.string,
  contentTransitionName: PropTypes.string,
  contentTransitionEnterTimeout: PropTypes.number,
  contentTransitionLeaveTimeout: PropTypes.number,

  /**
   * Boolean if a toolbar should appear in the phone emulator demo.
   */
  toolbar: PropTypes.bool,
  toolbarTitle: PropTypes.node,
  toolbarActions: Toolbar.propTypes.actions,
  toolbarZDepth: PropTypes.number,
  toolbarProminent: PropTypes.bool,
  toolbarProminentTitle: PropTypes.bool,
  toolbarNavIcon: PropTypes.node,

  /**
   * Boolean if the emulator should appear only on mobile devices. When this is enabled,
   * the children will be displayed as-is instead of in the emulator.
   */
  mobileOnly: PropTypes.bool,
  mobile: PropTypes.bool,
  children: PropTypes.node,
};

PhoneEmulator.defaultProps = {
  toolbarTitle: 'Title',
  toolbarNavIcon: 'menu',
  contentComponent: 'section',
  contentTransitionName: 'md-cross-fade',
  contentTransitionEnterTimeout: 300,
  contentTransitionLeaveTimeout: 0,
  toolbar: true,
};

export default PhoneEmulator;
