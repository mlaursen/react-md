import React, { FC, forwardRef, CSSProperties } from "react";
import cn from "classnames";
import { CircularProgress } from "@react-md/progress";
import { WithForwardedRef } from "@react-md/utils";

import Switch, { SwitchProps } from "./Switch";

interface AsyncSwitchProps extends SwitchProps {
  /**
   * Boolean if the switch is still loading. This will "disable" the switch
   * and add the circular progress indicator in the switch's ball until it
   * is set back to false.
   */
  loading: boolean;

  /**
   * An optional style to apply to the progress bar while the loading state
   * is enabled.
   */
  progressStyle?: CSSProperties;

  /**
   * An optional class name to apply to the progress bar while the loading state
   * is enabled.
   */
  progressClassName?: string;
}

type WithRef = WithForwardedRef<HTMLInputElement>;

// this is used while the loading state is enabled to "disable" the switch toggle.
// If we disable the entire switch, keyboard focus is lost which is not desired.
const noop = (): void => {};

/**
 * This component will create an async switch that will show a loading indicator
 * and prevent the switch from being toggled while the loading state is true.
 */
const AsyncSwitch: FC<AsyncSwitchProps & WithRef> = ({
  id,
  disabled,
  className,
  progressStyle,
  progressClassName,
  loading,
  onChange,
  ...props
}) => (
  <Switch
    {...props}
    id={id}
    disabled={disabled}
    aria-busy={loading || undefined}
    aria-describedby={loading ? `${id}-loading` : undefined}
    className={cn("rmd-switch--async", className)}
    labelDisabled={disabled || false}
    onChange={loading ? noop : onChange}
  >
    {loading && (
      <CircularProgress
        id={`${id}-loading`}
        style={progressStyle}
        className={cn("rmd-switch__progress", progressClassName)}
        centered={false}
      />
    )}
  </Switch>
);

if (process.env.NODE_ENV === "production") {
  AsyncSwitch.displayName = "AsyncSwitch";

  let PropTypes;
  try {
    PropTypes = require("prop-types");
  } catch (e) {}

  if (PropTypes) {
    AsyncSwitch.propTypes = {
      id: PropTypes.string.isRequired,
      className: PropTypes.string,
      onChange: PropTypes.func,
      disabled: PropTypes.bool,
      loading: PropTypes.bool.isRequired,
      progressStyle: PropTypes.object,
      progressClassName: PropTypes.string,
    };
  }
}

export default forwardRef<HTMLInputElement, AsyncSwitchProps>((props, ref) => (
  <AsyncSwitch {...props} forwardedRef={ref} />
));
