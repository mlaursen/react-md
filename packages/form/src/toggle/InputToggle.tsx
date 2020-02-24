import React, {
  CSSProperties,
  forwardRef,
  InputHTMLAttributes,
  ReactElement,
  ReactNode,
  Ref,
} from "react";
import { cnb } from "cnbuilder";
import {
  InteractionStatesOptions,
  useInteractionStates,
} from "@react-md/states";
import { bem } from "@react-md/utils";

import Label from "../label/Label";
import useFocusState from "../useFocusState";
import ToggleContainer from "./ToggleContainer";

/**
 * The props for a checkbox or radio input element.
 *
 * Note: The `readOnly` attribute is not valid for these input types since they
 * update the `checked` property while `readOnly` is specific to `value` itself.
 */
export interface InputToggleProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "readOnly">,
    Pick<
      InteractionStatesOptions,
      | "rippleTimeout"
      | "disableRipple"
      | "disableProgrammaticRipple"
      | "disablePressedFallback"
      | "rippleClassNames"
    > {
  /**
   * The id for the radio or checkbox. This is required for a11y and will be
   * used as the `for` attribute if the `label` prop is provided.
   */
  id: string;

  /**
   * The icon to use for either a radio or a checkbox.
   */
  icon?: ReactNode;

  /**
   * An optional style to apply to the `<span>` surrounding the toggle icon.
   */
  iconStyle?: CSSProperties;

  /**
   * An optional className to apply to the `<span>` surrounding the toggle icon.
   */
  iconClassName?: string;

  /**
   * An optional style to apply to the toggle `<span>` element. The `style` prop
   * will be applied to the container `<div>` element instead.
   */
  toggleStyle?: CSSProperties;

  /**
   * An optional className to apply to the toggle `<span>` element. The
   * `className` prop will be applied to the container `<div>` element instead.
   */
  toggleClassName?: string;

  /**
   * Boolean if the icon's overlay should be disabled. The way the Checkbox and
   * Radio input elements work is by applying different opacity to the
   * `::before` and `::after` pseudo selectors and animating it. If you want to
   * use a custom icon that is not a material-icon checkbox outline or radio
   * button, you should probably enable this prop.
   */
  disableIconOverlay?: boolean;

  /**
   * Boolean if the input toggle is currently errored. This will update the
   * label and the input to gain error colors.
   */
  error?: boolean;

  /**
   * Boolean if the container element should be rendered as `inline-flex`
   * instead of `flex`.
   */
  inline?: boolean;

  /**
   * Boolean if the label should be stacked above/below the input toggle instead
   * of inline.
   */
  stacked?: boolean;

  /**
   * An optional label to display with the input. If this prop is omitted, you
   * **should** apply an `aria-label` or `aria-labelledby` for a11y.
   */
  label?: ReactNode;

  /**
   * An optional style to apply to the `<label>` when the `label` prop is used.
   */
  labelStyle?: CSSProperties;

  /**
   * An optional className to apply to the `<label>` when the `label` prop is
   * used.
   */
  labelClassName?: string;

  /**
   * An optional boolean if the label should gain the disabled style. When this
   * is `undefined`, the `disabled` prop will be used instead. This is really
   * just useful when you want to disable the switch from being toggled while
   * some async action is being called, but not changing styles during the wait.
   */
  labelDisabled?: boolean;

  /**
   * Boolean if the input toggle should appear after the label instead of
   * before.
   */
  iconAfter?: boolean;

  /**
   * Optional content to render after the icon element.
   */
  children?: ReactNode;
}

type Props = InputToggleProps &
  ({ type: "radio" } | { type: "checkbox"; indeterminate?: boolean });
type CheckboxOrRadioProps = InputToggleProps & {
  type: "checkbox" | "radio";
  indeterminate?: boolean;
};

const block = bem("rmd-toggle");

function InputToggle(
  {
    style,
    className,
    iconStyle,
    iconClassName,
    toggleStyle,
    toggleClassName: propToggleClassName,
    icon,
    onFocus: propOnFocus,
    onBlur: propOnBlur,
    error = false,
    inline = false,
    stacked = false,
    disabled = false,
    label,
    labelStyle,
    labelClassName,
    labelDisabled,
    iconAfter = false,
    disableIconOverlay = false,
    disableRipple,
    disableProgrammaticRipple,
    rippleTimeout,
    rippleClassNames,
    children,
    indeterminate,
    ...props
  }: CheckboxOrRadioProps,
  ref?: Ref<HTMLInputElement>
): ReactElement {
  const { id, type } = props;

  const {
    ripples,
    handlers,
    className: toggleClassName,
  } = useInteractionStates({
    handlers: props,
    disabled,
    className: propToggleClassName,
    disableRipple,
    disableProgrammaticRipple,
    rippleTimeout,
    rippleClassNames,
  });
  const [focused, onFocus, onBlur] = useFocusState({
    onFocus: propOnFocus,
    onBlur: propOnBlur,
  });

  const labelEl = (
    <Label
      style={labelStyle}
      className={labelClassName}
      htmlFor={id}
      error={error}
      disabled={typeof labelDisabled === "boolean" ? labelDisabled : disabled}
    >
      {label}
    </Label>
  );

  return (
    <ToggleContainer
      style={style}
      className={className}
      inline={inline}
      stacked={stacked}
    >
      {iconAfter && labelEl}
      <span
        style={toggleStyle}
        className={cnb(
          block({
            focused,
            disabled,
          }),
          toggleClassName
        )}
      >
        <input
          {...props}
          {...handlers}
          ref={ref}
          disabled={disabled}
          onFocus={onFocus}
          onBlur={onBlur}
          className={block("input")}
        />
        <span
          style={iconStyle}
          className={cnb(
            block("icon", {
              circle: !disableIconOverlay && type === "radio",
              disabled,
              overlay: !disableIconOverlay,
              indeterminate,
            }),
            iconClassName
          )}
        >
          {icon}
        </span>
        {ripples}
        {children}
      </span>
      {!iconAfter && labelEl}
    </ToggleContainer>
  );
}

const ForwardedInputToggle = forwardRef<HTMLInputElement, Props>(InputToggle);

if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    ForwardedInputToggle.propTypes = {
      id: PropTypes.string.isRequired,
      type: PropTypes.oneOf(["radio", "checkbox"]).isRequired,
      icon: PropTypes.node,
      iconStyle: PropTypes.object,
      iconClassName: PropTypes.string,
      toggleStyle: PropTypes.object,
      toggleClassName: PropTypes.string,
      error: PropTypes.bool,
      label: PropTypes.node,
      inline: PropTypes.bool,
      stacked: PropTypes.bool,
      disabled: PropTypes.bool,
      iconAfter: PropTypes.bool,
      disableIconOverlay: PropTypes.bool,
    };
  } catch (e) {}
}

export default ForwardedInputToggle;
