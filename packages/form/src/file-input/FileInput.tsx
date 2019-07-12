import React, {
  FC,
  InputHTMLAttributes,
  Fragment,
  HTMLAttributes,
  forwardRef,
  ReactNode,
  useCallback,
  useRef,
} from "react";
import cn from "classnames";
import { FontIcon, TextIconSpacing } from "@react-md/icon";
import { buttonThemeClassNames, ButtonThemeProps } from "@react-md/button";
import { useInteractionStates } from "@react-md/states";
import { SrOnly } from "@react-md/typography";
import { bem } from "@react-md/theme";
import { Omit, WithForwardedRef, applyRef } from "@react-md/utils";

type InputAttributes = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  | "type"
  | "defaultValue"
  | "value"
  | "onChange"
  | "onKeyDown"
  | "onKeyUp"
  | "onMouseDown"
  | "onMouseUp"
  | "onMouseLeave"
  | "onClick"
  | "onTouchStart"
  | "onTouchMove"
  | "onTouchEnd"
>;

type LabelHandlers = Pick<
  HTMLAttributes<HTMLLabelElement>,
  | "onKeyDown"
  | "onKeyUp"
  | "onMouseDown"
  | "onMouseUp"
  | "onMouseLeave"
  | "onClick"
  | "onTouchStart"
  | "onTouchMove"
  | "onTouchEnd"
>;

export interface FileInputProps
  extends ButtonThemeProps,
    InputAttributes,
    LabelHandlers {
  /**
   * An id for the input. This is required for a11y since it also is applied as the
   * `htmlFor` prop for the label.
   */
  id: string;

  /**
   * The change event handler to attach to this input. This is required since there's
   * really no use in this component otherwise.
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
   * Boolean if the children should not have some spacing between the icon and itself.
   * The default behavior is to use the `<TextIconSpacing>` component for text styled
   * input buttons, but this can be disabled if you want to use a screenreader only
   * accessible label.
   */
  disableIconSpacing?: boolean;

  /**
   * Boolean if the file input should no longer allow the same file to be selected
   * multiple times and trigger the `onChange` each time it is selected.
   */
  disableRepeatableFiles?: boolean;
}

type WithRef = WithForwardedRef<HTMLInputElement>;
type DefaultProps = Required<
  Pick<
    FileInputProps,
    | "icon"
    | "iconAfter"
    | "tabIndex"
    | "theme"
    | "themeType"
    | "buttonType"
    | "multiple"
    | "children"
    | "disableIconSpacing"
    | "disableRepeatableFiles"
  >
>;
type WithDefaultProps = FileInputProps & DefaultProps & WithRef;

const block = bem("rmd-file-input");

/**
 * This component is a wrapper for the `<input type="file" />` that can be themed
 * like a button.
 */
const FileInput: FC<FileInputProps & WithRef> = providedProps => {
  const {
    style,
    className: propClassName,
    "aria-label": propAriaLabel,
    theme,
    themeType,
    buttonType,
    icon,
    iconAfter,
    children,
    forwardedRef,
    disableIconSpacing,
    disableRepeatableFiles,
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
    tabIndex: propTabIndex,
    ...props
  } = providedProps as WithDefaultProps;
  const { id, disabled } = props;

  let tabIndex: number | undefined = propTabIndex;
  if (disabled) {
    tabIndex = undefined;
  }

  const inputRef = useRef<HTMLInputElement | null>(null);
  const refHandler = useCallback(
    (instance: HTMLInputElement | null) => {
      applyRef(instance, forwardedRef);
      inputRef.current = instance;
    },
    [forwardedRef]
  );

  const { ripples, className, handlers } = useInteractionStates({
    handlers: {
      onKeyDown: event => {
        if (onKeyDown) {
          onKeyDown(event);
        }

        if (!inputRef.current || event.key !== "Enter") {
          return;
        }

        // swap focus over to the input element so the enter key will be pressed
        // on it instead.
        // TODO: Need to see if there's a better way to apply the button
        // styles on the input or still have the input focusable for the states
        // interactions
        inputRef.current.focus();
      },
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
    // pressent enter or space would trigger two click events otherwise.
    disableEnterClick: true,
  });

  let content: ReactNode = icon;
  if (disableIconSpacing || (children && !icon)) {
    content = (
      <Fragment>
        {!iconAfter && icon}
        {children}
        {iconAfter && icon}
      </Fragment>
    );
  } else if (children) {
    content = (
      <TextIconSpacing icon={icon} iconAfter={iconAfter}>
        {children}
      </TextIconSpacing>
    );
  }

  return (
    <Fragment>
      <label
        htmlFor={id}
        style={style}
        className={cn(block(), className)}
        {...handlers}
        tabIndex={tabIndex}
      >
        {content}
        {ripples}
      </label>
      <input
        id={id}
        {...props}
        ref={refHandler}
        onChange={onChange}
        value={disableRepeatableFiles ? undefined : ""}
        type="file"
        className={block("hidden")}
        tabIndex={-1}
      />
    </Fragment>
  );
};

const defaultProps: DefaultProps = {
  icon: <FontIcon>file_download</FontIcon>,
  iconAfter: false,
  children: <SrOnly>Upload</SrOnly>,
  theme: "primary",
  themeType: "contained",
  buttonType: "icon",
  tabIndex: 0,
  multiple: false,
  disableIconSpacing: false,
  disableRepeatableFiles: false,
};

FileInput.defaultProps = defaultProps;

if (process.env.NODE_ENV !== "production") {
  FileInput.displayName = "FileInput";

  let PropTypes;
  try {
    PropTypes = require("prop-types");
  } catch (e) {}

  if (PropTypes) {
    FileInput.propTypes = {
      id: PropTypes.string.isRequired,
      name: PropTypes.string,
      onChange: PropTypes.func.isRequired,
      icon: PropTypes.node,
      iconAfter: PropTypes.bool,
      multiple: PropTypes.bool,
      tabIndex: PropTypes.number,
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
    };
  }
}

export default forwardRef<HTMLInputElement, FileInputProps>((props, ref) => (
  <FileInput {...props} forwardedRef={ref} />
));
