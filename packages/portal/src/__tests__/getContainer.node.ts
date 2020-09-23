/**
 * @jest-environment node
 */

import { getContainer } from "../getContainer";

describe("getContainer", () => {
  it("should return null for non-browser environments", () => {
    expect(typeof document).toBe("undefined");
    expect(getContainer()).toBe(null);
  });
});
