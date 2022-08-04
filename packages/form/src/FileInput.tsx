import type { ButtonClassNameThemeOptions } from "@react-md/button";
import { button } from "@react-md/button";
import type { PropsWithRef } from "@react-md/core";
import {
  RippleContainer,
  SrOnly,
  useElementInteraction,
  useEnsuredId,
} from "@react-md/core";
import { TextIconSpacing, useIcon } from "@react-md/icon";
import { cnb } from "cnbuilder";
import type {
  InputHTMLAttributes,
  LabelHTMLAttributes,
  ReactNode,
} from "react";
import { forwardRef } from "react";

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
      multiple = false,
      // onClick,
      // onMouseDown,
      // onMouseUp,
      // onMouseLeave,
      // onKeyUp,
      // onKeyDown,
      // onTouchStart,
      // onTouchEnd,
      // onTouchMove,
      ...remaining
    } = props;
    const id = useEnsuredId(propId, "file-input");
    const { pressed, pressedClassName, rippleContainerProps, handlers } =
      useElementInteraction({
        ...labelProps,
        onClick(event) {
          labelProps?.onClick?.(event);

          // stop propagation so 2 ripples are not created
          event.stopPropagation();
        },
        disabled,
      });

    const icon = useIcon("upload", propIcon);
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
      <>
        <input
          {...props}
          {...remaining}
          id={id}
          ref={ref}
          value={disableRepeatableFiles ? undefined : ""}
          type="file"
          className="rmd-file-input"
          disabled={disabled}
          multiple={multiple}
        />
        <label
          htmlFor={id}
          {...labelProps}
          {...handlers}
          className={cnb(
            button({
              theme,
              themeType,
              buttonType,
              disabled,
              pressed,
              pressedClassName,
            }),
            "rmd-file-input-label",
            className,
            labelProps?.className
          )}
        >
          {content}
          {rippleContainerProps && (
            <RippleContainer {...rippleContainerProps} />
          )}
        </label>
      </>
    );
  }
);
