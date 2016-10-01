import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';
import Paper from 'react-md/lib/Papers';
import Toolbar from 'react-md/lib/Toolbars';

import './_phone-size.scss';
import StatusBar from './StatusBar';
import CloseButton from 'containers/PhoneSizeDemo/CloseButton';

export default class PhoneSize extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    title: PropTypes.string.isRequired,
    children: PropTypes.node,
    contentComponent: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
    ]),
    iconLeft: PropTypes.node,
    contentClassName: PropTypes.string,
    toolbar: PropTypes.bool,
    toolbarActions: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.arrayOf(PropTypes.element),
    ]),
    mobile: PropTypes.bool,
  };

  static defaultProps = {
    title: 'Title',
    iconLeft: 'menu',
    contentComponent: 'section',
    toolbar: true,
  };

  render() {
    const {
      children,
      title,
      className,
      contentComponent,
      contentClassName,
      toolbar,
      toolbarActions,
      iconLeft,
      mobile,
      ...props,
    } = this.props;

    const content = React.createElement(contentComponent, {
      className: cn('phone-size-content', {
        'toolbar-offset': toolbar,
      }, contentClassName),
    }, children);

    let toolbarNode;
    if (toolbar) {
      toolbarNode = (
        <Toolbar
          title={title}
          colored
          nav={<CloseButton icon>{iconLeft}</CloseButton>}
          actions={toolbarActions}
          className="md-toolbar--fixed-phone"
          fixed
        />
      );
    }

    return (
      <Paper className={cn('phone-size-container', className)} {...props}>
        <StatusBar mobile={mobile} />
        {toolbarNode}
        {content}
      </Paper>
    );
  }
}
