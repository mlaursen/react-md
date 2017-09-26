import React from 'react';
import PropTypes from 'prop-types';

import TooltipContainer from './TooltipContainer';


/**
 * Adds a tooltip for a component/element given as the only child.
 *
 * The component should render its children, or the tooltip will not be shown.
 * Also the component should be positioned by `className` or `style`
 * (CSS property `position` should have value `relative`, `absolute` or `fixed`),
 * or the tooltip can appear incorrectly.
 * Use `setPosition={true}` to automatically add `position: 'relative'` to the `style` of the wrapped component.
 *
 * Besides of `children` and `setPosition` all props set for `Tooltipped` component are passed through
 * to `TooltipContainer` that is added as a child of the wrapped component and controls the tooltip.
 *
 * ```js
 * <Tooltipped
 *   label="Tooltip for text"
 *   position="left"
 *   delay={1000}
 * >
 *   <span style={{position: 'absolute', top: '10px', left: '70%'}}>
 *     Some text
 *     <div>Another line of text</div>
 *   </span>
 * </Tooltipped>
 * ```
 *
 * ```js
 * <Tooltipped
 *   setPosition={true}
 *   label="Avatar's tooltip"
 *   position="top"
 * >
 *   <span style={{marginLeft: '30px'}}>
 *       <Avatar random>T</Avatar>
 *   </span>
 * </Tooltipped>
 * ```
 */
export default function Tooltipped({ children, setPosition, ...props }) {
  let target = React.Children.only(children);
  const targetProps = target.props;

  if (props.label) {
    let clonedProps = targetProps;
    if (setPosition) {
      clonedProps = {
        ...clonedProps,
        style: { ...clonedProps.style, position: 'relative' },
      };
    }

    target = React.cloneElement(target, clonedProps, [
      targetProps.children,
      <TooltipContainer key="tooltipContainer" {...props} />,
    ]);
  }

  return target;
}

Tooltipped.displayName = 'Tooltipped';

Tooltipped.propTypes = {
  /**
   * A component/element the tooltip should be linked to.
   */
  children: PropTypes.element.isRequired,
  /**
   * Tooltip's content.
   */
  label: PropTypes.node,
  /**
   * Whether `position: relative` should be added to the `style` property of the wrapped component.
   */
  setPosition: PropTypes.bool,
};
