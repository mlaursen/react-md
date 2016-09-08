import React, { PureComponent, PropTypes } from 'react';
import classnames from 'classnames';
import Paper from 'react-md/lib/Papers';
import Toolbar from 'react-md/lib/Toolbars';
import Button from 'react-md/lib/Buttons';

export default class PhoneSize extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    title: PropTypes.string.isRequired,
    primary: PropTypes.bool,
    children: PropTypes.node,
    iconLeft: PropTypes.string.isRequired,
    actionsRight: PropTypes.node,
    contentComponent: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
    ]),
    contentClassName: PropTypes.string,
  };

  static defaultProps = {
    title: 'Title',
    primary: true,
    iconLeft: 'menu',
    contentComponent: 'section',
  };

  render() {
    const {
      children,
      title,
      primary,
      iconLeft,
      actionsRight,
      className,
      contentComponent,
      contentClassName,
      ...props,
    } = this.props;

    const content = React.createElement(contentComponent, {
      className: classnames('phone-size-content', contentClassName),
      children,
    });
    return (
      <Paper className={classnames('phone-size-container', className)} {...props}>
        <Toolbar
          primary={primary}
          title={title}
          actionLeft={<Button icon>{iconLeft}</Button>}
          actionsRight={actionsRight}
        />
        {content}
      </Paper>
    );
  }
}
