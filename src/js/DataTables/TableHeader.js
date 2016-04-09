import React, { Component, PropTypes } from 'react';

/**
 * A `thead` component ot use in the `DataTable` component. This
 * will automatically update the header row to check if it is selected
 * and inject a function to toggle all rows selected if the row is
 * uncontrolled. It will also automatically attempt to set the `TableColumn`
 * components to be the header type.
 */
export default class TableHeader extends Component {
  constructor(props, context) {
    super(props, context);
  }

  static propTypes = {
    /**
     * An optional classname to apply to the table header
     */
    className: PropTypes.string,

    /**
     * This should be a single `TableRow` component.
     */
    children: (props, propName, component) => {
      try {
        React.Children.only(props.children);
      } catch(e) {
        return new Error(`There must only be one child in a '${component}', but ${props.children ? props.children.length : 0} were given.`);
      }
    },
  };

  static childContextTypes = {
    uncheckedIconClassName: PropTypes.string.isRequired,
    uncheckedIconChildren: PropTypes.node,
    checkedIconClassName: PropTypes.string.isRequired,
    checkedIconChildren: PropTypes.node,
    plain: PropTypes.bool,
    allSelected: PropTypes.bool.isRequired,
    selectedRows: PropTypes.arrayOf(PropTypes.bool).isRequired,
    toggleAllRows: PropTypes.func.isRequired,
    toggleSelectedRow: PropTypes.func.isRequired,
    header: PropTypes.bool.isRequired,
  };

  static contextTypes = {
    uncheckedIconClassName: PropTypes.string.isRequired,
    uncheckedIconChildren: PropTypes.node,
    checkedIconClassName: PropTypes.string.isRequired,
    checkedIconChildren: PropTypes.node,
    plain: PropTypes.bool,
    allSelected: PropTypes.bool.isRequired,
    selectedRows: PropTypes.arrayOf(PropTypes.bool).isRequired,
    toggleAllRows: PropTypes.func.isRequired,
    toggleSelectedRow: PropTypes.func.isRequired,
  };

  getChildContext = () => {
    return {
      ...this.context,
      header: true,
    };
  };

  render() {
    const { children, ...props } = this.props;
    const { toggleAllRows, allSelected } = this.context;
    const header = React.Children.only(children);
    const selected = typeof header.props.selected === 'undefined' ? allSelected : header.props.selected;

    const row = React.cloneElement(header, {
      ...header.props,
      selected,
      onCheckboxClick: e => {
        header.props.onCheckboxClick && header.props.onCheckboxClick(e);

        if(typeof header.props.selected === 'undefined') {
          toggleAllRows();
        }
      },
    });

    return (
      <thead {...props}>
        {row}
      </thead>
    );
  }
}
