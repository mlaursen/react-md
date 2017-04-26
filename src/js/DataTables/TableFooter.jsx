import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';

export default class TableFooter extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
  };

  static childContextTypes = {
    footer: PropTypes.bool,
  }

  getChildContext() {
    return { footer: true };
  }

  render() {
    const { className, children, ...props } = this.props;

    return (
      <tfoot className={cn('md-table-footer', className)} {...props}>
        {children}
      </tfoot>
    );
  }
}
