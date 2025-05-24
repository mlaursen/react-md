"use client";

import { cnb } from "cnbuilder";
import { type MouseEvent, type ReactNode, forwardRef } from "react";

import { type BoxAlignItems } from "../box/styles.js";
import { overlay } from "../overlay/styles.js";
import {
  CircularProgress,
  type CircularProgressProps,
} from "../progress/CircularProgress.js";
import {
  LinearProgress,
  type LinearProgressProps,
} from "../progress/LinearProgress.js";
import { type ProgressTheme } from "../progress/types.js";
import { type PropsWithRef } from "../types.js";
import { useAsyncFunction } from "../useAsyncFunction.js";
import { useEnsuredId } from "../useEnsuredId.js";
import { Button, type ButtonProps } from "./Button.js";

const noop = (): void => {
  // do nothing
};

/**
 * @since 6.0.0
 */
export type AsyncButtonLoadingType =
  | "circular-before"
  | "circular-after"
  | "circular-overlay"
  | "linear-above"
  | "linear-below";

/**
 * @since 6.0.0
 */
export interface AsyncButtonProps extends ButtonProps {
  /**
   * @see {@link progressAriaLabelledBy}
   * @defaultValue `"async-button" + useId()`
   */
  id?: string;

  /**
   * When this is defined and returns a `Promise`, the loading indicator will
   * display until the promise has resolved.
   *
   * @defaultValue `() => {}`
   */
  onClick?: (event: MouseEvent<HTMLButtonElement>) => Promise<void> | void;

  /**
   * Set this to `true` to manually display a loading spinner.
   *
   * @defaultValue `false`
   */
  loading?: boolean;

  /**
   * - `"circular-overlay"` - Covers and hides the button content with a
   *   centered circular progress
   * - `"circular-before"` - Renders a circular progress bar before the button
   *   content which is useful when rendering an icon before the button text.
   *   See {@link beforeAddon} as well.
   * - `"circular-after"` - Renders a circular progress bar before the button
   *   content which is useful when rendering an icon after the button text.
   *   See {@link afterAddon} as well.
   * - `"linear-above"` - Renders a linear progress bar at the top of the button
   *   while still displaying the button contents. Usually looks good for
   *   outlined buttons.
   * - `"linear-below"` - Renders a linear progress bar at the bottom of the
   *   button while still displaying the button contents. Usually looks good for
   *   outlined buttons.
   *
   * @defaultValue `"circular-overlay"`
   */
  loadingType?: AsyncButtonLoadingType;

  /**
   * Optional content to display instead of the default `children` while
   * loading.
   */
  loadingChildren?: ReactNode;

  /**
   * Set this to `true` to use the `disabled` theme while loading.
   *
   * @defaultValue `false`
   */
  loadingDisabledTheme?: boolean;

  /**
   * This should be used when the {@link loadingType} is set to
   * `"circular-before"`, an icon should appear before the other content in
   * the button, and the loading indicator should replace the icon.
   */
  beforeAddon?: ReactNode;

  /**
   * This should be used when the {@link loadingType} is set to
   * `"circular-after"`, an icon should appear before the other content in
   * the button, and the loading indicator should replace the icon.
   */
  afterAddon?: ReactNode;

  /**
   * An optional label to provide to the progressbar.
   *
   * @see {@link progressAriaLabelledBy}
   */
  progressAriaLabel?: string;

  /**
   * @see {@link id}
   * @defaultValue `id`
   */
  progressAriaLabelledBy?: string;

  /**
   * Any additional props to pass to the `CircularProgress` bar when the
   * {@link loadingType} is one of the circular types.
   */
  linearProgressProps?: PropsWithRef<LinearProgressProps, HTMLDivElement>;

  /**
   * Any additional props to pass to the `LinearProgress` bar when the
   * {@link loadingType} is one of the linear types.
   */
  circularProgressProps?: PropsWithRef<CircularProgressProps, HTMLSpanElement>;
}

