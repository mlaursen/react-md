import React, { Component, PropTypes } from 'react';
import cn from 'classnames';
import contextTypes from './contextTypes';
import headerContextTypes from './headerContextTypes';

/**
 * A `thead` component to use in the `DataTable` component. This
 * will automatically update the header row to check if it is selected
 * and inject a function to toggle all rows selected if the row is
 * uncontrolled. It will also automatically attempt to set the `TableColumn`
 * components to be the header type.
 */
export default class TableHeader extends Component {
  static contextTypes = contextTypes;
  static childContextTypes = headerContextTypes;
  static propTypes = {
    /**
     * An optional style to apply.
     */
    style: PropTypes.object,

    /**
     * An optional className to apply to the table header
     */
    className: PropTypes.string,

    /**
     * This should be a single `TableRow` component. The `custom` validation will
     * warn you if there are more than one children given or none at all.
     */
    children: (props, propName, component) => {
      try {
        React.Children.only(props.children);
        return null;
      } catch (e) {
        const amt = props.children ? props.children.length : 0;
        return new Error(
          `There must only be one child in a '${component}', but ${amt} were given.`
        );
      }
    },
  };

  getChildContext() {
    return {
      ...this.context,
      header: true,
    };
  }

  render() {
    const { className, children, ...props } = this.props;
    const { toggleAllRows, allSelected } = this.context;
    const header = React.Children.only(children);
    const selected = typeof header.props.selected === 'undefined'
      ? allSelected
      : header.props.selected;

    const row = React.cloneElement(header, {
      ...header.props,
      selected,
      onCheckboxClick(checked, e) {
        if (header.props.onCheckboxClick) {
          header.props.onCheckboxClick(-1, checked, e);
        }

        if (typeof header.props.selected === 'undefined') {
          toggleAllRows();
        }
      },
    });

    return (
      <thead {...props} className={cn('md-table-header', className)}>
        {row}
      </thead>
    );
  }
}
