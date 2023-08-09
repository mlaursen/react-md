import { cnb } from "cnbuilder";
import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import { Children, cloneElement, forwardRef, isValidElement } from "react";
import type { IconRotatorClassNameOptions } from "./styles";
import { iconRotator } from "./styles";

/**
 * @remarks \@since 6.0.0 Removed `animate` prop and added `disableTransition`
 */
export interface IconRotatorBaseProps
  extends HTMLAttributes<HTMLSpanElement>,
    IconRotatorClassNameOptions {
  /**
   * An optional style to apply to the surrounding span when the `forceIconWrap`
   * prop is enabled or the children is not a single react element.
   */
  style?: CSSProperties;

  /**
   * Boolean if the child icon should be "forcefully" wrapped in a `<span>`
   * element. This should be enabled if you have a custom icon that does not
   * pass the `className` prop down.
   *
   * @defaultValue `false`
   */
  forceIconWrap?: boolean;
}

export interface IconRotatorProps extends IconRotatorBaseProps {
  /**
   * The icon that should be rotated. If this is a valid React Element, the
   * class names will be cloned into that icon, otherwise the icon will be
   * wrapped in a span with the correct class names applied.
   */
  children: ReactNode;
}

/**
 * **Server Component**
 *
 * The `IconRotator` is a simple component that is used to rotate an icon from a
 * one degrees to another.
 */
export const IconRotator = forwardRef<HTMLSpanElement, IconRotatorProps>(
  function IconRotator(props, ref) {
    const {
      style,
      className: propClassName,
      rotated,
      children,
      forceIconWrap = false,
      disableTransition = false,
      ...remaining
    } = props;

    const className = iconRotator({
      rotated,
      className: propClassName,
      disableTransition,
    });
    if (!forceIconWrap && isValidElement<{ className?: string }>(children)) {
      const child = Children.only(children);
      return cloneElement(child, {
        className: cnb(className, child.props.className),
      });
    }

    return (
      <span {...remaining} style={style} className={className} ref={ref}>
        {children}
      </span>
    );
  }
);
