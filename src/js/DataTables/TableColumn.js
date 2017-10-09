import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import deprecated from 'react-prop-types/lib/deprecated';

import themeColors from '../utils/themeColors';
import getCollapserStyles from '../utils/getCollapserStyles';
import getField from '../utils/getField';
import injectTooltip from '../Tooltips/injectTooltip';
import FontIcon from '../FontIcons/FontIcon';
import getDeprecatedIcon from '../FontIcons/getDeprecatedIcon';
import IconSeparator from '../Helpers/IconSeparator';

const CELL_SCOPE = {
  header: {
    scope: 'col',
  },
  noop: {},
};

/**
 * A column in a table. This is either the `th` or `td` component.
 */
class TableColumn extends PureComponent {
  static propTypes = {
    /**
     * An optional style to apply.
     */
    style: PropTypes.object,

    /**
     * The optional className for the table column
     */
    className: PropTypes.string,

    /**
     * An optional style to apply to the surrounding div when the DataTable has been
     * set to include a fixed header or a fixed footer.
     */
    fixedStyle: PropTypes.object,

    /**
     * An optional className to apply to the surrounding div when the DataTable has been
     * set to include a fixed header or a fixed footer.
     */
    fixedClassName: PropTypes.string,

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
     * The icon to show when a column is sortable.
     */
    sortIcon: PropTypes.element,

    /**
     * Boolean if the sortIcon should appear before the text in the column.
     */
    sortIconBefore: PropTypes.bool,

    /**
     * A boolean if the column has numeric data. It will right-align the data.
     */
    numeric: PropTypes.bool,

    /**
     * Boolean if the table column should gain the `.md-data-table--adjusted` class name. By default,
     * every column will gain this class name unless it is an `EditDialogColumn`, a `SelectFieldColumn`,
     * or the `grow` prop is enabled.
     */
    adjusted: PropTypes.bool,

    /**
     * Boolean if the column should expand to fill any remaining width in the container. There should
     * really only be one column with the `grow` prop enabled. In addition, it should really only be
     * applied to one of the columns in the TableHeader.
     */
    grow: PropTypes.bool,

    /**
     * Boolean if this column is the `th` for a column of `SelectFieldColumn`. This will apply
     * additional styling to the column to position with the select field.
     */
    selectColumnHeader: PropTypes.bool,

    /**
     * Boolean if this is a `th` component. This value **should** be set
     * automatically for you if it is in the `TableHeader` component.
     */
    header: PropTypes.bool.isRequired,

    /**
     * The optional tooltip to render on hover.
     */
    tooltipLabel: PropTypes.node,

    /**
     * An optional delay to apply to the tooltip before it appears.
     */
    tooltipDelay: PropTypes.number,

    /**
     * The position of the tooltip.
     */
    tooltipPosition: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),

    /**
     * The injected tooltip.
     * @access private
     */
    tooltip: PropTypes.node,

    /**
     * Boolean if the `TableColumn` should gain the `plain` styles. This means that the text
     * in the column can wrap and there is no height limit enforced with some additional padding.
     */
    plain: PropTypes.bool,

    /**
     * An optional scope to apply to the table column. If omitted, the scope will be set to
     * `'col'` if inside of the `TableHeader` component. This is really only needed for
     * header columns.
     */
    scope: PropTypes.oneOf(['row', 'col']),

    /**
     * This is injected by the `TableRow` component to help with generating ids
     * @access private
     */
    cellIndex: PropTypes.number,
    sortIconChildren: deprecated(PropTypes.node, 'Use the `sortIcon` prop instead'),
    sortIconClassName: deprecated(PropTypes.string, 'Use the `sortIcon` prop instead'),
  };

  static defaultProps = {
    header: false,
    adjusted: true,
    sortIcon: <FontIcon>arrow_upward</FontIcon>,
    sortIconBefore: true,
  };

  static contextTypes = {
    plain: PropTypes.bool,
    footer: PropTypes.bool,
    fixedHeader: PropTypes.bool,
    fixedFooter: PropTypes.bool,
  };

  render() {
    const {
      className,
      fixedStyle,
      fixedClassName,
      numeric,
      header,
      children,
      sorted,
      sortIcon,
      tooltip,
      selectColumnHeader,
      adjusted,
      grow,
      sortIconBefore,
      /* eslint-disable no-unused-vars */
      plain: propPlain,
      scope: propScope,
      cellIndex,

      // deprecated
      sortIconChildren,
      sortIconClassName,
      /* eslint-enable no-unused-vars */
      ...props
    } = this.props;

    const sortable = typeof sorted === 'boolean';
    const plain = getField(this.props, this.context, 'plain');
    const Component = header ? 'th' : 'td';
    const scope = getField(this.props, CELL_SCOPE[header ? 'header' : 'noop'], 'scope');

    let displayedChildren = children;
    let ariaSort;
    if (sortable) {
      ariaSort = sorted ? 'ascending' : 'descending';
      const icon = React.Children.only(getDeprecatedIcon(sortIconClassName, sortIconChildren, sortIcon));
      displayedChildren = (
        <IconSeparator label={children} iconBefore={sortIconBefore}>
          {React.cloneElement(icon, { className: getCollapserStyles({ flipped: !sorted }, icon.props.className) })}
        </IconSeparator>
      );
    }

    const fixedHeader = header && this.context.fixedHeader;
    const fixedFooter = this.context.footer && this.context.fixedFooter;
    const fixed = fixedHeader || fixedFooter;
    const baseClassNames = themeColors({ text: !header, hint: header }, {
      'md-table-column--relative': tooltip,
      'md-table-column--select-field': selectColumnHeader,
    });

    const mergedClassNames = cn({
      'md-table-column--header': header,
      'md-table-column--data': !header && !plain,
      'md-table-column--plain': !header && plain,
      'md-table-column--adjusted': adjusted && !grow && !selectColumnHeader,
      'md-table-column--grow': grow,
      'md-table-column--sortable md-pointer--hover': sortable,
      [baseClassNames]: !fixed,
    }, className);

    if (fixed) {
      displayedChildren = (
        <div
          className={cn('md-table-column__fixed', {
            'md-table-column__fixed--header': fixedHeader,
            'md-table-column__fixed--footer': fixedFooter,
          })}
        >
          <div
            style={fixedStyle}
            className={cn(baseClassNames, mergedClassNames, 'md-table-column__fixed--flex', {
              'md-table-column__fixed--flex-right': numeric,
            }, fixedClassName)}
          >
            {tooltip}
            {displayedChildren}
          </div>
        </div>
      );
    }

    return (
      <Component
        aria-sort={ariaSort}
        {...props}
        scope={scope}
        className={cn('md-table-column', {
          'md-table-column--fixed': fixed,
          'md-text-left': !numeric && !fixed,
          'md-text-right': numeric && !fixed,
        }, mergedClassNames)}
      >
        {!fixedHeader && !fixedFooter && tooltip}
        {displayedChildren}
      </Component>
    );
  }
}

export default injectTooltip(TableColumn);
