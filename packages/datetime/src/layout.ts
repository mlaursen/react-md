import { TimeFormat, TimeFormatString } from "./format";

export const divider = "var(--rmd-divider-size)";
export const input = `calc(${divider} * 2 + var(--rmd-datetime-time-width))`;
export const msInput = `calc(${divider} * 2 + var(--rmd-datetime-ms-width))`;
export const separator = "var(--rmd-datetime-colon-width)";
export const timePeriod = "var(--rmd-datetime-am-pm-width)";
export const inputWithSeparator = `${input} ${separator}`;

export function createLayout(format: TimeFormatString): string {
  const parts = format.split(":");
  const max = parts.length;
  let layout = "";
  for (let i = 0; i < max; i += 1) {
    const isMilliseconds = parts[i] === "sss";
    const currentInput = isMilliseconds ? msInput : input;

    layout = `${i > 0 ? `${layout} ${separator} ` : ""}${currentInput}`;
  }

  if (parts[0] === "hh") {
    return `${layout} ${timePeriod}`;
  }

  return layout;
}

export type SupportedTimeLayout = TimeFormatString | "";

export const TIME_LAYOUTS: Record<SupportedTimeLayout, string> = (() => {
  const layouts = Object.values(TimeFormat).reduce(
    (obj, format) => ({
      ...obj,
      [format]: createLayout(format),
    }),
    {} as Record<TimeFormatString, string>
  );

  return {
    ...layouts,
    "": "",
  };
})();

//   (collection, format) => ({
//     ...collection,
//     [format]: createLayout(format),
//   }),
//   {}
// );

// export const TimeLayout: Record<TimeFormatString, string> = {
//   HH: input,
//   hh: `${input} ${timePeriod}`,
//   "hh:mm": `${inputWithSeparator} ${input} ${timePeriod}`,
//   "hh:mm:ss": `${inputWithSeparator} ${inputWithSeparator} ${input} ${timePeriod}`,
// } as const;
