import React, {
  CSSProperties,
  forwardRef,
  InputHTMLAttributes,
  ReactNode,
} from "react";
import cn from "classnames";
import { TextIconSpacing } from "@react-md/icon";

import { Label } from "../label/Label";
import { ToggleContainer } from "./ToggleContainer";
import { SwitchTrack } from "./SwitchTrack";

export interface SwitchProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "readOnly"> {
  /**
   * The id for the radio or checkbox. This is required for a11y and will be
   * used as the `for` attribute if the `label` prop is provided.
   */
  id: string;

  /**
   * An optional style to apply to the switch's ball.
   */
  ballStyle?: CSSProperties;

  /**
   * An optional className to apply to the switch's ball.
   */
  ballClassName?: string;

  /**
   * An optional style to apply to the switch's track (this is the
   * `<input type="checkbox">` used behind the scenes).
   */
  trackStyle?: CSSProperties;

  /**
   * An optional className to apply to the switch's track (this is the
   * `<input type="checkbox">` used behind the scenes).
   */
  trackClassName?: string;

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
   * An optional label to display with the input. If this prop is omitted and
   * you aren't adding a custom `<label>` anywhere else, you **should** apply an
   * `aria-label` or `aria-labelledby` for a11y.
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
   * Any optional children that should be displayed within the switch's ball.
   */
  children?: ReactNode;
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(function Switch(
  {
    style,
    className,
    ballStyle,
    ballClassName,
    trackStyle,
    trackClassName,
    label,
    labelStyle,
    labelClassName,
    labelDisabled,
    error = false,
    disabled = false,
    stacked = false,
    inline = false,
    iconAfter = false,
    children,
    ...props
  },
  ref
) {
  const { id } = props;

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
            disabled={labelDisabled ?? disabled}
          >
            {label}
          </Label>
        }
        iconAfter={!iconAfter}
      >
        <SwitchTrack
          {...props}
          ref={ref}
          style={trackStyle}
          className={trackClassName}
          disabled={disabled}
          ballStyle={ballStyle}
          ballClassName={ballClassName}
        >
          {children}
        </SwitchTrack>
      </TextIconSpacing>
    </ToggleContainer>
  );
});

/* istanbul ignore next */
if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    Switch.propTypes = {
      id: PropTypes.string.isRequired,
      style: PropTypes.object,
      className: PropTypes.string,
      ballStyle: PropTypes.object,
      ballClassName: PropTypes.string,
      trackStyle: PropTypes.object,
      trackClassName: PropTypes.string,
      label: PropTypes.node,
      labelStyle: PropTypes.object,
      labelClassName: PropTypes.string,
      labelDisabled: PropTypes.bool,
      error: PropTypes.bool,
      inline: PropTypes.bool,
      disabled: PropTypes.bool,
      stacked: PropTypes.bool,
      iconAfter: PropTypes.bool,
      children: PropTypes.node,
    };
  } catch (e) {}
}
