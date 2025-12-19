"use client";

import {
  type InputHTMLAttributes,
  type LabelHTMLAttributes,
  type ReactElement,
  type ReactNode,
  type Ref,
} from "react";

import { type ButtonClassNameThemeOptions } from "../button/styles.js";
import { getIcon } from "../icon/config.js";
import { type ComponentWithRippleProps } from "../interaction/types.js";
import { useElementInteraction } from "../interaction/useElementInteraction.js";
import { type PropsWithRef } from "../types.js";
import { SrOnly } from "../typography/SrOnly.js";
import { useEnsuredId } from "../useEnsuredId.js";
import { fileInput } from "./styles.js";

/** @since 6.0.0 */
export type FileInputHTMLAttributes = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
>;

/**
 * @since 6.0.0 Removed the `disableIconSpacing` prop since it is no
 * longer required.
 */
export interface FileInputProps
  extends
    ButtonClassNameThemeOptions,
    FileInputHTMLAttributes,
    ComponentWithRippleProps {
  ref?: Ref<HTMLInputElement>;

  /**
   * This is the label text for icon-only file inputs.
   *
   * @defaultValue `"Upload"`
   */
  srOnlyLabel?: ReactNode;

  /**
   * Any additional props to provide to the container `<label>` element since
   * most props get passed to the `<input type="file">`. So this would be useful
   * for inline style or click handlers.
   */
  labelProps?: PropsWithRef<LabelHTMLAttributes<HTMLLabelElement>>;

  /**
   * An optional icon to display for the file input.
   *
   * @defaultValue `getIcon("upload")`
   */
  icon?: ReactNode;

  /**
   * Boolean if the icon should appear after the children in the label.
   *
   * @defaultValue `false`
   */
  iconAfter?: boolean;

  /**
   * Boolean if the file input should no longer allow the same file to be
   * selected multiple times and trigger the `onChange` each time it is
   * selected.
   *
   * @defaultValue `false`
   */
  disableRepeatableFiles?: boolean;

  /**
   * Children should generally be provided when the {@link buttonType} is
   * set to `"text"`. This defaults to a screen-reader only accessible text.
   *
   * @defaultValue `<SrOnly phoneOnly={responsive}>Upload</SrOnly>`
   */
  children?: ReactNode;
}

/**
 * **Client Component**
 * This might be able to become a server component if I remove the getIcon hook
 *
 * @example Simple Example
 * ```tsx
 * import { FileInput } from "@react-md/core/files/FileInput";
 * import { Form } from "@react-md/core/form/Form";
 * import type { ReactElement } from "react";
 *
 * const extensions = [
 *   "svg",
 *   "jpeg",
 *   "jpg",
 *   "png",
 *   "apng",
 *   "mkv",
 *   "mp4",
 *   "mpeg",
 *   "mpg",
 *   "webm",
 *   "mov",
 * ] as const;
 *
 * const FOUR_HUNDRED_MB = 400 * 1024 * 1024;
 * const maxFiles = 10;
 *
 * function Example(): ReactElement {
 *   const { stats, errors, onChange, clearErrors, reset, remove, accept } =
 *     useFileUpload({
 *       maxFiles,
 *       maxFileSize: FOUR_HUNDRED_MB,
 *       extensions,
 *     });
 *
 *   return (
 *     <Form>
 *       <FileInput accept={accept} multiple={maxFiles > 1} onChange={onChange} />
 *       <Button onClick={reset} disabled={!stats.length}>
 *         Remove all files
 *       </Button>
 *     </Form>
 *   );
 * }
 * ```
 *
 * @see {@link https://react-md.dev/components/file-input | FileInput Demos}
 * @since 6.0.0 Added additional support for `iconSize` and
 * `responsive`. Also removed the `disableIconSpacing` prop since it is no
 * longer required.
 */
export function FileInput(props: FileInputProps): ReactElement {
  const {
    ref,
    id: propId,
    className,
    children: propChildren,
    icon: propIcon,
    iconAfter = false,
    srOnlyLabel = "Upload",
    disableRepeatableFiles = false,
    labelProps,
    theme = "primary",
    themeType = "contained",
    buttonType = propChildren ? "text" : "icon",
    disabled = false,
    iconSize,
    responsive,
    multiple = false,
    disableRipple,
    ...remaining
  } = props;
  const id = useEnsuredId(propId, "file-input");
  const { pressed, pressedClassName, ripples, handlers } =
    useElementInteraction({
      ...labelProps,
      mode: disableRipple ? "none" : undefined,
      onClick(event) {
        labelProps?.onClick?.(event);

        // stop propagation so 2 ripples are not created
        event.stopPropagation();
      },
      disabled,
    });

  const icon = getIcon("upload", propIcon);
  let children = propChildren;
  if (
    propChildren === undefined &&
    !props["aria-label"] &&
    !props["aria-labelledby"]
  ) {
    children = <SrOnly phoneOnly={responsive}>{srOnlyLabel}</SrOnly>;
  }

  return (
    <label
      {...labelProps}
      {...handlers}
      className={fileInput({
        theme,
        themeType,
        buttonType,
        disabled,
        iconSize,
        pressed,
        responsive,
        pressedClassName,
        className: className || labelProps?.className,
      })}
    >
      {!iconAfter && icon}
      {children}
      {iconAfter && icon}
      <input
        {...remaining}
        id={id}
        ref={ref}
        value={disableRepeatableFiles || !props.onChange ? remaining.value : ""}
        type="file"
        className="rmd-hidden-input"
        disabled={disabled}
        multiple={multiple}
      />
      {ripples}
    </label>
  );
}
