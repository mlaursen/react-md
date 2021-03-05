import { GetSpinValueNextResult } from "@react-md/utils";
import { TimeFormat } from "@react-md/datetime";

export function createSuggestion(
  format: TimeFormat
): GetSpinValueNextResult<{ period?: "am" | "pm" }> {
  const isMilitaryHours = format === TimeFormat.MILITARY_HOURS;
  const isStandardHours = format === TimeFormat.STANDARD_HOURS;
  // const isMinutes = format == TimeFormat.MINUTES;
  // const isSeconds = format === TimeFormat.SECONDS;
  const isMilliseconds = format === TimeFormat.MILLISECONDS;

  return function onSuggest(keys, value) {
    if (isMilliseconds) {
      // milliseconds can't be completed quickly
      return {
        value,
        completed: keys.length === 3,
      };
    }

    if (keys.length === 1) {
      const [key] = keys;
      let max: number;
      if (isMilitaryHours) {
        max = 2;
      } else if (isStandardHours) {
        max = 1;
      } else {
        max = 5;
      }

      return {
        value,
        completed: key > max,
      };
    }

    const [prevKey, key] = keys;

    let period: "am" | "pm" | undefined;
    let nextValue = `${prevKey}${key}`;
    const total = parseInt(nextValue, 10);
    if (isMilitaryHours && total > 24) {
      nextValue = `${total - 24}`.padStart(2, "0");
    } else if (isStandardHours && total > 12) {
      period = "pm";
      nextValue = `${total - 12}`.padStart(2, "0");
    } else if (isStandardHours && total === 0) {
      nextValue = "12";
      period = "am";
    } else if (isStandardHours) {
      period = "am";
    }

    return {
      value: nextValue,
      overflow: period,
      completed: true,
    };
  };
}
