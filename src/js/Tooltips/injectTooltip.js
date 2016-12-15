import React, { PureComponent, PropTypes } from 'react';

import getDisplayName from '../utils/StringUtils/getDisplayName';
import TooltipContainer from './TooltipContainer';


/**
 * Takes any component and injects a tooltip container as a prop. The tooltip container
 * will add event listeners for touch, mouse, and keyboard events so that a tooltip will appear
 * in the ComposedComponent.
 *
 * If the `tooltipLabel` prop is omitted, the tooltip and event listeners will not
 * be included.
 *
 * ```js
 * @param {function} ComposedComponent the component to compose with the tooltip functionality.
 * @return {function} the ComposedComponent with a tooltip.
 * ```
 */
export default ComposedComponent => class TooltipedComponent extends PureComponent {
  static displayName = getDisplayName(ComposedComponent, 'Tooltiped');
  static propTypes = {
    /**
     * An optional style to apply to the tooltip container.
     */
    tooltipContainerStyle: PropTypes.object,

    /**
     * An optional className to apply to the tooltip container.
     */
    tooltipContainerClassName: PropTypes.string,

    /**
     * An optional style to apply to the tooltip itself.
     */
    tooltipStyle: PropTypes.object,

    /**
     * An optional className to the tooltip itself.
     */
    tooltipClassName: PropTypes.string,

    /**
     * The tooltip to display. If omitted, the `tooltip` prop will not be injected.
     */
    tooltipLabel: PropTypes.node,

    /**
     * The amount of delay before the tooltip will appear on hover, touch, or keyboard focus.
     */
    tooltipDelay: PropTypes.number.isRequired,

    /**
     * The position that the tooltip should appear related to the composed compoennt.
     */
    tooltipPosition: PropTypes.oneOf(['top', 'right', 'bottom', 'left']).isRequired,

    /**
     * The transition time for the tooltip appearing.
     */
    tooltipTransitionEnterTimeout: PropTypes.number.isRequired,

    /**
     * The transition time for the tooltip disappearing.
     */
    tooltipTransitionLeaveTimeout: PropTypes.number.isRequired,
  };

  static defaultProps = {
    tooltipDelay: 0,
    tooltipPosition: 'bottom',
    tooltipTransitionEnterTimeout: 150,
    tooltipTransitionLeaveTimeout: 150,
  };

  constructor(props) {
    super(props);

    this._composed = null;

    this.getComposedComponent = this.getComposedComponent.bind(this);
    this._setComposedComponent = this._setComposedComponent.bind(this);
  }

  /**
   * Gets the composed component as a ref. This is usefull if you need to access the ref of the
   * composed component instead of the `injectTooltip` HOC to use some publically accessible methods.
   *
   * ```js
   * <SomeInkedComponent
   *   ref={tooltipHOC => {
   *     tooltipHOC.getComposedComponent().focus();
   *   }}
   * />
   * ```
   *
   * > NOTE: This can be `null`, so make sure to do a null check before using..
   */
  getComposedComponent() {
    return this._composed;
  }

  _setComposedComponent(component) {
    this._composed = component;
  }

  render() {
    const {
      tooltipLabel,
      tooltipDelay,
      tooltipPosition,
      tooltipStyle,
      tooltipClassName,
      tooltipContainerStyle,
      tooltipContainerClassName,
      tooltipTransitionEnterTimeout,
      tooltipTransitionLeaveTimeout,
      ...props
    } = this.props;

    if (tooltipLabel) {
      props.tooltip = (
        <TooltipContainer
          key="tooltipContainer"
          label={tooltipLabel}
          delay={tooltipDelay}
          position={tooltipPosition}
          enterTimeout={tooltipTransitionEnterTimeout}
          leaveTimeout={tooltipTransitionLeaveTimeout}
          style={tooltipContainerStyle}
          className={tooltipContainerClassName}
          tooltipStyle={tooltipStyle}
          tooltipClassName={tooltipClassName}
        />
      );
    }

    props.ref = this._setComposedComponent;

    return <ComposedComponent {...props} />;
  }
};
