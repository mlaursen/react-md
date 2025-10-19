import { describe, expect, it } from "vitest";

import { toSearchQuery } from "../toSearchQuery.js";

describe("toSearchQuery", () => {
  it("should lowercase the string and keep whitespace by default", () => {
    expect(toSearchQuery("")).toBe("");
    expect(toSearchQuery("Hello, World!")).toBe("hello, world!");
  });

  it("should support ignoring whitespace by removing it all", () => {
    expect(toSearchQuery("   Hell  o, Wor ld!    ", "ignore")).toBe(
      "hello,world!"
    );
  });

  it("should support removing leading and trailing whitespace by setting the whitespace to trim", () => {
    expect(toSearchQuery("   Hell  o, Wor ld!    ", "trim")).toBe(
      "hell  o, wor ld!"
    );
  });
});
