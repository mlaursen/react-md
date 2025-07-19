import { type MinMaxRange } from "../../types.js";
import { getNumberOfDigits } from "../../utils/getNumberOfDigits.js";
import {
  type SpinButtonChangeReason,
  type SpinButtonCharacterValueMap,
  type SpinButtonValue,
} from "../types.js";

/**
 * @since 6.4.0
 * @internal
 */
interface ResolveInputEventOptions extends Partial<MinMaxRange> {
  text: string;
  mappings?: SpinButtonCharacterValueMap;
  minDigits?: number;
  maxDigits?: number;
  prevText: string;
  prevValue: SpinButtonValue;
  typedCount: number;
}

type SpinButtonResolvedInputReason =
  | SpinButtonChangeReason
  | "ignored"
  | "placeholder-digit";

/**
 * @since 6.4.0
 * @internal
 */
interface ResolveInputEvent {
  reason: SpinButtonResolvedInputReason;
  nextValue: SpinButtonValue;
}

/**
 * @since 6.4.0
 * @internal
 */
export function resolveInputEvent(
  options: ResolveInputEventOptions
): ResolveInputEvent {
  const {
    min,
    max,
    minDigits = getNumberOfDigits(min),
    maxDigits = getNumberOfDigits(max),
    text,
    mappings,
    typedCount,
    prevValue,
  } = options;

  let { prevText } = options;
  if (typedCount === 0) {
    prevText = "";
  }

  if (!text) {
    return {
      reason: "cleared",
      nextValue: null,
    };
  }

  if (mappings) {
    const nextValue = mappings[text] ?? prevValue;

    let reason: SpinButtonResolvedInputReason = "ignored";
    if (typeof mappings[text] === "number") {
      reason = "typed-to-completion";
    }

    return {
      reason,
      nextValue,
    };
  }

  if (/[^0-9]/.test(text)) {
    return {
      reason: "ignored",
      nextValue: prevValue,
    };
  }

  let reason: SpinButtonResolvedInputReason = "type";
  let nextValue: SpinButtonValue = parseInt(prevText + text, 10);
  if (typeof minDigits === "number" && typedCount + 1 < minDigits) {
    reason = "placeholder-digit";
  }

  if (typeof max === "number" && nextValue > max) {
    nextValue = prevValue;
  }

  if (
    typeof nextValue === "number" &&
    // if typing a new value surpasses the number of digits allowed
    ((typeof maxDigits === "number" && typedCount + 1 >= maxDigits) ||
      // typing a new value would exceed the max value
      (typeof max === "number" && nextValue * 10 > max))
  ) {
    reason = "typed-to-completion";
  }

  return {
    reason,
    nextValue,
  };
}
