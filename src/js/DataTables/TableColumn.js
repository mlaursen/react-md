import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';
import injectTooltip from '../Tooltips';
import Collapser from '../FontIcons/Collapser';
import IconSeparator from '../Helpers/IconSeparator';

/**
 * A column in a table. This is either the `th` or `td` component. This column
 * can be automatically configured to be adjusted with additional padding
 * or auto expand to fill the remaining table space if the `TableRow` component
 * has `autoAdjust` set to `true`. If you would like to prevent this column
 * for being a candidate for auto expanding to remaining space, add the className
 * `.prevent-grow`.
 */
class TableColumn extends PureComponent {
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
     * Boolean if the column is currently sorted. If this prop is not `undefined`,
     * it will add the sort icon unto this column. You will also need to use the
     * `onClick` function to toggle the `sorted` prop as well as handling the sorting
     * of data.
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
     * be handled automatically by the `TableRow` component but can be set manually as well.
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
  };

  static defaultProps = {
    header: false,
    sortIconClassName: 'material-icons',
    sortIconChildren: 'arrow_upward',
  };

  render() {
    const {
      className,
      numeric,
      adjusted,
      header,
      children,
      sorted,
      sortIconChildren,
      sortIconClassName,
      ...props,
    } = this.props;
    const sortable = typeof sorted === 'boolean';

    let displayedChildren = children;
    if (sortable) {
      displayedChildren = (
        <IconSeparator label={children} iconBefore>
          <Collapser flipped={!sorted} iconClassName={sortIconClassName}>
            {sortIconChildren}
          </Collapser>
        </IconSeparator>
      );
    }

    return React.createElement(header ? 'th' : 'td', {
      ...props,
      className: cn('md-table-column', {
        'md-table-column--header': header,
        'md-table-column--data': !header,
        'md-table-column--adjusted': adjusted,
        'md-table-column--sortable md-pointer--hover': sortable,
        'md-color--text': !header,
        'md-color--secondary-text': header,
        'md-text-left': !numeric,
        'md-text-right': numeric,
      }, className),
    }, displayedChildren);
  }
}

export default injectTooltip(TableColumn);
