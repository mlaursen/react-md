import { describe, expect, it } from "@jest/globals";
import { rmdRender, screen, userEvent } from "../../test-utils/index.js";
import { getRangeDefaultValue } from "../getRangeDefaultValue.js";
import { UseStateInitializer } from "../../types.js";

describe("getRangeDefaultValue", () => {
  it("should return the default value if it is defined", async () => {
    expect(
      getRangeDefaultValue({ min: 0, max: 100, step: 1, defaultValue: 10 })
    ).toBe(10);
    expect(
      getRangeDefaultValue({ min: 0, max: 100, step: 1, defaultValue: 50 })
    ).toBe(50);

    const defaultValueSetter = (): number => 30;
    expect(
      getRangeDefaultValue({
        min: 10,
        max: 30,
        step: 1,
        defaultValue: defaultValueSetter,
      })
    ).toBe(defaultValueSetter);
  });

  it("should return a function that returns the middle of the range when the defaultValue is undefined", () => {
    const initializer1 = getRangeDefaultValue({
      min: 0,
      max: 100,
      step: 1,
    });
    const initializer2 = getRangeDefaultValue({
      min: 0,
      max: 100,
      step: 1,
      defaultValue: undefined,
    });

    if (typeof initializer1 !== "function") {
      throw new Error("initializer1 is not a function");
    }
    if (typeof initializer2 !== "function") {
      throw new Error("initializer2 is not a function");
    }

    expect(initializer1()).toBe(50);
    expect(initializer2()).toBe(50);
  });
});
