import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import bem from '../utils/bem';
import isValued from '../utils/isValued';

const DIFF_KEYS = [
  'className',
  'stacked',
  'container',
  'noSpacing',
  'gutter',
  'spacing',
];

export default class Grid extends PureComponent {
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
     * The component to render the Grid as. This should probably not be used as much
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
  };

  static defaultProps = {
    component: 'div',
    stacked: false,
    noSpacing: false,
  };

  /**
   * A utility function to get the grid's className based on the Grid's props. This is
   * used behind the scenes to merge and create the className for the grid.
   *
   * ### Example:
   * ```js
   * <div className={Grid.getClassName()}>A base grid</div>
   * <div className={Grid.getClassName({ stacked: true })}>A stacked Grid</div>
   * ```
   *
   * @param {Object=} props - This should be an object of the `Grid`'s props. It
   *    will extract the needed keys and generate the className.
   * @return {String} the full className to use for the grid
   */
  static getClassName(props = {}) {
    const { className, stacked, noSpacing, gutter, spacing, container } = props;
    return bem('md-grid', {
      'stacked': stacked,
      'no-spacing': noSpacing,
      [`${gutter}-${spacing}`]: isValued(gutter) && isValued(spacing),
      [container]: container,
    }, className);
  }

  constructor(props) {
    super();

    this.state = { className: Grid.getClassName(props) };
  }

  componentWillMount() {
    this.setState({ className: Grid.getClassName(this.props) });
  }

  componentWillReceiveProps(nextProps) {
    if (DIFF_KEYS.some(key => this.props[key] !== nextProps[key])) {
      this.setState({ className: Grid.getClassName(nextProps) });
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
      container,
      stacked,
      noSpacing,
      gutter,
      spacing,
      /* eslint-enable no-unused-vars */
      ...props
    } = this.props;

    if (typeof children === 'function') {
      return children({ style, className });
    }

    return <Component {...props} style={style} className={className}>{children}</Component>;
  }
}
