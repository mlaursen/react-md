import React, { Component, PropTypes } from 'react';

/**
 * The `TableBody` component is used for managing the state of all
 * `TableRow` inside of it.
 */
export default class TableBody extends Component {
  constructor(props, context) {
    super(props, context);
  }

  static propTypes = {
    /**
     * A single or list of `TableRow` components to render.
     */
    children: PropTypes.node.isRequired,
  };

  static contextTypes = {
    allSelected: PropTypes.bool.isRequired,
    selectedRows: PropTypes.arrayOf(PropTypes.bool).isRequired,
    toggleSelectedRow: PropTypes.func.isRequired,
  };

  render() {
    const { children, ...props } = this.props;
    const { selectedRows, toggleSelectedRow } = this.context;

    const rows = React.Children.map(children, (row, i) => {
      const uncontrolled = typeof row.props.selected === 'undefined';
      return React.cloneElement(row, {
        ...row.props,
        key: row.key || i,
        selected: uncontrolled ? selectedRows[i] : row.props.selected,
        onCheckboxClick: e => {
          row.props.onCheckboxClick && row.props.onCheckboxClick(i, e);

          if(uncontrolled) {
            toggleSelectedRow(i);
          }
        },
      });
    });

    return (
      <tbody {...props}>
        {rows}
      </tbody>
    );
  }
}