/**
 * **Client Component**
 *
 * The async button can be used to render a loading indicator within a button
 * during an async task. The loading spinner can be shown either by enabling the
 * `loading` prop or returning a promise from the `onClick` event which will
 * continue to show the loading indicator until the promise has been resolved.
 *
 * @example Async onClick
 * ```tsx
 * import { AsyncButton } from "@react-md/core/button/AsyncButton";
 * import { useState, type ReactElement } from "react";
 *
 * function Example(): ReactElement {
 *   const [data, setData] = useState(null);
 *   return (
 *     <AsyncButton
 *       type="submit"
 *       onClick={async () => {
 *         const response = await fetch("/my-api");
 *         const json = await response.json();
 *         setData(json);
 *       }}
 *     >
 *       Submit
 *     </AsyncButton>
 *   );
 * }
 * ```
 *
 * @example Manual Loading State
 * ```tsx
 * import { AsyncButton } from "@react-md/core/button/AsyncButton";
 * import { useMutation } from "@tanstack/query";
 * import { useState, type ReactElement } from "react";
 *
 * function Example(): ReactElement {
 *   const { isLoading, mutate } = useMutation({
 *     mutationFn: (newTodo) => fetch('/todos', {
 *       method: "POST",
 *       body: JSON.stringify(newTodo),
 *     }),
 *   });
 *
 *   return (
 *     <AsyncButton
 *       type="submit"
 *       loading={isLoading}
 *       onClick={() => {
 *         mutate({ id: Date.now(), title: "Create example" });
 *       }}
 *     >
 *       Create Todo
 *     </AsyncButton>
 *   );
 * }
 * ```
 *
 * @see {@link https://react-md.dev/components/button#async-button | AsyncButton Demos}
 * @since 6.0.0
 */
export const AsyncButton = forwardRef<HTMLButtonElement, AsyncButtonProps>(
  function AsyncButton(props, ref) {
    const {
      id: propId,
      onClick = noop,
      children,
      floating = null,
      theme = floating ? "secondary" : "clear",
      themeType = floating ? "contained" : "flat",
      buttonType = floating ? "icon" : "text",
      className,
      disabled,
      loading: propLoading = false,
      loadingType = "circular-overlay",
      loadingChildren,
      loadingDisabledTheme = false,
      afterAddon: propAfterAddon,
      beforeAddon: propBeforeAddon,
      linearProgressProps,
      circularProgressProps,
      progressAriaLabel,
      progressAriaLabelledBy: propProgressAriaLabelledBy,
      ...remaining
    } = props;
    const id = useEnsuredId(propId, "async-button");
    const { handleAsync, pending } = useAsyncFunction({ disabled });
    const loading = pending || propLoading;

    let progressTheme: ProgressTheme = "current-color";
    if (theme === "clear" || theme === "disabled") {
      progressTheme = "primary";
    }

    let progressAriaLabelledBy = propProgressAriaLabelledBy;
    if (
      !progressAriaLabel &&
      !linearProgressProps?.["aria-label"] &&
      !linearProgressProps?.["aria-labelledby"] &&
      !circularProgressProps?.["aria-label"] &&
      !circularProgressProps?.["aria-labelledby"]
    ) {
      progressAriaLabelledBy = id;
    }

    const progress = loadingType.includes("linear") ? (
      <LinearProgress
        aria-label={progressAriaLabel}
        aria-labelledby={progressAriaLabelledBy as string}
        {...linearProgressProps}
        theme={progressTheme}
      />
    ) : (
      <CircularProgress
        aria-label={progressAriaLabel}
        aria-labelledby={progressAriaLabelledBy as string}
        {...circularProgressProps}
        theme={progressTheme}
      />
    );

    let afterAddon = propAfterAddon;
    let beforeAddon = propBeforeAddon;
    let overlayElement: ReactNode;
    let isOverlayCover = false;
    switch (loadingType) {
      case "circular-before":
        beforeAddon = loading ? progress : propBeforeAddon;
        break;
      case "circular-after":
        afterAddon = loading ? progress : propAfterAddon;
        break;
      case "circular-overlay":
      case "linear-above":
      case "linear-below": {
        let alignItems: BoxAlignItems = "center";
        if (loadingType === "linear-above") {
          alignItems = "start";
        } else if (loadingType === "linear-below") {
          alignItems = "end";
        } else {
          isOverlayCover = true;
        }

        overlayElement = loading && (
          <span
            className={overlay({
              active: true,
              visible: true,
              absolute: true,
              align: alignItems,
            })}
          >
            {progress}
          </span>
        );
        break;
      }
    }

    return (
      <Button
        {...remaining}
        aria-disabled={loading || undefined}
        id={id}
        ref={ref}
        disabled={disabled}
        floating={floating}
        className={cnb(
          "rmd-button--async",
          loading && isOverlayCover && "rmd-button--async-overlay",
          className
        )}
        theme={loading && loadingDisabledTheme ? "disabled" : theme}
        themeType={themeType}
        buttonType={buttonType}
        onClick={handleAsync((event) => Promise.resolve(onClick(event)))}
      >
        {beforeAddon}
        {loading && typeof loadingChildren !== "undefined"
          ? loadingChildren
          : children}
        {afterAddon}
        {overlayElement}
      </Button>
    );
  }
);
