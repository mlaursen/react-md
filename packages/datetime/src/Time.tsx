/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { forwardRef, HTMLAttributes } from "react";
import cn from "classnames";
import { bem, useAppSize, useUserInteractionMode } from "@react-md/utils";

import { AmPmRadioGroup } from "./AmPmRadioGroup";
import { TimeFormat } from "./format";
import { TimeInput } from "./TimeInput";
import { TimeSeparator } from "./TimeSeparator";
import { TimeOptions, useTime } from "./useTime";
/* import { TIME_LAYOUTS } from "./layout"; */

const styles = bem("rmd-time");

/**
 * @remarks \@since 2.7.0
 */
export interface TimeProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "id" | "onChange">,
    TimeOptions {
  /**
   * The size of all the time parts based on the {@link format}. When this is
   * set to `"media"`, the time parts will use the `"large"` spec when the app
   * is in `"touch"` mode.
   *
   * @defaultValue `"media"`
   */
  size?: "media" | "normal" | "dense" | "large";

  /**
   * Boolean if the AM/PM toggle is below the hours, minutes, seconds, and
   * milliseconds inputs instead of being next to. This will also foce the AM/PM
   * toggle to be rendered horizontally instead of vertically.
   *
   * @defaultValue `false`
   */
  multiline?: boolean;

  layout?: string;
}

/**
 * @remarks \@since 2.7.0
 */
export const Time = forwardRef<HTMLDivElement, TimeProps>(function Time(
  {
    id,
    className,
    format = TimeFormat.StandardHoursMinutes,
    value,
    onChange,
    size = "media",
    multiline = false,
    required = false,
    onKeyDown: propOnKeyDown,
    /* layout = TIME_LAYOUTS[format], */
    ...props
  },
  ref
) {
  const mode = useUserInteractionMode();
  const { isPhone } = useAppSize();
  const large =
    size === "large" || (size === "media" && (mode === "touch" || isPhone));
  const dense =
    size === "dense" || (size === "media" && mode !== "touch" && !isPhone);
  const {
    onKeyDown,
    hoursProps,
    enableHours,
    hoursSep,
    minutesProps,
    enableMinutes,
    minutesSep,
    secondsProps,
    enableSeconds,
    secondsSep,
    millisecondsProps,
    enableMilliseconds,
    timePeriodProps,
    enableTimePeriod,
  } = useTime({
    id,
    value,
    format,
    onChange,
    required,
    onKeyDown: propOnKeyDown,
  });

  return (
    <div
      {...props}
      id={id}
      ref={ref}
      role="group"
      // style={{ display: "grid", gridTemplateColumns: layout }}
      className={cn(
        styles({
          large,
          dense,
          /* "2d-tp": format === TimeFormat.StandardHoursOnly, */
          /* "2d-s-2d": format === TimeFormat.MilitaryHoursMinutes, */
          /* "2d-s-2d-tp": format === TimeFormat.StandardHoursMinutes, */
          /* "2d-s-2d-s-2d": */
          /*   format === TimeFormat.MilitaryHoursSeconds || */
          /*   format === TimeFormat.StandardHoursMilliseconds, */
          /* "2d-s-2d-s-2d-tp": format === TimeFormat.StandardHoursSeconds, */
          /* "2d-s-2d-s-2d-s-3d": format === TimeFormat.MilitaryHoursMilliseconds, */
          /* "2d-s-2d-s-2d-s-3d-tp": */
          /*   format === TimeFormat.StandardHoursMilliseconds, */
        }),
        className
      )}
      onKeyDown={onKeyDown}
    >
      {enableHours && <TimeInput {...hoursProps} />}
      {hoursSep && <TimeSeparator key="hoursSep" />}
      {enableMinutes && <TimeInput {...minutesProps} />}
      {minutesSep && <TimeSeparator key="minutesSep" />}
      {enableSeconds && <TimeInput {...secondsProps} />}
      {secondsSep && <TimeSeparator key="secondsSep" />}
      {enableMilliseconds && <TimeInput {...millisecondsProps} />}
      {enableTimePeriod && (
        <AmPmRadioGroup {...timePeriodProps} stacked={!multiline} />
      )}
      {/* {enableHours && <label htmlFor={hoursProps.id}>Hour</label>} */}
      {/* {enableMinutes && <label htmlFor={minutesProps.id}>Minute</label>} */}
      {/* {enableSeconds && <label htmlFor={secondsProps.id}>Second</label>} */}
      {/* {enableMilliseconds && ( */}
      {/*   <label htmlFor={millisecondsProps.id}>Millisecond</label> */}
      {/* )} */}
    </div>
  );
});

/* istanbul ignore next */
if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    Time.propTypes = {
      id: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      onChange: PropTypes.func.isRequired,
      format: PropTypes.oneOf(Object.values(TimeFormat)),
    };
  } catch (e) {}
}
