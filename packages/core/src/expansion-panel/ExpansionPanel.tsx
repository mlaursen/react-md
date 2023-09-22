"use client";
import { cnb } from "cnbuilder";
import { forwardRef, type CSSProperties, type ReactNode } from "react";
import { Card, type CardProps } from "../card/Card.js";
import { CardContent, type CardContentProps } from "../card/CardContent.js";
import { useCollapseTransition } from "../transition/useCollapseTransition.js";
import { type PropsWithRef } from "../types.js";
import { useEnsuredId } from "../useEnsuredId.js";
import { bem } from "../utils/bem.js";
import {
  ExpansionPanelHeader,
  type ExpansionPanelHeaderProps,
} from "./ExpansionPanelHeader.js";

const styles = bem("rmd-expansion-panel");

/** @remarks \@since 6.0.0 */
export interface ExpansionPanelClassNameOptions {
  className?: string;

  /**
   * @defaultValue `false`
   */
  expanded?: boolean;

  /**
   * Set this to `true` to disable the `margin-top` transition between multiple
   * panels
   *
   * @defaultValue `false`
   */
  disableTransition?: boolean;
}

/**
 * @remarks \@since 6.0.0
 */
export function expansionPanel(
  options: ExpansionPanelClassNameOptions = {}
): string {
  const { className, expanded = false, disableTransition = false } = options;

  return cnb(styles({ expanded, animate: !disableTransition }), className);
}

/**
 * @remarks \@since 6.0.0 Renamed some card props and updated for the latest
 * API.
 */
export interface ExpansionPanelProps extends CardProps {
  /**
   * Set this to `true` if the {@link children} should be visible. This should
   * generally be provided by the `useExpansionPanels` hook.
   */
  expanded: boolean;

  /**
   * A function that should toggle the {@link expanded} state. This should
   * generally be provided by the `useExpansionPanels` hook.
   */
  onExpandClick(): void;

  /**
   * Set this to `true` to prevent the panel from toggling the {@link expanded}
   * state. This should generally be provided by the `useExpansionPanels` hook.
   *
   * @defaultValue `false`
   */
  disabled?: boolean;

  /**
   * @defaultValue `true`
   * @see {@link CardProps.fullWidth}
   */
  fullWidth?: boolean;

  /**
   * This can be used to implement a custom header implementation, but it
   * probably shouldn't be needed.
   *
   * @remarks \@since 6.0.0 This was renamed from `customHeader`
   * @see {@link headerProps}
   */
  header?: ReactNode;

  /**
   * This can be used to apply additional props to the header element.
   *
   * Note: You can override the `style` and `className` using
   * {@link headerStyle} and {@link headerClassName} instead for convenience.
   *
   * @example
   * ```tsx
   * <ExpansionPanel
   *   {...props}
   *   headerProps={{
   *     style: {
   *       // custom inline style
   *     },
   *     className: "come-class-name",
   *     icon: <MyCustomIcon />,
   *     iconRotatorProps: {
   *       className: "another-custom-class-name",
   *     },
   *   }}
   * />
   * ```
   */
  headerProps?: Omit<
    ExpansionPanelHeaderProps,
    "id" | "aria-disabled" | "onClick" | "expanded"
  >;

  /**
   * Convenience prop to apply custom style to the `ExpansionPanelHeader`
   * component.
   */
  headerStyle?: CSSProperties;

  /**
   * Convenience prop to apply custom class name to the `ExpansionPanelHeader`
   * component.
   */
  headerClassName?: string;

  /**
   * Content to display within the header of the expansion panel that toggles
   * the expanded state. THis should generally contain some accessible text
   * describing the expansion panel's content.
   *
   * @remarks \@since 6.0.0 THis was renamed from `header`
   */
  headerChildren?: ReactNode;

  /**
   * This can be used to apply additional props to the `CardContent` component
   * if needed.
   *
   * Note: The `disableLastChildPadding` defaults to `true` in this
   * implementation.
   *
   * @example
   * ```tsx
   * contentProps={{
   *   style: {},
   *   className: "some-class-name",
   *   disablePadding: true,
   *   disableSecondaryColor: true,
   *   disableLastChildPadding: false,
   *   // whatever else
   * }}
   * ```
   *
   * @see {@link contentStyle}
   * @see {@link contentClassName}
   * @see {@link disableContentPadding}
   */
  contentProps?: PropsWithRef<Omit<CardContentProps, "role">, HTMLDivElement>;

  /**
   * Convenience prop to apply custom style to the `CardContent` component.
   */
  contentStyle?: CSSProperties;

  /**
   * Convenience prop to apply custom class name to the `CardContent` component.
   */
  contentClassName?: string;

  /**
   * Set to `true` to disable the collapse transition for the card content
   * whenever the {@link expanded} state changes.
   *
   * @defaultValue `false`
   */
  disableTransition?: boolean;

  /**
   * @defaultValue `false`
   * @see {@link CardContentProps.disablePadding}
   */
  disableContentPadding?: boolean;

  /**
   * Set this to `true` to unmount the {@link children} when the
   * {@link expanded} state is `false`.
   *
   * @defaultValue `false`
   * @remarks \@since 6.0.0 Renamed from `persistent` to match the
   * `useCollapseTransition` naming convention.
   */
  temporary?: boolean;
}

/**
 * **Client Component**
 *
 * @see `useExpansionPanels` for examples.
 * @remarks
 * \@since 6.0.0 The content will be persistent and invisible using `display: none`
 * instead of unmounting and also animate the `margin-top` style.
 */
export const ExpansionPanel = forwardRef<
  HTMLHeadingElement,
  ExpansionPanelProps
>(function ExpansionPanel(props, ref) {
  const {
    id: propId,
    className,
    contentProps,
    contentStyle,
    contentClassName,
    header: propHeader,
    headerProps,
    headerStyle,
    headerClassName,
    headerChildren,
    children,
    expanded,
    onExpandClick,
    disabled = false,
    fullWidth = true,
    temporary = false,
    disableTransition = false,
    disableContentPadding = false,
    ...remaining
  } = props;

  const id = useEnsuredId(propId, "expansion-panel");
  const { elementProps, rendered } = useCollapseTransition({
    nodeRef: contentProps?.ref,
    style: contentStyle,
    className: contentClassName,
    timeout: disableTransition ? 0 : undefined,
    temporary,
    transitionIn: expanded,
  });

  let header = propHeader;
  if (typeof header === "undefined") {
    header = (
      <ExpansionPanelHeader
        style={headerStyle}
        className={headerClassName}
        disableTransition={disableTransition}
        {...headerProps}
        aria-disabled={disabled || undefined}
        id={id}
        onClick={onExpandClick}
        expanded={expanded}
      >
        {headerChildren}
      </ExpansionPanelHeader>
    );
  }

  return (
    <Card
      {...remaining}
      id={`${id}-container`}
      ref={ref}
      fullWidth={fullWidth}
      className={expansionPanel({
        expanded,
        disableTransition,
        className,
      })}
    >
      {header}
      {rendered && (
        <CardContent
          id={`${id}-content`}
          aria-labelledby={id}
          disablePadding={disableContentPadding}
          disableSecondaryColor
          disableLastChildPadding
          {...contentProps}
          {...elementProps}
          role="region"
        >
          {children}
        </CardContent>
      )}
    </Card>
  );
});
