import { ValuesOf } from "@react-md/utils";

/** @remarks \@since 2.7.0 */
export type AmTimePeriod = "AM";

/** @remarks \@since 2.7.0 */
export type PmTimePeriod = "PM";

/**
 * When this is allowed in a time string, this can be one of:
 *
 * - `""` - none yet selected
 * - `" AM"` - `AM` selected
 * - `" PM"` - `PM` selected
 *
 * @example
 * Time Strings
 * ```ts
 * const value1 = "";
 * const value2 = " AM"
 * const value3 = " PM"
 * const value4 = "--:--";
 * const value5 = "--:-- AM";
 * const value6 = "12:30";
 * const value7 = "12:30 PM";
 * const value8 = "12:30 AM";
 * ```
 *
 * @remarks \@since 2.7.0
 */
export type TimePeriod = AmTimePeriod | PmTimePeriod;

/**
 * This allows the user to provide `hours` between `0 -> 23`.
 *
 * @remarks \@since 2.7.0
 */
export type MilitaryHoursFormat = "HH";

/**
 * This allows the user to provide `hours` between `1 -> 12` and also a
 * {@link TimePeriod}
 *
 * @see {@link TimePeriod} for examples.
 * @remarks \@since 2.7.0
 */
export type StandardHoursFormat = "hh";

/**
 * This allows the user to provide `minutes` between `0 -> 59`.
 *
 * @remarks \@since 2.7.0
 */
export type MinutesFormat = "mm";

/**
 * This allows the user to provide `seconds` between `0 -> 59`.
 *
 * @remarks \@since 2.7.0
 */
export type SecondsFormat = "ss";

/**
 * This allows the user to provide `milliseconds` between `0 -> 999`.
 *
 * @remarks \@since 2.7.0
 */
export type MillisecondsFormat = "sss";

/** @remarks \@since 2.7.0 */
export type TimePart =
  | MilitaryHoursFormat
  | StandardHoursFormat
  | SecondsFormat
  | MinutesFormat
  | MillisecondsFormat;

/** @remarks \@since 2.7.0 */
export type MilitaryHoursTimeStringFormat =
  | MilitaryHoursFormat
  | `${MilitaryHoursFormat}:${MinutesFormat}`
  | `${MilitaryHoursFormat}:${MinutesFormat}:${SecondsFormat}`
  | `${MilitaryHoursFormat}:${MinutesFormat}:${SecondsFormat}:${MillisecondsFormat}`;

/** @remarks \@since 2.7.0 */
export type StandardHoursTimeStringFormat =
  | StandardHoursFormat
  | `${StandardHoursFormat}:${MinutesFormat}`
  | `${StandardHoursFormat}:${MinutesFormat}:${SecondsFormat}`
  | `${StandardHoursFormat}:${MinutesFormat}:${SecondsFormat}:${MillisecondsFormat}`;

/** @remarks \@since 2.7.0 */
export type MinuteTimeStringFormat =
  | MinutesFormat
  | `${MinutesFormat}:${SecondsFormat}`
  | `${MinutesFormat}:${SecondsFormat}:${MillisecondsFormat}`;

/** @remarks \@since 2.7.0 */
export type SecondsTimeStringFormat =
  | SecondsFormat
  | `${SecondsFormat}:${MillisecondsFormat}`;

/**
 * This is an "enum" of supported time string formats.
 *
 * @remarks \@since 2.7.0
 */
export const TimeFormat = {
  MilitaryHoursOnly: "HH",
  MilitaryHoursMinutes: "HH:mm",
  MilitaryHoursSeconds: "HH:mm:ss",
  MilitaryHoursMilliseconds: "HH:mm:ss:sss",
  StandardHoursOnly: "hh",
  StandardHoursMinutes: "hh:mm",
  StandardHoursSeconds: "hh:mm:ss",
  StandardHoursMilliseconds: "hh:mm:ss:sss",
  MinutesOnly: "mm",
  MinutesSeconds: "mm:ss",
  MinutesMilliseconds: "mm:ss:sss",
  SecondsOnly: "ss",
  SecondsMilliseconds: "ss:sss",
  MillisecondsOnly: "sss",
} as const;

/**
 * All the supported time format strings.
 *
 * @remarks \@since 2.7.0
 */
export type TimeFormatString = ValuesOf<typeof TimeFormat>;

/**
 * @remarks \@since 2.7.0
 * @internal
 */
const TIME_PART_INDEX: Record<
  TimeFormatString,
  {
    hoursIndex?: number;
    minutesIndex?: number;
    secondsIndex?: number;
    millisecondsIndex?: number;
    timePeriodIndex?: number;
    isMilitary?: boolean;
    hoursSep?: boolean;
    minutesSep?: boolean;
    secondsSep?: boolean;
  }
