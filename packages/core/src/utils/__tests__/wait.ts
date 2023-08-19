import { describe, expect, it } from "@jest/globals";
import { wait } from "../wait.js";

describe("wait", () => {
  it("should wait the duration and the resolve", async () => {
    const startTime = Date.now();
    await wait(1000);
    const endTime = Date.now();

    expect(endTime - startTime).toBeGreaterThanOrEqual(1000);
  });
});
