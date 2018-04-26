import React, { PureComponent } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

import Grid from './Grid';
import Cell from './Cell';

const DIFF_KEYS = [
  'className',
  'cellClassName',
  'stacked',
  'container',
  'noSpacing',
  'gutter',
  'spacing',
  'align',
  'position',
  'size',
  'offset',
  'order',
  'phoneSize',
  'phoneOrder',
  'phoneOffset',
  'phoneHidden',
  'tabletSize',
  'tabletOrder',
  'tabletOffset',
  'tabletHidden',
  'desktopSize',
  'desktopOrder',
  'desktopOffset',
  'desktopHidden',
];

export default class GridList extends PureComponent {
  static propTypes = {
    /**
     * An optional style to apply to the Grid component. This will only be applied
     * if the `children` prop is not a callback function.
     *
     * @see {@link #children}
     */
    style: PropTypes.object,

    /**
     * An optional className to apply to the Grid component. This will only be applied
     * if the `children` prop is not a callback function.
     *
     * @see {@link #children}
     */
    className: PropTypes.string,

    /**
     * An optional style to apply to each child. This will only be applied
     * if the `children` prop is not a callback function.
     *
     * @see {@link #children}
     */
    cellStyle: PropTypes.object,

    /**
     * An optional className to apply to each child. This will only be applied
     * if the `children` prop is not a callback function.
     *
     * @see {@link #children}
     */
    cellClassName: PropTypes.string,

    /**
     * The component to render the Cell as. This should probably not be used as much
     * as the `children` callback function.
     */
    component: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
    ]),

    /**
     * The children can either be renderable React elements or a callback function
     * that accepts the style and className props to apply so that the styles can
     * be manually added to whichever component.
     */
    children: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.node,
    ]),

    /**
     * An optional container name to apply to the Grid. This should be the same name as provided
     * to the [react-md-make-grid-container](/components/grids?tab=2#mixin-react-md-make-grid-container) mixin.
     */
    container: PropTypes.string,

    /**
     * Boolean if the grid should be placed vertically instead of horizontally.
     */
    stacked: PropTypes.bool,

    /**
     * Boolean if all the gutters and spacing should be removed from the grid.
     */
    noSpacing: PropTypes.bool,

    /**
     * When the [react-md-make-custom-grid](/components/grids?tab=2#mixin-react-md-make-custom-grid) mixin
     * is used, you can use the `gutter` and `spacing` props on the `Grid` to apply the correct className
     */
    gutter: PropTypes.number,

    /**
     * When the [react-md-make-custom-grid](/components/grids?tab=2#mixin-react-md-make-custom-grid) mixin
     * is used, you can use the `gutter` and `spacing` props on the `Grid` to apply the correct className
     */
    spacing: PropTypes.number,

    /**
     * An optional cell alignment to apply. When the `Grid` is not `stacked`,
     * this will apply to vertical alignment within each "row" of the grid.
     *
     * Alignments:
     * - `top` - This will align to the top of the row
     * - `middle` - This will align to the middle of the row
     * - `bottom` - This will align to the bottom of the row
     * - `stretch` - This will make the cell stretch to fill all the available space
     *   in the row.
     *
     * @see {@link #position}
     */
    align: PropTypes.oneOf(['top', 'middle', 'bottom', 'stretch']),

    /**
     * An optional cell position to apply. When the `Grid` is not `stacked`,
     * this will apply to horizontal alignment within each "row" of the grid.
     *
     * Positions:
     * - `center` - This will align the cell to be within the center of the row. This really
     *    just applies `margin-left: auto; margin-right: auto`.
     * - `right` - This will align the cell to the end of the row. This really just applies `margin-left: auto`.
     *
     * @see {@link #align}
     */
    position: PropTypes.oneOf(['center', 'right']),

    /**
     * An optional size to apply to the cell. This sizing will be applied across all media sizes.
     * If the size is greater than the number of columns allowed for the media size, it will just
     * span the entire width.
     */
    size: PropTypes.number,

    /**
     * An optional order to apply to the cell. This order will be applied across all media sizes.
     */
    order: PropTypes.number,

    /**
     * An optional offset to apply to the cell. This will add spacing to the left of the cell.
     */
    offset: PropTypes.number,

    /**
     * An optional size to apply to the cell only on phones.
     */
    phoneSize: PropTypes.number,

    /**
     * An optional order to apply to the cell only on phones.
     */
    phoneOrder: PropTypes.number,

    /**
     * An optional offset to apply to the cell only on phones.
     */
    phoneOffset: PropTypes.number,

    /**
     * Boolean if the cell should be hidden on phones only.
     */
    phoneHidden: PropTypes.bool,

    /**
     * An optional size to apply to the cell only on tablets.
     */
    tabletSize: PropTypes.number,

    /**
     * An optional order to apply to the cell only on tablets.
     */
    tabletOrder: PropTypes.number,

    /**
     * An optional offset to apply to the cell only on tablets.
     */
    tabletOffset: PropTypes.number,

    /**
     * Boolean if the cell should be hidden on tablets only.
     */
    tabletHidden: PropTypes.bool,

    /**
     * An optional size to apply to the cell only on desktops.
     */
    desktopSize: PropTypes.number,

    /**
     * An optional order to apply to the cell only on desktops.
     */
    desktopOrder: PropTypes.number,

    /**
     * An optional offset to apply to the cell only on desktops.
     */
    desktopOffset: PropTypes.number,

    /**
     * Boolean if the cell should be hidden on desktops only.
     */
    desktopHidden: PropTypes.bool,
  };

  static defaultProps = {
    component: 'div',
    stacked: false,
    noSpacing: false,
    phoneHidden: false,
    tabletHidden: false,
    desktopHidden: false,
  };

  /**
   * A utility function to get the grid's className based on the `Grid`'s and `Cell`'s
   * props. This is * used behind the scenes to merge and create the className for the grid.
   *
   * ### Example:
   * ```js
   * const { className, cellClassName } = GridList.getClassNames();
   * const { className, cellClassName } = GridList.getClassNames({ size: 1, container: 'custom' });
   * ```
   *
   * @param {Object=} props - This should be an object of the `Grid`'s props. It
   *    will extract the needed keys and generate the classNames.
   * @return {Object} an object containing the `className` and `cellClassName` attributes.
   */
  static getClassNames(props = {}) {
    const { className, cellClassName, ...remaining } = props;
    return {
      className: Grid.getClassName({ className, ...remaining }),
      cellClassName: Cell.getClassName({ className: cellClassName, ...remaining }),
    };
  }

  constructor(props) {
    super();

    this.state = GridList.getClassNames(props);
  }

  componentWillMount() {
    this.setState(GridList.getClassNames(this.props));
  }

  componentWillReceiveProps(nextProps) {
    if (DIFF_KEYS.some(key => this.props[key] !== nextProps[key])) {
      this.setState(GridList.getClassNames(nextProps));
    }
  }

  render() {
    const { className, cellClassName } = this.state;
    const {
      style,
      cellStyle,
      component: Component,
      children,
      /* eslint-disable no-unused-vars */
      className: propClassName,
      cellClassName: propCellClassName,
      container,
      noSpacing,
      stacked,
      gutter,
      spacing,
      align,
      position,
      size,
      offset,
      order,
      phoneSize,
      phoneOrder,
      phoneOffset,
      phoneHidden,
      tabletSize,
      tabletOrder,
      tabletOffset,
      tabletHidden,
      desktopSize,
      desktopOrder,
      desktopOffset,
      desktopHidden,
      /* eslint-enable no-unused-vars */
      ...props
    } = this.props;

    if (typeof children === 'function') {
      return children({ style, className, cellStyle, cellClassName });
    }

    return (
      <Component {...props} style={style} className={className}>
        {React.Children.map(children, (child) => {
          if (!child) {
            return child;
          }

          let childStyle = child.props.style;
          if (cellStyle) {
            childStyle = childStyle ? { ...cellStyle, ...childStyle } : cellStyle;
          }

          return React.cloneElement(child, {
            style: childStyle,
            className: cn(child.props.className, cellClassName),
          });
        })}
      </Component>
    );
  }
}
