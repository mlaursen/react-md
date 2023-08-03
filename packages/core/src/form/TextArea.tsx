"use client";
import { cnb } from "cnbuilder";
import type {
  CSSProperties,
  HTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import { forwardRef, useRef } from "react";
import type { PropsWithRef } from "../types";
import { useEnsuredId } from "../useEnsuredId";
import { useEnsuredRef } from "../useEnsuredRef";
import { bem } from "../utils";
import { FormMessageContainer } from "./FormMessageContainer";
import { useFormTheme } from "./FormThemeProvider";
import { Label } from "./Label";
import type { TextFieldClassNameOptions } from "./TextField";
import { textField } from "./TextField";
import { TextFieldContainer } from "./TextFieldContainer";
import type { FormFieldOptions } from "./types";
import type { TextAreaResize } from "./useResizingTextArea";
import { useResizingTextArea } from "./useResizingTextArea";

const styles = bem("rmd-textarea");
const containerStyles = bem("rmd-textarea-container");

declare module "react" {
  interface CSSProperties {
    "--rmd-form-textarea-height"?: string | number;
    "--rmd-form-textarea-padding"?: string | number;
  }
}

export interface TextAreaClassNameOptions extends TextFieldClassNameOptions {
  className?: string;

  /**
   * This should not be used externally and is only used for creating the hidden
   * textarea mask for the auto resizing behavior.
   *
   * @defaultValue `false`
   */
  mask?: boolean;

  /**
   * @see {@link TextAreaResize}
   * @defaultValue `"auto"`
   */
  resize?: TextAreaResize;

  /**
   * Set this to `true` if the textarea should display a scrollbar.
   *
   * @defaultValue `false`
   */
  scrollable?: boolean;
}

export function textArea(options: TextAreaClassNameOptions = {}): string {
  const {
    className,
    mask = false,
    resize = "auto",
    scrollable = false,
    placeholderHidden = false,
  } = options;

  return cnb(
    textField({ placeholderHidden }),
    styles({
      rh: resize === "horizontal",
      rv: resize === "vertical",
      rn: resize === "auto" || resize === "none",
      mask,
      scrollable: scrollable || resize === "none",
    }),
    className
  );
}

export interface TextAreaProps
  extends FormFieldOptions,
    TextareaHTMLAttributes<HTMLTextAreaElement> {
  /**
   * Optional placeholder text to display in the text field.
   *
   * @defaultValue `label ? " " : ""`
   */
  placeholder?: string;

  /**
   * Set this to `true` if the auto resizing textarea should not animate for new
   * height changes.
   *
   * @defaultValue `false`
   */
  disableTransition?: boolean;

  /**
   * An optional style to apply to the textarea element. The base `style` prop
   * is applied to the surrounding `div` instead.
   */
  areaStyle?: CSSProperties;

  /**
   * An optional className to apply to the textarea element. The base `style`
   * prop is applied to the surrounding `div` instead.
   */
  areaClassName?: string;

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#attr-rows
   * @defaultValue `2`
   */
  rows?: number;

  /**
   * The maximum number of rows a textarea can expand to before showing a
   * scrollbar. When this is set to `-1`, there will be no limit.
   *
   * @defaultValue `-1`
   */
  maxRows?: number;

  /**
   * @see {@link TextAreaResize}
   * @defaultValue `"auto"`
   */
  resize?: TextAreaResize;

  /**
   * When the {@link resize} prop is set to `"auto"`, an additional `<div>` is
   * added along with a hidden `<textarea>` mask. This prop can be used to add
   * any additional styling or props to that div.
   *
   * This will only be applied when {@link resize} is set to `"auto"`.
   */
  resizeContainerProps?: PropsWithRef<
    HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >;
}

/**
 * **Client Component**
 *
 * @example
 * Simple Example
 * ```tsx
 * import { TextArea } from "@react-md/core";
 * import type { ReactElement } from "react";
 *
 * function Example(): ReactElement {
 *   return (
 *     <TextArea
 *       label="Label"
 *       placeholder="Placeholder"
 *     />
 *   );
 * }
 * ```
 */
export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  function TextArea(props, ref) {
    const {
      id: propId,
      style,
      className,
      label,
      labelProps,
      labelStyle,
      labelClassName,
      areaStyle,
      areaClassName,
      resizeContainerProps,
      resize = "auto",
      dense = false,
      error = false,
      active = false,
      inline: propInline = false,
      stretch = false,
      leftAddon,
      rightAddon,
      disableLeftAddonStyles = false,
      disableRightAddonStyles = false,
      theme: propTheme,
      underlineDirection: propUnderlineDirection,
      messageProps,
      messageContainerProps,
      rows = 2,
      maxRows = -1,
      onChange: propOnChange,
      disableTransition = false,
      ...remaining
    } = props;
    const { disabled = false, readOnly = false, value, defaultValue } = props;
    const id = useEnsuredId(propId, "text-field");
    const { theme, underlineDirection } = useFormTheme({
      theme: propTheme,
      underlineDirection: propUnderlineDirection,
    });
    const [areaRef, areaRefCallback] = useEnsuredRef(ref);
    const containerRef = useRef<HTMLDivElement>(null);

    const { maskRef, height, onChange, scrollable } = useResizingTextArea({
      maxRows,
      resize,
      onChange: propOnChange,
      containerRef,
    });

    let { placeholder = "" } = props;
    if (label && !placeholder) {
      // See the placeholder type definition comments for information
      placeholder = " ";
    }

    // have to force it inline or else you won't be able to resize
    // it horizontally.
    const inline = resize === "horizontal" || resize === "both" || propInline;

    const area = (
      <textarea
        {...remaining}
        id={id}
        ref={areaRefCallback}
        rows={rows}
        disabled={disabled}
        onChange={onChange}
        style={areaStyle}
        className={textArea({
          resize,
          scrollable,
          className: areaClassName,
          placeholderHidden: !!label && !active,
        })}
      />
    );

    const labelNode = label && (
      <Label
        {...labelProps}
        htmlFor={id}
        style={labelProps?.style ?? labelStyle}
        className={labelProps?.className ?? labelClassName}
        floating
        dense={dense}
        error={error}
        active={active}
        disabled={disabled}
      >
        {label}
      </Label>
    );

    let children = (
      <>
        {area}
        {labelNode}
      </>
    );

    if (resize === "auto") {
      children = (
        <div
          {...resizeContainerProps}
          className={cnb(
            containerStyles("inner", {
              animate: !disableTransition,
              height: !!height,
            }),
            resizeContainerProps?.className
          )}
        >
          {area}
          {labelNode}
          <textarea
            aria-hidden
            id={`${id}-mask`}
            ref={maskRef}
            defaultValue={value ?? defaultValue}
            readOnly
            tabIndex={-1}
            rows={rows}
            style={areaStyle}
            className={textArea({
              mask: true,
              resize,
              className: areaClassName,
            })}
          />
        </div>
      );
    }

    return (
      <FormMessageContainer
        {...messageContainerProps}
        messageProps={messageProps}
      >
        <TextFieldContainer
          ref={containerRef}
          style={{
            ...style,
            "--rmd-form-textarea-height": height,
          }}
          className={cnb(
            containerStyles({
              animate: !disableTransition && resize == "auto",
              cursor: !disabled,
              height: !!height,
              "underline-labelled":
                !!label && (theme === "underline" || theme === "filled"),
            }),
            className
          )}
          theme={theme}
          label={!!label}
          error={error}
          dense={dense}
          inline={inline}
          active={active}
          stretch={stretch}
          readOnly={readOnly}
          disabled={disabled}
          leftAddon={leftAddon}
          rightAddon={rightAddon}
          underlineDirection={underlineDirection}
          disableLeftAddonStyles={disableLeftAddonStyles}
          disableRightAddonStyles={disableRightAddonStyles}
          onClick={(event) => {
            if (!disabled && event.target === event.currentTarget) {
              areaRef.current?.focus();
            }
          }}
        >
          {children}
        </TextFieldContainer>
      </FormMessageContainer>
    );
  }
);
