import { GetSpinValueNextResult } from "@react-md/utils";
import { TimePeriod, TimeFormat } from "./constants";

interface TimeFormatSettings {
  onSuggest: GetSpinValueNextResult<{ period?: TimePeriod }>;
  min: number;
  max: number;
  digits: number;
}

function createSuggestion(format: TimeFormat): TimeFormatSettings {
  const isMilitaryHours = format === TimeFormat.MILITARY_HOURS;
  const isStandardHours = format === TimeFormat.STANDARD_HOURS;
  const isMilliseconds = format === TimeFormat.MILLISECONDS;

  let max = 59;
  if (isStandardHours) {
    max = 12;
  } else if (isMilitaryHours) {
    max = 24;
  } else if (isMilliseconds) {
    max = 999;
  }

  return {
    min: isStandardHours ? 1 : 0,
    max,
    digits: `${max}`.length,
    onSuggest(keys, value) {
      if (isMilliseconds) {
        // milliseconds can't be completed quickly
        return {
          value,
          completed: keys.length === 3,
        };
      }

      if (keys.length === 1) {
        const [key] = keys;
        let maxKey: number;
        if (isMilitaryHours) {
          maxKey = 2;
        } else if (isStandardHours) {
          maxKey = 1;
        } else {
          maxKey = 5;
        }

        return {
          value,
          completed: key > maxKey,
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
    },
  };
}

export const TIME_FORMAT_SETTINGS: Record<TimeFormat, TimeFormatSettings> = {
  [TimeFormat.MILITARY_HOURS]: createSuggestion(TimeFormat.MILITARY_HOURS),
  [TimeFormat.STANDARD_HOURS]: createSuggestion(TimeFormat.STANDARD_HOURS),
  [TimeFormat.MINUTES]: createSuggestion(TimeFormat.MINUTES),
  [TimeFormat.SECONDS]: createSuggestion(TimeFormat.SECONDS),
  [TimeFormat.MILLISECONDS]: createSuggestion(TimeFormat.MILLISECONDS),
};
