import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';
import injectTooltip from '../Tooltips';
import FontIcon from '../FontIcons';

/**
 * A column in a table. This is either the `th` or `td` component.
 */
class TableColumn extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static propTypes = {
    /**
     * The optional className for the table column
     */
    className: PropTypes.string,

    /**
     * The children to display in the column.
     */
    children: PropTypes.node,

    /**
     * Boolean if the column is currently sorted. You should
     * set this to true if you want a sortable column at first. You
     * will also need to add an onClick function that sorts the rows.
     *
     * This value should really only be set in the `TableHeader` component.
     */
    sorted: PropTypes.bool,

    /**
     * The optional icon children to display in the sort icon.
     */
    sortIconChildren: PropTypes.node,

    /**
     * The icon className for the sort icon.
     */
    sortIconClassName: PropTypes.string.isRequired,

    /**
     * A boolean if the column has numeric data. It will right-align the data.
     */
    numeric: PropTypes.bool,

    /**
     * Boolean if this column should be adjusted with additional padding. This *should*
     * be handled automatically by the `TableRow` component.
     */
    adjusted: PropTypes.bool,

    /**
     * Boolean if this is a `th` component. This value **should** be set
     * automatically for you if it is in the `TableHeader` component.
     */
    header: PropTypes.bool.isRequired,

    /**
     * The optional tooltip to render on hover.
     */
    tooltipLabel: PropTypes.string,

    /**
     * The position of the tooltip.
     */
    tooltipPosition: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),

    /**
     * The optionally injected tooltip from the `injectTooltip` higher order component.
     */
    tooltip: PropTypes.node,
  };

  static defaultProps = {
    header: false,
    sortIconClassName: 'material-icons',
    sortIconChildren: 'arrow_upward',
  };

  render() {
    const { className, numeric, adjusted, header, children, tooltip, sorted, sortIconChildren, sortIconClassName, ...props } = this.props;
    const sortable = typeof sorted === 'boolean';

    let displayedChildren = [children, tooltip];
    if(sortable) {
      displayedChildren = [
        <FontIcon
          key="sort-icon"
          className={!sorted ? 'flipped': null}
          iconClassName={sortIconClassName}
          children={sortIconChildren}
        />,
        <span key="children" className="inline-top">{children}</span>,
        tooltip,
      ];
    }

    return React.createElement(header ? 'th' : 'td', {
      ...props,
      className: classnames(`md-table-${header ? 'header' : 'data'}`, className, { numeric, adjusted, sortable }),
      children: displayedChildren,
    });
  }
}

export default injectTooltip(TableColumn);
