import React, { CSSProperties, forwardRef } from "react";
import cn from "classnames";
import { CircularProgress, getProgressA11y } from "@react-md/progress";

import { Switch, SwitchProps } from "./Switch";

export interface AsyncSwitchProps extends SwitchProps {
  /**
   * Boolean if the switch is still loading. This will "disable" the switch and
   * add the circular progress indicator in the switch's ball until it is set
   * back to false.
   */
  loading: boolean;

  /**
   * An optional style to apply to the progress bar while the loading state is
   * enabled.
   */
  progressStyle?: CSSProperties;

  /**
   * An optional class name to apply to the progress bar while the loading state
   * is enabled.
   */
  progressClassName?: string;
}

// this is used while the loading state is enabled to "disable" the switch
// toggle. If we disable the entire switch, keyboard focus is lost which is not
// desired.
const noop = (): void => {
  // do nothing
};

/**
 * This component will create an async switch that will show a loading indicator
 * and prevent the switch from being toggled while the loading state is true.
 */
export const AsyncSwitch = forwardRef<HTMLInputElement, AsyncSwitchProps>(
  function AsyncSwitch(
    {
      id,
      disabled,
      className,
      progressStyle,
      progressClassName,
      loading,
      onChange,
      ...props
    },
    ref
  ) {
    const progressId = `${id}-loading`;
    return (
      <Switch
        {...props}
        {...getProgressA11y(progressId, loading)}
        id={id}
        ref={ref}
        disabled={disabled}
        className={cn("rmd-switch--async", className)}
        labelDisabled={disabled || false}
        onChange={loading ? noop : onChange}
      >
        {loading && (
          <CircularProgress
            id={progressId}
            style={progressStyle}
            className={cn("rmd-switch__progress", progressClassName)}
            centered={false}
          />
        )}
      </Switch>
    );
  }
);

/* istanbul ignore next */
if (process.env.NODE_ENV === "production") {
  try {
    const PropTypes = require("prop-types");

    AsyncSwitch.propTypes = {
      id: PropTypes.string.isRequired,
      className: PropTypes.string,
      onChange: PropTypes.func,
      disabled: PropTypes.bool,
      loading: PropTypes.bool.isRequired,
      progressStyle: PropTypes.object,
      progressClassName: PropTypes.string,
    };
  } catch (e) {}
}
