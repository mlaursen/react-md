"use client";

import { type CSSProperties, type ReactElement, type ReactNode } from "react";

import { type BaseSheetProps, Sheet } from "../sheet/Sheet.js";
import { type LabelRequiredForA11y, type PropsWithRef } from "../types.js";
import { type RenderMenuAsSheet } from "./MenuConfigurationProvider.js";

const noop = (): void => {
  // do nothing
};

/**
 * @since 6.0.0
 */
export type MenuSheetConfigurableProps = Omit<
  BaseSheetProps,
  "visible" | "onRequestClose"
>;

/**
 * @since 6.0.0
 */
export interface MenuSheetConvenienceProps {
  /**
   * This can be used to apply additional props to the `Sheet` component when
   * the `Menu` is being rendered as a `Sheet`.
   *
   * Note: You can override the `style` and `className` using
   * {@link sheetStyle} and {@link sheetClassName} instead for convenience.
   *
   * @example
   * ```tsx
   * <Menu
   *   {...props}
   *   sheetProps={{
   *     style: {
   *       // custom inline style
   *     },
   *     className: "come-class-name",
   *     horizontalSize: "touch",
   *   }}
   * />
   * ```
   */
  sheetProps?: PropsWithRef<MenuSheetConfigurableProps>;

  /**
   * Convenience prop to apply custom style to the `Sheet` component when the
   * `Menu` is being rendered as a `Sheet`.
   */
  sheetStyle?: CSSProperties;

  /**
   * Convenience prop to apply custom class name to the `Sheet` component when
   * the `Menu` is being rendered as a `Sheet`.
   */
  sheetClassName?: string;
}

/**
 * @internal
 * @since 5.0.0
 * @since 6.0.0 Updated to use the latest menu API.
 */
export interface MenuSheetProps extends BaseSheetProps {
  /** {@inheritDoc MenuConfiguration.sheetHeader} */
  header?: ReactNode;
  /** {@inheritDoc MenuConfiguration.sheetFooter} */
  footer?: ReactNode;
  children: ReactNode;

  /** @since 6.0.0 */
  enabled: RenderMenuAsSheet;
}

/**
 * **Client Component**
 *
 * Implements a `Menu` using the `Sheet` component that probably shouldn't
 * really be used externally.
 *
 * @internal
 * @since 5.0.0
 * @since 6.0.0 Added the `enabled` prop and does not render a custom `Menu`
 * implementation.
 */
export function MenuSheet(
  props: LabelRequiredForA11y<MenuSheetProps>
): ReactElement {
  const {
    header,
    footer,
    children,
    onClick = noop,
    overlayProps,
    enabled,
    ...remaining
  } = props;
  const { onRequestClose } = props;

  if (!enabled) {
    return <>{children}</>;
  }

  return (
    <Sheet
      {...remaining}
      onClick={(event) => {
        onClick(event);

        // Prevent closing parent sheet/menus if an element in the header or
        // footer is clicked
        if (
          !(event.target instanceof HTMLElement) ||
          event.target
            .closest('.rmd-menu,[role="dialog"]')
            ?.getAttribute("role") === "dialog"
        ) {
          event.stopPropagation();
        }
      }}
      overlayProps={{
        ...overlayProps,
        onClick: (event) => {
          overlayProps?.onClick?.(event);

          // prevent closing parent menus if the overlay element is clicked.
          event.stopPropagation();
          onRequestClose();
        },
      }}
    >
      {header}
      {children}
      {footer}
    </Sheet>
  );
}
