import React, { Component, PropTypes, Children } from 'react';
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
    const { selectedRows, toggleSelectedRow } = this.context;

    const rows = children ? Children.map(Children.toArray(children), (row, i) => {
      const uncontrolled = typeof row.props.selected === 'undefined';

      // Update the row to inject the selected prop from context if it is uncontrolled.
      // Also update the onCheckbox click function to additionally toggle the row if uncontrolled.
      return React.cloneElement(row, {
        ...row.props,
        index: i,
        selected: uncontrolled ? selectedRows[i] : row.props.selected,
        onCheckboxClick: (checked, e) => {
          if (row.props.onCheckboxClick) {
            row.props.onCheckboxClick(i, checked, e);
          }

          if (uncontrolled) {
            toggleSelectedRow(i);
          }
        },
      });
    }) : null;

    return (
      <tbody {...props} className={cn('md-table-body', className)}>
        {rows}
      </tbody>
    );
  }
}
