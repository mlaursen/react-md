import React, {
  CSSProperties,
  FC,
  InputHTMLAttributes,
  ReactNode,
  useCallback,
  forwardRef,
} from "react";
import cn from "classnames";
import { TextIconSpacing } from "@react-md/icon";
import {
  useInteractionStates,
  StatesConfigContextType,
  InteractionStatesOptions,
} from "@react-md/states";
import { bem } from "@react-md/theme";
import {
  useRefCache,
  useToggle,
  WithForwardedRef,
  Omit,
} from "@react-md/utils";

import Label from "./Label";
import ToggleContainer from "./ToggleContainer";
import useFocusState from "./useFocusState";

/**
 * The props for a checkbox or radio input element.
 *
 * Note: The `readOnly` attribute is not valid for these input types since they
 * update the `checked` property while `readOnly` is specific to `value` itself.
 */
export interface InputToggleProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "readOnly">,
    StatesConfigContextType,
    Pick<InteractionStatesOptions, "disablePressedFallback"> {
  /**
   *
   * The id for the radio or checkbox. This is required for a11y and will
   * be used as the `for` attribute if the `label` prop is provided.
   */
  id: string;

  /**
   * The name for the radio or checkbox. This is required for a11y.
   */
  name: string;

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
   * An optional style to apply to the toggle `<span>` element. The `style` prop will
   * be applied to the container `<div>` element instead.
   */
  toggleStyle?: CSSProperties;

  /**
   * An optional className to apply to the toggle `<span>` element. The `className` prop will
   * be applied to the container `<div>` element instead.
   */
  toggleClassName?: string;

  /**
   * Boolean if the input toggle is currently errored. This will update the label and the
   * input to gain error colors.
   */
  error?: boolean;

  /**
   * Boolean if the container element should be rendered as `flex` instead of `inline-flex`.
   */
  fullWidth?: boolean;

  /**
   * Boolean if the label should be stacked above/below the input toggle instead of inline.
   */
  stacked?: boolean;

  /**
   * An optional label to display with the input. If this prop is omitted, you **should** apply
   * an `aria-label` or `aria-labelledby` for a11y.
   */
  label?: ReactNode;

  /**
   * Boolean if the input toggle should appear after the label instead of before.
   */
  iconAfter?: boolean;
}

type Props = InputToggleProps & { type: "radio" | "checkbox" };
type WithRef = WithForwardedRef<HTMLInputElement>;
type DefaultProps = Required<
  Pick<Props, "error" | "disabled" | "fullWidth" | "stacked" | "iconAfter">
>;
type WithDefaultProps = Props & DefaultProps & WithRef;

const block = bem("rmd-form-toggle");

const InputToggle: FC<Props & WithRef> = providedProps => {
  const {
    style,
    className,
    iconStyle,
    iconClassName,
    toggleStyle,
    toggleClassName: propToggleClassName,
    icon,
    forwardedRef,
    onFocus: propOnFocus,
    onBlur: propOnBlur,
    error,
    fullWidth,
    stacked,
    label,
    iconAfter,
    disableRipple,
    disableProgrammaticRipple,
    rippleTimeout,
    rippleClassNames,
    ...props
  } = providedProps as WithDefaultProps;
  const { id, type, disabled } = props;

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
  const { focused, onBlur, onFocus } = useFocusState({
    onFocus: propOnFocus,
    onBlur: propOnBlur,
  });

  return (
    <ToggleContainer
      style={style}
      className={className}
      fullWidth={fullWidth}
      stacked={stacked}
    >
      <TextIconSpacing
        icon={
          <Label htmlFor={id} error={error} disabled={disabled}>
            {label}
          </Label>
        }
        iconAfter={!iconAfter}
      >
        <span
          style={toggleStyle}
          className={cn(
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
            onFocus={onFocus}
            onBlur={onBlur}
            ref={forwardedRef}
            className={block("input")}
          />
          <span
            style={iconStyle}
            className={cn(
              block("icon", {
                circle: type === "radio",
                disabled,
              }),
              iconClassName
            )}
          >
            {icon}
          </span>
          {ripples}
        </span>
      </TextIconSpacing>
    </ToggleContainer>
  );
};

const defaultProps: DefaultProps = {
  error: false,
  fullWidth: false,
  stacked: false,
  disabled: false,
  iconAfter: false,
};

InputToggle.defaultProps = defaultProps;

export default forwardRef<HTMLInputElement, Props>((props, ref) => (
  <InputToggle {...props} forwardedRef={ref} />
));
