"use client";
import {
  forwardRef,
  type CSSProperties,
  type HTMLAttributes,
  type TextareaHTMLAttributes,
} from "react";
import { type PropsWithRef } from "../types.js";
import { useEnsuredId } from "../useEnsuredId.js";
import { useEnsuredRef } from "../useEnsuredRef.js";
import { FormMessageContainer } from "./FormMessageContainer.js";
import { Label } from "./Label.js";
import { ResizingTextAreaWrapper } from "./ResizingTextAreaWrapper.js";
import { TextFieldContainer } from "./TextFieldContainer.js";
import { getFormConfig } from "./formConfig.js";
import { textArea, textAreaContainer } from "./textAreaStyles.js";
import { type FormFieldOptions } from "./types.js";
import {
  useResizingTextArea,
  type TextAreaResize,
} from "./useResizingTextArea.js";

/**
 * @since 6.0.0 Added `containerProps`.
 */
export interface TextAreaProps
  extends FormFieldOptions,
    TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** @defaultValue `"text-area-" + useId()` */
  id?: string;

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

  /**
   * Optional props to provide to the {@link TextFieldContainer} component.
   * There probably isn't any real use for this prop other than if you need to
   * add a `ref` for some DOM behavior.
   */
  containerProps?: PropsWithRef<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
}

/**
 * **Client Component**
 *
 * @example Simple Example
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
      dense,
      error,
      active,
      inline: propInline,
      leftAddon,
      rightAddon,
      disableLeftAddonStyles,
      disableRightAddonStyles,
      theme: propTheme,
      underlineDirection: propUnderlineDirection,
      messageProps,
      messageContainerProps,
      containerProps,
      rows = 2,
      maxRows = -1,
      onChange: propOnChange,
      disableTransition: propDisableTransition,
      ...remaining
    } = props;
    const { disabled = false, readOnly = false, value, defaultValue } = props;
    const id = useEnsuredId(propId, "text-area");
    const theme = getFormConfig("theme", propTheme);
    const underlineDirection = getFormConfig(
      "underlineDirection",
      propUnderlineDirection
    );
    const [areaRef, areaRefCallback] = useEnsuredRef(ref);

    const {
      maskRef,
      containerRef,
      height,
      onChange,
      scrollable,
      disableTransition,
    } = useResizingTextArea({
      maxRows,
      resize,
      onChange: propOnChange,
      containerRef: containerProps?.ref,
      disableTransition: propDisableTransition,
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
        placeholder={placeholder}
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
        <ResizingTextAreaWrapper
          {...resizeContainerProps}
          maskId={`${id}-mask`}
          maskRef={maskRef}
          rows={rows}
          areaStyle={areaStyle}
          areaClassName={areaClassName}
          defaultValue={value ?? defaultValue}
          disableTransition={disableTransition}
        >
          {children}
        </ResizingTextAreaWrapper>
      );
    }

    return (
      <FormMessageContainer
        {...messageContainerProps}
        messageProps={messageProps}
      >
        <TextFieldContainer
          {...containerProps}
          ref={containerRef}
          style={{
            ...style,
            "--rmd-textarea-height": height,
          }}
          className={textAreaContainer({
            animate: !disableTransition && resize == "auto",
            disabled,
            height: !!height,
            underlineLabelled:
              !!label && (theme === "underline" || theme === "filled"),
            className,
          })}
          theme={theme}
          label={!!label}
          error={error}
          dense={dense}
          inline={inline}
          active={active}
          readOnly={readOnly}
          disabled={disabled}
          leftAddon={leftAddon}
          rightAddon={rightAddon}
          underlineDirection={underlineDirection}
          disableLeftAddonStyles={disableLeftAddonStyles}
          disableRightAddonStyles={disableRightAddonStyles}
          onClick={(event) => {
            // The textarea container adds padding-top when there is a label so
            // that the label does not cover the text so this makes it so you
            // can still click anywhere in the "box" to focus the textarea.
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
