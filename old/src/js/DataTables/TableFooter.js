import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

/**
 * This is just a simple <tfoot> component.
 */
export default class TableFooter extends PureComponent {
  static propTypes = {
    /**
     * An optional style to apply.
     */
    style: PropTypes.object,

    /**
     * An optional className to apply.
     */
    className: PropTypes.string,

    /**
     * The children to display. This should really be one or a list of `TableRow`
     * components.
     */
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
