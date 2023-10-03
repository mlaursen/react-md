"use client";
import { cnb } from "cnbuilder";
import {
  forwardRef,
  type InputHTMLAttributes,
  type LabelHTMLAttributes,
  type ReactNode,
} from "react";
import {
  button,
  type ButtonClassNameOptions,
  type ButtonClassNameThemeOptions,
} from "../button/buttonStyles.js";
import { getIcon } from "../icon/iconConfig.js";
import { TextIconSpacing } from "../icon/TextIconSpacing.js";
import { useElementInteraction } from "../interaction/useElementInteraction.js";
import { type PropsWithRef } from "../types.js";
import { SrOnly } from "../typography/SrOnly.js";
import { useEnsuredId } from "../useEnsuredId.js";

/** @remarks \@since 6.0.0 */
export type FileInputLabelClassNameOptions = ButtonClassNameOptions;

/** @remarks \@since 6.0.0 */
export function fileInputLabel(
  options: FileInputLabelClassNameOptions = {}
): string {
  return cnb("rmd-file-input-label", button(options));
}

/** @remarks \@since 6.0.0 */
export type FileInputHTMLAttributes = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "defaultValue" | "value"
>;

export interface FileInputProps
  extends ButtonClassNameThemeOptions,
    FileInputHTMLAttributes {
  labelProps?: PropsWithRef<
    LabelHTMLAttributes<HTMLLabelElement>,
    HTMLLabelElement
  >;

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
   * Boolean if the children should not have some spacing between the icon and
   * itself.  The default behavior is to use the `<TextIconSpacing>` component
   * for text styled input buttons, but this can be disabled if you want to use
   * a screen-reader only accessible label.
   *
   * Note: This will default to `false` if {@link children} are provided.
   *
   * @defaultValue `true`
   */
  disableIconSpacing?: boolean;

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
   * @defaultValue `<SrOnly>Upload</SrOnly>`
   */
  children?: ReactNode;
}

/**
 * **Client Component**
 * This might be able to become a server component if I remove the getIcon hook
 *
 * @example
 * Simple Example
 * ```tsx
 * import { FileInput, Form } from "@react-md/core";
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
 */
export const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
  function FileInput(props, ref) {
    const {
      id: propId,
      className,
      children: propChildren,
      icon: propIcon,
      iconAfter = false,
      disableIconSpacing = typeof propChildren === "undefined",
      disableRepeatableFiles = false,
      labelProps,
      theme = "primary",
      themeType = "contained",
      buttonType = propChildren ? "text" : "icon",
      disabled = false,
      iconSize,
      multiple = false,
      ...remaining
    } = props;
    const id = useEnsuredId(propId, "file-input");
    const { pressed, pressedClassName, ripples, handlers } =
      useElementInteraction({
        ...labelProps,
        onClick(event) {
          labelProps?.onClick?.(event);

          // stop propagation so 2 ripples are not created
          event.stopPropagation();
        },
        disabled,
      });

    const icon = getIcon("upload", propIcon);
    let children = propChildren;
    if (typeof propChildren === "undefined") {
      children = <SrOnly>Upload</SrOnly>;
    }

    let content: ReactNode = icon;
    if (disableIconSpacing || (children && !icon)) {
      content = (
        <>
          {!iconAfter && icon}
          {children}
          {iconAfter && icon}
        </>
      );
    } else if (children) {
      content = (
        <TextIconSpacing icon={icon} iconAfter={iconAfter}>
          {children}
        </TextIconSpacing>
      );
    }

    return (
      <label
        {...labelProps}
        {...handlers}
        className={fileInputLabel({
          theme,
          themeType,
          buttonType,
          disabled,
          iconSize,
          pressed,
          pressedClassName,
          className: className || labelProps?.className,
        })}
      >
        {content}
        <input
          {...remaining}
          id={id}
          ref={ref}
          value={disableRepeatableFiles || !props.onChange ? undefined : ""}
          type="file"
          className="rmd-file-input"
          disabled={disabled}
          multiple={multiple}
        />
        {ripples}
      </label>
    );
  }
);
