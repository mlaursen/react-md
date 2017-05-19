import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import contextTypes from './contextTypes';

/**
 * The `TableBody` component is used for managing the state of all
 * `TableRow` inside of it.
 */
export default class TableBody extends Component {
  static propTypes = {
    /**
     * An optional style to apply to the tbody.
     */
    style: PropTypes.object,

    /**
     * An optional className to apply to the tbody.
     */
    className: PropTypes.string,

    /**
     * A list or a single item of `TableRow` components to render.
     */
    children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.arrayOf(PropTypes.element),
    ]),
  };

  static contextTypes = contextTypes;

  render() {
    const { children, className, ...props } = this.props;
    const { selectedRows } = this.context;

    const rows = children ? Children.map(Children.toArray(children), (row, i) => {
      const uncontrolled = typeof row.props.selected === 'undefined';
      return React.cloneElement(row, {
        selected: uncontrolled ? selectedRows[i] : row.props.selected,
      });
    }) : null;

    return (
      <tbody {...props} className={cn('md-table-body', className)}>
        {rows}
      </tbody>
    );
  }
}
