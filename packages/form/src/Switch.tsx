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
   * Boolean if the container element should be rendered as `flex` instead of `inline-flex`.
   */
  fullWidth?: boolean;

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
   * Boolean if the input toggle should appear after the label instead of before.
   */
  iconAfter?: boolean;
}

type WithRef = WithForwardedRef<HTMLInputElement>;
type DefaultProps = Required<
  Pick<
    SwitchProps,
    | "error"
    | "disabled"
    | "fullWidth"
    | "stacked"
    | "iconAfter"
    | "defaultChecked"
  >
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
    fullWidth,
    stacked,
    label,
    iconAfter,
    onFocus: propOnFocus,
    onBlur: propOnBlur,
    ...props
  } = providedProps as WithDefaultProps;
  const { id, disabled } = props;

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
            className={cn(block("ball"), ballClassName)}
          />
        </span>
      </TextIconSpacing>
    </ToggleContainer>
  );
};

const defaultProps: DefaultProps = {
  error: false,
  disabled: false,
  stacked: false,
  fullWidth: false,
  iconAfter: false,
  defaultChecked: false,
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
      fullWidth: PropTypes.bool,
      disabled: PropTypes.bool,
      defaultChecked: PropTypes.bool,
    };
  }
}

export default forwardRef<HTMLInputElement, SwitchProps>((props, ref) => (
  <Switch {...props} forwardedRef={ref} />
));
