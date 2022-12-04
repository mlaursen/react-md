import { ButtonUnstyled } from "@react-md/button";
import type {
  PropsWithRef,
  TypographyProps,
  TypographyType,
} from "@react-md/core";
import { Typography } from "@react-md/core";
import type { IconRotatorProps } from "@react-md/icon";
import { IconRotator, useIcon } from "@react-md/icon";
import { cnb } from "cnbuilder";
import type { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from "react";
import { forwardRef } from "react";

/**
 * @remarks \@since 6.0.0 Updated to include additional heading/Typography
 * props.
 */
export interface ExpansionPanelHeaderProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  id: string;

  /**
   * This should be a function that toggles the expansion state for the parent
   * `ExpansionPanel`.
   */
  onClick: MouseEventHandler<HTMLButtonElement>;
  expanded: boolean;

  /**
   * @defaultValue `"h3"`
   */
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

  /**
   * @defaultValue `useIcon("expander")`
   */
  icon?: ReactNode;

  /**
   * @defaultValue `"subtitle-1"`
   */
  headingType?: TypographyType;
  headingProps?: PropsWithRef<TypographyProps, HTMLHeadingElement>;
  iconRotatorProps?: Omit<IconRotatorProps, "rotated" | "disableTransition">;

  /**
   * @defaultValue `false`
   */
  disableTransition?: boolean;
}

/**
 * This is mostly an internal component, but can also be used to implement a
 * custom header implementation if needed.
 *
 * @example
 * Custom Header
 * ```tsx
 * import type { ExpansionPanelProps } from "@react-md/expansion-panel";
 * import {
 *   ExpansionPanel,
 *   ExpansionPanelHeader,
 * } from "@react-md/expansion-panel";
 * import type { ReactElement } from "react";
 * const { useId } from "react";
 *
 * export type CustomExpansionPanelProps = ExpansionPanelProps & { id: string; };
 *
 * export function CustomExpansionPanel(props: CustomExpansionPanelProps): ReactElement {
 *   const {
 *     id,
 *     disabled,
 *     onExpandClick,
 *     expanded,
 *     disableTransition,
 *     headerChildren,
 *   } = props;
 *
 *   return (
 *     <ExpansionPanel
 *       {...props}
 *       header={(
 *         <ExpansionPanelHeader
 *           aria-disabled={disabled || undefined}
 *           id={id}
 *           onClick={onExpandClick}
 *           expanded={expanded}
 *           disableTransition={disableTransition}
 *           // whatever props and any custom implementation
 *         >
 *           {headerChildren}
 *         </ExpansionPanelHeader>
 *       )}
 *     />
 *   );
 * }
 * ```
 *
 * @remarks \@since 6.0.0 Updated to be wrapped by the {@link Typography}
 * component and rendered as an `<h6>`.
 */
export const ExpansionPanelHeader = forwardRef<
  HTMLHeadingElement,
  ExpansionPanelHeaderProps
>(function ExpansionPanelHeader(props, ref) {
  const {
    id,
    headingType: headingType = "subtitle-1",
    headingProps,
    iconRotatorProps,
    icon: propIcon,
    expanded,
    className,
    children,
    disableTransition = false,
    ...remaining
  } = props;

  const icon = useIcon("expander", propIcon);

  return (
    <Typography
      ref={ref}
      type={headingType}
      margin="none"
      {...headingProps}
      className={cnb("rmd-expansion-panel__heading", headingProps?.className)}
    >
      <ButtonUnstyled
        {...remaining}
        aria-expanded={expanded}
        id={id}
        className={cnb("rmd-expansion-panel__button", className)}
      >
        {children}
        {icon && (
          <IconRotator
            {...iconRotatorProps}
            rotated={expanded}
            disableTransition={disableTransition}
          >
            {icon}
          </IconRotator>
        )}
      </ButtonUnstyled>
    </Typography>
  );
});
