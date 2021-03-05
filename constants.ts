import { ValuesOf, RadioItem } from "@react-md/utils";

/**
 * A valid time period for 12-hour clocks.
 *
 * @remarks \@since 2.7.0
 */
export type TimePeriod = "am " | "pm";

/**
 * The current value for the time period for 12-hour clocks. This _should_ only
 * be the empty string if a time has never been selected.
 *
 * @remarks \@since 2.7.0
 */
export type TimePeriodValue = TimePeriod | "";

/**
 * @remarks \@since 2.7.0
 */
export const TIME_PERIOD_ITEMS: readonly RadioItem[] = [
  { value: "am", children: "AM" },
  { value: "pm", children: "PM" },
];

/**
 * @remarks \@since 2.7.0
 */
export const TimeFormat = {
  MILITARY_HOURS: "HH",
  STANDARD_HOURS: "hh",
  MINUTES: "mm",
  SECONDS: "ss",
  MILLISECONDS: "sss",
} as const;
export type TimeFormat = ValuesOf<typeof TimeFormat>;

export const TIME_PART_LOOKUP = {
  HH: {
    military: true,
  },
  "HH:mm": {
    military: true,
    minutes: true,
  },
  "HH:mm:ss": {
    military: true,
    minutes: true,
    seconds: true,
  },
  "HH:mm:ss:sss": {
    military: true,
    minutes: true,
    seconds: true,
    milliseconds: true,
  },
  hh: {
    standard: true,
  },
  "hh:mm": {
    standard: true,
    minutes: true,
  },
  "hh:mm:ss": {
    standard: true,
    minutes: true,
    seconds: true,
  },
  "hh:mm:ss:sss": {
    standard: true,
    minutes: true,
    seconds: true,
    milliseconds: true,
  },
  mm: {
    minutes: true,
  },
  "mm:ss": {
    minutes: true,
    seconds: true,
  },
  "mm:ss:sss": {
    minutes: true,
    seconds: true,
    milliseconds: true,
  },
  ss: {
    seconds: true,
  },
  "ss:sss": {
    seconds: true,
    milliseconds: true,
  },
  sss: {
    milliseconds: true,
  },
} as const;

export type TimeStingFormat = keyof typeof TIME_PART_LOOKUP;
