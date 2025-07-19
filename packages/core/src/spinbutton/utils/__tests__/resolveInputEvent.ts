import { describe, expect, it } from "vitest";

import { type MinMaxRange } from "../../../types.js";
import { type SpinButtonCharacterValueMap } from "../../types.js";
import { resolveInputEvent } from "../resolveInputEvent.js";

const MINUTES_RANGE: MinMaxRange = {
  min: 0,
  max: 59,
};

describe("resolveInputEvent", () => {
  it("should return a null change event if there is no text", () => {
    expect(
      resolveInputEvent({
        ...MINUTES_RANGE,
        prevText: "",
        prevValue: null,
        text: "",
        typedCount: 0,
      })
    ).toEqual({
      reason: "cleared",
      nextValue: null,
    });

    expect(
      resolveInputEvent({
        ...MINUTES_RANGE,
        prevText: "3",
        prevValue: 3,
        text: "",
        typedCount: 1,
      })
    ).toEqual({
      reason: "cleared",
      nextValue: null,
    });
  });

  it("should always resolve mappings over other values if provided", () => {
    const mappings: SpinButtonCharacterValueMap = {
      a: 0,
      p: 1,
    };

    expect(
      resolveInputEvent({
        ...MINUTES_RANGE,
        mappings,
        text: "",
        prevText: "",
        prevValue: null,
        typedCount: 0,
      })
    ).toEqual({
      reason: "cleared",
      nextValue: null,
    });

    expect(
      resolveInputEvent({
        ...MINUTES_RANGE,
        mappings,
        text: "d",
        prevText: "",
        prevValue: null,
        typedCount: 0,
      })
    ).toEqual({
      reason: "ignored",
      nextValue: null,
    });

    expect(
      resolveInputEvent({
        ...MINUTES_RANGE,
        mappings,
        text: "a",
        prevText: "",
        prevValue: null,
        typedCount: 0,
      })
    ).toEqual({
      reason: "typed-to-completion",
      nextValue: 0,
    });
    expect(
      resolveInputEvent({
        ...MINUTES_RANGE,
        mappings,
        text: "a",
        prevText: "AM",
        prevValue: 0,
        typedCount: 0,
      })
    ).toEqual({
      reason: "typed-to-completion",
      nextValue: 0,
    });
    expect(
      resolveInputEvent({
        ...MINUTES_RANGE,
        mappings,
        text: "a",
        prevText: "PM",
        prevValue: 1,
        typedCount: 0,
      })
    ).toEqual({
      reason: "typed-to-completion",
      nextValue: 0,
    });

    expect(
      resolveInputEvent({
        ...MINUTES_RANGE,
        mappings,
        text: "p",
        prevText: "PM",
        prevValue: 1,
        typedCount: 0,
      })
    ).toEqual({
      reason: "typed-to-completion",
      nextValue: 1,
    });
  });

  it("should ignore any non-digits when the mappings are not provided", () => {
    expect(
      resolveInputEvent({
        ...MINUTES_RANGE,
        text: "p",
        prevText: "",
        prevValue: null,
        typedCount: 0,
      })
    ).toEqual({
      reason: "ignored",
      nextValue: null,
    });
    expect(
      resolveInputEvent({
        ...MINUTES_RANGE,
        text: "p",
        prevText: "3",
        prevValue: 3,
        typedCount: 1,
      })
    ).toEqual({
      reason: "ignored",
      nextValue: 3,
    });

    expect(
      resolveInputEvent({
        ...MINUTES_RANGE,
        text: "d",
        prevText: "",
        prevValue: null,
        typedCount: 0,
      })
    ).toEqual({
      reason: "ignored",
      nextValue: null,
    });
    expect(
      resolveInputEvent({
        ...MINUTES_RANGE,
        text: "d",
        prevText: "3",
        prevValue: 3,
        typedCount: 1,
      })
    ).toEqual({
      reason: "ignored",
      nextValue: 3,
    });
  });

  it("should show that a new value has been typed when it is still within the provided range", () => {
    expect(
      resolveInputEvent({
        ...MINUTES_RANGE,
        text: "3",
        prevText: "",
        prevValue: null,
        typedCount: 0,
      })
    ).toEqual({
      reason: "type",
      nextValue: 3,
    });
  });

  it("should show that a value has been typed to completion if it reaches the max number of digits allowed", () => {
    expect(
      resolveInputEvent({
        ...MINUTES_RANGE,
        text: "3",
        prevText: "3",
        prevValue: 3,
        typedCount: 1,
      })
    ).toEqual({
      reason: "typed-to-completion",
      nextValue: 33,
    });
  });

  it("should flag values that are still less than the min value as placeholder digits", () => {
    expect(
      resolveInputEvent({
        min: 10,
        text: "0",
        prevText: "",
        prevValue: null,
        typedCount: 0,
      })
    ).toEqual({
      reason: "placeholder-digit",
      nextValue: 0,
    });

    expect(
      resolveInputEvent({
        min: 0,
        text: "0",
        prevText: "",
        prevValue: null,
        typedCount: 0,
      })
    ).toEqual({
      reason: "type",
      nextValue: 0,
    });
  });

  it("should flag values that are are still less than the min digits as placeholder digits", () => {
    expect(
      resolveInputEvent({
        text: "0",
        prevText: "",
        prevValue: null,
        typedCount: 0,
        minDigits: 4,
      })
    ).toEqual({
      reason: "placeholder-digit",
      nextValue: 0,
    });
  });

  it("should consider a value larger than the range when there are multiple digits to be typed-to-completion", () => {
    const range: MinMaxRange = { min: 1, max: 12 };
    const resolved1 = resolveInputEvent({
      ...range,
      text: "1",
      prevValue: null,
      prevText: "",
      typedCount: 0,
    });
    expect(resolved1).toEqual({
      reason: "type",
      nextValue: 1,
    });

    const resolved2 = resolveInputEvent({
      ...range,
      text: "3",
      prevText: "01",
      prevValue: resolved1.nextValue,
      typedCount: 2,
    });
    expect(resolved2).toEqual({
      reason: "typed-to-completion",
      nextValue: 1,
    });
  });

  it("should consider a fully typed string of only zeros typed-to-completion when zero is below the min value", () => {
    expect(
      resolveInputEvent({
        min: 1,
        max: 12,
        text: "0",
        prevText: "0",
        prevValue: 0,
        typedCount: 1,
      })
    ).toEqual({
      reason: "typed-to-completion",
      nextValue: 0,
    });
  });

  it("should consider a value typed-to-completion if increasing the value by a power of 10 is more than the max value", async () => {
    expect(
      resolveInputEvent({
        min: 1,
        max: 12,
        text: "3",
        prevText: "",
        prevValue: null,
        typedCount: 0,
      })
    ).toEqual({
      reason: "typed-to-completion",
      nextValue: 3,
    });
    expect(
      resolveInputEvent({
        min: 1,
        max: 12,
        text: "3",
        prevText: "0",
        prevValue: 0,
        typedCount: 1,
      })
    ).toEqual({
      reason: "typed-to-completion",
      nextValue: 3,
    });

    expect(
      resolveInputEvent({
        min: 1,
        max: 10,
        text: "0",
        prevText: "1",
        prevValue: 0,
        typedCount: 1,
      })
    ).toEqual({
      reason: "typed-to-completion",
      nextValue: 10,
    });
  });
});
