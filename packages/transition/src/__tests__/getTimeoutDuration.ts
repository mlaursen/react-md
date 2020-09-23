import { getTimeoutDuration } from "../getTimeoutDuration";
import {
  ENTERING,
  EXITING,
  ENTER,
  ENTERED,
  EXIT,
  EXITED,
  TransitionStage,
} from "../constants";

describe("getTimeoutDuration", () => {
  it("should return the appear value while the stage is ENTERING and appearing is true", () => {
    expect(getTimeoutDuration(ENTERING, 200, 150, 100, true)).toBe(200);
  });

  it("should return the enter value while the stage is ENTERING and appearing is false", () => {
    expect(getTimeoutDuration(ENTERING, 200, 150, 100, false)).toBe(150);
  });

  it("should return the exit value while the stage is EXITING", () => {
    expect(getTimeoutDuration(EXITING, 200, 150, 100, true)).toBe(100);
    expect(getTimeoutDuration(EXITING, 200, 150, 100, false)).toBe(100);
  });

  it("should return 0 for all other stagees", () => {
    const stagees: TransitionStage[] = [ENTER, ENTERED, EXIT, EXITED];
    stagees.forEach((stage) => {
      expect(getTimeoutDuration(stage, 200, 150, 100, false)).toBe(0);
      expect(getTimeoutDuration(stage, 200, 150, 100, true)).toBe(0);
    });
  });
});
