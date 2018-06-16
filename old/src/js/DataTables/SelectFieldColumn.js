import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import deprecated from 'react-prop-types/lib/deprecated';

import fixedToShape from '../Helpers/fixedToShape';
import positionShape from '../Helpers/positionShape';
import SelectField from '../SelectFields/SelectField';
import withTableFixes from './withTableFixes';
import TableColumn from './TableColumn';

/**
 * The `SelectFieldColumn` component is just a simple wrapper between a `SelectField` and
 * the `TableColumn` components.
 *
 * All props that are on the `SelectField` are also available here (except the naming of style or className).
 * See the [SelectField](/components/select-fields?tab=1#select-field-proptypes) for remaining prop descriptions.
 */
class SelectFieldColumn extends PureComponent {
  static VerticalAnchors = SelectField.VerticalAnchors;
  static HorizontalAnchors = SelectField.HorizontalAnchors;
  static Positions = SelectField.Positions;
  static propTypes = {
    /**
     * An optional id to use for the select field in the column. If this is omitted, it's value will be
     * `${rowId}-${cellIndex}-select-field`
     */
    id: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),

    /**
     * This is the optional style to apply to the `TableColumn`.
     */
    style: PropTypes.object,

    /**
     * This is the optional className to apply to the `TableColumn`.
     */
    className: PropTypes.string,

    /**
     * The is the optional style to apply to the select field's menu container.
     *
     * @see {@link SelectFields/SelectField#style}
     */
    menuStyle: PropTypes.object,

    /**
     * The is the optional class name to apply to the select field's menu container.
     *
     * @see {@link SelectFields/SelectField#className}
     */
    menuClassName: PropTypes.string,

    /**
     * This is how the select field should be fixed within the table. When this is omitted,
     * it will automatically use the responsive table as the fixture so that the select field
     * will close/adjust itself to the scrolling of the table.
     *
     * @see {@link Helpers/Layover#fixedTo}
     */
    fixedTo: fixedToShape,

    /**
     * Boolean if the select field should span the entire width of the column.
     */
    fullWidth: PropTypes.bool,

    /**
     * The position for the select field.
     *
     * @see {@link SelectFields/SelectField#position}
     */
    position: positionShape,

    /**
     * This is injected by the `TableRow` component.
     * @access private
     */
    header: PropTypes.bool,

    /**
     * @access private
     */
    adjusted: PropTypes.bool,

    /**
     * The optional tooltip to render on hover.
     *
     * @see {@link DataTables/TableColumn#tooltipLabel}
     */
    tooltipLabel: PropTypes.string,

    /**
     * An optional delay to apply to the tooltip before it appears.
     *
     * @see {@link DataTables/TableColumn#tooltipDelay}
     */
    tooltipDelay: PropTypes.number,

    /**
     * The position of the tooltip.
     *
     * @see {@link DataTables/TableColumn#tooltipPosition}
     */
    tooltipPosition: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),

    /**
     * Boolean if the menu should automatically try to reposition itself to stay within
     * the viewport when the `fixedTo` element scrolls.
     *
     * @see {@link Helpers/Layover#repositionOnScroll}
     */
    repositionOnScroll: PropTypes.bool,

    /**
     * Boolean if the menu should automatically try to reposition itself to stay within
     * the viewport when the window resizes.
     *
     * @see {@link Helpers/Layover#repositionOnResize}
     */
    repositionOnResize: PropTypes.bool,

    /**
     * Boolean if the menu logic should be simplified without any viewport logic and position
     * based on the relative position of the menu. This will most like require some additional
     * styles applied to the menu.
     *
     * @see {@link Helpers/Layover#simplified}
     */
    simplifiedMenu: PropTypes.bool,

    wrapperStyle: deprecated(PropTypes.object, 'There is no longer a wrapper'),
    wrapperClassName: deprecated(PropTypes.string, 'There is no longer a wrapper'),
  };

  static defaultProps = {
    position: SelectFieldColumn.Positions.BELOW,
    fullWidth: true,
    repositionOnScroll: true,
    repositionOnResize: false,
    simplifiedMenu: false,
  };

  render() {
    const {
      style,
      className,
      menuStyle,
      menuClassName,
      header,
      tooltipLabel,
      tooltipDelay,
      tooltipPosition,
      /* eslint-disable no-unused-vars */
      adjusted,

      // deprecated
      wrapperStyle,
      wrapperClassName,
      /* eslint-enable no-unused-vars */
      ...props
    } = this.props;

    return (
      <TableColumn
        header={header}
        style={style}
        className={cn('md-select-field-column', className)}
        adjusted={false}
        tooltipLabel={tooltipLabel}
        tooltipDelay={tooltipDelay}
        tooltipPosition={tooltipPosition}
      >
        <SelectField {...props} style={menuStyle} className={menuClassName} />
      </TableColumn>
    );
  }
}

export default withTableFixes(SelectFieldColumn, 'select-field');
