import { getViewportSize } from "../getViewportSize";

describe("getViewportSize", () => {
  it("should return the correct size based on the direction parameter", () => {
    Object.defineProperty(window, "innerWidth", { value: 320 });
    Object.defineProperty(window, "innerHeight", { value: 1000 });

    expect(getViewportSize("width")).toBe(320);
    expect(getViewportSize("height")).toBe(1000);
  });
});