> = {
  HH: {
    hoursIndex: 0,
    isMilitary: true,
  },
  "HH:mm": {
    hoursIndex: 0,
    minutesIndex: 1,
    hoursSep: true,
    isMilitary: true,
  },
  "HH:mm:ss": {
    hoursIndex: 0,
    minutesIndex: 1,
    secondsIndex: 2,
    hoursSep: true,
    minutesSep: true,
    isMilitary: true,
  },
  "HH:mm:ss:sss": {
    hoursIndex: 0,
    minutesIndex: 1,
    secondsIndex: 2,
    millisecondsIndex: 3,
    hoursSep: true,
    minutesSep: true,
    secondsSep: true,
    isMilitary: true,
  },
  hh: {
    hoursIndex: 0,
    timePeriodIndex: 1,
  },
  "hh:mm": {
    hoursIndex: 0,
    minutesIndex: 1,
    timePeriodIndex: 2,
    hoursSep: true,
  },
  "hh:mm:ss": {
    hoursIndex: 0,
    minutesIndex: 1,
    secondsIndex: 2,
    timePeriodIndex: 3,
    hoursSep: true,
    minutesSep: true,
  },
  "hh:mm:ss:sss": {
    hoursIndex: 0,
    minutesIndex: 1,
    secondsIndex: 2,
    millisecondsIndex: 3,
    timePeriodIndex: 4,
    hoursSep: true,
    minutesSep: true,
    secondsSep: true,
  },
  mm: {
    minutesIndex: 0,
  },
  "mm:ss": {
    minutesIndex: 0,
    secondsIndex: 1,
    minutesSep: true,
  },
  "mm:ss:sss": {
    minutesIndex: 0,
    secondsIndex: 1,
    millisecondsIndex: 2,
    minutesSep: true,
    secondsSep: true,
  },
  ss: {
    secondsIndex: 0,
  },
  "ss:sss": {
    secondsIndex: 0,
    millisecondsIndex: 1,
    secondsSep: true,
  },
  sss: {
    millisecondsIndex: 0,
  },
} as const;

export interface TimeStringParts {
  /**
   * Boolean if the `hours` input should be enabled and rendered.
   */
  enableHours: boolean;

  /**
   * Boolean if the `minutes` input should be enabled and rendered.
   */
  enableMinutes: boolean;

  /**
   * Boolean if the `seconds` input should be enabled and rendered.
   */
  enableSeconds: boolean;

  /**
   * Boolean if the `milliseconds` input should be enabled and rendered.
   */
  enableMilliseconds: boolean;

  /**
   * Boolean if the `AM/PM` toggle should be enabled and rendered.
   */
  enableTimePeriod: boolean;

  /**
   * Boolean if the separator after the `hours` input should be rendered.
   */
  hoursSep: boolean;

  /**
   * Boolean if the separator after the `minutes` input should be rendered.
   */
  minutesSep: boolean;

  /**
   * Boolean if the separator after the `seconds` input should be rendered.
   */
  secondsSep: boolean;
}

/**
 * @remarks \@since 2.7.0
 */
export interface ParsedTimeString extends TimeStringParts {
  /**
   * The current hours value.
   */
  hours: string;

  /**
   * The current minutes value.
   */
  minutes: string;

  /**
   * The current hours value.
   */
  seconds: string;

  /**
   * The current milliseconds value.
   */
  milliseconds: string;

  /**
   * The current time period value (AM/PM).
   */
  timePeriod: TimePeriod | "";

  /**
   * Boolean if the `value` is non-empty.
   */
  valued: boolean;
}

/**
 * This utility function parses the provided time string into the different
 * parts based on the `format` provided so that it can be used in the `Time`
 * component.
 *
 * @remarks
 *
 * This is probably more of an internal function, but it _is_ still exported for
 * public use.
 *
 * @param value - The time string to parse
 * @param format - The expected time string format.
 * @returns {@link TimeStringParts}
 * @remarks \@since 2.7.0
 */
export function parseTimeString(
  value: string,
  format: TimeFormatString
): ParsedTimeString {
  const split = value.split(/:| /);
  const {
    hoursIndex = -1,
    minutesIndex = -1,
    secondsIndex = -1,
    millisecondsIndex = -1,
    timePeriodIndex = -1,
    hoursSep = false,
    minutesSep = false,
    secondsSep = false,
  } = TIME_PART_INDEX[format];
  const enableHours = hoursIndex !== -1;
  const enableMinutes = minutesIndex !== -1;
  const enableSeconds = secondsIndex !== -1;
  const enableMilliseconds = millisecondsIndex !== -1;
  const enableTimePeriod = timePeriodIndex !== -1;
  const hours = enableHours && value ? split[hoursIndex] : "";
  const minutes = enableMinutes && value ? split[minutesIndex] : "";
  const seconds = enableSeconds && value ? split[secondsIndex] : "";
  const milliseconds =
    enableMilliseconds && value ? split[millisecondsIndex] : "";

  return {
    valued: !!(hours || minutes || seconds || milliseconds),
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
    timePeriod:
      (enableTimePeriod && (split[timePeriodIndex] as TimePeriod)) || "",
  };
}

/** @remarks \@since 2.7.0 */
export interface TimeParts {
  hours?: string;
  minutes?: string;
  seconds?: string;
  milliseconds?: string;
  timePeriod?: TimePeriod | "";
}

/**
 * Converts an object containing all the possible time parts into a string.
 *
 * @remarks
 *
 * This is probably more of an internal function, but it _is_ still exported for
 * public use.
 *
 * @param parts - all of the {@link TimeParts} that can be used to create the
 * string.
 * @returns a formatted time string
 * @remarks \@since 2.7.0
 */
export function formatTimeString({
  hours,
  minutes,
  seconds,
  milliseconds,
  timePeriod,
}: TimeParts): string {
  let nextValue = hours || "";
  if (minutes) {
    nextValue += `${nextValue ? ":" : ""}${minutes}`;
  }
  if (seconds) {
    nextValue += `${nextValue ? ":" : ""}${seconds}`;
  }
  if (milliseconds) {
    nextValue += `${nextValue ? ":" : ""}${milliseconds}`;
  }
  if (timePeriod) {
    nextValue += ` ${timePeriod}`;
  }

  return nextValue;
}
