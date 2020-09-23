import { getNextStage } from "../getNextStage";
import { EXITED, EXITING, EXIT, ENTERED, ENTERING, ENTER } from "../constants";

describe("getNextStage", () => {
  it("should return the correct next stage", () => {
    expect(getNextStage(ENTER)).toBe(ENTERING);
    expect(getNextStage(ENTERING)).toBe(ENTERED);
    expect(getNextStage(ENTERED)).toBe(ENTERED);

    expect(getNextStage(EXIT)).toBe(EXITING);
    expect(getNextStage(EXITING)).toBe(EXITED);
    expect(getNextStage(EXITED)).toBe(EXITED);
  });
});
