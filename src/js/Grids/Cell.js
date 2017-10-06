import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import bem from '../utils/bem';

const DIFF_KEYS = [
  'className',
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

export default class Cell extends PureComponent {
  static propTypes = {
    /**
     * An optional style to apply to the Cell component. This will only be applied
     * if the `children` prop is not a callback function.
     *
     * @see {@link #children}
     */
    style: PropTypes.object,

    /**
     * An optional className to apply to the Cell component. This will only be applied
     * if the `children` prop is not a callback function.
     *
     * @see {@link #children}
     */
    className: PropTypes.string,

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
    phoneHidden: false,
    tabletHidden: false,
    desktopHidden: false,
  };

  /**
   * A utility function to get the cell's className based on the Cell's props. This is
   * used behind the scenes to merge and create the className for the cell.
   *
   * ### Example:
   * ```js
   * <div className={Cell.getClassName()}>A simple cell</div>
   * <div className={Cell.getClassName({ size: 1 })}>A cell with size 1</div>
   * ```
   *
   * @param {Object=} props - This should be an object of the `Cell`'s props. It
   *    will extract the needed keys and generate the className.
   * @return {String} the full className to use for the cell
   */
  static getClassName(props = {}) {
    const {
      className,
      align,
      position,
      size,
      order,
      offset,
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
    } = props;

    return bem('md-cell', {
      [align]: align,
      [position]: position,
      [size]: size,
      [`order-${order}`]: order,
      [`${offset}-offset`]: offset,
      [`${phoneSize}-phone`]: phoneSize,
      [`order-${phoneOrder}-phone`]: phoneOrder,
      [`${phoneOffset}-phone-offset`]: phoneOffset,
      'phone-hidden': phoneHidden,
      [`${tabletSize}-tablet`]: tabletSize,
      [`order-${tabletOrder}-tablet`]: tabletOrder,
      [`${tabletOffset}-tablet-offset`]: tabletOffset,
      'tablet-hidden': tabletHidden,
      [`${desktopSize}-desktop`]: desktopSize,
      [`order-${desktopOrder}-desktop`]: desktopOrder,
      [`${desktopOffset}-desktop-offset`]: desktopOffset,
      'desktop-hidden': desktopHidden,
    }, className);
  }

  constructor(props) {
    super();

    this.state = { className: Cell.getClassName(props) };
  }

  componentWillMount() {
    this.setState({ className: Cell.getClassName(this.props) });
  }

  componentWillReceiveProps(nextProps) {
    if (DIFF_KEYS.some(key => this.props[key] !== nextProps[key])) {
      this.setState({ className: Cell.getClassName(nextProps) });
    }
  }

  render() {
    const { className } = this.state;
    const {
      style,
      component: Component,
      children,
      /* eslint-disable no-unused-vars */
      className: propClassName,
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
      return children({ style, className });
    }

    return <Component {...props} style={style} className={className}>{children}</Component>;
  }
}
