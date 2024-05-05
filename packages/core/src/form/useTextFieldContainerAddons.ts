"use client";
import {
  useCallback,
  useState,
  type CSSProperties,
  type Ref,
  type RefCallback,
} from "react";
import { useResizeObserver } from "../useResizeObserver.js";
import { getFormConfig } from "./formConfig.js";
import { type FormTheme } from "./types.js";

/**
 * @since 6.0.0
 * @internal
 */
interface AddonPaddingOptions {
  ref?: Ref<HTMLSpanElement>;
  addon: boolean;
  theme: FormTheme;
  extra: string;
}

/**
 * @since 6.0.0
 * @internal
 */
function useAddonPadding(
  options: AddonPaddingOptions
): [padding: string | undefined, addonRef: RefCallback<HTMLSpanElement>] {
  const { ref, addon, theme, extra } = options;
  const [padding, setPadding] = useState<string | undefined>();
  const addonRef = useResizeObserver({
    ref,
    onUpdate: useCallback(
      (entry) => {
        const inlineSize = entry.borderBoxSize[0]?.inlineSize;
        if (typeof inlineSize !== "number") {
          return;
        }

        // the leading space for the extra calc is required
        setPadding(
          `calc(var(--rmd-text-field-${theme}d-padding) + ${inlineSize}px${extra ? ` ${extra}` : ""})`
        );
      },
      [extra, theme]
    ),
    disabled: !addon,
    disableHeight: true,
  });

  return [padding, addonRef];
}

/**
 * @since 6.0.0
 */
export interface TextFieldContainerAddonsOptions {
  /**
   * This style will automatically be merged with the returned `style`.
   */
  style?: CSSProperties;

  /** @defaultValue `getFormConfig("theme")` */
  theme?: FormTheme;

  /**
   * Set this to `true` if the `leftAddon` should be watched for size changes.
   */
  leftAddon: boolean;

  /**
   * An optional ref that will be merged with the returned
   * {@link TextFieldContainerAddonsImplementation.leftAddonRef}.
   */
  leftAddonRef?: Ref<HTMLSpanElement>;

  /**
   * This can be used to update the CSS `calc()` expression to change the
   * padding.
   *
   * @example Add an additional 0.25rem padding
   * ```
   * leftAddonExtraCalc="+ 0.25rem"
   * ```
   *
   * @defaultValue `""`
   */
  leftAddonExtraCalc?: string;

  /**
   * Set this to `true` if the `rightAddon` should be watched for size changes.
   */
  rightAddon: boolean;

  /**
   * An optional ref that will be merged with the returned
   * {@link TextFieldContainerAddonsImplementation.rightAddonRef}.
   */
  rightAddonRef?: Ref<HTMLSpanElement>;

  /**
   * This can be used to update the CSS `calc()` expression to change the
   * padding.
   *
   * @example Add an additional 0.25rem padding
   * ```
   * leftAddonExtraCalc="+ 0.25rem"
   * ```
   *
   * @defaultValue `""`
   */
  rightAddonExtraCalc?: string;
}

/**
 * @since 6.0.0
 */
export interface TextFieldContainerAddonsImplementation {
  style?: CSSProperties;
  leftAddonRef: RefCallback<HTMLSpanElement>;
  rightAddonRef: RefCallback<HTMLSpanElement>;
}

/**
 * This hook can be used to automatically update the padding on the
 * `TextFieldContainer` based on the size of the `leftAddon` and `rightAddon`.
 *
 * @example Simple Example
 * ```tsx
 * const { style, leftAddonRef, rightAddonRef } = useTextFieldContainerAddons({
 *   leftAddon: true,
 *   rightAddon: true,
 * });
 *
 * return (
 *   <TextField
 *     style={style}
 *     leftAddon={<SomeDynamicAddon />}
 *     leftAddonProps={{ ref: leftAddonRef }}
 *     rightAddon={<SomeDynamicAddon />}
 *     rightAddonProps={{ ref: rightAddonRef }}
 *   />
 * );
 * ```
 *
 * @since 6.0.0
 */
export function useTextFieldContainerAddons(
  options: TextFieldContainerAddonsOptions
): TextFieldContainerAddonsImplementation {
  const {
    style: propStyle,
    theme: propTheme,
    leftAddon,
    rightAddon,
    leftAddonRef: propLeftAddonRef,
    rightAddonRef: propRightAddonRef,
    leftAddonExtraCalc = "",
    rightAddonExtraCalc = "",
  } = options;
  const theme = getFormConfig("theme", propTheme);

  const [paddingLeft, leftAddonRef] = useAddonPadding({
    ref: propLeftAddonRef,
    theme,
    addon: leftAddon,
    extra: `+ var(--rmd-addon-spacing)${leftAddonExtraCalc ? ` ${leftAddonExtraCalc}` : ""}`,
  });

  const [paddingRight, rightAddonRef] = useAddonPadding({
    ref: propRightAddonRef,
    theme,
    addon: rightAddon,
    extra: rightAddonExtraCalc,
  });

  let style = propStyle;
  if (typeof paddingLeft === "string" || typeof paddingRight === "string") {
    style = {
      ...propStyle,
      "--rmd-text-field-padding-left":
        paddingLeft ?? propStyle?.["--rmd-text-field-padding-left"],
      "--rmd-text-field-padding-right":
        paddingRight ?? propStyle?.["--rmd-text-field-padding-right"],
    };
  }

  return {
    style,
    leftAddonRef,
    rightAddonRef,
  };
}
