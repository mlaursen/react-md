import { describe, expect, it } from "vitest";

import { getTimeStep } from "../utils.js";

describe("getTimeStep", () => {
  it("should return the step if it is not an object", () => {
    expect(getTimeStep(undefined)).toBe(undefined);
    expect(getTimeStep("any")).toBe("any");
    expect(getTimeStep(30)).toBe(30);
    expect(getTimeStep(0)).toBe(0);
    expect(getTimeStep(-0)).toBe(-0);
  });

  it("should return undefined if the time parts object is zero", () => {
    expect(getTimeStep({})).toBe(undefined);
    expect(getTimeStep({ seconds: 0 })).toBe(undefined);
    expect(getTimeStep({ minutes: 0 })).toBe(undefined);
    expect(getTimeStep({ hours: 0 })).toBe(undefined);
    expect(getTimeStep({ seconds: 0, hours: 0 })).toBe(undefined);
    expect(getTimeStep({ minutes: 0, seconds: 0 })).toBe(undefined);
  });

  it("should create a total in seconds", () => {
    expect(getTimeStep({ seconds: 10 })).toBe(10);
    expect(getTimeStep({ seconds: -10 })).toBe(10);

    expect(getTimeStep({ minutes: 10 })).toBe(600);
    expect(getTimeStep({ minutes: -10 })).toBe(600);

    expect(getTimeStep({ hours: 10 })).toBe(36000);
    expect(getTimeStep({ hours: -10 })).toBe(36000);

    expect(getTimeStep({ minutes: 15, hours: 1 })).toBe(4500);
    expect(getTimeStep({ seconds: 30, minutes: 15, hours: 0 })).toBe(930);
  });

  it("should round the total since it mimics the browser behavior", () => {
    expect(getTimeStep({ seconds: 1.5 })).toBe(2);
    expect(getTimeStep({ seconds: 1.51 })).toBe(2);
    expect(getTimeStep({ seconds: 1.49 })).toBe(1);

    expect(getTimeStep({ minutes: 1.5 })).toBe(90);
    expect(getTimeStep({ minutes: 1.51 })).toBe(91);
    expect(getTimeStep({ minutes: 1.49 })).toBe(89);
  });
});
