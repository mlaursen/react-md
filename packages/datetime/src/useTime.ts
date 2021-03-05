import {
  KeyboardEventHandler,
  KeyboardEvent,
  Ref,
  RefCallback,
  useCallback,
  useRef,
} from "react";

import { AmPmRadioGroupProps } from "./AmPmRadioGroup";
import {
  formatTimeString,
  parseTimeString,
  TimeFormat,
  TimeFormatString,
  TimePart,
  TimePeriod,
  TimeStringParts,
} from "./format";
import { RequiredTimeInputProps } from "./TimeInput";
import { TimeStringChangeEvent, useTimeString } from "./useTimeString";

/**
 * @remarks \@since 2.7.0
 * @internal
 */
interface FocusNodeOptions {
  increment: boolean;
  part: TimePart | TimePeriod;
  hours: HTMLInputElement | null;
  minutes: HTMLInputElement | null;
  seconds: HTMLInputElement | null;
  milliseconds: HTMLInputElement | null;
  timePeriod: HTMLSpanElement | null;
}

/**
 * @remarks \@since 2.7.0
 * @internal
 */
const focusNode = ({
  increment,
  part,
  hours,
  minutes,
  seconds,
  milliseconds,
  timePeriod,
}: FocusNodeOptions): void => {
  let node: HTMLElement | null = null;
  if (increment) {
    if (part === "HH" || part === "hh") {
      node = minutes || seconds || milliseconds || timePeriod;
    } else if (part === "mm") {
      node = seconds || milliseconds || timePeriod;
    } else if (part === "ss") {
      node = milliseconds || timePeriod;
    } else if (part === "sss") {
      node = timePeriod;
    }
  } else if (part === "AM" || part === "PM") {
    node = milliseconds || seconds || minutes || hours;
  } else if (part === "sss") {
    node = seconds || minutes || hours;
  } else if (part === "ss") {
    node = minutes || hours;
  } else if (part === "mm") {
    node = hours;
  }

  node?.focus();
};

/**
 * @remarks \@since 2.7.0
 */
export interface TimeOptions {
  /**
   * An `id` for all the time parts that is required for a11y. This will
   * generate the following ids:
   *
   * - `${id}-hours` - id of optional hours time input
   * - `${id}-minutes` - id of optional minutes time input
   * - `${id}-seconds` - id of optiionl seconds time input
   * - `${id}-milliseconds` - id of optional milliseconds time input
   * - `${id}-am-pm` - id of optional AM/PM toggle group
   *   - `${id}-am-pm-1` - id of `AM` toggle
   *   - `${id}-am-pm-2` - id of `PM` toggle
   */
  id: string;

  /**
   * The time string format that is being used.
   *
   * @defaultValue `TimeFormat.StandardHoursMinutes`
   */
  format?: TimeFormatString;

  /**
   * The current time value string. This needs to be in the same format as the
   * provided {@link format} prop.
   *
   * @example
   * Allowed values
   * ```
   * const noValue1 = {
   *   format: TimeFormat.StandardHoursMinutes,
   *   value: "",
   * };
   * const noValue2 = {
   *   format: TimeFormat.StandardHoursMinutes,
   *   value: "--:--",
   * };
   *
   * const valued1 = {
   *   format: TimeFormat.StandardHoursMinutes,
   *   value: "12:30 PM"
   * };
   * const valued2 = {
   *   format: TimeFormat.StandardHoursMinutes,
   *   value: "03:30 AM"
   * };
   * ```
   *
   * @see {@link format}
   */
  value: string;

  /**
   * A function to call that will change the {@link value}.
   */
  onChange(value: string): void;

  /**
   * Boolean if all the time parts are required before submitting a form.
   */
  required?: boolean;

  /**
   * An optional keydown event handler to merge with the default keyboard
   * behavior for the time group.
   */
  onKeyDown?: KeyboardEventHandler<HTMLDivElement>;
}

/** @remarks \@since 2.7.0 */
export interface TimeBehaviorInputProps extends RequiredTimeInputProps {
  id: string;
  key: string;
  ref: RefCallback<HTMLInputElement>;
  name: string;
  required: boolean;
}

/** @remarks \@since 2.7.0 */
export interface TimePeriodBehaviorProps extends AmPmRadioGroupProps {
  key: string;
  ref: Ref<HTMLSpanElement>;
}

/** @remarks \@since 2.7.0 */
export interface TimeBehavior extends TimeStringParts {
  onKeyDown: KeyboardEventHandler<HTMLDivElement>;
  hoursProps: TimeBehaviorInputProps;
  minutesProps: TimeBehaviorInputProps;
  secondsProps: TimeBehaviorInputProps;
  millisecondsProps: TimeBehaviorInputProps & { milliseconds: true };
  timePeriodProps: TimePeriodBehaviorProps;
}

/**
 * @remarks \@since 2.7.0
 */
