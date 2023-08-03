"use client";
import { cnb } from "cnbuilder";
import type { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from "react";
import { forwardRef } from "react";
import { ButtonUnstyled } from "../button";
import type { IconRotatorProps } from "../icon";
import { IconRotator, useIcon } from "../icon";
import type { PropsWithRef } from "../types";
import type { TypographyProps, TypographyType } from "../typography";
import { Typography } from "../typography";

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

  /**
   * Any additional props to provide to the heading element that wraps the
   * expansion panel button.
   */
  headingProps?: PropsWithRef<TypographyProps, HTMLHeadingElement>;
  iconRotatorProps?: Omit<IconRotatorProps, "rotated" | "disableTransition">;

  /**
   * Any children to display **before** the button in the heading element. This
   * should really only be used if you need to add additional clickable elements
   * within the header.
   */
  beforeChildren?: ReactNode;

  /**
   * Any children to display **after** the button in the heading element.This
   * should really only be used if you need to add additional clickable elements
   * within the header.
   *
   * @example
   * ```tsx
   * afterChildren={
   *   <DropdownMenu buttonType="icon" ButtonChildren={<MoreVertSVGIcon />}>
   *     <MenuItem>Item 1</MenuItem>
   *     <MenuItem>Item 2</MenuItem>
   *     <MenuItem>Item 3</MenuItem>
   *   </DropdownMenu>
   * }
   * ```
   */
  afterChildren?: ReactNode;

  /**
   * @defaultValue `false`
   */
  disableTransition?: boolean;
}

/**
 * **Client Component**
 * This might be able to become a server component if I remove the useIcon hook
 *
 *
 * This is mostly an internal component, but can also be used to implement a
 * custom header implementation if needed.
 *
 * @example
 * Custom Header
 * ```tsx
 * import type { ExpansionPanelProps } from "@react-md/core";
 * import {
 *   ExpansionPanel,
 *   ExpansionPanelHeader,
 * } from "@react-md/core";
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
    headingType = "subtitle-1",
    headingProps,
    iconRotatorProps,
    icon: propIcon,
    expanded,
    className,
    children,
    beforeChildren,
    afterChildren,
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
      {beforeChildren}
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
      {afterChildren}
    </Typography>
  );
});
