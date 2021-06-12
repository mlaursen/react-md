import React, { forwardRef, InputHTMLAttributes, ReactNode } from "react";
import cn from "classnames";
import { buttonThemeClassNames, ButtonThemeProps } from "@react-md/button";
import { TextIconSpacing, useIcon } from "@react-md/icon";
import { useInteractionStates } from "@react-md/states";
import { SrOnly } from "@react-md/typography";
import { bem } from "@react-md/utils";

type InputAttributes = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "defaultValue" | "value"
>;

export interface FileInputProps extends ButtonThemeProps, InputAttributes {
  /**
   * An id for the input. This is required for a11y since it also is applied as
   * the `htmlFor` prop for the label.
   */
  id: string;

  /**
   * The change event handler to attach to this input. This is required since
   * there's really no use in this component otherwise.
   */
  onChange: React.ChangeEventHandler<HTMLInputElement>;

  /**
   * An optional icon to display for the file input.
   */
  icon?: ReactNode;

  /**
   * Boolean if the icon should appear after the children in the label.
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

const block = bem("rmd-file-input");

/**
 * This component is a wrapper for the `<input type="file" />` that can be themed
 * like a button.
 */
export const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
  function FileInput(
    {
      style,
      className: propClassName,
      icon: propIcon,
      iconAfter = false,
      children: propChildren,
      theme = "primary",
      themeType = "contained",
      buttonType = propChildren ? "text" : "icon",
      multiple = false,
      disableIconSpacing: propDisableIconSpacing,
      disableRepeatableFiles = false,
      onKeyDown,
      onKeyUp,
      onMouseDown,
      onMouseUp,
      onMouseLeave,
      onClick,
      onTouchStart,
      onTouchMove,
      onTouchEnd,
      onChange,
      ...props
    },
    ref
  ) {
    const { id, disabled } = props;
    const icon = useIcon("download", propIcon);
    const disableIconSpacing =
      propDisableIconSpacing ?? typeof propChildren === "undefined";

    let children = propChildren;
    if (typeof propChildren === "undefined") {
      children = <SrOnly>Upload</SrOnly>;
    }

    const { ripples, className, handlers } = useInteractionStates({
      handlers: {
        onKeyDown,
        onKeyUp,
        onMouseDown,
        onMouseUp,
        onMouseLeave,
        onClick,
        onTouchStart,
        onTouchMove,
        onTouchEnd,
      },
      className: buttonThemeClassNames({
        theme,
        themeType,
        buttonType,
        disabled,
        className: propClassName,
      }),
      // pressing enter or space would trigger two click events otherwise.
      disableEnterClick: true,
    });

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
          {...handlers}
          ref={ref}
          onChange={onChange}
          value={disableRepeatableFiles ? undefined : ""}
          type="file"
          className={block()}
          multiple={multiple}
        />
        <label
          htmlFor={id}
          style={style}
          className={cn("rmd-file-input-label", className)}
        >
          {content}
          {ripples}
        </label>
      </>
    );
  }
);

/* istanbul ignore next */
if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    FileInput.propTypes = {
      id: PropTypes.string.isRequired,
      style: PropTypes.object,
      className: PropTypes.string,
      name: PropTypes.string,
      onChange: PropTypes.func.isRequired,
      icon: PropTypes.node,
      iconAfter: PropTypes.bool,
      multiple: PropTypes.bool,
      disableIconSpacing: PropTypes.bool,
      disableRepeatableFiles: PropTypes.bool,
      theme: PropTypes.oneOf([
        "clear",
        "primary",
        "secondary",
        "warning",
        "error",
      ]),
      themeType: PropTypes.oneOf(["flat", "outline", "contained"]),
      buttonType: PropTypes.oneOf(["text", "icon"]),
      disabled: PropTypes.bool,
      children: PropTypes.node,
      onKeyDown: PropTypes.func,
      onKeyUp: PropTypes.func,
      onMouseDown: PropTypes.func,
      onMouseUp: PropTypes.func,
      onMouseLeave: PropTypes.func,
      onClick: PropTypes.func,
      onTouchStart: PropTypes.func,
      onTouchMove: PropTypes.func,
      onTouchEnd: PropTypes.func,
    };
  } catch (e) {}
}