export function useTime({
  id,
  value,
  onChange,
  onKeyDown: propOnKeyDown,
  required = false,
  format = TimeFormat.StandardHoursMinutes,
}: TimeOptions): TimeBehavior {
  const {
    hours,
    minutes,
    seconds,
    milliseconds,
    enableHours,
    enableMinutes,
    enableSeconds,
    enableMilliseconds,
    enableTimePeriod,
    hoursSep,
    minutesSep,
    secondsSep,
    timePeriod,
    valued,
  } = parseTimeString(value, format);
  const hoursRef = useRef<HTMLInputElement>(null);
  const mintesRef = useRef<HTMLInputElement>(null);
  const secondsRef = useRef<HTMLInputElement>(null);
  const millisecondsRef = useRef<HTMLInputElement>(null);
  const timePeriodRef = useRef<HTMLSpanElement>(null);
  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      propOnKeyDown?.(event);

      const increment = event.key === "ArrowRight";
      if (!increment && event.key !== "ArrowLeft") {
        return;
      }

      let part: TimePart = enableTimePeriod ? "hh" : "HH";
      const hours = hoursRef.current;
      const minutes = mintesRef.current;
      const seconds = secondsRef.current;
      const milliseconds = millisecondsRef.current;
      const timePeriod = timePeriodRef.current;
      const { target } = event;
      if (target === minutes) {
        part = "mm";
      } else if (target === seconds) {
        part = "ss";
      } else if (target === milliseconds) {
        part = "sss";
      } else if (target !== hours) {
        // shouldn't really be able to do AM/PM stuff
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      focusNode({
        increment,
        part,
        hours,
        minutes,
        seconds,
        milliseconds,
        timePeriod,
      });
    },
    [enableTimePeriod, propOnKeyDown]
  );

  const changeValue = useCallback(
    (value: string, part?: TimePart, period?: TimePeriod) => {
      const nextValue = formatTimeString({
        hours: part === "HH" || part === "hh" ? value : hours,
        minutes: part === "mm" ? value : minutes,
        seconds: part === "ss" ? value : seconds,
        milliseconds: part === "sss" ? value : milliseconds,
        timePeriod:
          period ?? (value === "AM" || value === "PM" ? value : timePeriod),
      });

      onChange(nextValue);
    },
    [hours, milliseconds, minutes, onChange, seconds, timePeriod]
  );
  const onValueChange = useCallback(
    ({ value, part, timePeriod, completed }: TimeStringChangeEvent) => {
      changeValue(value, part, timePeriod);
      if (!completed) {
        return;
      }

      focusNode({
        increment: true,
        part,
        hours: hoursRef.current,
        minutes: mintesRef.current,
        seconds: secondsRef.current,
        milliseconds: millisecondsRef.current,
        timePeriod: timePeriodRef.current,
      });
    },
    [changeValue]
  );

  let hoursId = "";
  let minutesId = "";
  let secondsId = "";
  let millisecondsId = "";
  let timePeriodId = "";
  if (enableHours) {
    hoursId = `${id}-hours`;
  }
  if (enableMinutes) {
    minutesId = `${id}-minutes`;
  }
  if (enableSeconds) {
    secondsId = `${id}-seconds`;
  }
  if (enableMilliseconds) {
    millisecondsId = `${id}-milliseconds`;
  }
  if (enableTimePeriod) {
    timePeriodId = `${id}-am-pm`;
  }

  const hoursProps = useTimeString({
    ref: hoursRef,
    value: hours,
    part: enableTimePeriod ? "hh" : "HH",
    required: required || valued,
    onValueChange,
  });
  const minutesProps = useTimeString({
    ref: mintesRef,
    value: minutes,
    part: "mm",
    required: required || valued,
    onValueChange,
  });
  const secondsProps = useTimeString({
    ref: secondsRef,
    value: seconds,
    part: "ss",
    required: required || valued,
    onValueChange,
  });
  const millisecondsProps = useTimeString({
    ref: millisecondsRef,
    value: milliseconds,
    part: "sss",
    required: required || valued,
    onValueChange,
  });

  return {
    onKeyDown,
    hoursProps: {
      ...hoursProps,
      id: hoursId,
      key: "hours",
      name: "hours",
      required,
    },
    enableHours,
    hoursSep,
    minutesProps: {
      ...minutesProps,
      id: minutesId,
      key: "minutes",
      name: "minutes",
      required,
    },
    enableMinutes,
    minutesSep,
    secondsProps: {
      ...secondsProps,
      id: secondsId,
      key: "seconds",
      name: "seconds",
      required,
    },
    enableSeconds,
    secondsSep,
    millisecondsProps: {
      ...millisecondsProps,
      id: millisecondsId,
      key: "milliseconds",
      name: "milliseconds",
      milliseconds: true,
      required,
    },
    enableMilliseconds,
    timePeriodProps: {
      id: timePeriodId,
      ref: timePeriodRef,
      key: "timePeriod",
      value: timePeriod,
      onChange: changeValue,
      required,
    },
    enableTimePeriod,
  };
}
