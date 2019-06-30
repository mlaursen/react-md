import React, {
  FC,
  forwardRef,
  InputHTMLAttributes,
  ReactNode,
  CSSProperties,
} from "react";
import cn from "classnames";
import { TextIconSpacing } from "@react-md/icon";
import { bem } from "@react-md/theme";
import { WithForwardedRef, Omit } from "@react-md/utils";

import Label from "./Label";
import ToggleContainer from "./ToggleContainer";

export interface SwitchProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "readOnly"> {
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
   * An optional style to apply to the switch's ball.
   */
  ballStyle?: CSSProperties;

  /**
   * An optional className to apply to the switch's ball.
   */
  ballClassName?: string;

  /**
   * An optional style to apply to the switch's track (this is the `<input type="checkbox">`
   * used behind the scenes).
   */
  trackStyle?: CSSProperties;

  /**
   * An optional className to apply to the switch's track (this is the `<input type="checkbox">`
   * used behind the scenes).
   */
  trackClassName?: string;

  /**
   * Boolean if the input toggle is currently errored. This will update the label and the
   * input to gain error colors.
   */
  error?: boolean;

  /**
   * Boolean if the container element should be rendered as `inline-flex` instead of `flex`.
   */
  inline?: boolean;

  /**
   * Boolean if the label should be stacked above/below the input toggle instead of inline.
   */
  stacked?: boolean;

  /**
   * An optional label to display with the input. If this prop is omitted and you aren't adding
   * a custom `<label>` anywhere else, you **should** apply an `aria-label` or `aria-labelledby`
   * for a11y.
   */
  label?: ReactNode;

  /**
   * An optional style to apply to the `<label>` when the `label` prop is used.
   */
  labelStyle?: CSSProperties;

  /**
   * An optional className to apply to the `<label>` when the `label` prop is used.
   */
  labelClassName?: string;

  /**
   * An optional boolean if the label should gain the disabled style. When this is `undefined`,
   * the `disabled` prop will be used instead. This is really just useful when you want to disable
   * the switch from being toggled while some async action is being called, but not changing styles
   * during the wait.
   */
  labelDisabled?: boolean;

  /**
   * Boolean if the input toggle should appear after the label instead of before.
   */
  iconAfter?: boolean;

  /**
   * Any optional children that should be displayed within the switch's ball.
   */
  children?: ReactNode;
}

type WithRef = WithForwardedRef<HTMLInputElement>;
type DefaultProps = Required<
  Pick<SwitchProps, "error" | "disabled" | "inline" | "stacked" | "iconAfter">
>;
type WithDefaultProps = SwitchProps & DefaultProps & WithRef;

const block = bem("rmd-switch");

const Switch: FC<SwitchProps & WithRef> = providedProps => {
  const {
    style,
    className,
    ballStyle,
    ballClassName,
    trackStyle,
    trackClassName,
    forwardedRef,
    error,
    inline,
    stacked,
    label,
    labelStyle,
    labelClassName,
    labelDisabled,
    iconAfter,
    onFocus: propOnFocus,
    onBlur: propOnBlur,
    children,
    ...props
  } = providedProps as WithDefaultProps;
  const { id, disabled } = props;

  return (
    <ToggleContainer
      style={style}
      className={cn("rmd-switch-container", className)}
      inline={inline}
      stacked={stacked}
    >
      <TextIconSpacing
        icon={
          <Label
            style={labelStyle}
            className={labelClassName}
            htmlFor={id}
            error={error}
            disabled={
              typeof labelDisabled === "boolean" ? labelDisabled : disabled
            }
          >
            {label}
          </Label>
        }
        iconAfter={!iconAfter}
      >
        <span className={cn(block(), trackClassName)}>
          <input
            {...props}
            type="checkbox"
            ref={forwardedRef}
            className={cn(block("input"))}
          />
          <label
            htmlFor={id}
            aria-hidden
            style={ballStyle}
            className={cn(block("ball"), ballClassName)}
          >
            {children}
          </label>
        </span>
      </TextIconSpacing>
    </ToggleContainer>
  );
};

const defaultProps: DefaultProps = {
  error: false,
  disabled: false,
  stacked: false,
  inline: false,
  iconAfter: false,
};

Switch.defaultProps = defaultProps;

if (process.env.NODE_ENV !== "production") {
  Switch.displayName = "Switch";
  let PropTypes = null;
  try {
    PropTypes = require("prop-types");
  } catch (e) {}

  if (PropTypes) {
    Switch.propTypes = {
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      ballStyle: PropTypes.object,
      ballClassName: PropTypes.string,
      trackStyle: PropTypes.object,
      trackClassName: PropTypes.string,
      label: PropTypes.node,
      error: PropTypes.bool,
      inline: PropTypes.bool,
      disabled: PropTypes.bool,
    };
  }
}

export default forwardRef<HTMLInputElement, SwitchProps>((props, ref) => (
  <Switch {...props} forwardedRef={ref} />
));
