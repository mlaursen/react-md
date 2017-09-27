import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import fixedToShape from '../Helpers/fixedToShape';
import withTableFixes from './withTableFixes';
import MenuButton from '../Menus/MenuButton';
import TableColumn from './TableColumn';

class MenuButtonColumn extends PureComponent {
  static Positions = MenuButton.Positions;
  static HorizontalAnchors = MenuButton.HorizontalAnchors;
  static VerticalAnchors = MenuButton.VerticalAnchors;
  static propTypes = {
    /**
     * An optional id to use for the menu button in the column. If this is omitted, it's value will be
     * `${rowId}-${cellIndex}-menu-button`
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
     * The is the optional style to apply to the menu button's menu container.
     *
     * @see {@link Menus/MenuButton#style}
     */
    menuStyle: PropTypes.object,

    /**
     * The is the optional class name to apply to the menu button's menu container.
     *
     * @see {@link Menus/MenuButton#className}
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

    /**
     * This is injected by the `TableRow` component.
     * @access private
     */
    header: PropTypes.bool,

    /**
     * @access private
     */
    adjusted: PropTypes.bool,
  };

  static defaultProps = {
    simplifiedMenu: false,
  };

  render() {
    const {
      style,
      className,
      menuStyle,
      menuClassName,
      header,
      adjusted,
      tooltipLabel,
      tooltipDelay,
      tooltipPosition,
      ...props
    } = this.props;
    return (
      <TableColumn
        style={style}
        className={className}
        header={header}
        adjusted={adjusted}
        tooltipLabel={tooltipLabel}
        tooltipDelay={tooltipDelay}
        tooltipPosition={tooltipPosition}
      >
        <MenuButton {...props} style={menuStyle} className={menuClassName} />
      </TableColumn>
    );
  }
}

export default withTableFixes(MenuButtonColumn, 'menu-button');
